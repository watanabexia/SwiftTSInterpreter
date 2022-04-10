import * as es from 'estree'
import {
  Context,
  TypeAnnotatedNode,
  Primitive,
  Variable,
  Pair,
  List,
  ForAll,
  Type,
  FunctionType,
  SourceError,
  TypeEnvironment,
  ClassType,
  Protocol
} from '../types'
import {
  TypeError,
  InternalTypeError,
  UnifyError,
  InternalDifferentNumberArgumentsError,
  InternalCyclicReferenceError
} from './internalTypeErrors'
import {
  InvalidArgumentTypesError,
  CyclicReferenceError,
  UnknownTypeError,
  AssignmentTypeError,
  DifferentNumberArgumentsError,
  IncorrectArgumentsLabelError,
  ReturnTypeError,
  MissingPropError,
  MissingSetterError,
  MissingGetterError
} from '../errors/typeErrors'

/** Name of Unary negative builtin operator */
const NEGATIVE_OP = '-_1'
let typeIdCounter = 0

/**
 * Called before and after type inference. First to add typeVar attribute to node, second to resolve
 * the type
 * FunctionDeclaration nodes have the functionTypeVar attribute as well
 * @param node
 * @param constraints: undefined for first call
 */
/* tslint:disable cyclomatic-complexity */
function traverse(node: TypeAnnotatedNode<es.Node>, constraints?: Constraint[]) {
  if (node === null) {
    // this happens in a holey array [,,,,,]
    return
  }
  if (constraints && node.typability !== 'Untypable') {
    try {
      //Debug
      // console.log("APPLY CONSTRAINTS TYPE >>>>")
      // console.log(node)

      node.inferredType = applyConstraints(node.inferredType as Type, constraints)
      node.typability = 'Typed'
    } catch (e) {
      if (isInternalTypeError(e) && !(e instanceof InternalCyclicReferenceError)) {
        typeErrors.push(new TypeError(node, e))
      }
    }
  } else {
    node.inferredType = tVar(typeIdCounter)
    typeIdCounter++
  }
  switch (node.type) {
    case 'Program': {
      node.body.forEach(nodeBody => {
        traverse(nodeBody, constraints)
      })
      break
    }
    case 'UnaryExpression': {
      traverse(node.argument, constraints)
      break
    }
    case 'LogicalExpression': // both cases are the same
    case 'BinaryExpression': {
      traverse(node.left, constraints)
      traverse(node.right, constraints)
      break
    }
    case 'ExpressionStatement': {
      traverse(node.expression, constraints)
      break
    }
    case 'BlockStatement': {
      node.body.forEach(nodeBody => {
        traverse(nodeBody, constraints)
      })
      break
    }
    case 'WhileStatement':
      throw Error('While statements not supported for x-slang')
    case 'ForStatement':
      throw Error('For statements not supported for x-slang')
    case 'ConditionalExpression': // both cases are the same
    case 'IfStatement': {
      traverse(node.test, constraints)
      traverse(node.consequent, constraints)
      if (node.alternate) {
        traverse(node.alternate)
      }
      break
    }
    case 'CallExpression': {
      node.arguments.forEach(arg => {
        traverse(arg.VALUE!, constraints)
      })
      break
    }
    case 'ReturnStatement': {
      traverse(node.argument!)
      break
    }
    case 'VariableDeclaration': {
      traverse(node.declarations[0].id, constraints)
      if (node.declarations[0].init !== undefined) {
        traverse(node.declarations[0].init!, constraints)
      }
      break
    }
    case 'ArrowFunctionExpression':
      throw Error('Arrow functions not supported for x-slang')
    case 'FunctionDeclaration': {
      traverse(node.body)
      break
    }
    case 'AssignmentExpression': {
      traverse(node.left, constraints)
      traverse(node.right, constraints)
      break
    }
    case 'ArrayExpression':
      throw Error('Array expressions not supported for x-slang')
    case 'MemberExpression': {
      break
    }
    case 'ProtocolDeclaration': {
      break
    }
    case 'ClassDeclaration': {
      node.body.body.forEach(element => {
        traverse(element)
      })
      break
    }
    case 'PropertyDefinition': {
      traverse(node.key, constraints)
      traverse(node.value, constraints)
      break
    }
    case 'CompPropDeclaration': {
      traverse(node.key, constraints)
      node.body.body.forEach(element => {
        traverse(element, constraints)
      })
      break
    }
    case 'MethodDefinition': {
      break
    }
    default:
      return
  }
}

function isPair(type: Type): type is Pair {
  return type.kind === 'pair'
}

function isList(type: Type): type is List {
  return type.kind === 'list'
}

function getListType(type: Type): Type | null {
  if (isList(type)) {
    return type.elementType
  }
  return null
}

function isInternalTypeError(error: any) {
  return error instanceof InternalTypeError
}

// Type Definitions
// Our type environment maps variable names to types.
// it also remembers if names weer declared as const or let
type Env = TypeEnvironment

type Constraint = [Variable, Type]
let typeErrors: SourceError[] = []
/**
 * An additional layer of typechecking to be done right after parsing.
 * @param program Parsed Program
 */
