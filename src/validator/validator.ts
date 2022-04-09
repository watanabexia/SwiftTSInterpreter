import { ancestor, base, FullWalkerCallback } from '../utils/walkers'
import * as es from 'estree'
import { Context, TypeAnnotatedNode } from '../types'
import { getVariableDecarationName } from '../utils/astCreator'
import {
  ParseMissingReturnError,
  ParseUnexpectedReturnError,
  ParseUnfoundError
} from '../errors/typeErrors'

class Declaration {
  public accessedBeforeDeclaration: boolean = false
  constructor(public isConstant: boolean) {}
}

export function validateAndAnnotate(
  program: es.Program,
  context: Context
): TypeAnnotatedNode<es.Program> {
  // const accessedBeforeDeclarationMap = new Map<es.Node, Map<string, Declaration>>()
  const DeclarationMap = new Map<es.Node, Map<string, Declaration>>()
  const scopeHasCallExpressionMap = new Map<es.Node, boolean>()

  function processBlock(node: es.Program | es.BlockStatement) {
    const initialisedIdentifiers = new Map<string, Declaration>()
    scopeHasCallExpressionMap.set(node, false)
    DeclarationMap.set(node, initialisedIdentifiers)
    // accessedBeforeDeclarationMap.set(node, initialisedIdentifiers)
  }

  function processFunction(node: es.FunctionDeclaration | es.ArrowFunctionExpression) {
    DeclarationMap.set(
      node,
      new Map((node.params as es.Identifier[]).map(id => [id.name, new Declaration(true)]))
    )
    DeclarationMap.get(node)?.set((<es.FunctionDeclaration>node).id!.name, new Declaration(true))

    //Debug
    // console.log("P FUNC VALID")
    // console.log(node)
    // console.log(DeclarationMap.get(node))

    // accessedBeforeDeclarationMap.set(
    //   node,
    //   new Map((node.params as es.Identifier[]).map(id => [id.name, new Declaration(false)]))
    // )

    scopeHasCallExpressionMap.set(node, false)
  }

  function processClass(node: es.ClassDeclaration) {
    DeclarationMap.set(node, new Map<string, Declaration>())
    DeclarationMap.get(node)?.set((<es.ClassDeclaration>node).id!.name, new Declaration(true))

    for (let i = 0; i < node.body.body.length; i++) {
      const PNode = node.body.body[i]
      if (PNode.type === 'PropertyDefinition') {
        const storPropName = PNode.key.name
        DeclarationMap.get(node)?.set(storPropName, new Declaration(true))
      }
    }
  }

  // initialise scope of variables
  /* There are four kinds of scopes, for each scope it will initialize two Maps. 
     For program and block, the two Maps are empty.
     For functions, the parameters are initialized as NOT accessed before declaration. 
  */

  const customWalker1 = {
    ...base,
    ProtocolDeclaration(node: es.ProtocolDeclaration, st: never, c: FullWalkerCallback<never>) {},
    ProtocolBody(node: es.ProtocolBody, st: never, c: FullWalkerCallback<never>) {
      // if (node.body) {
      //   for (let i = 0; i < node.body.length; i++) {
      //     c(node.body[i], st, node.body[i].type)
      //   }
      // }
    },
    ClassDeclaration(node: es.ClassDeclaration, st: never, c: FullWalkerCallback<never>) {
      if (node.body) {
        if (node.body.body) {
          for (let i = 0; i < node.body.body.length; i++) {
            c(node.body.body[i], st, node.body.body[i].type)
          }
        }
      }
    },
    PropertyDefinition(node: es.PropertyDefinition, st: never, c: FullWalkerCallback<never>) {},
    CompPropDeclaration(node: es.CompPropDeclaration, st: never, c: FullWalkerCallback<never>) {
      if (node.body) {
        c(node.body, st, 'BlockStatement')
      }
    }
  }

  ancestor(
    program as es.Node,
    {
      Program: processBlock,
      BlockStatement: processBlock,
      FunctionDeclaration: processFunction,
      ClassDeclaration: processClass,
      ArrowFunctionExpression: processFunction,
      ForStatement(forStatement: es.ForStatement, ancestors: es.Node[]) {}
    },
    customWalker1
  )

  function validateIdentifier(id: es.Identifier, ancestors: TypeAnnotatedNode<es.Node>[]) {
    const name = id.name
    let Found = false
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const a = ancestors[i]
      const map = DeclarationMap.get(a)
      if (map?.has(name)) {
        Found = true
      }
      // const map = accessedBeforeDeclarationMap.get(a)
      // if (map?.has(name)) {
      //   map.get(name)!.accessedBeforeDeclaration = true
      //   break
      // }
    }
    if (!Found) {
      context.errors.push(new ParseUnfoundError(ancestors[ancestors.length - 1], name))
    } else {
      // ancestors[ancestors.length - 1].typability = 'NotYetTyped'
    }
  }

  function getReturnStatement(node: es.Node): es.ReturnStatement | null {
    switch (node.type) {
      case 'IfStatement': {
        return getReturnStatement(node.consequent) || getReturnStatement(node.alternate!)
      }
      case 'BlockStatement': {
        for (let i = 0; i < node.body.length; i++) {
          const result = getReturnStatement(node.body[i])
          if (result !== null) {
            return result
          }
        }
        return null
      }
      case 'ForStatement':
      case 'WhileStatement': {
        return getReturnStatement(node.body)
      }
      case 'ReturnStatement': {
        return node
      }
      default: {
        return null
      }
    }
  }

  const customWalker = {
    ...base,
    VariableDeclarator(node: es.VariableDeclarator, st: never, c: FullWalkerCallback<never>) {
      // don't visit the id
      if (node.init) {
        c(node.init, st, 'Expression')
      }
    },
    CallExpression(node: es.CallExpression, st: never, c: FullWalkerCallback<never>) {
      // don't visit the argument ids
      if (node.callee) {
        c(node.callee, st, 'Identifier')
      }
      if (node.arguments) {
        for (let i = 0; i < node.arguments.length; i++) {
          c(node.arguments[i].VALUE!, st, node.arguments[i].VALUE!.type)
        }
      }
    },
    PropertyDefinition(node: es.PropertyDefinition, st: never, c: FullWalkerCallback<never>) {},
    ProtocolDeclaration(node: es.ProtocolDeclaration, st: never, c: FullWalkerCallback<never>) {
      // if (node.body) {
      //   c(node.body, st, 'ProtocolBody')
      // }
    },
    ProtocolBody(node: es.ProtocolBody, st: never, c: FullWalkerCallback<never>) {
      // if (node.body) {
      //   for (let i = 0; i < node.body.length; i++) {
      //     c(node.body[i], st, node.body[i].type)
      //   }
      // }
    },
    CompPropDeclaration(node: es.CompPropDeclaration, st: never, c: FullWalkerCallback<never>) {
      if (node.body) {
        //Debug
        // console.log("[validator: CompProp]")
        // console.log(node)
        // console.log(node.body)

        for (let i = 0; i < node.body.body.length; i++) {
          const fNode = node.body.body[i] as es.FunctionDeclaration
          if (fNode.id!.name === 'get') {
            fNode.TYPE = node.TYPE
          } else if (fNode.id!.name === 'set') {
            const input = fNode.params[0] as es.Identifier
            input.TYPE = node.TYPE
          }
        }
        c(node.body, st, 'BlockStatement')
      }
    }
  }

  ancestor(
    program,
    {
      VariableDeclaration(node: TypeAnnotatedNode<es.VariableDeclaration>, ancestors: es.Node[]) {
        // Update available token
        const lastAncestor = ancestors[ancestors.length - 2]
        const name = getVariableDecarationName(node)
        DeclarationMap.get(lastAncestor)?.set(name, new Declaration(true))
        // node.typability = 'NotYetTyped'

        // const accessedBeforeDeclaration = accessedBeforeDeclarationMap.get(lastAncestor)!.get(name)!
        //   .accessedBeforeDeclaration
        // node.typability = accessedBeforeDeclaration ? 'Untypable' : 'NotYetTyped'
      },
      Identifier: validateIdentifier,
      FunctionDeclaration(node: TypeAnnotatedNode<es.FunctionDeclaration>, ancestors: es.Node[]) {
        // a function declaration can be typed if there are no function calls in the same scope before it

        // Update available token
        const lastAncestor = ancestors[ancestors.length - 2]
        const name = node.id!.name
        DeclarationMap.get(lastAncestor)?.set(name, new Declaration(true))

        // Check Return Statement
        const node_RTN = getReturnStatement(node.body)
        if (node.TYPE === null) {
          if (node_RTN !== null) {
            context.errors.push(new ParseUnexpectedReturnError(node_RTN))
          }
        } else {
          if (node_RTN !== null) {
          } else {
            context.errors.push(new ParseMissingReturnError(node, node.TYPE))
          }
        }

        node.typability = scopeHasCallExpressionMap.get(lastAncestor) ? 'Untypable' : 'NotYetTyped'
      },
      ClassDeclaration(node: TypeAnnotatedNode<es.ClassDeclaration>, ancestors: es.Node[]) {
        // Update available token
        const lastAncestor = ancestors[ancestors.length - 2]
        const name = node.id!.name
        DeclarationMap.get(lastAncestor)?.set(name, new Declaration(true))
      },
      ProtocolDeclaration(node: TypeAnnotatedNode<es.ProtocolDeclaration>, ancestors: es.Node[]) {
        // Update available token
        const lastAncestor = ancestors[ancestors.length - 2]
        const name = node.id!.name
        DeclarationMap.get(lastAncestor)?.set(name, new Declaration(true))
      },
      CallExpression(call: TypeAnnotatedNode<es.CallExpression>, ancestors: es.Node[]) {
        //Debug
        // console.log('VALIDATE CALL[1]')

        for (let i = ancestors.length - 1; i >= 0; i--) {
          const a = ancestors[i]
          if (scopeHasCallExpressionMap.has(a)) {
            scopeHasCallExpressionMap.set(a, true)
            break
          }
        }

        //Debug
        // console.log('VALIDATE CALL[2]')

        // call.typability = 'NotYetTyped'
      }
    },
    customWalker
  )

  return program
}
