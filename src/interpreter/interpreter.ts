/* tslint:disable:max-classes-per-file */
import * as es from 'estree'
import * as constants from '../constants'
import * as errors from '../errors/errors'
import { RuntimeSourceError } from '../errors/runtimeSourceError'
import { Context, Environment, Frame, Value } from '../types'
import {
    evaluateBinaryExpression,
    evaluateLogicalExpression,
    evaluateUnaryExpression
} from '../utils/operators'
// import { primitive } from '../utils/astCreator'
import * as rttc from '../utils/rttc'
import Closure from './closure'

class BreakValue {}

class ContinueValue {}

class ReturnValue {
  constructor(public value: Value) {}
}

class TailCallReturnValue {
  constructor(public callee: Closure, public args: Value[], public node: es.CallExpression) {}
}

class Thunk {
  public value: Value
  public isMemoized: boolean
  constructor(public exp: es.Node, public env: Environment) {
    this.isMemoized = false
    this.value = null
  }
}

function* forceIt(val: any, context: Context): Value {
  if (val instanceof Thunk) {
    if (val.isMemoized) return val.value

    pushEnvironment(context, val.env)
    const evalRes = yield* actualValue(val.exp, context)
    popEnvironment(context)
    val.value = evalRes
    val.isMemoized = true
    return evalRes
  } else return val
}

export function* actualValue(exp: es.Node, context: Context): Value {
  const evalResult = yield* evaluate(exp, context)
  const forced = yield* forceIt(evalResult, context)
  return forced
}

const createEnvironment = (
  closure: Closure,
  args: Value[],
  callExpression?: es.CallExpression
): Environment => {
  const environment: Environment = {
    name: closure.functionName,
    tail: closure.environment,
    head: {}
  }
  if (callExpression) {
    environment.callExpression = {
      ...callExpression
      // arguments: args.map(primitive)
    }
  }
  closure.node.params.forEach((param, index) => {
    const ident = param as es.Identifier
    environment.head[ident.name] = args[index]
  })
  return environment
}

const createFunctionEnvironment = (
  functionName: string,
  arg_ids: Value[],
  args: Value[],
  context: Context
): Environment => {
  const environment: Environment = {
    name: functionName,
    tail: currentEnvironment(context),
    head: {}
  }

  //Debug
  // console.log("CREATE FUNC ENV")
  // console.log(arg_ids)
  // console.log(args)

  for (let i = 0; i < arg_ids.length; i++) {
    environment.head[arg_ids[i].name] = args[i]
  }
  return environment
}

const createBlockEnvironment = (
  context: Context,
  name = 'blockEnvironment',
  head: Frame = {}
): Environment => {
  return {
    name,
    tail: currentEnvironment(context),
    head
  }
}

const handleRuntimeError = (context: Context, error: RuntimeSourceError): never => {
  context.errors.push(error)
  context.runtime.environments = context.runtime.environments.slice(
    -context.numberOfOuterEnvironments
  )
  throw error
}

const DECLARED_BUT_NOT_YET_ASSIGNED = Symbol('Used to implement hoisting')

function get_type(value: any) {
  let v_type = ''
  switch (typeof value) {
    case 'number':
      if (value % 1 === 0) {
        v_type = 'Int'
      } else {
        v_type = 'Double'
      }
      break
    case 'string':
      v_type = 'String'
      break
    case 'boolean':
      v_type = 'Bool'
      break
  }
  return v_type
}

function declareIdentifier(context: Context, name: string, node: es.Node) {
  const environment = currentEnvironment(context)
  if (environment.head.hasOwnProperty(name)) {
    const descriptors = Object.getOwnPropertyDescriptors(environment.head)

    return handleRuntimeError(
      context,
      new errors.VariableRedeclaration(node, name, descriptors[name].writable)
    )
  }
  environment.head[name] = DECLARED_BUT_NOT_YET_ASSIGNED

  //Debug
  // console.log("Declaring variables...")
  // console.log(environment)

  return environment
}

function declareVariables(context: Context, node: es.VariableDeclaration) {
  for (const declaration of node.declarations) {
    declareIdentifier(context, (declaration.id as es.Identifier).name, node)
  }
}