export function typeCheck(
  program: TypeAnnotatedNode<es.Program>,
  context: Context
): [TypeAnnotatedNode<es.Program>, SourceError[]] {
  typeIdCounter = 0
  typeErrors = []
  const env: Env = context.typeEnvironment
  const constraints: Constraint[] = []
  traverse(program)
  try {
    infer(program, env, constraints, true)
  } catch {
    // we ignore the errors here since
    // they would have already been processed
  }

  //Debug
  // console.log('FINAL Constraints >>>>>>>>>>>>>>>>>>')
  // console.log(constraints)
  // console.log(program)

  traverse(program, constraints)

  context.errors = context.errors.concat(typeErrors)

  return [program, typeErrors]
}

/**
 * Generate a fresh type variable
 * @param typeVar
 */
function freshTypeVar(typeVar: Variable): Variable {
  const newVarId = typeIdCounter
  typeIdCounter++
  return {
    ...typeVar,
    name: `T${newVarId}`
  }
}

/**
 * Replaces all instances of type variables in the type of a polymorphic type
 */
function fresh(monoType: Type, subst: { [typeName: string]: Variable }): Type {
  switch (monoType.kind) {
    case 'primitive':
      return monoType
    case 'list':
      return {
        kind: 'list',
        elementType: fresh(monoType.elementType, subst)
      }
    case 'array':
      return {
        kind: 'array',
        elementType: fresh(monoType.elementType, subst)
      }
    case 'pair':
      return {
        kind: 'pair',
        headType: fresh(monoType.headType, subst),
        tailType: fresh(monoType.tailType, subst)
      }
    case 'variable':
      return subst[monoType.name]
    case 'function':
      return {
        ...monoType,
        parameterTypes: monoType.parameterTypes.map(argType => fresh(argType, subst)),
        returnType: fresh(monoType.returnType, subst)
      }
    case 'class':
      return {
        ...monoType,
        storPropTypes: monoType.storPropTypes.map(propType => fresh(propType, subst))
      }
    case 'protocol':
      return {
        ...monoType,
        PropTypes: monoType.PropTypes.map(propType => fresh(propType, subst))
      }
  }
}

/** Union of free type variables */
function union(a: Variable[], b: Variable[]): Variable[] {
  const sum = [...a]
  b.forEach(newVal => {
    if (sum.findIndex(val => val.name === newVal.name) === -1) {
      sum.push(newVal)
    }
  })
  return sum
}

function freeTypeVarsInType(type: Type): Variable[] {
  switch (type.kind) {
    case 'primitive':
      return []
    case 'list':
      return freeTypeVarsInType(type.elementType)
    case 'array':
      return freeTypeVarsInType(type.elementType)
    case 'pair':
      return union(freeTypeVarsInType(type.headType), freeTypeVarsInType(type.tailType))
    case 'variable':
      return [type]
    case 'function':
      return union(
        type.parameterTypes.reduce((acc, currentType) => {
          return union(acc, freeTypeVarsInType(currentType))
        }, []),
        freeTypeVarsInType(type.returnType)
      )
    case 'class':
      return union(
        type.storPropTypes.reduce((acc, currentType) => {
          return union(acc, freeTypeVarsInType(currentType))
        }, []),
        type.compPropTypes.reduce((acc, currentType) => {
          return union(acc, freeTypeVarsInType(currentType))
        }, [])
      )
    case 'protocol':
      return type.PropTypes.reduce((acc, currentType) => {
        return union(acc, freeTypeVarsInType(currentType))
      }, [])
  }
}

function extractFreeVariablesAndGenFresh(polyType: ForAll): Type {
  const monoType = polyType.polyType
  const freeTypeVars = freeTypeVarsInType(monoType)
  const substitutions = {}
  freeTypeVars.forEach(val => {
    substitutions[val.name] = freshTypeVar(val)
  })
  return fresh(monoType, substitutions)
}

/**
 * Going down the DAG that is the constraint list
 */
function applyConstraints(type: Type, constraints: Constraint[]): Type {
  switch (type.kind) {
    case 'primitive': {
      return type
    }
    case 'pair': {
      const pairHeadType = applyConstraints(type.headType, constraints)
      const pairTailType = applyConstraints(type.tailType, constraints)
      if (pairTailType.kind === 'list' && pairHeadType === getListType(pairTailType)) {
        return tList(pairHeadType)
      } else {
        return tPair(pairHeadType, pairTailType)
      }
    }
    case 'list': {
      const elementType = applyConstraints(type.elementType, constraints)
      return {
        kind: 'list',
        elementType
      }
    }
    case 'array': {
      const elementType = applyConstraints(type.elementType, constraints)
      return {
        kind: 'array',
        elementType
      }
    }
    case 'variable': {
      for (const constraint of constraints) {
        const LHS = constraint[0]
        const RHS = constraint[1]
        if (LHS.name === type.name) {
          if (contains(RHS, LHS.name)) {
            if (isPair(RHS) && LHS === RHS.tailType) {
              return {
                kind: 'list',
                elementType: RHS.headType
              }
            } else if (LHS.kind === 'variable' && LHS === getListType(RHS)) {
              return {
                kind: 'list',
                elementType: LHS
              }
            }
            throw new InternalCyclicReferenceError(type.name)
          }
          return applyConstraints(constraint[1], constraints)
        }
      }
      return type
    }
    case 'function': {
      return {
        ...type,
        parameterTypes: type.parameterTypes.map(fromType =>
          applyConstraints(fromType, constraints)
        ),
        returnType: applyConstraints(type.returnType, constraints)
      }
    }
    case 'class': {
      return {
        ...type,
        storPropTypes: type.storPropTypes.map(fromType => applyConstraints(fromType, constraints)),
        compPropTypes: type.compPropTypes.map(fromType => applyConstraints(fromType, constraints))
      }
    }
    case 'protocol': {
      return {
        ...type,
        PropTypes: type.PropTypes.map(fromType => applyConstraints(fromType, constraints))
      }
    }
  }
}

