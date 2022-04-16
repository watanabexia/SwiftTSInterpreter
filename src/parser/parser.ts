/* tslint:disable:max-classes-per-file */
import * as es from 'estree'
import { Context, ErrorSeverity, ErrorType, SourceError } from '../types'
import { stripIndent } from '../utils/formatters'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { CalcLexer } from '../lang/CalcLexer'
import {
  AdditionContext,
  CalcParser,
  ExprContext,
  ExprStatContext,
  EmptStatContext,
  NumberContext,
  ParenthesesContext,
  ProgContext,
  StatContext,
  DecimalContext,
  DeclareStatContext,
  NameContext,
  AssignStatContext,
  TrueContext,
  FalseContext,
  EqualContext,
  NotEqualContext,
  GreaterThanOrEqualContext,
  LessThanOrEqualContext,
  GreaterThanContext,
  LessThanContext,
  ModuloContext,
  LogicalOrContext,
  LogicalAndContext,
  LogicalNotContext,
  StringContext,
  DeclareValueStatContext,
  IfStatementContext,
  BlockStatContext,
  ClassDeclareStatContext,
  ClassBodyContext,
  MemberExpressionContext,
  FuncDeclareStatContext,
  Arg_typeContext,
  ReturnStatContext,
  FuncCallContext,
  Arg_valueContext,
  NegateContext,
  StorPropDeclStatContext,
  CompPropDeclStatContext,
  CompPropBodyContext,
  GetStatContext,
  SetStatContext,
  CompPropAssignStatContext,
  ProtocolDeclareStatContext,
  ProtocolBodyContext,
  PropertyRequirementContext,
  CompPropEmptStatContext,
  ClassEmptStatContext,
  MethodRequirementContext,
  InitRequirementContext,
  EmptyRequirementContext,
  StorPropTypeDeclStatContext,
  MethodStatContext,
  InitStatContext,
  MethodCallContext
} from '../lang/CalcParser'
import { CalcVisitor } from '../lang/CalcVisitor'
import { ErrorNode } from 'antlr4ts/tree/ErrorNode'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { RuleNode } from 'antlr4ts/tree/RuleNode'
import { TerminalNode } from 'antlr4ts/tree/TerminalNode'

export class DisallowedConstructError implements SourceError {
  public type = ErrorType.SYNTAX
  public severity = ErrorSeverity.ERROR
  public nodeType: string

  constructor(public node: es.Node) {
    this.nodeType = this.formatNodeType(this.node.type)
  }

  get location() {
    return this.node.loc!
  }

  public explain() {
    return `${this.nodeType} are not allowed`
  }

  public elaborate() {
    return stripIndent`
      You are trying to use ${this.nodeType}, which is not allowed (yet).
    `
  }

  /**
   * Converts estree node.type into english
   * e.g. ThisExpression -> 'this' expressions
   *      Property -> Properties
   *      EmptyStatement -> Empty Statements
   */
  private formatNodeType(nodeType: string) {
    switch (nodeType) {
      case 'ThisExpression':
        return "'this' expressions"
      case 'Property':
        return 'Properties'
      default: {
        const words = nodeType.split(/(?=[A-Z])/)
        return words.map((word, i) => (i === 0 ? word : word.toLowerCase())).join(' ') + 's'
      }
    }
  }
}

export class FatalSyntaxError implements SourceError {
  public type = ErrorType.SYNTAX
  public severity = ErrorSeverity.ERROR
  public constructor(public location: es.SourceLocation, public message: string) {}

  public explain() {
    return this.message
  }

  public elaborate() {
    return 'There is a syntax error in your program'
  }
}

export class MissingSemicolonError implements SourceError {
  public type = ErrorType.SYNTAX
  public severity = ErrorSeverity.ERROR
  public constructor(public location: es.SourceLocation) {}

  public explain() {
    return 'Missing semicolon at the end of statement'
  }

  public elaborate() {
    return 'Every statement must be terminated by a semicolon.'
  }
}

export class TrailingCommaError implements SourceError {
  public type: ErrorType.SYNTAX
  public severity: ErrorSeverity.WARNING
  public constructor(public location: es.SourceLocation) {}

  public explain() {
    return 'Trailing comma'
  }

