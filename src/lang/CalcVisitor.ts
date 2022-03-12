// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ExprStatContext } from "./CalcParser";
import { EmptStatContext } from "./CalcParser";
import { NumberContext } from "./CalcParser";
import { TrueContext } from "./CalcParser";
import { FalseContext } from "./CalcParser";
import { DecimalContext } from "./CalcParser";
import { ParenthesesContext } from "./CalcParser";
import { PowerContext } from "./CalcParser";
import { MultiplicationContext } from "./CalcParser";
import { DivisionContext } from "./CalcParser";
import { AdditionContext } from "./CalcParser";
import { SubtractionContext } from "./CalcParser";
import { ProgContext } from "./CalcParser";
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
	 * Visit a parse tree produced by the `EmptStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptStat?: (ctx: EmptStatContext) => Result;

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
	 * Visit a parse tree produced by `CalcParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;

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