/**
 * Check if a type contains a reference to a name, to check for an infinite type
 * e.g. A = B -> A
 * @param type
 * @param name
 */
function contains(type: Type, name: string): boolean {
  switch (type.kind) {
    case 'primitive':
      return false
    case 'pair':
      return contains(type.headType, name) || contains(type.tailType, name)
    case 'array':
    case 'list':
      return contains(type.elementType, name)
    case 'variable':
      return type.name === name
    case 'function':
      const containedInParamTypes = type.parameterTypes.some(currentType =>
        contains(currentType, name)
      )
      return containedInParamTypes || contains(type.returnType, name)
    case 'class':
      const containedInStorPropTypes = type.storPropTypes.some(currentType =>
        contains(currentType, name)
      )
      const containedInCompPropTypes = type.compPropTypes.some(currentType =>
        contains(currentType, name)
      )
      return containedInStorPropTypes || containedInCompPropTypes
    case 'protocol':
      const containedInPropTypes = type.PropTypes.some(currentType => contains(currentType, name))
      return containedInPropTypes
  }
}

function occursOnLeftInConstraintList(
  LHS: Variable,
  constraints: Constraint[],
  RHS: Type
): Constraint[] {
  for (const constraint of constraints) {
    if (constraint[0].name === LHS.name) {
      // when LHS occurs earlier in original constrain list
      return addToConstraintList(constraints, [RHS, constraint[1]])
    }
  }
  if (RHS.kind === 'variable') {
    if (LHS.constraint === 'addable' && RHS.constraint === 'none') {
      // We need to modify the type of the RHS so that it is at least as specific as the LHS
      // this is so we are going from least to most specific as we recursively try to determine
      // type of a type variable
      RHS.constraint = LHS.constraint
    }
  }
  if (LHS !== RHS) constraints.push([LHS, RHS])
  return constraints
}

function cannotBeResolvedIfAddable(LHS: Variable, RHS: Type): boolean {
  return (
    LHS.constraint === 'addable' &&
    RHS.kind !== 'variable' &&
    !(RHS.kind === 'primitive' && (RHS.name === 'Int' || RHS.name === 'Double'))
  )
}

function addToConstraintList(constraints: Constraint[], [LHS, RHS]: [Type, Type]): Constraint[] {
  if (LHS.kind === 'primitive' && RHS.kind === 'primitive' && LHS.name === RHS.name) {
    // if t is base type and t' also base type of the same kind, do nothing
    return constraints
  } else if (LHS.kind !== 'variable' && RHS.kind === 'variable') {
    // if t is not a type var and t' is type var, then swap order
    return addToConstraintList(constraints, [RHS, LHS])
  } else if (LHS.kind === 'variable') {
    RHS = applyConstraints(RHS, constraints)
    if ((RHS.kind === 'primitive' || RHS.kind === 'variable') && LHS.name === RHS.name) {
      // if t is type var and S(t') is a type var with same name, do nothing
      return constraints
    } else if (RHS.kind === 'pair' && LHS === RHS.tailType) {
      // if t is type var and S(t') = Pair(t'',t), add t = List(t'')
      addToConstraintList(constraints, [LHS, tList(RHS.headType)])
    } else if (RHS.kind === 'pair' && RHS.tailType.kind === 'list') {
      // if t = type var and t' = Pair(T1, List<T2>), add T1 = T2 and t = List(T1)
      const newConstraints = addToConstraintList(constraints, [
        RHS.headType,
        getListType(RHS.tailType)!
      ])
      return addToConstraintList(newConstraints, [LHS, tList(RHS.headType)])
    } else if (contains(RHS, LHS.name)) {
      // if t is tpye var and S(t') is function, list or pair type and t contained in S(t'), throw
      // recursive definition error
      throw new InternalCyclicReferenceError(LHS.name)
    }
    if (cannotBeResolvedIfAddable(LHS, RHS)) {
      throw new UnifyError(LHS, RHS)
    }
    return occursOnLeftInConstraintList(LHS, constraints, applyConstraints(RHS, constraints))
  } else if (LHS.kind === 'function' && RHS.kind === 'function') {
    if (LHS.parameterTypes.length !== RHS.parameterTypes.length) {
      throw new InternalDifferentNumberArgumentsError(
        RHS.parameterTypes.length,
        LHS.parameterTypes.length
      )
    }
    let newConstraints = constraints
    for (let i = 0; i < LHS.parameterTypes.length; i++) {
      newConstraints = addToConstraintList(newConstraints, [
        LHS.parameterTypes[i],
        RHS.parameterTypes[i]
      ])
    }
    newConstraints = addToConstraintList(newConstraints, [LHS.returnType, RHS.returnType])
    return newConstraints
  } else if (LHS.kind === 'pair' && RHS.kind === 'pair') {
    // if t = Pair<T1, T2> and t' = Pair<T3, T4>, add T1 = T3 and T2 = T4
    const newConstraints = addToConstraintList(constraints, [LHS.headType, RHS.headType])
    return addToConstraintList(newConstraints, [LHS.tailType, RHS.tailType])
  } else if (LHS.kind === 'list' && RHS.kind === 'list') {
    // if t = List<T1> and t' = List<T2>, add T1 = T2
    return addToConstraintList(constraints, [LHS.elementType, RHS.elementType])
  } else if (LHS.kind === 'list' && RHS.kind === 'pair') {
    // if t = List<T1> and t' = Pair<T2, T3>, add t' = Pair<T1, List<T1>>
    return addToConstraintList(constraints, [RHS, tPair(LHS.elementType, LHS)])
  } else if (RHS.kind === 'list' && LHS.kind === 'pair') {
    // if t = Pair<T1, T2> and t' = List<T3>, add t = Pair<T3, List<T3>>
    return addToConstraintList(constraints, [LHS, tPair(RHS.elementType, RHS)])
  } else if (LHS.kind === 'array' && RHS.kind === 'array') {
    // if t = Array<T1> and t' = Array<T2>, add T1 = T2
    return addToConstraintList(constraints, [LHS.elementType, RHS.elementType])
  } else if (LHS.kind === 'class' && RHS.kind === 'class') {
    if (LHS.name !== RHS.name) {
      throw new UnifyError(LHS, RHS)
    } else {
      return constraints
    }
  }
  throw new UnifyError(LHS, RHS)
}

