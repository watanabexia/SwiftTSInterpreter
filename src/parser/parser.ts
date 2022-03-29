/* tslint:disable:max-classes-per-file */
import * as es from 'estree'
import { Context, ErrorSeverity, ErrorType, SourceError } from '../types'
import { stripIndent } from '../utils/formatters'
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { CalcLexer } from '../lang/CalcLexer'
import {
  AdditionContext,
  CalcParser,
  DivisionContext,
  ExprContext,
  ExprStatContext,
  EmptStatContext,
  MultiplicationContext,
  NumberContext,
  ParenthesesContext,
  PowerContext,
  ProgContext,
  StatContext,
  SubtractionContext,
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
  FuncDeclareStatContext,
  Arg_typeContext,
  ReturnStatContext,
  BlockStatContext,
  FuncCallContext,
  Arg_valueContext
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

  visitPower(ctx: PowerContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '^',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitMultiplication(ctx: MultiplicationContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '*',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitDivision(ctx: DivisionContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '/',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitModulo(ctx: ModuloContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '%',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
  visitAddition(ctx: AdditionContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '+',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }

  visitSubtraction(ctx: SubtractionContext): es.Expression {
    return {
      type: 'BinaryExpression',
      operator: '-',
      left: this.visit(ctx._left),
      right: this.visit(ctx._right),
      loc: contextToLocation(ctx)
    }
  }
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

    //Debug
    // console.log('BODY DONE')

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
    return {
      body: [this.visit(ctx._body)],
      loc: contextToLocation(ctx),
      type: 'BlockStatement'
    }
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
      console.log('ESTree AST:')
      console.log(program)
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
