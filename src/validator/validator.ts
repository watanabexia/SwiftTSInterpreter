import { ancestor, base, FullWalkerCallback } from '../utils/walkers'
import * as es from 'estree'
import { Context, TypeAnnotatedNode } from '../types'
import { getVariableDecarationName } from '../utils/astCreator'
import { ParseUnfoundError } from '../errors/typeErrors'

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
    DeclarationMap.set(node,
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

  // initialise scope of variables
  /* There are four kinds of scopes, for each scope it will initialize two Maps. 
     For program and block, the two Maps are empty.
     For functions, the parameters are initialized as NOT accessed before declaration. 
  */
  ancestor(program as es.Node, {
    Program: processBlock,
    BlockStatement: processBlock,
    FunctionDeclaration: processFunction,
    ArrowFunctionExpression: processFunction,
    ForStatement(forStatement: es.ForStatement, ancestors: es.Node[]) {}
  })

  function validateIdentifier(id: es.Identifier, ancestors: es.Node[]) {
    const name = id.name
    let Found = false

    //Debug
    console.log("VALID ID")

    for (let i = ancestors.length - 1; i >= 0; i--) {
      const a = ancestors[i]
      const map = DeclarationMap.get(a)

      //Debug
      console.log("VALID ID - SUB")
      console.log(a)
      console.log(map)

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
    }
  }

  //Debug
  // console.log("VALIDATE HERE")

  ancestor(
    program,
    {
      VariableDeclaration(node: TypeAnnotatedNode<es.VariableDeclaration>, ancestors: es.Node[]) {
        const lastAncestor = ancestors[ancestors.length - 2]
        const name = getVariableDecarationName(node)

        //Debug
        // console.log(node)
        // console.log(lastAncestor)
        // console.log(name)
        // console.log(accessedBeforeDeclarationMap.get(lastAncestor))
        // console.log(accessedBeforeDeclarationMap.get(lastAncestor)?.get(name))

        DeclarationMap.get(lastAncestor)?.set(name, new Declaration(true))

        // const accessedBeforeDeclaration = accessedBeforeDeclarationMap.get(lastAncestor)!.get(name)!
        //   .accessedBeforeDeclaration
        // node.typability = accessedBeforeDeclaration ? 'Untypable' : 'NotYetTyped'
      },
      Identifier: validateIdentifier,
      FunctionDeclaration(node: TypeAnnotatedNode<es.FunctionDeclaration>, ancestors: es.Node[]) {
        // a function declaration can be typed if there are no function calls in the same scope before it

        //Debug
        // console.log(node)

        // const lastAncestor = ancestors[ancestors.length - 2]
        // node.typability = scopeHasCallExpressionMap.get(lastAncestor) ? 'Untypable' : 'NotYetTyped'
      },
      Pattern(node: es.Pattern, ancestors: es.Node[]) {},
      CallExpression(call: es.CallExpression, ancestors: es.Node[]) {

        //Debug
        // console.log(call)

        for (let i = ancestors.length - 1; i >= 0; i--) {
          const a = ancestors[i]
          if (scopeHasCallExpressionMap.has(a)) {
            scopeHasCallExpressionMap.set(a, true)
            break
          }
        }
      }
    },
    customWalker
  )

  return program
}