function statementReturnTypeCheck(node: es.Node, RTNType: Type, constraints: Constraint[]) {
  switch (node.type) {
    case 'IfStatement': {
      statementReturnTypeCheck(node.consequent, RTNType, constraints)
      if (node.alternate) {
        statementReturnTypeCheck(node.alternate!, RTNType, constraints)
      }
      break
    }
    case 'BlockStatement': {
      ;(<es.BlockStatement>node).body.map(stmt =>
        statementReturnTypeCheck(stmt, RTNType, constraints)
      )
      break
    }
    case 'ReturnStatement': {
      const RTNNode = node as TypeAnnotatedNode<es.ReturnStatement>

      //Debug
      // console.log("RTN Detected!")
      // console.log(RTNNode)
      // console.log(constraints)

      try {
        addToConstraintList(constraints, [RTNType, RTNNode.inferredType!])
      } catch (e) {
        const received_Type = applyConstraints(RTNNode.inferredType!, constraints)
        if (e instanceof UnifyError) {
          typeErrors.push(new ReturnTypeError(node, RTNType, received_Type))
        }
      }
      break
    }
  }
}

function statementHasReturn(node: es.Node): boolean {
  switch (node.type) {
    case 'IfStatement': {
      return statementHasReturn(node.consequent) || statementHasReturn(node.alternate!)
    }
    case 'BlockStatement': {
      return node.body.some(stmt => statementHasReturn(stmt))
    }
    case 'ForStatement':
    case 'WhileStatement': {
      return statementHasReturn(node.body)
    }
    case 'ReturnStatement': {
      return true
    }
    default: {
      return false
    }
  }
}

// These are the only two possible kinds of value returning statements when excluding return statements
function stmtHasValueReturningStmt(node: es.Node): boolean {
  switch (node.type) {
    case 'ExpressionStatement': {
      return true
    }
    case 'IfStatement': {
      return (
        stmtHasValueReturningStmt(node.consequent) || stmtHasValueReturningStmt(node.alternate!)
      )
    }
    case 'BlockStatement': {
      return node.body.some(stmt => stmtHasValueReturningStmt(stmt))
    }
    case 'ForStatement':
    case 'WhileStatement': {
      return stmtHasValueReturningStmt(node.body)
    }
    default: {
      return false
    }
  }
}

/**
 * The following is the index of the node whose value will be the value of the block itself.
 * At the top level and if we are currently in the last value returning stmt of the parent block stmt,
 * we will use the last value returning statement of the current block. Anywhere else, we will use
 * either the first return statement or the last statement in the block otherwise
 */
function returnBlockValueNodeIndexFor(
  node: es.Program | es.BlockStatement,
  isTopLevelAndLastValStmt: boolean
): number {
  const lastStatementIndex = node.body.length - 1
  if (isTopLevelAndLastValStmt) {
    for (let index = lastStatementIndex; index >= 0; index--) {
      if (stmtHasValueReturningStmt(node.body[index])) {
        return index
      }
    }
    // in the case there are no value returning statements in the body
    // return the last statement
    return lastStatementIndex
  } else {
    return node.body.findIndex((currentNode, index) => {
      return index === lastStatementIndex || statementHasReturn(currentNode)
    })
  }
}

function lookupType(name: string, env: Env): Type | ForAll | undefined {
  for (let i = env.length - 1; i >= 0; i--) {
    if (env[i].typeMap.has(name)) {
      return env[i].typeMap.get(name)
    }
  }
  return undefined
}

function pushEnv(env: Env) {
  env.push({ typeMap: new Map(), declKindMap: new Map() })
}

function getType(node: es.Node, TYPE: string | undefined | null) {
  let type = tUndef
  switch (TYPE) {
    case 'Int':
      type = tInt
      break
    case 'Double':
      type = tDouble
      break
    case 'String':
      type = tString
      break
    case 'Bool':
      type = tBool
      break
    case undefined:
    case null:
      type = tUndef
      break
    default:
      typeErrors.push(new UnknownTypeError(node, TYPE))
  }
  return type
}

