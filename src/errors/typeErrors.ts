import * as es from 'estree'
import { ErrorSeverity, ErrorType, SourceError, Type, TypeAnnotatedNode } from '../types'
import { simplify, stripIndent } from '../utils/formatters'
import { typeToString } from '../utils/stringify'
import { generate } from 'astring'

// tslint:disable:max-classes-per-file

export class CyclicReferenceError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(public node: TypeAnnotatedNode<es.Node>) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return `${stringifyNode(this.node)} contains cyclic reference to itself`
  }

  public elaborate() {
    return this.explain()
  }
}

function stringifyNode(node: TypeAnnotatedNode<es.Node>): string {
  return ['VariableDeclaration', 'FunctionDeclaration'].includes(node.type)
    ? node.type === 'VariableDeclaration'
      ? (node.declarations[0].id as es.Identifier).name
      : (node as TypeAnnotatedNode<es.FunctionDeclaration>).id?.name!
    : node.type === 'Identifier'
    ? node.name
    : JSON.stringify(node) // might not be a good idea
}

export class DifferentNumberArgumentsError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(
    public node: TypeAnnotatedNode<es.Node>,
    public numExpectedArgs: number,
    public numReceived: number
  ) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return `Function expected ${this.numExpectedArgs} args, but got ${this.numReceived}`
  }

  public elaborate() {
    return this.explain()
  }
}

export class IncorrectArgumentsLabelError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(
    public node: TypeAnnotatedNode<es.Node>,
    public ExpectedArgsLabel: string[],
    public ReceivedLabel: string[]
  ) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return `Incorrect argument labels in call (have '${this.ExpectedArgsLabel}', expected '${this.ReceivedLabel}')`
  }

  public elaborate() {
    return this.explain()
  }
}

export class InvalidArgumentTypesError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(
    public node: TypeAnnotatedNode<es.Node>,
    public args: TypeAnnotatedNode<es.Node>[],
    public expectedTypes: Type[],
    public receivedTypes: Type[]
  ) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    const argStrings = this.args.map(arg => simplify(generate(arg)))
    if ('operator' in this.node) {
      const op = this.node.operator
      if (this.expectedTypes.length === 2) {
        // binary operator
        return stripIndent`
        A type mismatch was detected in the binary expression:
          ${argStrings[0]} ${op} ${argStrings[1]}
        The binary operator (${op}) expected two operands with types:
          ${typeToString(this.expectedTypes[0])} ${op} ${typeToString(this.expectedTypes[1])}
        but instead it received two operands of types:
          ${typeToString(this.receivedTypes[0])} ${op} ${typeToString(this.receivedTypes[1])}
        `
      } else {
        // unary operator
        return stripIndent`
        A type mismatch was detected in the unary expression:
          ${op} ${argStrings[0]}
        The unary operator (${op}) expected its operand to be of type:
          ${typeToString(this.expectedTypes[0])}
        but instead it received an operand of type:
          ${typeToString(this.receivedTypes[0])}
        `
      }
    }
    const functionString = simplify(generate(this.node))
    function formatPhrasing(types: Type[]) {
      switch (types.length) {
        // there will at least be one argument
        case 1:
          return `an argument of type:
      ${typeToString(types[0])}`
        default:
          return `${types.length} arguments of types:
      ${types.map(typeToString).join(', ')}`
      }
    }
    return stripIndent`
    A type mismatch was detected in the function call:
      ${functionString}
    The function expected ${formatPhrasing(this.expectedTypes)}
    but instead received ${formatPhrasing(this.receivedTypes)}
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class ParseUnfoundError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(public node: TypeAnnotatedNode<es.Node>, public id: string) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Cannot find '${this.id}' in the scope
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class ParseUnexpectedReturnError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(public node: TypeAnnotatedNode<es.Node>) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Unexpected non-void return value in void function
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class ParseMissingReturnError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(public node: TypeAnnotatedNode<es.Node>, public TYPE: string) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Missing return in function expected to return '${this.TYPE}'
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class UnknownTypeError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(public node: TypeAnnotatedNode<es.Node>, public TYPE: string) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Cannot find type '${this.TYPE}' in scope
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class AssignmentTypeError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(
    public node: TypeAnnotatedNode<es.Node>,
    public left_TYPE: Type,
    public right_TYPE: Type
  ) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Cannot assign value of type '${typeToString(this.right_TYPE)}' to type '${typeToString(
      this.left_TYPE
    )}'
    `
  }

  public elaborate() {
    return this.explain()
  }
}

export class ReturnTypeError implements SourceError {
  public type = ErrorType.TYPE
  public severity = ErrorSeverity.WARNING

  constructor(
    public node: TypeAnnotatedNode<es.Node>,
    public expectedType: Type,
    public receivedType: Type
  ) {}

  get location() {
    return this.node.loc!
  }

  public explain() {
    return stripIndent`
    Cannot convert return expression of type value of type '${typeToString(
      this.receivedType
    )}' to type '${typeToString(this.expectedType)}'
    `
  }

  public elaborate() {
    return this.explain()
  }
}