function declareFunctionsAndVariables(context: Context, node: es.BlockStatement) {
  for (const statement of node.body) {
    switch (statement.type) {
      case 'VariableDeclaration':
        declareVariables(context, statement)
        break
      case 'FunctionDeclaration':
        declareIdentifier(context, (statement.id as es.Identifier).name, statement)
        break
      case 'ClassDeclaration':
        declareIdentifier(context, (statement.id as es.Identifier).name, statement)
        break
      case 'ProtocolDeclaration':
          declareIdentifier(context, (statement.id as es.Identifier).name, statement)
          break
    }
  }
}

function assignVariables(context: Context, name: string, value: any, node: es.Node) {
  const environment = currentEnvironment(context)
  if (environment.head.hasOwnProperty(name)) {
    if (typeof environment.head[name] !== 'symbol') {
      const v_type = get_type(value)
      const i_type = environment.head[name]['TYPE']
      if (v_type !== i_type) {
        return handleRuntimeError(
          context,
          new errors.TypeAssignmentError(node, name, i_type, v_type)
        )
      }

      const i_mutable = environment.head[name]['mutable']
      const i_value = environment.head[name]['value']
      if (i_mutable === false && i_value !== undefined) {
        return handleRuntimeError(context, new errors.ConstAssignment(node, name))
      }

      environment.head[name]['value'] = value
    } else {
      // First-time initialization
      environment.head[name] = value
    }
  } else {
    return handleRuntimeError(context, new errors.UndefinedVariable(name, node))
  }

  return environment
}

function evaluateIdentifier(context: Context, name: string, node: es.Node) {
  let environment = currentEnvironment(context)
  while (environment.tail !== null 
    && (!environment.head.hasOwnProperty(name))) {
      environment = environment.tail
    }
  
  if (environment.head.hasOwnProperty(name)) {
    //Debug
    // console.log(environment.head[name])

    if (typeof environment.head[name] === 'symbol') {
      return handleRuntimeError(context, new errors.UnassignedVariable(name, node))
    } else {
      if (environment.head[name]['value'] === undefined) {
        return handleRuntimeError(
          context,
          new errors.UndefinedError(node, name, environment.head[name])
        )
      } else {
        if (environment.head[name]['TYPE'] == 'Function') {
          return environment.head[name]
        } else {
          return environment.head[name]['value']
        }
      }
    }
  } else {
    return handleRuntimeError(context, new errors.UndefinedVariable(name, node))
  }
}

function* visit(context: Context, node: es.Node) {
  context.runtime.nodes.unshift(node)
  yield context
}

function* leave(context: Context) {
  context.runtime.nodes.shift()
  yield context
}

const currentEnvironment = (context: Context) => context.runtime.environments[0]
const replaceEnvironment = (context: Context, environment: Environment) =>
  (context.runtime.environments[0] = environment)
const popEnvironment = (context: Context) => context.runtime.environments.shift()
const pushEnvironment = (context: Context, environment: Environment) =>
  context.runtime.environments.unshift(environment)

const checkNumberOfArguments = (
  context: Context,
  callee: Closure | Value,
  args: Value[],
  exp: es.CallExpression
) => {
  if (callee instanceof Closure) {
    if (callee.node.params.length !== args.length) {
      return handleRuntimeError(
        context,
        new errors.InvalidNumberOfArguments(exp, callee.node.params.length, args.length)
      )
    }
  } else {
    if (callee.hasVarArgs === false && callee.length !== args.length) {
      return handleRuntimeError(
        context,
        new errors.InvalidNumberOfArguments(exp, callee.length, args.length)
      )
    }
  }
  return undefined
}

export type Evaluator<T extends es.Node> = (node: T, context: Context) => IterableIterator<Value>

function* evaluateBlockSatement(context: Context, node: es.BlockStatement) {
  //Debug
  // console.log("[Block] start eval statements")

  declareFunctionsAndVariables(context, node)

  //Debug
  // console.log("[Block] start eval statements")

  let result
  for (const statement of node.body) {
    //Debug
    // console.log("[Block] eval statement")

    result = yield* evaluate(statement, context)

    //Debug
    // console.log(result)

    if (
      result instanceof ReturnValue ||
      result instanceof TailCallReturnValue ||
      result instanceof BreakValue ||
      result instanceof ContinueValue
    ) {
      break
    }
  }
  return result
}

