// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener'

import { ExprStatContext } from './CalcParser'
import { EmptStatContext } from './CalcParser'
import { NumberContext } from './CalcParser'
import { ParenthesesContext } from './CalcParser'
import { PowerContext } from './CalcParser'
import { MultiplicationContext } from './CalcParser'
import { DivisionContext } from './CalcParser'
import { AdditionContext } from './CalcParser'
import { SubtractionContext } from './CalcParser'
import { ProgContext } from './CalcParser'
import { StatContext } from './CalcParser'
import { ExprContext } from './CalcParser'

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
  enterExprStat?: (ctx: ExprStatContext) => void
  /**
   * Exit a parse tree produced by the `ExprStat`
   * labeled alternative in `CalcParser.stat`.
   * @param ctx the parse tree
   */
  exitExprStat?: (ctx: ExprStatContext) => void

  /**
   * Enter a parse tree produced by the `EmptStat`
   * labeled alternative in `CalcParser.stat`.
   * @param ctx the parse tree
   */
  enterEmptStat?: (ctx: EmptStatContext) => void
  /**
   * Exit a parse tree produced by the `EmptStat`
   * labeled alternative in `CalcParser.stat`.
   * @param ctx the parse tree
   */
  exitEmptStat?: (ctx: EmptStatContext) => void

  /**
   * Enter a parse tree produced by the `Number`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterNumber?: (ctx: NumberContext) => void
  /**
   * Exit a parse tree produced by the `Number`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitNumber?: (ctx: NumberContext) => void

  /**
   * Enter a parse tree produced by the `Parentheses`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterParentheses?: (ctx: ParenthesesContext) => void
  /**
   * Exit a parse tree produced by the `Parentheses`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitParentheses?: (ctx: ParenthesesContext) => void

  /**
   * Enter a parse tree produced by the `Power`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterPower?: (ctx: PowerContext) => void
  /**
   * Exit a parse tree produced by the `Power`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitPower?: (ctx: PowerContext) => void

  /**
   * Enter a parse tree produced by the `Multiplication`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterMultiplication?: (ctx: MultiplicationContext) => void
  /**
   * Exit a parse tree produced by the `Multiplication`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitMultiplication?: (ctx: MultiplicationContext) => void

  /**
   * Enter a parse tree produced by the `Division`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterDivision?: (ctx: DivisionContext) => void
  /**
   * Exit a parse tree produced by the `Division`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitDivision?: (ctx: DivisionContext) => void

  /**
   * Enter a parse tree produced by the `Addition`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterAddition?: (ctx: AdditionContext) => void
  /**
   * Exit a parse tree produced by the `Addition`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitAddition?: (ctx: AdditionContext) => void

  /**
   * Enter a parse tree produced by the `Subtraction`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterSubtraction?: (ctx: SubtractionContext) => void
  /**
   * Exit a parse tree produced by the `Subtraction`
   * labeled alternative in `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitSubtraction?: (ctx: SubtractionContext) => void

  /**
   * Enter a parse tree produced by `CalcParser.prog`.
   * @param ctx the parse tree
   */
  enterProg?: (ctx: ProgContext) => void
  /**
   * Exit a parse tree produced by `CalcParser.prog`.
   * @param ctx the parse tree
   */
  exitProg?: (ctx: ProgContext) => void

  /**
   * Enter a parse tree produced by `CalcParser.stat`.
   * @param ctx the parse tree
   */
  enterStat?: (ctx: StatContext) => void
  /**
   * Exit a parse tree produced by `CalcParser.stat`.
   * @param ctx the parse tree
   */
  exitStat?: (ctx: StatContext) => void

  /**
   * Enter a parse tree produced by `CalcParser.expr`.
   * @param ctx the parse tree
   */
  enterExpr?: (ctx: ExprContext) => void
  /**
   * Exit a parse tree produced by `CalcParser.expr`.
   * @param ctx the parse tree
   */
  exitExpr?: (ctx: ExprContext) => void
}
