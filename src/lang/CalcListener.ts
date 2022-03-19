// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `CalcParser`.
 */
export interface CalcListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `ExprStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterExprStat?: (ctx: ExprStatContext) => void;
	/**
	 * Exit a parse tree produced by the `ExprStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitExprStat?: (ctx: ExprStatContext) => void;

	/**
	 * Enter a parse tree produced by the `DeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterDeclareStat?: (ctx: DeclareStatContext) => void;
	/**
	 * Exit a parse tree produced by the `DeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitDeclareStat?: (ctx: DeclareStatContext) => void;

	/**
	 * Enter a parse tree produced by the `DeclareValueStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterDeclareValueStat?: (ctx: DeclareValueStatContext) => void;
	/**
	 * Exit a parse tree produced by the `DeclareValueStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitDeclareValueStat?: (ctx: DeclareValueStatContext) => void;

	/**
	 * Enter a parse tree produced by the `AssignStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterAssignStat?: (ctx: AssignStatContext) => void;
	/**
	 * Exit a parse tree produced by the `AssignStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitAssignStat?: (ctx: AssignStatContext) => void;

	/**
	 * Enter a parse tree produced by the `FuncDeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterFuncDeclareStat?: (ctx: FuncDeclareStatContext) => void;
	/**
	 * Exit a parse tree produced by the `FuncDeclareStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitFuncDeclareStat?: (ctx: FuncDeclareStatContext) => void;

	/**
	 * Enter a parse tree produced by the `ReturnStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterReturnStat?: (ctx: ReturnStatContext) => void;
	/**
	 * Exit a parse tree produced by the `ReturnStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitReturnStat?: (ctx: ReturnStatContext) => void;

	/**
	 * Enter a parse tree produced by the `EmptStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterEmptStat?: (ctx: EmptStatContext) => void;
	/**
	 * Exit a parse tree produced by the `EmptStat`
	 * labeled alternative in `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitEmptStat?: (ctx: EmptStatContext) => void;

	/**
	 * Enter a parse tree produced by the `BlockStat`
	 * labeled alternative in `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 */
	enterBlockStat?: (ctx: BlockStatContext) => void;
	/**
	 * Exit a parse tree produced by the `BlockStat`
	 * labeled alternative in `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 */
	exitBlockStat?: (ctx: BlockStatContext) => void;

	/**
	 * Enter a parse tree produced by the `Name`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by the `Name`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by the `Number`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `Number`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by the `True`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTrue?: (ctx: TrueContext) => void;
	/**
	 * Exit a parse tree produced by the `True`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTrue?: (ctx: TrueContext) => void;

	/**
	 * Enter a parse tree produced by the `False`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterFalse?: (ctx: FalseContext) => void;
	/**
	 * Exit a parse tree produced by the `False`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitFalse?: (ctx: FalseContext) => void;

	/**
	 * Enter a parse tree produced by the `String`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterString?: (ctx: StringContext) => void;
	/**
	 * Exit a parse tree produced by the `String`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitString?: (ctx: StringContext) => void;

	/**
	 * Enter a parse tree produced by the `Decimal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterDecimal?: (ctx: DecimalContext) => void;
	/**
	 * Exit a parse tree produced by the `Decimal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitDecimal?: (ctx: DecimalContext) => void;

	/**
	 * Enter a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Exit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitParentheses?: (ctx: ParenthesesContext) => void;

	/**
	 * Enter a parse tree produced by the `FuncCall`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterFuncCall?: (ctx: FuncCallContext) => void;
	/**
	 * Exit a parse tree produced by the `FuncCall`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitFuncCall?: (ctx: FuncCallContext) => void;

	/**
	 * Enter a parse tree produced by the `Equal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterEqual?: (ctx: EqualContext) => void;
	/**
	 * Exit a parse tree produced by the `Equal`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitEqual?: (ctx: EqualContext) => void;

	/**
	 * Enter a parse tree produced by the `NotEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNotEqual?: (ctx: NotEqualContext) => void;
	/**
	 * Exit a parse tree produced by the `NotEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNotEqual?: (ctx: NotEqualContext) => void;

	/**
	 * Enter a parse tree produced by the `GreaterThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterGreaterThanOrEqual?: (ctx: GreaterThanOrEqualContext) => void;
	/**
	 * Exit a parse tree produced by the `GreaterThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitGreaterThanOrEqual?: (ctx: GreaterThanOrEqualContext) => void;

	/**
	 * Enter a parse tree produced by the `LessThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLessThanOrEqual?: (ctx: LessThanOrEqualContext) => void;
	/**
	 * Exit a parse tree produced by the `LessThanOrEqual`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLessThanOrEqual?: (ctx: LessThanOrEqualContext) => void;

	/**
	 * Enter a parse tree produced by the `GreaterThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterGreaterThan?: (ctx: GreaterThanContext) => void;
	/**
	 * Exit a parse tree produced by the `GreaterThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitGreaterThan?: (ctx: GreaterThanContext) => void;

	/**
	 * Enter a parse tree produced by the `LessThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLessThan?: (ctx: LessThanContext) => void;
	/**
	 * Exit a parse tree produced by the `LessThan`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLessThan?: (ctx: LessThanContext) => void;

	/**
	 * Enter a parse tree produced by the `LogicalAnd`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLogicalAnd?: (ctx: LogicalAndContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalAnd`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLogicalAnd?: (ctx: LogicalAndContext) => void;

	/**
	 * Enter a parse tree produced by the `LogicalOr`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLogicalOr?: (ctx: LogicalOrContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalOr`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLogicalOr?: (ctx: LogicalOrContext) => void;

	/**
	 * Enter a parse tree produced by the `LogicalNot`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLogicalNot?: (ctx: LogicalNotContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalNot`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLogicalNot?: (ctx: LogicalNotContext) => void;

	/**
	 * Enter a parse tree produced by the `Power`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterPower?: (ctx: PowerContext) => void;
	/**
	 * Exit a parse tree produced by the `Power`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitPower?: (ctx: PowerContext) => void;

	/**
	 * Enter a parse tree produced by the `Multiplication`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMultiplication?: (ctx: MultiplicationContext) => void;
	/**
	 * Exit a parse tree produced by the `Multiplication`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMultiplication?: (ctx: MultiplicationContext) => void;

	/**
	 * Enter a parse tree produced by the `Division`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterDivision?: (ctx: DivisionContext) => void;
	/**
	 * Exit a parse tree produced by the `Division`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitDivision?: (ctx: DivisionContext) => void;

	/**
	 * Enter a parse tree produced by the `Addition`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAddition?: (ctx: AdditionContext) => void;
	/**
	 * Exit a parse tree produced by the `Addition`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAddition?: (ctx: AdditionContext) => void;

	/**
	 * Enter a parse tree produced by the `Subtraction`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterSubtraction?: (ctx: SubtractionContext) => void;
	/**
	 * Exit a parse tree produced by the `Subtraction`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitSubtraction?: (ctx: SubtractionContext) => void;

	/**
	 * Enter a parse tree produced by the `Modulo`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterModulo?: (ctx: ModuloContext) => void;
	/**
	 * Exit a parse tree produced by the `Modulo`
	 * labeled alternative in `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitModulo?: (ctx: ModuloContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.stat_end`.
	 * @param ctx the parse tree
	 */
	enterStat_end?: (ctx: Stat_endContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.stat_end`.
	 * @param ctx the parse tree
	 */
	exitStat_end?: (ctx: Stat_endContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.types`.
	 * @param ctx the parse tree
	 */
	enterTypes?: (ctx: TypesContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.types`.
	 * @param ctx the parse tree
	 */
	exitTypes?: (ctx: TypesContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.declare_types`.
	 * @param ctx the parse tree
	 */
	enterDeclare_types?: (ctx: Declare_typesContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.declare_types`.
	 * @param ctx the parse tree
	 */
	exitDeclare_types?: (ctx: Declare_typesContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.arg_type`.
	 * @param ctx the parse tree
	 */
	enterArg_type?: (ctx: Arg_typeContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.arg_type`.
	 * @param ctx the parse tree
	 */
	exitArg_type?: (ctx: Arg_typeContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.arg_value`.
	 * @param ctx the parse tree
	 */
	enterArg_value?: (ctx: Arg_valueContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.arg_value`.
	 * @param ctx the parse tree
	 */
	exitArg_value?: (ctx: Arg_valueContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 */
	enterBlock_stat?: (ctx: Block_statContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.block_stat`.
	 * @param ctx the parse tree
	 */
	exitBlock_stat?: (ctx: Block_statContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterStat?: (ctx: StatContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitStat?: (ctx: StatContext) => void;

	/**
	 * Enter a parse tree produced by `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `CalcParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
}