/**
 * WARNING: Do not use object literal shorthands, e.g.
 *   {
 *     *Literal(node: es.Literal, ...) {...},
 *     *ThisExpression(node: es.ThisExpression, ..._ {...},
 *     ...
 *   }
 * They do not minify well, raising uncaught syntax errors in production.
 * See: https://github.com/webpack/webpack/issues/7566
 */
// tslint:disable:object-literal-shorthand
// prettier-ignore
// Mapped Types
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content
export const evaluators: { [nodeType: string]: Evaluator<es.Node> } = {
    /** Simple Values */
    Literal: function*(node: es.Literal, context: Context) {
        return node.value
    },

    TemplateLiteral: function*(node: es.TemplateLiteral) {
        // Expressions like `${1}` are not allowed, so no processing needed
        return node.quasis[0].value.cooked
    },

    ThisExpression: function*(node: es.ThisExpression, context: Context) {
        return context.runtime.environments[0].thisContext
    },

    ArrayExpression: function*(node: es.ArrayExpression, context: Context) {
        throw new Error("Array expressions not supported in x-slang");
    },

    DebuggerStatement: function*(node: es.DebuggerStatement, context: Context) {
        yield
    },

    FunctionExpression: function*(node: es.FunctionExpression, context: Context) {
        throw new Error("Function expressions not supported in x-slang");
    },

    ArrowFunctionExpression: function*(node: es.ArrowFunctionExpression, context: Context) {
        throw new Error("Arrow functions expressions not supported in x-slang");
    },

    Identifier: function*(node: es.Identifier, context: Context) {
        //Debug
        // console.log("Identifier!")
        const name = node.name
        return evaluateIdentifier(context, name, node)

        // throw new Error("Variables not supported in x-slang");
    },

    CallExpression: function*(node: es.CallExpression, context: Context) {
        const environment = currentEnvironment(context)
        const callee_name = (<es.Identifier>node.callee).name
        if(environment.head[callee_name]['TYPE'] == "Class") {
            return environment.head[callee_name].value.body
        } else {
            const callee = yield* evaluate(node.callee, context)
            const args = node.arguments

            //Debug
            // console.log(callee)

            let arg_variables = []
            for (let i = 0; i < args.length; i++) {
              const arg_value = yield* evaluate(args[i].VALUE!, context)
              const real_value = {
                "type": "Literal",
                "mutable": true,
                "TYPE": get_type(arg_value),
                "value": arg_value
              }
              arg_variables.push(real_value)
            }

            const env = createFunctionEnvironment(callee_name, callee.params, arg_variables, context)
            pushEnvironment(context, env)

            //Debug
            // console.log("CallExpression")
            // console.log(currentEnvironment(context))

            let result = yield* evaluate(callee.value, context)
            popEnvironment(context)

            if (result instanceof ReturnValue) {
              result = result.value
            } else {
              result = null
            }

            return result
        }
    },

    NewExpression: function*(node: es.NewExpression, context: Context) {
        const callee = yield* evaluate(node.callee, context)
        const args = []
        for (const arg of node.arguments) {
            args.push(yield* evaluate(arg, context))
        }
        const obj: Value = {}
        if (callee instanceof Closure) {
            obj.__proto__ = callee.fun.prototype
            callee.fun.apply(obj, args)
        } else {
            obj.__proto__ = callee.prototype
            callee.apply(obj, args)
        }
        return obj
    },

    UnaryExpression: function*(node: es.UnaryExpression, context: Context) {
        const value = yield* actualValue(node.argument, context)

        const error = rttc.checkUnaryExpression(node, node.operator, value)
        if (error) {
            return handleRuntimeError(context, error)
        }
        return evaluateUnaryExpression(node.operator, value)
    },

    BinaryExpression: function*(node: es.BinaryExpression, context: Context) {
        const left = yield* actualValue(node.left, context)
        const right = yield* actualValue(node.right, context)
        const error = rttc.checkBinaryExpression(node, node.operator, left, right)
        if (error) {
            return handleRuntimeError(context, error)
        }
        return evaluateBinaryExpression(node.operator, left, right)
    },

    ConditionalExpression: function*(node: es.ConditionalExpression, context: Context) {
        throw new Error("Conditional expressions not supported in x-slang");
    },

    LogicalExpression: function*(node: es.LogicalExpression, context: Context) {
        const left = yield* actualValue(node.left, context)
        const right = yield* actualValue(node.right, context)
        //TODO make check work with logical expressions
        /*
        const error = rttc.checkBinaryExpression(node, node.operator, left, right)
        if (error) {
            return handleRuntimeError(context, error)
        }
         */
        return evaluateLogicalExpression(node.operator, left, right)
    },

    VariableDeclaration: function*(node: es.VariableDeclaration, context: Context) {
        //Debug
        // console.log("[VariableDecla] !")

        const kind = node.kind
        let mutable = true
        switch (kind) {
          case "let":
            mutable = false
            break
          case "var":
            mutable = true
            break
        } 

        for (const declaration of node.declarations) {
          const name = (<es.Identifier>declaration.id).name
          let value = declaration.init
          let type = declaration.TYPE

          if (value !== undefined) {
            value = yield* evaluate(<es.Expression>value, context)
            type = get_type(value)
          }

          const real_value = {
            "type": "Literal",
            "mutable": mutable,
            "TYPE": type,
            "value": value
          }

          //Debug
          // console.log("REAL_VALUE")
          // console.log(real_value)

          assignVariables(context, name, real_value, node)
        }

        return null;
        // throw new Error("Variable declarations not supported in x-slang");
    },

    ContinueStatement: function*(node: es.ContinueStatement, context: Context) {
        throw new Error("Continue statements not supported in x-slang");
    },

    BreakStatement: function*(node: es.BreakStatement, context: Context) {
        throw new Error("Break statements not supported in x-slang");
    },

    ForStatement: function*(node: es.ForStatement, context: Context) {
        // Create a new block scope for the loop variables
        throw new Error("For statements not supported in x-slang");
    },

    MemberExpression: function*(node: es.MemberExpression, context: Context) {
        const environment = currentEnvironment(context)
        const object_name = (<es.Identifier>node.object).name
        const property_name = (<es.Identifier>node.property).name
        const properties = environment.head[object_name].value

        for (let i = 0; i < properties.length; i++) {
            if (properties[i].key.name == property_name) {
                return properties[i].value.value
            }
        }
        return null
    },

    AssignmentExpression: function*(node: es.AssignmentExpression, context: Context) {
        //Debug
        // console.log("Assignment");

        const name = (<es.Identifier>node.left).name
        const value = yield* evaluate(node.right, context)

        //Debug
        // console.log(value)
        
        assignVariables(context, name, value, node)

        return null;
    },

    FunctionDeclaration: function*(node: es.FunctionDeclaration, context: Context) {
        //Debug
        // console.log("FUNC DECLARE")
        
        const name = (<es.Identifier>node.id).name
        const real_value = {
          "type": "BlockStatement",
          "mutable": false,
          "TYPE": "Function",
          "params": node.params,
          "value": node.body
        }

        assignVariables(context, name, real_value, node);

        return null;
        // throw new Error("Function declarations not supported in x-slang");
    },

    ClassDeclaration: function*(node: es.ClassDeclaration, context: Context) {
        const name = (<es.Identifier>node.id).name
        const superClass = (<es.Identifier>node.superClass).name
        const real_value = {
            "type": "ClassBody",
            "TYPE": "Class",
            "value": node.body,
            "superClass": superClass
        }
        assignVariables(context, name, real_value, node);

        return null;
    },

    ProtocolDeclaration: function*(node: es.ProtocolDeclaration, context: Context) {
        const name = (<es.Identifier>node.id).name

        const real_value = {
            "type": "ProtocolBody",
            "TYPE": "Protocol",
            "value": node.body
        }
        assignVariables(context, name, real_value, node);

        return null;
    },

    IfStatement: function*(node: es.IfStatement | es.ConditionalExpression, context: Context) {
        const test = yield* actualValue(node.test, context)
        let result;
        if (test == true ) {
            result = yield* evaluate(node.consequent, context);
        } else if (node.alternate != null) {
            result = yield* evaluate(node.alternate, context);
        } else {
            result = null
        }
        return result;
    },

    ExpressionStatement: function*(node: es.ExpressionStatement, context: Context) {
        return yield* evaluate(node.expression, context)
    },

    ReturnStatement: function*(node: es.ReturnStatement, context: Context) {

        const result = yield* evaluate(<es.Expression>node.argument, context)
        return new ReturnValue(result)
        // throw new Error("Return statements not supported in x-slang");
    },

    WhileStatement: function*(node: es.WhileStatement, context: Context) {
        throw new Error("While statements not supported in x-slang");
    },

    ObjectExpression: function*(node: es.ObjectExpression, context: Context) {
        throw new Error("Object expressions not supported in x-slang");
    },

    BlockStatement: function*(node: es.BlockStatement, context: Context) {
        const result = yield* evaluateBlockSatement(context, node)
        return result
    },

    ImportDeclaration: function*(node: es.ImportDeclaration, context: Context) {
        throw new Error("Import declarations not supported in x-slang");
    },

    Program: function*(node: es.BlockStatement, context: Context) {
        //Debug
        // console.log("[Program] Eval Program...")

        context.numberOfOuterEnvironments += 1
        const environment = createBlockEnvironment(context, 'programEnvironment')
        pushEnvironment(context, environment)

        //Debug
        // console.log("[Program] Start eval block")

        const result = yield* forceIt(yield* evaluateBlockSatement(context, node), context);

        //Debug
        // console.log("[Program] Program finished.")

        return result;
    },

    EmptyStatement: function*(node: es.EmptyStatement, context: Context) {
        return null;
    }
}
// tslint:enable:object-literal-shorthand