function isEqual(array1: any[], array2: any[]) {
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

/* tslint:disable cyclomatic-complexity */
function infer(
  node: TypeAnnotatedNode<es.Node>,
  env: Env,
  constraints: Constraint[],
  isTopLevelAndLastValStmt: boolean = false
): Constraint[] {
  try {
    //Debug
    // console.log("Type ENV >>>")
    // console.log(env)
    // console.log("Constraint List >>>")
    // console.log(constraints)
    // console.log('Infer Type >>>')
    // console.log(node)

    return _infer(node, env, constraints, isTopLevelAndLastValStmt)
  } catch (e) {
    if (e instanceof InternalCyclicReferenceError) {
      typeErrors.push(new CyclicReferenceError(node))
      return constraints
    }
    throw e
  }
}

/* tslint:disable cyclomatic-complexity */
function _infer(
  node: TypeAnnotatedNode<es.Node>,
  env: Env,
  constraints: Constraint[],
  isTopLevelAndLastValStmt: boolean = false
): Constraint[] {
  const storedType = node.inferredType as Variable
  switch (node.type) {
    case 'UnaryExpression': {
      const op = node.operator === '-' ? NEGATIVE_OP : node.operator
      const envType = lookupType(op, env)!
      const funcType =
        envType.kind === 'forall'
          ? (extractFreeVariablesAndGenFresh(envType) as FunctionType)
          : (envType as FunctionType) // in either case its a monomorphic type
      const argNode = node.argument as TypeAnnotatedNode<es.Node>
      const argType = argNode.inferredType as Variable
      const receivedTypes: Type[] = []
      let newConstraints = infer(argNode, env, constraints)
      receivedTypes.push(applyConstraints(argNode.inferredType!, newConstraints))
      try {
        newConstraints = addToConstraintList(newConstraints, [tFunc(argType, storedType), funcType])
      } catch (e) {
        if (e instanceof UnifyError) {
          const expectedTypes = funcType.parameterTypes
          typeErrors.push(
            new InvalidArgumentTypesError(node, [argNode], expectedTypes, receivedTypes)
          )
          return newConstraints
        }
      }
      return newConstraints
    }
    case 'LogicalExpression': // both cases are the same
    case 'BinaryExpression': {
      const envType = lookupType(node.operator, env)!
      const opType = envType.kind === 'forall' ? extractFreeVariablesAndGenFresh(envType) : envType
      const leftNode = node.left as TypeAnnotatedNode<es.Node>
      const leftType = leftNode.inferredType as Variable
      const rightNode = node.right as TypeAnnotatedNode<es.Node>
      const rightType = rightNode.inferredType as Variable

      const argNodes = [leftNode, rightNode]
      let newConstraints = constraints
      const receivedTypes: Type[] = []
      argNodes.forEach(argNode => {
        newConstraints = infer(argNode, env, newConstraints)
        receivedTypes.push(applyConstraints(argNode.inferredType!, newConstraints))
      })
      try {
        newConstraints = addToConstraintList(constraints, [
          tFunc(leftType, rightType, storedType),
          opType
        ])
      } catch (e) {
        if (e instanceof UnifyError) {
          const expectedTypes = (opType as FunctionType).parameterTypes
          typeErrors.push(
            new InvalidArgumentTypesError(node, argNodes, expectedTypes, receivedTypes)
          )
        }
      }
      return newConstraints
    }
    case 'ExpressionStatement': {
      return infer(node.expression, env, addToConstraintList(constraints, [storedType, tUndef]))
    }
    case 'ReturnStatement': {
      const argNode = node.argument as TypeAnnotatedNode<es.Expression>
      infer(node.argument!, env, constraints)

      //Debug
      // console.log('INFER RTN Stmt')
      // console.log(argNode)
      // console.log(storedType)
      // console.log(argNode.inferredType)

      return addToConstraintList(constraints, [storedType, argNode.inferredType!])
    }
    case 'WhileStatement':
      throw Error('Return statements not supported for x-slang')
    case 'ForStatement':
      throw Error('Return statements not supported for x-slang')
    case 'BlockStatement': {
      let newConstraints = addToConstraintList(constraints, [storedType, tUndef])
      for (let i = 0; i < node.body.length; i++) {
        newConstraints = infer(node.body[i], env, newConstraints)
      }
      return newConstraints
    }
    case 'Program': {
      pushEnv(env)
      const lastStatementIndex = node.body.length - 1
      const returnValNodeIndex = returnBlockValueNodeIndexFor(node, isTopLevelAndLastValStmt)
      const lastDeclNodeIndex = -1
      const lastNode = node.body[returnValNodeIndex] as TypeAnnotatedNode<es.Node>
      const lastNodeType = (isTopLevelAndLastValStmt && lastNode.type === 'ExpressionStatement'
        ? (lastNode.expression as TypeAnnotatedNode<es.Node>).inferredType
        : lastNode.inferredType) as Variable

      //Type of a program is the type of its last node
      let newConstraints = addToConstraintList(constraints, [storedType, lastNodeType])

      for (let i = 0; i <= lastDeclNodeIndex; i++) {
        if (i === returnValNodeIndex) {
          newConstraints = infer(node.body[i], env, newConstraints, isTopLevelAndLastValStmt)
        } else {
          newConstraints = infer(node.body[i], env, newConstraints)
        }
      }
      for (let i = lastDeclNodeIndex + 1; i <= lastStatementIndex; i++) {
        // for the last statement, if it is an if statement, pass down isLastStatementinBlock variable
        const checkedNode = node.body[i]
        if (i === returnValNodeIndex) {
          newConstraints = infer(checkedNode, env, newConstraints, isTopLevelAndLastValStmt)
        } else {
          newConstraints = infer(checkedNode, env, newConstraints)
        }
      }
      return newConstraints
    }
    case 'Literal': {
      const literalVal = node.value
      const typeOfLiteral = typeof literalVal
      if (literalVal === null) {
        return addToConstraintList(constraints, [storedType, tList(tVar(typeIdCounter++))])
      } else if (typeOfLiteral === 'number') {
        if (node.raw?.includes('.') === false) {
          //Debug
          // console.log("HERE 0329")

          return addToConstraintList(constraints, [storedType, tInt])
        } else {
          return addToConstraintList(constraints, [storedType, tDouble])
        }
      } else if (typeOfLiteral === 'boolean') {
        return addToConstraintList(constraints, [storedType, tBool])
      } else if (typeOfLiteral === 'string') {
        return addToConstraintList(constraints, [storedType, tString])
      }
      throw Error('Unexpected literal type')
    }
    case 'Identifier': {
      const idType = lookupType(node.name, env) as Type

      //Debug
      // console.log("IDentifIER!!!!!!")
      // console.log(idType)

      return addToConstraintList(constraints, [storedType, idType])

      // throw Error('Identifiers not supported for x-slang')
    }
    case 'ConditionalExpression': // both cases are the same
      throw Error('Conditional expressions not supported for x-slang')
    case 'IfStatement': {
      let newConstraints = addToConstraintList(constraints, [storedType, tUndef])
      newConstraints = infer(node.test, env, newConstraints)
      newConstraints = infer(node.consequent, env, newConstraints)
      if (node.alternate) {
        newConstraints = infer(node.alternate, env, newConstraints)
      }
      return newConstraints
    }
    case 'ArrowFunctionExpression':
      throw Error('Arrow functions not supported for x-slang')
    case 'VariableDeclaration': {
      const v_nameNode = node.declarations[0].id as es.Identifier
      const v_name = v_nameNode.name
      const vDType = node.kind

      const lastEnvID = env.length - 1

      const newConstraints = addToConstraintList(constraints, [storedType, tUndef])
      if (node.declarations[0].init === undefined) {
        // Primitive Type Declaration
        const v_type = node.declarations[0].TYPE
        const vType = getType(node, v_type)

        env[lastEnvID].typeMap.set(v_name, vType)
        env[lastEnvID].declKindMap.set(v_name, vDType)

        return newConstraints
      } else if (node.declarations[0].init!.type === 'CallExpression') {
        // This is a class
        const CallNode = node.declarations[0].init! as es.CallExpression
        const CalleeNode = CallNode.callee as es.Identifier
        const c_name = CalleeNode.name as string
        const cType = lookupType(c_name, env) as ClassType

        env[lastEnvID].typeMap.set(v_name, cType)
        env[lastEnvID].declKindMap.set(v_name, vDType)

        return newConstraints
      } else {
        // Primitive Value Declaration
        infer(node.declarations[0].init!, env, newConstraints)

        const initNode = node.declarations[0].init as TypeAnnotatedNode<es.Expression>
        const vType = initNode.inferredType
        env[lastEnvID].typeMap.set(v_name, vType!)
        env[lastEnvID].declKindMap.set(v_name, vDType)

        return newConstraints
        // return infer(node.declarations[0].init!, env, ))
      }
    }
    case 'FunctionDeclaration': {
      //Debug
      console.log('[TYPE CHECK FUNC DECLARE]')

      const f_nameNode = node.id as es.Identifier
      const f_name = f_nameNode.name
      const RTN_Type = node.TYPE
      const RTNType = getType(node, RTN_Type)
      const param_names = []
      const Types = []

      for (let i = 0; i < node.params.length; i++) {
        const param = node.params[i] as es.Identifier
        param_names.push(param.name)
        const p_type = param.TYPE
        const pType = getType(node, p_type)
        Types.push(pType)
      }
      Types.push(RTNType)

      let newConstraints = addToConstraintList(constraints, [storedType, tUndef])

      const lastEnvID = env.length - 1

      const fType = tFunc(...Types)
      fType.parameterNames = param_names

      env[lastEnvID].typeMap.set(f_name, fType)

      pushEnv(env)
      for (let i = 0; i < Types.length; i++) {
        env[env.length - 1].typeMap.set(param_names[i], Types[i])
        env[env.length - 1].declKindMap.set(param_names[i], 'var')
      }
      newConstraints = infer(node.body, env, constraints)
      env.pop()

      if (RTNType.name !== 'Undefined' && statementHasReturn(node.body)) {
        //Debug
        console.log('CHECKING RTN TYPE')

        statementReturnTypeCheck(node.body, RTNType, constraints)
      }

      return newConstraints
    }
    case 'ProtocolDeclaration': {
      const name = node.id!.name
      const requirements = node.body.body
      const PropNames = []
      const PropTypes = []
      const PropDTypes = []
      const Get = []
      const Set = []
      for (let i = 0; i < requirements.length; i++) {
        const requirement = requirements[i]
        if (requirement.type === 'PropertyRequirement') {
          PropNames.push(requirement.key.name)
          PropTypes.push(getType(node, requirement.TYPE))
          PropDTypes.push(requirement.kind)
          Get.push(requirement.get)
          Set.push(requirement.set)
        } else {
          // TODO: Method Requirement
        }
      }

      const newProtocol = tProtocol(PropNames, PropTypes, PropDTypes, Get, Set)

      //Debug
      // console.log("[PROTOCOL DEC TYPE CHECK]")
      // console.log(newProtocol)

      env[env.length - 1].typeMap.set(name, newProtocol)

      return constraints
    }
    case 'ClassDeclaration': {
      //Debug
      // console.log('TYPE CHK Class Decl')

      const name = node.id!.name
      const storPropNames = []
      const storPropTypes = []
      const compProps = []
      const compPropNames = []
      const compPropTypes = []

      //TypeCheck & Register Stored Property
      pushEnv(env)
      for (let i = 0; i < node.body.body.length; i++) {
        if (node.body.body[i].type === 'PropertyDefinition') {
          const bodyNode = node.body.body[i] as TypeAnnotatedNode<es.PropertyDefinition>
          infer(bodyNode, env, constraints)
          const p_name = bodyNode.key.name
          const p_Type = applyConstraints(bodyNode.inferredType!, constraints)
          const p_DType = bodyNode.kind
          storPropNames.push(p_name)
          storPropTypes.push(p_Type)

          env[env.length - 1].typeMap.set(p_name, p_Type) // Register to the class env
          env[env.length - 1].declKindMap.set(p_name, p_DType)
          break
        }
      }

      //Typecheck Computed Property and Methods
      for (let i = 0; i < node.body.body.length; i++) {
        switch (node.body.body[i].type) {
          case 'PropertyDefinition':
            break //skip for stored property
          case 'MethodDefinition':
            //TODO: Method type registration
            break
          case 'CompPropDeclaration':
            const compNode = node.body.body[i] as TypeAnnotatedNode<es.CompPropDeclaration>
            infer(compNode, env, constraints)
            const cp_name = compNode.key.name
            const cp_Type = applyConstraints(compNode.inferredType!, constraints)
            compPropNames.push(cp_name)
            compPropTypes.push(cp_Type)
            compProps.push(compNode)
            break
        }
      }
      env.pop()

      //Protocol Check
      if (node.superClass !== null) {
        const protocolName = (<es.Identifier>node.superClass).name
        const protocolType = lookupType(protocolName, env) as Protocol

        //Check Properties
        for (let i = 0; i < protocolType.PropNames.length; i++) {
          const propName = protocolType.PropNames[i]
          const propType = protocolType.PropTypes[i]
          // const propDType = protocolType.PropDTypes[i]
          const Get = protocolType.Get[i]
          const Set = protocolType.Set[i]

          //Check stored properties
          let p_index = storPropNames.indexOf(propName)
          if (p_index !== -1) {
          } else {
            // Check computed properties
            p_index = compPropNames.indexOf(propName)
            if (p_index !== -1) {
              const compProp = compProps[p_index]
              const compPropBody = compProp.body.body as es.FunctionDeclaration[]
              let has_get = false
              let has_set = false
              for (let i = 0; i < compPropBody.length; i++) {
                const f = compPropBody[i]
                if (f.id!.name === 'get') {
                  has_get = true
                } else if (f.id!.name === 'set') {
                  has_set = true
                }
              }
              if (has_get === false && Get === true) {
                typeErrors.push(new MissingGetterError(compProp, name, protocolName, propName))
              }

              if (has_set === false && Set === true) {
                typeErrors.push(new MissingSetterError(compProp, name, protocolName, propName))
              }
            } else {
              typeErrors.push(new MissingPropError(node, name, protocolName, propName, propType))
            }
          }
        }
      }

      const classType = tClass(name, storPropNames, storPropTypes, compPropNames, compPropTypes)

      env[env.length - 1].typeMap.set(name, classType)

      return constraints
    }
    case 'PropertyDefinition': {
      if (node.value !== null) {
        const value = node.value as TypeAnnotatedNode<es.Expression>
        infer(value, env, constraints)
        return addToConstraintList(constraints, [storedType, value.inferredType!])
      } else {
        //TODO: What if it is a type declaration
      }

      return constraints
    }
    case 'CompPropDeclaration': {
      const Type = getType(node, node.TYPE)

      let newConstraints = addToConstraintList(constraints, [storedType, Type])

      for (let i = 0; i < node.body.body.length; i++) {
        const fNode = node.body.body[i] as es.FunctionDeclaration
        newConstraints = infer(fNode, env, constraints)
      }

      return newConstraints
    }
    case 'CallExpression': {
      const f_calleeNode = node.callee as es.Identifier
      const f_name = f_calleeNode.name
      const fType = lookupType(f_name, env)!

      if (fType.kind === 'function') {
        const paramNames = fType.parameterNames!
        const paramTypes = fType.parameterTypes
        const fRTNType = fType.returnType

        // let argValues = []
        const arg_types: Type[] = []
        const argNames = []

        for (let i = 0; i < node.arguments.length; i++) {
          const arg = node.arguments[i] as es.Identifier
          argNames.push(arg.name)

          const arg_value = arg.VALUE as TypeAnnotatedNode<es.Expression>
          infer(arg_value, env, constraints)
          // argValues.push(arg_value)
          arg_types.push(arg_value.inferredType!)
        }

        arg_types.push(fRTNType)
        const argTypes = tFunc(...arg_types)

        let newConstraints = constraints

        if (argNames.length !== paramNames.length) {
          typeErrors.push(
            new DifferentNumberArgumentsError(node, paramNames.length, argNames.length)
          )
        } else if (isEqual(argNames, paramNames)) {
          try {
            newConstraints = addToConstraintList(constraints, [argTypes, fType])
          } catch (e) {
            if (e instanceof UnifyError) {
              typeErrors.push(
                new InvalidArgumentTypesError(
                  node,
                  node.arguments,
                  paramTypes,
                  argTypes.parameterTypes.map(pType => applyConstraints(pType, constraints))
                )
              )
            }
          }
        } else {
          typeErrors.push(new IncorrectArgumentsLabelError(node, argNames, paramNames))
        }

        newConstraints = addToConstraintList(constraints, [storedType, fRTNType])

        return newConstraints
      } else {
        // fType.kind === 'class'
        return addToConstraintList(constraints, [storedType, fType as ClassType])
      }
    }
    case 'AssignmentExpression': {
      let newConstraints = addToConstraintList(constraints, [storedType, tUndef])
      newConstraints = infer(node.left, env, newConstraints)
      newConstraints = infer(node.right, env, newConstraints)

      const leftNode = node.left as TypeAnnotatedNode<es.Node>
      const leftType = leftNode.inferredType!
      const rightNode = node.right as TypeAnnotatedNode<es.Node>
      const rightType = rightNode.inferredType!

      try {
        newConstraints = addToConstraintList(constraints, [leftType, rightType])
      } catch (e) {
        if (e instanceof UnifyError) {
          const leftType_received = applyConstraints(leftType, newConstraints)!
          const rightType_received = applyConstraints(rightType, newConstraints)!

          typeErrors.push(new AssignmentTypeError(node, leftType_received, rightType_received))
        }
      }

      return newConstraints
      // throw Error('Assignment expressions not supported for x-slang')
    }
    case 'ArrayExpression':
      throw Error('Array expressions not supported for x-slang')
    case 'MemberExpression': {
      //Debug
      // console.log('TYPE CHK Mem Decl')

      const ObjNode = node.object as es.Identifier
      const obj_name = ObjNode.name as string
      const PropNode = node.property as es.Identifier
      const prop_name = PropNode.name as string
      const objType = lookupType(obj_name, env) as ClassType

      let p_Type: Type = tUndef

      //Check Stored Property
      const storPropNames = objType.storPropNames!
      let p_index = storPropNames.indexOf(prop_name)
      if (p_index === -1) {
        // Check Computed Property
        const compPropNames = objType.compPropNames!
        p_index = compPropNames.indexOf(prop_name)

        // if (p_index === -1) TODO: Check Method
        // else

        const compPropTypes = objType.compPropTypes
        p_Type = compPropTypes[p_index]
      } else {
        const storPropTypes = objType.storPropTypes
        p_Type = storPropTypes[p_index]
      }

      return addToConstraintList(constraints, [storedType, p_Type])
    }
    default:
      return addToConstraintList(constraints, [storedType, tUndef])
  }
}

// =======================================
// Private Helper Parsing Functions
// =======================================

function tPrimitive(name: Primitive['name']): Primitive {
  return {
    kind: 'primitive',
    name
  }
}

export function tVar(name: string | number): Variable {
  return {
    kind: 'variable',
    name: `T${name}`,
    constraint: 'none'
  }
}

function tAddable(name: string): Variable {
  return {
    kind: 'variable',
    name: `${name}`,
    constraint: 'addable'
  }
}

function tPair(var1: Type, var2: Type): Pair {
  return {
    kind: 'pair',
    headType: var1,
    tailType: var2
  }
}

function tList(var1: Type): List {
  return {
    kind: 'list',
    elementType: var1
  }
}

export function tForAll(type: Type): ForAll {
  return {
    kind: 'forall',
    polyType: type
  }
}

const tBool = tPrimitive('Bool')
const tInt = tPrimitive('Int')
const tDouble = tPrimitive('Double')
const tString = tPrimitive('String')
const tUndef = tPrimitive('Undefined')

function tFunc(...types: Type[]): FunctionType {
  const parameterTypes = types.slice(0, -1)
  const returnType = types.slice(-1)[0]
  return {
    kind: 'function',
    parameterTypes,
    returnType
  }
}

function tClass(
  className: string,
  storPropNames: string[],
  storPropTypes: Type[],
  compPropNames: string[],
  compPropTypes: Type[]
): ClassType {
  return {
    kind: 'class',
    name: className,
    storPropNames,
    storPropTypes,
    compPropNames,
    compPropTypes
  }
}

function tProtocol(
  PropNames: string[],
  PropTypes: Type[],
  PropDTypes: string[],
  Get: boolean[],
  Set: boolean[]
): Protocol {
  return {
    kind: 'protocol',
    PropNames,
    PropTypes,
    PropDTypes,
    Get,
    Set
  }
}

const predeclaredNames: [string, Type | ForAll][] = []

const primitiveFuncs: [string, Type | ForAll][] = [
  [NEGATIVE_OP, tForAll(tFunc(tAddable('A'), tAddable('A')))],
  ['!', tFunc(tBool, tBool)],
  ['&&', tForAll(tFunc(tBool, tVar('T'), tVar('T')))],
  ['||', tForAll(tFunc(tBool, tVar('T'), tVar('T')))],
  ['<', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['<=', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['>', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['>=', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['!=', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['==', tForAll(tFunc(tAddable('A'), tAddable('B'), tBool))],
  ['+', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))],
  ['%', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))],
  ['-', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))],
  ['*', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))],
  ['/', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))],
  ['^', tForAll(tFunc(tAddable('A'), tAddable('B'), tAddable('C')))]
]

export function createTypeEnvironment(): Env {
  const initialTypeMappings = [...predeclaredNames, ...primitiveFuncs]

  return [
    {
      typeMap: new Map(initialTypeMappings),
      declKindMap: new Map(initialTypeMappings.map(val => [val[0], 'const']))
    }
  ]
}