  public elaborate() {
    return 'Please remove the trailing comma'
  }
}

function contextToLocation(ctx: ExprContext): es.SourceLocation {
  return {
    start: {
      line: ctx.start.line,
      column: ctx.start.charPositionInLine
    },
    end: {
      line: ctx.stop ? ctx.stop.line : ctx.start.line,
      column: ctx.stop ? ctx.stop.charPositionInLine : ctx.start.charPositionInLine
    }
  }
}
class ExpressionGenerator implements CalcVisitor<es.Expression> {
  visitNumber(ctx: NumberContext): es.Literal {
    return {
      type: 'Literal',
      value: parseInt(ctx.text),
      raw: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitDecimal(ctx: DecimalContext): es.Literal {
    return {
      type: 'Literal',
      value: parseFloat(ctx.text),
      raw: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitTrue(ctx: TrueContext): es.Literal {
    return {
      type: 'Literal',
      value: true,
      raw: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitFalse(ctx: FalseContext): es.Literal {
    return {
      type: 'Literal',
      value: false,
      raw: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitName(ctx: NameContext): es.Identifier {
    return {
      type: 'Identifier',
      name: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitString(ctx: StringContext): es.Literal {
    return {
      type: 'Literal',
      value: ctx.text.slice(1, -1),
      raw: ctx.text,
      loc: contextToLocation(ctx)
    }
  }

  visitParentheses(ctx: ParenthesesContext): es.Expression {
    return this.visit(ctx.expr())
  }

  visitEqual(ctx: EqualContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '==',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitNotEqual(ctx: NotEqualContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '!=',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitGreaterThanOrEqual(ctx: GreaterThanOrEqualContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '>=',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitLessThanOrEqual(ctx: LessThanOrEqualContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '<=',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitGreaterThan(ctx: GreaterThanContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '>',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitLessThan(ctx: LessThanContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '<',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  // visitPower(ctx: PowerContext): es.Expression {
  //   return {
  //     type: 'BinaryExpression',
  //     operator: '^',
  //     left: this.visit(ctx._left),
  //     right: this.visit(ctx._right),
  //     loc: contextToLocation(ctx)
  //   }
  // }

  // visitMultiplication(ctx: MultiplicationContext): es.Expression {
  //   return {
  //     type: 'BinaryExpression',
  //     operator: '*',
  //     left: this.visit(ctx._left),
  //     right: this.visit(ctx._right),
  //     loc: contextToLocation(ctx)
  //   }
  // }
  // visitDivision(ctx: DivisionContext): es.Expression {
  //   return {
  //     type: 'BinaryExpression',
  //     operator: '/',
  //     left: this.visit(ctx._left),
  //     right: this.visit(ctx._right),
  //     loc: contextToLocation(ctx)
  //   }
  // }
  visitModulo(ctx: ModuloContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: <'%' | '*' | '/'>ctx._operator.text,
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitAddition(ctx: AdditionContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: <'+' | '-'>ctx._operator.text,
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  // visitSubtraction(ctx: SubtractionContext): es.Expression {
  //   return {
  //     type: 'BinaryExpression',
  //     operator: '-',
  //     left: this.visit(ctx._left),
  //     right: this.visit(ctx._right),
  //     loc: contextToLocation(ctx)
  //   }
  // }
  visitLogicalOr(ctx: LogicalOrContext): es.Expression {
    return {
      type: 'LogicalExpression',
      operator: '||',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitLogicalAnd(ctx: LogicalAndContext): es.Expression {
    return {
      type: 'LogicalExpression',
      operator: '&&',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitLogicalNot(ctx: LogicalNotContext): es.Expression {
    return {
      type: 'UnaryExpression',
      operator: '!',
      prefix: true,
      argument: this.visit(ctx._argument),
      loc: contextToLocation(ctx)
    }
  }

  visitNegate(ctx: NegateContext): es.Expression {
    return {
      type: 'UnaryExpression',
      operator: '-',
      prefix: true,
      argument: this.visit(ctx._argument),
      loc: contextToLocation(ctx)
    }
  }

  visitMemberExpression(ctx: MemberExpressionContext): es.MemberExpression {
    const ESTreeMemberExpression: es.MemberExpression = {
      type: 'MemberExpression',
      computed: false,
      loc: contextToLocation(ctx),
      object: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: <string>ctx._object.text
      },
      property: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: <string>ctx._property.text
      },
      optional: false
    }
    return ESTreeMemberExpression
  }

  visitMethodCall(ctx: MethodCallContext): es.MemberExpression {
    const argu_generator = new IdentifierGenerator()
    const ESTreeMemberExpression: es.MemberExpression = {
      type: 'MemberExpression',
      computed: false,
      loc: contextToLocation(ctx),
      object: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: <string>ctx._object.text
      },
      property: {
        type: 'CallExpression',
        loc: contextToLocation(ctx),
        callee: {
          type: 'Identifier',
          loc: contextToLocation(ctx),
          name: ctx._method.text!
        },
        arguments: [],
        optional: false
      },
      optional: false
    }

    for (let i = 0; i < ctx.arg_value().length; i++) {
      ;(<es.CallExpression>ESTreeMemberExpression.property).arguments.push(
        ctx.arg_value(i).accept(argu_generator)
      )
    }

    return ESTreeMemberExpression
  }

  visitFuncCall(ctx: FuncCallContext): es.CallExpression {
    const id_generator = new IdentifierGenerator()
    const ESTreeCallExpression: es.CallExpression = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: <string>ctx._id.text,
        loc: contextToLocation(ctx)
      },
      arguments: [],
      loc: contextToLocation(ctx),
      optional: false
    }

    for (let i = 0; i < ctx.arg_value().length; i++) {
      ESTreeCallExpression.arguments.push(ctx.arg_value(i).accept(id_generator))
    }

    return ESTreeCallExpression
  }

  visitExpression?: ((ctx: ExprContext) => es.Expression) | undefined
  visitStart?: ((ctx: StatContext) => es.Expression) | undefined

  visit(tree: ParseTree): es.Expression {
    return tree.accept(this)
  }
  visitChildren(node: RuleNode): es.Expression {
    const expressions: es.Expression[] = []
    for (let i = 0; i < node.childCount; i++) {
      expressions.push(node.getChild(i).accept(this))
    }
    return {
      type: 'SequenceExpression',
      expressions
    }
  }
  visitTerminal(node: TerminalNode): es.Expression {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Expression {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

class IdentifierGenerator implements CalcVisitor<es.Identifier> {
  visitArg_type(ctx: Arg_typeContext): es.Identifier {
    return {
      type: 'Identifier',
      name: <string>ctx._id.text,
      TYPE: ctx._type.text,
      loc: contextToLocation(ctx)
    }
  }

  visitArg_value(ctx: Arg_valueContext): es.Identifier {
    const generator = new ExpressionGenerator()
    return {
      type: 'Identifier',
      name: <string>ctx._id.text,
      VALUE: ctx._value.accept(generator),
      loc: contextToLocation(ctx)
    }
  }

  visit(tree: ParseTree): es.Identifier {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.Identifier {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.Identifier {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Identifier {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

class StatementGenerator implements CalcVisitor<es.Statement> {
  visitExprStat(ctx: ExprStatContext): es.ExpressionStatement {
    const generator = new ExpressionGenerator()
    return {
      type: 'ExpressionStatement',
      expression: ctx._expression.accept(generator),
      loc: contextToLocation(ctx)
    }
  }

  visitEmptStat(ctx: EmptStatContext): es.EmptyStatement {
    return {
      type: 'EmptyStatement',
      loc: contextToLocation(ctx)
    }
  }

  visitDeclareStat(ctx: DeclareStatContext): es.Declaration {
    return {
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: <string>ctx._id.text,
            loc: contextToLocation(ctx)
          },
          init: undefined,
          TYPE: <string>ctx._type.text
        }
      ],
      kind: <'var' | 'let'>ctx._declare_type.text,
      loc: contextToLocation(ctx)
    }
  }

  visitDeclareValueStat(ctx: DeclareValueStatContext): es.Declaration {
    const generator = new ExpressionGenerator()
    return {
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: <string>ctx._id.text,
            loc: contextToLocation(ctx)
          },
          init: ctx._value.accept(generator),
          TYPE: 'UNKNOWN'
        }
      ],
      kind: <'var' | 'let'>ctx._declare_type.text,
      loc: contextToLocation(ctx)
    }
  }

  visitAssignStat(ctx: AssignStatContext): es.ExpressionStatement {
    const generator = new ExpressionGenerator()
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: <string>ctx._id.text,
          loc: contextToLocation(ctx)
        },
        right: ctx._value.accept(generator),
        loc: contextToLocation(ctx)
      },
      loc: contextToLocation(ctx)
    }
  }

  visitClassDeclareStat(ctx: ClassDeclareStatContext): es.ClassDeclaration {
    const class_body_generator = new ClassBodyGenerator()
    const ESTreeClassDeclaration: es.ClassDeclaration = {
      body: ctx._body.accept(class_body_generator),
      id: {
        type: 'Identifier',
        name: <string>ctx._id.text,
        loc: contextToLocation(ctx)
      },
      loc: contextToLocation(ctx),
      superClass: null,
      type: 'ClassDeclaration'
    }

    if (ctx._superclass) {
      ESTreeClassDeclaration.superClass = {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: ctx._superclass.text!
      }
    }

    return ESTreeClassDeclaration
  }

  visitProtocolDeclareStat(ctx: ProtocolDeclareStatContext): es.ProtocolDeclaration {
    const protocol_body_generator = new ProtocolBodyGenerator()
    const ESTreeProtocolDeclaration: es.ProtocolDeclaration = {
      body: ctx._body.accept(protocol_body_generator),
      id: {
        type: 'Identifier',
        name: <string>ctx._id.text
      },
      loc: contextToLocation(ctx),
      type: 'ProtocolDeclaration'
    }
    return ESTreeProtocolDeclaration
  }

  visitFuncDeclareStat(ctx: FuncDeclareStatContext): es.FunctionDeclaration {
    const blk_generator = new BlockStatementGenerator()
    const ESTreeFunctionDeclaration: es.FunctionDeclaration = {
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: <string>ctx._id.text,
        loc: contextToLocation(ctx)
      },
      params: [],
      body: ctx._body.accept(blk_generator),
      TYPE: null,
      loc: contextToLocation(ctx)
    }
    if (ctx._type) {
      ESTreeFunctionDeclaration.TYPE = ctx._type.text
    }

    const arg_generator = new IdentifierGenerator()
    for (let i = 0; i < ctx.arg_type().length; i++) {
      ESTreeFunctionDeclaration.params.push(ctx.arg_type(i).accept(arg_generator))
    }

    return ESTreeFunctionDeclaration
  }

  visitReturnStat(ctx: ReturnStatContext): es.ReturnStatement {
    const generator = new ExpressionGenerator()
    return {
      type: 'ReturnStatement',
      argument: ctx._value.accept(generator),
      loc: contextToLocation(ctx)
    }
  }

  visit(tree: ParseTree): es.Statement {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.Statement {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.Statement {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Statement {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }

  visitIfStatement(ctx: IfStatementContext): es.Statement {
    const generator = new ExpressionGenerator()
    let alternative
    if (ctx._alternate == undefined) {
      alternative = null
    } else {
      alternative = this.visit(ctx._alternate)
    }
    return {
      alternate: alternative,
      consequent: this.visit(ctx._consequent),
      loc: contextToLocation(ctx),
      test: ctx._test.accept(generator),
      type: 'IfStatement'
    }
  }

  visitBlockStat(ctx: BlockStatContext): es.Statement {
    const ESTreeProgram: es.Statement = {
      body: [],
      loc: contextToLocation(ctx),
      type: 'BlockStatement'
    }

    const generator = new StatementGenerator()
    for (let i = 0; i < ctx.stat().length; i++) {
      ESTreeProgram.body.push(ctx.stat(i).accept(generator))
    }

    return ESTreeProgram
  }

  visitCompPropAssignStat(ctx: CompPropAssignStatContext): es.Statement {
    const generator = new ExpressionGenerator()
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          loc: contextToLocation(ctx),
          object: {
            type: 'Identifier',
            loc: contextToLocation(ctx),
            name: ctx._obj.text!
          },
          property: {
            type: 'Identifier',
            loc: contextToLocation(ctx),
            name: ctx._prop.text!
          },
          computed: false,
          optional: false
        },
        right: ctx._value.accept(generator),
        loc: contextToLocation(ctx)
      },
      loc: contextToLocation(ctx)
    }
  }
}
class ClassBodyGenerator implements CalcVisitor<es.ClassBody> {
  visitClassBody(ctx: ClassBodyContext): es.ClassBody {
    const ESTreeClassBody: es.ClassBody = {
      body: [],
      loc: contextToLocation(ctx),
      type: 'ClassBody'
    }

    const generator = new ClassStatGenerator()
    for (let i = 0; i < ctx.class_stat().length; i++) {
      //Debug
      // console.log('ClassBodyGenerator')
      // console.log(ctx.class_stat(i))

      ESTreeClassBody.body.push(
        <es.MethodDefinition | es.PropertyDefinition | es.CompPropDeclaration>(
          ctx.class_stat(i).accept(generator)
        )
      )
    }

    return ESTreeClassBody
  }

  visit(tree: ParseTree): es.ClassBody {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.ClassBody {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.ClassBody {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.ClassBody {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}
class ClassStatGenerator implements CalcVisitor<es.Statement> {
  visitStorPropDeclStat(ctx: StorPropDeclStatContext): es.PropertyDefinition {
    const generator = new ExpressionGenerator()

    //Debug
    // console.log("StorePropDeclStatContext!!!!!>>>>>>")

    const ESTreePropertyDefinition: es.PropertyDefinition = {
      type: 'PropertyDefinition',
      static: false,
      computed: false,
      key: {
        type: 'Identifier',
        name: <string>ctx._id.text
      },
      value: ctx._value.accept(generator),
      TYPE: undefined,
      kind: <'let' | 'var'>ctx._declare_type.text
    }
    return ESTreePropertyDefinition
  }

  visitStorPropTypeDeclStat(ctx: StorPropTypeDeclStatContext): es.PropertyDefinition {
    const ESTreePropertyDefinition: es.PropertyDefinition = {
      type: 'PropertyDefinition',
      static: false,
      computed: false,
      key: {
        type: 'Identifier',
        name: <string>ctx._id.text
      },
      value: undefined,
      TYPE: ctx._type.text,
      kind: <'let' | 'var'>ctx._declare_type.text
    }
    return ESTreePropertyDefinition
  }

  visitCompPropDeclStat(ctx: CompPropDeclStatContext): es.CompPropDeclaration {
    const ESTreeCompPropDeclaration: es.CompPropDeclaration = {
      type: 'CompPropDeclaration',
      loc: contextToLocation(ctx),
      static: false,
      computed: false,
      kind: <'let' | 'var'>ctx._declare_type.text,
      TYPE: ctx._type.text,
      key: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: <string>ctx._id.text
      },
      body: <es.BlockStatement>this.visit(ctx._body)
    }
    return ESTreeCompPropDeclaration
  }

  visitCompPropBody(ctx: CompPropBodyContext): es.BlockStatement {
    const ESTreeBlockStatement: es.BlockStatement = {
      type: 'BlockStatement',
      loc: contextToLocation(ctx),
      body: []
    }

    for (let i = 0; i < ctx.comp_prop_stat().length; i++) {
      ESTreeBlockStatement.body.push(this.visit(ctx.comp_prop_stat(i)))
    }

    return ESTreeBlockStatement
  }

  visitMethodStat(ctx: MethodStatContext): es.MethodDefinition {
    const generator = new BlockStatementGenerator()
    const IdGenerator = new IdentifierGenerator()
    const ESTreeMethodDefinition: es.MethodDefinition = {
      type: 'MethodDefinition',
      loc: contextToLocation(ctx),
      key: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: ctx._id.text!
      },
      TYPE: null,
      value: ctx._body.accept(generator),
      params: [],
      kind: 'method',
      computed: false,
      static: false,
      required: false
    }

    if (ctx._type) {
      ESTreeMethodDefinition.TYPE = ctx._type.text
    }

    for (let i = 0; i < ctx.arg_type().length; i++) {
      ESTreeMethodDefinition.params.push(ctx.arg_type(i).accept(IdGenerator))
    }

    return ESTreeMethodDefinition
  }

  visitInitStat(ctx: InitStatContext): es.MethodDefinition {
    const generator = new BlockStatementGenerator()
    const IdGenerator = new IdentifierGenerator()
    const ESTreeMethodDefinition: es.MethodDefinition = {
      type: 'MethodDefinition',
      loc: contextToLocation(ctx),
      key: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: 'init'
      },
      TYPE: null,
      value: ctx._body.accept(generator),
      params: [],
      kind: 'constructor',
      computed: false,
      static: false,
      required: false
    }

    if (ctx._required) {
      ESTreeMethodDefinition.required = true
    }

    for (let i = 0; i < ctx.arg_type().length; i++) {
      ESTreeMethodDefinition.params.push(ctx.arg_type(i).accept(IdGenerator))
    }

    return ESTreeMethodDefinition
  }

  visitClassEmptStat(ctx: ClassEmptStatContext): es.EmptyStatement {
    return {
      type: 'EmptyStatement',
      loc: contextToLocation(ctx)
    }
  }

  visitCompPropEmptStat(ctx: CompPropEmptStatContext): es.EmptyStatement {
    return {
      type: 'EmptyStatement',
      loc: contextToLocation(ctx)
    }
  }

  visitGetStat(ctx: GetStatContext): es.FunctionDeclaration {
    const generator = new BlockStatementGenerator()
    const ESTreeFunctionDeclaration: es.FunctionDeclaration = {
      type: 'FunctionDeclaration',
      loc: contextToLocation(ctx),
      id: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: ctx._id.text!
      },
      body: ctx._body.accept(generator),
      TYPE: null,
      params: []
    }
    return ESTreeFunctionDeclaration
  }

  visitSetStat(ctx: SetStatContext): es.FunctionDeclaration {
    const generator = new BlockStatementGenerator()
    const ESTreeFunctionDeclaration: es.FunctionDeclaration = {
      type: 'FunctionDeclaration',
      loc: contextToLocation(ctx),
      id: {
        type: 'Identifier',
        loc: contextToLocation(ctx),
        name: ctx._id.text!
      },
      body: ctx._body.accept(generator),
      TYPE: null,
      params: [
        {
          type: 'Identifier',
          loc: contextToLocation(ctx),
          name: ctx._input.text!
        }
      ]
    }
    return ESTreeFunctionDeclaration
  }

  visit(tree: ParseTree): es.Statement {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.Statement {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.Statement {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Statement {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

class ProtocolBodyGenerator implements CalcVisitor<es.ProtocolBody> {
  visitProtocolBody(ctx: ProtocolBodyContext): es.ProtocolBody {
    const ESTreeProtocolBody: es.ProtocolBody = {
      body: [],
      loc: contextToLocation(ctx),
      type: 'ProtocolBody'
    }

    const generator = new PropertyStatGenerator()
    for (let i = 0; i < ctx.protocol_stat().length; i++) {
      ESTreeProtocolBody.body.push(<es.Requirement>ctx.protocol_stat(i).accept(generator))
    }

    return ESTreeProtocolBody
  }

  visit(tree: ParseTree): es.ProtocolBody {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.ProtocolBody {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.ProtocolBody {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.ProtocolBody {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}
class PropertyStatGenerator implements CalcVisitor<es.Statement> {
  visitPropertyRequirement(ctx: PropertyRequirementContext): es.PropertyRequirement {
    const ESTreePropertyRequirement: es.PropertyRequirement = {
      type: 'PropertyRequirement',
      static: false,
      computed: false,
      key: {
        type: 'Identifier',
        name: <string>ctx._id.text
      },
      kind: <'var' | 'let'>ctx._declare_type.text,
      TYPE: <string>ctx._type.text,
      get: false,
      set: false
    }
    if (ctx._get) {
      ESTreePropertyRequirement.get = true
    }
    if (ctx._set) {
      ESTreePropertyRequirement.set = true
    }

    return ESTreePropertyRequirement
  }

  visitMethodRequirement(ctx: MethodRequirementContext): es.MethodRequirement {
    const IdGenerator = new IdentifierGenerator()
    const ESTreeMethodRequirement: es.MethodRequirement = {
      type: 'MethodRequirement',
      key: {
        type: 'Identifier',
        name: <string>ctx._id.text
      },
      kind: 'method',
      TYPE: null,
      params: [],
      static: false,
      computed: false
    }

    if (ctx._type) {
      ESTreeMethodRequirement.TYPE = ctx._type.text
    }

    for (let i = 0; i < ctx.arg_type().length; i++) {
      ESTreeMethodRequirement.params.push(ctx.arg_type(i).accept(IdGenerator))
    }

    return ESTreeMethodRequirement
  }

  visitInitRequirement(ctx: InitRequirementContext): es.MethodRequirement {
    const IdGenerator = new IdentifierGenerator()
    const ESTreeMethodRequirement: es.MethodRequirement = {
      type: 'MethodRequirement',
      key: {
        type: 'Identifier',
        name: 'init'
      },
      kind: 'method',
      TYPE: null,
      params: [],
      static: false,
      computed: false
    }

    for (let i = 0; i < ctx.arg_type().length; i++) {
      ESTreeMethodRequirement.params.push(ctx.arg_type(i).accept(IdGenerator))
    }

    return ESTreeMethodRequirement
  }

  visitEmptyRequirement(ctx: EmptyRequirementContext): es.Statement {
    return {
      type: 'EmptyStatement'
    }
  }

  visit(tree: ParseTree): es.Statement {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.Statement {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.Statement {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Statement {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

class BlockStatementGenerator implements CalcVisitor<es.BlockStatement> {
  visitBlockStat(ctx: BlockStatContext): es.BlockStatement {
    const ESTreeBlockStatement: es.BlockStatement = {
      type: 'BlockStatement',
      body: [],
      loc: contextToLocation(ctx)
    }

    const generator = new StatementGenerator()
    for (let i = 0; i < ctx.stat().length; i++) {
      ESTreeBlockStatement.body.push(ctx.stat(i).accept(generator))
    }

    return ESTreeBlockStatement
  }

  visit(tree: ParseTree): es.BlockStatement {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.BlockStatement {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.BlockStatement {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.BlockStatement {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

class ProgramGenerator implements CalcVisitor<es.Program> {
  visitProg(ctx: ProgContext): es.Program {
    const ESTreeProgram: es.Program = {
      type: 'Program',
      sourceType: 'script',
      body: []
    }

    //Debug
    // console.log("VISITPROG!!")

    const generator = new StatementGenerator()
    for (let i = 0; i < ctx.stat().length; i++) {
      //Debug
      // console.log(ctx.stat(i))

      ESTreeProgram.body.push(ctx.stat(i).accept(generator))

      //Debug
      // console.log('Statement converted.')
    }

    return ESTreeProgram
  }

  visit(tree: ParseTree): es.Program {
    return tree.accept(this)
  }

  visitChildren(node: RuleNode): es.Program {
    return node.accept(this)
  }

  visitTerminal(node: TerminalNode): es.Program {
    return node.accept(this)
  }

  visitErrorNode(node: ErrorNode): es.Program {
    throw new FatalSyntaxError(
      {
        start: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine
        },
        end: {
          line: node.symbol.line,
          column: node.symbol.charPositionInLine + 1
        }
      },
      `invalid syntax ${node.text}`
    )
  }
}

function convertProgram(prog: ProgContext): es.Program {
  const generator = new ProgramGenerator()
  return prog.accept(generator)
}

export function parse(source: string, context: Context) {
  let program: es.Program | undefined

  if (context.variant === 'calc') {
    const inputStream = new ANTLRInputStream(source)
    const lexer = new CalcLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new CalcParser(tokenStream)
    parser.buildParseTree = true
    try {
      const tree = parser.prog() // Use the rule "prog" to parse the file

      //Debug
      // console.log('ANTLR AST Detected!')
      // console.log(tree.toStringTree(parser))

      program = convertProgram(tree) // Convert the ANTLR generated AST to human-friendly AST ESTree

      //Debug
      // console.log('ESTree AST:')
      // console.log(program)
    } catch (error) {
      if (error instanceof FatalSyntaxError) {
        //Debug
        console.log('[ERROR] SyntaxError Detected')

        context.errors.push(error)
      } else {
        //Debug
        console.log('[ERROR] Unknown Error Detected')

        throw error
      }
    }
    const hasErrors = context.errors.find(m => m.severity === ErrorSeverity.ERROR)
    if (program && !hasErrors) {
      return program
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}