export function* evaluate(node: es.Node, context: Context) {
  //Debug
  // console.log('Evaluating...')
  // console.log(node)
  // console.log('>>>>>>>>>>')

  yield* visit(context, node)
  const result = yield* evaluators[node.type](node, context)
  yield* leave(context)
  return result
}

export function* apply(
  context: Context,
  fun: Closure | Value,
  args: (Thunk | Value)[],
  node: es.CallExpression,
  thisContext?: Value
) {
  let result: Value
  let total = 0

  while (!(result instanceof ReturnValue)) {
    if (fun instanceof Closure) {
      checkNumberOfArguments(context, fun, args, node!)
      const environment = createEnvironment(fun, args, node)
      if (result instanceof TailCallReturnValue) {
        replaceEnvironment(context, environment)
      } else {
        pushEnvironment(context, environment)
        total++
      }
      const bodyEnvironment = createBlockEnvironment(context, 'functionBodyEnvironment')
      bodyEnvironment.thisContext = thisContext
      pushEnvironment(context, bodyEnvironment)
      result = yield* evaluateBlockSatement(context, fun.node.body as es.BlockStatement)
      popEnvironment(context)
      if (result instanceof TailCallReturnValue) {
        fun = result.callee
        node = result.node
        args = result.args
      } else if (!(result instanceof ReturnValue)) {
        // No Return Value, set it as undefined
        result = new ReturnValue(undefined)
      }
    } else if (typeof fun === 'function') {
      checkNumberOfArguments(context, fun, args, node!)
      try {
        const forcedArgs = []

        for (const arg of args) {
          forcedArgs.push(yield* forceIt(arg, context))
        }

        result = fun.apply(thisContext, forcedArgs)
        break
      } catch (e) {
        // Recover from exception
        context.runtime.environments = context.runtime.environments.slice(
          -context.numberOfOuterEnvironments
        )

        const loc = node ? node.loc! : constants.UNKNOWN_LOCATION
        if (!(e instanceof RuntimeSourceError || e instanceof errors.ExceptionError)) {
          // The error could've arisen when the builtin called a source function which errored.
          // If the cause was a source error, we don't want to include the error.
          // However if the error came from the builtin itself, we need to handle it.
          return handleRuntimeError(context, new errors.ExceptionError(e, loc))
        }
        result = undefined
        throw e
      }
    } else {
      return handleRuntimeError(context, new errors.CallingNonFunctionValue(fun, node))
    }
  }
  // Unwraps return value and release stack environment
  if (result instanceof ReturnValue) {
    result = result.value
  }
  for (let i = 1; i <= total; i++) {
    popEnvironment(context)
  }
  return result
}
