// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ExprStatContext } from "./CalcParser";
import { DeclareStatContext } from "./CalcParser";
import { DeclareValueStatContext } from "./CalcParser";
import { AssignStatContext } from "./CalcParser";
import { FuncDeclareStatContext } from "./CalcParser";
import { ReturnStatContext } from "./CalcParser";
import { EmptStatContext } from "./CalcParser";
import { BlockStatContext } from "./CalcParser";
import { NameContext } from "./CalcParser";
import { NumberContext } from "./CalcParser";
import { TrueContext } from "./CalcParser";
import { FalseContext } from "./CalcParser";
import { StringContext } from "./CalcParser";
import { DecimalContext } from "./CalcParser";
import { ParenthesesContext } from "./CalcParser";
import { FuncCallContext } from "./CalcParser";
import { EqualContext } from "./CalcParser";
import { NotEqualContext } from "./CalcParser";
import { GreaterThanOrEqualContext } from "./CalcParser";
import { LessThanOrEqualContext } from "./CalcParser";
import { GreaterThanContext } from "./CalcParser";
import { LessThanContext } from "./CalcParser";
import { LogicalAndContext } from "./CalcParser";
import { LogicalOrContext } from "./CalcParser";
import { LogicalNotContext } from "./CalcParser";
import { PowerContext } from "./CalcParser";
import { MultiplicationContext } from "./CalcParser";
import { DivisionContext } from "./CalcParser";
import { AdditionContext } from "./CalcParser";
import { SubtractionContext } from "./CalcParser";
import { ModuloContext } from "./CalcParser";
import { ProgContext } from "./CalcParser";
import { Stat_endContext } from "./CalcParser";
import { TypesContext } from "./CalcParser";
import { Declare_typesContext } from "./CalcParser";
import { Arg_typeContext } from "./CalcParser";
import { Arg_valueContext } from "./CalcParser";
import { Block_statContext } from "./CalcParser";
import { StatContext } from "./CalcParser";
import { ExprContext } from "./CalcParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CalcParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface CalcVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `ExprStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprStat?: (ctx: ExprStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclareStat?: (ctx: DeclareStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `DeclareValueStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclareValueStat?: (ctx: DeclareValueStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `AssignStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignStat?: (ctx: AssignStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `FuncDeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncDeclareStat?: (ctx: FuncDeclareStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `ReturnStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStat?: (ctx: ReturnStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `EmptStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptStat?: (ctx: EmptStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `BlockStat`
	 * labeled alternative in `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockStat?: (ctx: BlockStatContext) => Result;

	/**
	 * Visit a parse tree produced by the `Name`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by the `Number`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by the `True`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrue?: (ctx: TrueContext) => Result;

	/**
	 * Visit a parse tree produced by the `False`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFalse?: (ctx: FalseContext) => Result;

	/**
	 * Visit a parse tree produced by the `String`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString?: (ctx: StringContext) => Result;

	/**
	 * Visit a parse tree produced by the `Decimal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimal?: (ctx: DecimalContext) => Result;

	/**
	 * Visit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheses?: (ctx: ParenthesesContext) => Result;

	/**
	 * Visit a parse tree produced by the `FuncCall`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncCall?: (ctx: FuncCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `Equal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqual?: (ctx: EqualContext) => Result;

	/**
	 * Visit a parse tree produced by the `NotEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotEqual?: (ctx: NotEqualContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterThanOrEqual?: (ctx: GreaterThanOrEqualContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessThanOrEqual?: (ctx: LessThanOrEqualContext) => Result;

	/**
	 * Visit a parse tree produced by the `GreaterThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGreaterThan?: (ctx: GreaterThanContext) => Result;

	/**
	 * Visit a parse tree produced by the `LessThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLessThan?: (ctx: LessThanContext) => Result;

	/**
	 * Visit a parse tree produced by the `LogicalAnd`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAnd?: (ctx: LogicalAndContext) => Result;

	/**
	 * Visit a parse tree produced by the `LogicalOr`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOr?: (ctx: LogicalOrContext) => Result;

	/**
	 * Visit a parse tree produced by the `LogicalNot`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalNot?: (ctx: LogicalNotContext) => Result;

	/**
	 * Visit a parse tree produced by the `Power`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPower?: (ctx: PowerContext) => Result;

	/**
	 * Visit a parse tree produced by the `Multiplication`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplication?: (ctx: MultiplicationContext) => Result;

	/**
	 * Visit a parse tree produced by the `Division`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDivision?: (ctx: DivisionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Addition`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddition?: (ctx: AdditionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Subtraction`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtraction?: (ctx: SubtractionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Modulo`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModulo?: (ctx: ModuloContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.stat_end`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStat_end?: (ctx: Stat_endContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.types`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypes?: (ctx: TypesContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.declare_types`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare_types?: (ctx: Declare_typesContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.arg_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArg_type?: (ctx: Arg_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.arg_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArg_value?: (ctx: Arg_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_stat?: (ctx: Block_statContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStat?: (ctx: StatContext) => Result;

	/**
	 * Visit a parse tree produced by `CalcParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
}

