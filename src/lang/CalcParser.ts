// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { CalcListener } from "./CalcListener";
import { CalcVisitor } from "./CalcVisitor";


export class CalcParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly POW = 11;
	public static readonly MUL = 12;
	public static readonly DIV = 13;
	public static readonly ADD = 14;
	public static readonly SUB = 15;
	public static readonly MOD = 16;
	public static readonly TRUE = 17;
	public static readonly FALSE = 18;
	public static readonly EQUAL = 19;
	public static readonly NOTEQUAL = 20;
	public static readonly GREATERTHANOREQUAL = 21;
	public static readonly LESSTHANOREQUAL = 22;
	public static readonly GREATERTHAN = 23;
	public static readonly LESSTHAN = 24;
	public static readonly LOGICALAND = 25;
	public static readonly LOGICALOR = 26;
	public static readonly LOGICALNOT = 27;
	public static readonly NUMBER = 28;
	public static readonly WHITESPACE = 29;
	public static readonly NEWLINE = 30;
	public static readonly SEMICOL = 31;
	public static readonly LINE_COMMENT = 32;
	public static readonly LET = 33;
	public static readonly VAR = 34;
	public static readonly INT = 35;
	public static readonly DOUBLE = 36;
	public static readonly BOOL = 37;
	public static readonly STRING = 38;
	public static readonly FUNC = 39;
	public static readonly RTN = 40;
	public static readonly ID = 41;
	public static readonly STR = 42;
	public static readonly RULE_prog = 0;
	public static readonly RULE_stat_end = 1;
	public static readonly RULE_types = 2;
	public static readonly RULE_declare_types = 3;
	public static readonly RULE_arg_type = 4;
	public static readonly RULE_arg_value = 5;
	public static readonly RULE_block_stat = 6;
	public static readonly RULE_stat = 7;
	public static readonly RULE_expr = 8;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "stat_end", "types", "declare_types", "arg_type", "arg_value", 
		"block_stat", "stat", "expr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "':'", "','", "'{'", "'}'", "'{\n'", "'='", "'('", "')'", "'->'", 
		"'.'", "'^'", "'*'", "'/'", "'+'", "'-'", "'%'", "'true'", "'false'", 
		"'=='", "'!='", "'>='", "'<='", "'>'", "'<'", "'&&'", "'||'", "'!'", undefined, 
		undefined, undefined, "';'", undefined, "'let'", "'var'", "'Int'", "'Double'", 
		"'Bool'", "'String'", "'func'", "'return'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "POW", "MUL", "DIV", "ADD", 
		"SUB", "MOD", "TRUE", "FALSE", "EQUAL", "NOTEQUAL", "GREATERTHANOREQUAL", 
		"LESSTHANOREQUAL", "GREATERTHAN", "LESSTHAN", "LOGICALAND", "LOGICALOR", 
		"LOGICALNOT", "NUMBER", "WHITESPACE", "NEWLINE", "SEMICOL", "LINE_COMMENT", 
		"LET", "VAR", "INT", "DOUBLE", "BOOL", "STRING", "FUNC", "RTN", "ID", 
		"STR",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalcParser._LITERAL_NAMES, CalcParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalcParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Calc.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalcParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalcParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(CalcParser._ATN, this);
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, CalcParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << CalcParser.T__6) | (1 << CalcParser.TRUE) | (1 << CalcParser.FALSE) | (1 << CalcParser.LOGICALNOT) | (1 << CalcParser.NUMBER) | (1 << CalcParser.NEWLINE))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (CalcParser.LET - 33)) | (1 << (CalcParser.VAR - 33)) | (1 << (CalcParser.FUNC - 33)) | (1 << (CalcParser.RTN - 33)) | (1 << (CalcParser.ID - 33)) | (1 << (CalcParser.STR - 33)))) !== 0)) {
				{
				{
				this.state = 18;
				this.stat();
				}
				}
				this.state = 23;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stat_end(): Stat_endContext {
		let _localctx: Stat_endContext = new Stat_endContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, CalcParser.RULE_stat_end);
		try {
			this.state = 31;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 24;
				this.match(CalcParser.NEWLINE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 25;
				this.match(CalcParser.SEMICOL);
				this.state = 26;
				this.match(CalcParser.NEWLINE);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 27;
				this.match(CalcParser.EOF);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 28;
				this.match(CalcParser.SEMICOL);
				this.state = 29;
				this.match(CalcParser.EOF);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 30;
				this.match(CalcParser.SEMICOL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public types(): TypesContext {
		let _localctx: TypesContext = new TypesContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, CalcParser.RULE_types);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 33;
			_la = this._input.LA(1);
			if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (CalcParser.INT - 35)) | (1 << (CalcParser.DOUBLE - 35)) | (1 << (CalcParser.BOOL - 35)) | (1 << (CalcParser.STRING - 35)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declare_types(): Declare_typesContext {
		let _localctx: Declare_typesContext = new Declare_typesContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, CalcParser.RULE_declare_types);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 35;
			_la = this._input.LA(1);
			if (!(_la === CalcParser.LET || _la === CalcParser.VAR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arg_type(): Arg_typeContext {
		let _localctx: Arg_typeContext = new Arg_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, CalcParser.RULE_arg_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			_localctx._id = this.match(CalcParser.ID);
			this.state = 38;
			this.match(CalcParser.T__0);
			this.state = 39;
			_localctx._type = this.types();
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === CalcParser.T__1) {
				{
				this.state = 40;
				this.match(CalcParser.T__1);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arg_value(): Arg_valueContext {
		let _localctx: Arg_valueContext = new Arg_valueContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, CalcParser.RULE_arg_value);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 43;
			_localctx._id = this.match(CalcParser.ID);
			this.state = 44;
			this.match(CalcParser.T__0);
			this.state = 45;
			_localctx._value = this.expr(0);
			this.state = 47;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === CalcParser.T__1) {
				{
				this.state = 46;
				this.match(CalcParser.T__1);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block_stat(): Block_statContext {
		let _localctx: Block_statContext = new Block_statContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, CalcParser.RULE_block_stat);
		let _la: number;
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case CalcParser.T__2:
				_localctx = new BlockStatContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 49;
				this.match(CalcParser.T__2);
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << CalcParser.T__6) | (1 << CalcParser.TRUE) | (1 << CalcParser.FALSE) | (1 << CalcParser.LOGICALNOT) | (1 << CalcParser.NUMBER) | (1 << CalcParser.NEWLINE))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (CalcParser.LET - 33)) | (1 << (CalcParser.VAR - 33)) | (1 << (CalcParser.FUNC - 33)) | (1 << (CalcParser.RTN - 33)) | (1 << (CalcParser.ID - 33)) | (1 << (CalcParser.STR - 33)))) !== 0)) {
					{
					{
					this.state = 50;
					(_localctx as BlockStatContext)._body = this.stat();
					}
					}
					this.state = 55;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 56;
				this.match(CalcParser.T__3);
				}
				break;
			case CalcParser.T__4:
				_localctx = new BlockStatContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 57;
				this.match(CalcParser.T__4);
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << CalcParser.T__6) | (1 << CalcParser.TRUE) | (1 << CalcParser.FALSE) | (1 << CalcParser.LOGICALNOT) | (1 << CalcParser.NUMBER) | (1 << CalcParser.NEWLINE))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (CalcParser.LET - 33)) | (1 << (CalcParser.VAR - 33)) | (1 << (CalcParser.FUNC - 33)) | (1 << (CalcParser.RTN - 33)) | (1 << (CalcParser.ID - 33)) | (1 << (CalcParser.STR - 33)))) !== 0)) {
					{
					{
					this.state = 58;
					(_localctx as BlockStatContext)._body = this.stat();
					}
					}
					this.state = 63;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 64;
				this.match(CalcParser.T__3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let _localctx: StatContext = new StatContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, CalcParser.RULE_stat);
		let _la: number;
		try {
			this.state = 109;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				_localctx = new ExprStatContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 67;
				(_localctx as ExprStatContext)._expression = this.expr(0);
				this.state = 68;
				this.stat_end();
				}
				break;

			case 2:
				_localctx = new DeclareStatContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 70;
				(_localctx as DeclareStatContext)._declare_type = this.declare_types();
				this.state = 71;
				(_localctx as DeclareStatContext)._id = this.match(CalcParser.ID);
				this.state = 72;
				this.match(CalcParser.T__0);
				this.state = 73;
				(_localctx as DeclareStatContext)._type = this.types();
				this.state = 74;
				this.stat_end();
				}
				break;

			case 3:
				_localctx = new DeclareValueStatContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 76;
				(_localctx as DeclareValueStatContext)._declare_type = this.declare_types();
				this.state = 77;
				(_localctx as DeclareValueStatContext)._id = this.match(CalcParser.ID);
				this.state = 78;
				this.match(CalcParser.T__5);
				this.state = 79;
				(_localctx as DeclareValueStatContext)._value = this.expr(0);
				this.state = 80;
				this.stat_end();
				}
				break;

			case 4:
				_localctx = new AssignStatContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 82;
				(_localctx as AssignStatContext)._id = this.match(CalcParser.ID);
				this.state = 83;
				this.match(CalcParser.T__5);
				this.state = 84;
				(_localctx as AssignStatContext)._value = this.expr(0);
				this.state = 85;
				this.stat_end();
				}
				break;

			case 5:
				_localctx = new FuncDeclareStatContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 87;
				this.match(CalcParser.FUNC);
				this.state = 88;
				(_localctx as FuncDeclareStatContext)._id = this.match(CalcParser.ID);
				this.state = 89;
				this.match(CalcParser.T__6);
				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === CalcParser.ID) {
					{
					{
					this.state = 90;
					(_localctx as FuncDeclareStatContext)._argument = this.arg_type();
					}
					}
					this.state = 95;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 96;
				this.match(CalcParser.T__7);
				this.state = 97;
				this.match(CalcParser.T__8);
				this.state = 98;
				(_localctx as FuncDeclareStatContext)._type = this.types();
				this.state = 99;
				(_localctx as FuncDeclareStatContext)._body = this.block_stat();
				this.state = 100;
				this.stat_end();
				}
				break;

			case 6:
				_localctx = new ReturnStatContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 102;
				this.match(CalcParser.RTN);
				this.state = 103;
				(_localctx as ReturnStatContext)._value = this.expr(0);
				this.state = 104;
				this.stat_end();
				}
				break;

			case 7:
				_localctx = new EmptStatContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 106;
				this.match(CalcParser.NEWLINE);
				}
				break;

			case 8:
				_localctx = new EmptStatContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 107;
				this.match(CalcParser.NEWLINE);
				this.state = 108;
				this.match(CalcParser.EOF);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 16;
		this.enterRecursionRule(_localctx, 16, CalcParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				_localctx = new NameContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 112;
				this.match(CalcParser.ID);
				}
				break;

			case 2:
				{
				_localctx = new NumberContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 113;
				this.match(CalcParser.NUMBER);
				}
				break;

			case 3:
				{
				_localctx = new TrueContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 114;
				this.match(CalcParser.TRUE);
				}
				break;

			case 4:
				{
				_localctx = new FalseContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 115;
				this.match(CalcParser.FALSE);
				}
				break;

			case 5:
				{
				_localctx = new StringContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 116;
				this.match(CalcParser.STR);
				}
				break;

			case 6:
				{
				_localctx = new ParenthesesContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 117;
				this.match(CalcParser.T__6);
				this.state = 118;
				(_localctx as ParenthesesContext)._inner = this.expr(0);
				this.state = 119;
				this.match(CalcParser.T__7);
				}
				break;

			case 7:
				{
				_localctx = new FuncCallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 121;
				(_localctx as FuncCallContext)._id = this.match(CalcParser.ID);
				this.state = 122;
				this.match(CalcParser.T__6);
				this.state = 126;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === CalcParser.ID) {
					{
					{
					this.state = 123;
					(_localctx as FuncCallContext)._argument = this.arg_value();
					}
					}
					this.state = 128;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 129;
				this.match(CalcParser.T__7);
				}
				break;

			case 8:
				{
				_localctx = new LogicalNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 130;
				(_localctx as LogicalNotContext)._operator = this.match(CalcParser.LOGICALNOT);
				this.state = 131;
				(_localctx as LogicalNotContext)._argument = this.expr(7);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 181;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 179;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
					case 1:
						{
						_localctx = new DecimalContext(new ExprContext(_parentctx, _parentState));
						(_localctx as DecimalContext)._int = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 134;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 135;
						this.match(CalcParser.T__9);
						this.state = 136;
						(_localctx as DecimalContext)._frac = this.expr(19);
						}
						break;

					case 2:
						{
						_localctx = new EqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as EqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 137;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 138;
						(_localctx as EqualContext)._operator = this.match(CalcParser.EQUAL);
						this.state = 139;
						(_localctx as EqualContext)._right = this.expr(16);
						}
						break;

					case 3:
						{
						_localctx = new NotEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as NotEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 140;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 141;
						(_localctx as NotEqualContext)._operator = this.match(CalcParser.NOTEQUAL);
						this.state = 142;
						(_localctx as NotEqualContext)._right = this.expr(15);
						}
						break;

					case 4:
						{
						_localctx = new GreaterThanOrEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as GreaterThanOrEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 143;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 144;
						(_localctx as GreaterThanOrEqualContext)._operator = this.match(CalcParser.GREATERTHANOREQUAL);
						this.state = 145;
						(_localctx as GreaterThanOrEqualContext)._right = this.expr(14);
						}
						break;

					case 5:
						{
						_localctx = new LessThanOrEqualContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LessThanOrEqualContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 146;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 147;
						(_localctx as LessThanOrEqualContext)._operator = this.match(CalcParser.LESSTHANOREQUAL);
						this.state = 148;
						(_localctx as LessThanOrEqualContext)._right = this.expr(13);
						}
						break;

					case 6:
						{
						_localctx = new GreaterThanContext(new ExprContext(_parentctx, _parentState));
						(_localctx as GreaterThanContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 149;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 150;
						(_localctx as GreaterThanContext)._operator = this.match(CalcParser.GREATERTHAN);
						this.state = 151;
						(_localctx as GreaterThanContext)._right = this.expr(12);
						}
						break;

					case 7:
						{
						_localctx = new LessThanContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LessThanContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 152;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 153;
						(_localctx as LessThanContext)._operator = this.match(CalcParser.LESSTHAN);
						this.state = 154;
						(_localctx as LessThanContext)._right = this.expr(11);
						}
						break;

					case 8:
						{
						_localctx = new LogicalAndContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LogicalAndContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 155;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 156;
						(_localctx as LogicalAndContext)._operator = this.match(CalcParser.LOGICALAND);
						this.state = 157;
						(_localctx as LogicalAndContext)._right = this.expr(10);
						}
						break;

					case 9:
						{
						_localctx = new LogicalOrContext(new ExprContext(_parentctx, _parentState));
						(_localctx as LogicalOrContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 158;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 159;
						(_localctx as LogicalOrContext)._operator = this.match(CalcParser.LOGICALOR);
						this.state = 160;
						(_localctx as LogicalOrContext)._right = this.expr(9);
						}
						break;

					case 10:
						{
						_localctx = new PowerContext(new ExprContext(_parentctx, _parentState));
						(_localctx as PowerContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 161;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 162;
						(_localctx as PowerContext)._operator = this.match(CalcParser.POW);
						this.state = 163;
						(_localctx as PowerContext)._right = this.expr(7);
						}
						break;

					case 11:
						{
						_localctx = new MultiplicationContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MultiplicationContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 164;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 165;
						(_localctx as MultiplicationContext)._operator = this.match(CalcParser.MUL);
						this.state = 166;
						(_localctx as MultiplicationContext)._right = this.expr(6);
						}
						break;

					case 12:
						{
						_localctx = new DivisionContext(new ExprContext(_parentctx, _parentState));
						(_localctx as DivisionContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 167;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 168;
						(_localctx as DivisionContext)._operator = this.match(CalcParser.DIV);
						this.state = 169;
						(_localctx as DivisionContext)._right = this.expr(5);
						}
						break;

					case 13:
						{
						_localctx = new AdditionContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AdditionContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 170;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 171;
						(_localctx as AdditionContext)._operator = this.match(CalcParser.ADD);
						this.state = 172;
						(_localctx as AdditionContext)._right = this.expr(4);
						}
						break;

					case 14:
						{
						_localctx = new SubtractionContext(new ExprContext(_parentctx, _parentState));
						(_localctx as SubtractionContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 173;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 174;
						(_localctx as SubtractionContext)._operator = this.match(CalcParser.SUB);
						this.state = 175;
						(_localctx as SubtractionContext)._right = this.expr(3);
						}
						break;

					case 15:
						{
						_localctx = new ModuloContext(new ExprContext(_parentctx, _parentState));
						(_localctx as ModuloContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, CalcParser.RULE_expr);
						this.state = 176;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 177;
						(_localctx as ModuloContext)._operator = this.match(CalcParser.MOD);
						this.state = 178;
						(_localctx as ModuloContext)._right = this.expr(2);
						}
						break;
					}
					}
				}
				this.state = 183;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 8:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 18);

		case 1:
			return this.precpred(this._ctx, 15);

		case 2:
			return this.precpred(this._ctx, 14);

		case 3:
			return this.precpred(this._ctx, 13);

		case 4:
			return this.precpred(this._ctx, 12);

		case 5:
			return this.precpred(this._ctx, 11);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);

		case 8:
			return this.precpred(this._ctx, 8);

		case 9:
			return this.precpred(this._ctx, 6);

		case 10:
			return this.precpred(this._ctx, 5);

		case 11:
			return this.precpred(this._ctx, 4);

		case 12:
			return this.precpred(this._ctx, 3);

		case 13:
			return this.precpred(this._ctx, 2);

		case 14:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03,\xBB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x07\x02\x16\n\x02\f\x02\x0E" +
		"\x02\x19\v\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x05\x03\"\n\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x05\x06,\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x05\x072\n\x07" +
		"\x03\b\x03\b\x07\b6\n\b\f\b\x0E\b9\v\b\x03\b\x03\b\x03\b\x07\b>\n\b\f" +
		"\b\x0E\bA\v\b\x03\b\x05\bD\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\t^\n\t\f\t\x0E\ta\v\t\x03\t\x03\t" +
		"\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05" +
		"\tp\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x07\n\x7F\n\n\f\n\x0E\n\x82\v\n\x03\n\x03\n\x03\n\x05\n" +
		"\x87\n\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\n\xB6" +
		"\n\n\f\n\x0E\n\xB9\v\n\x03\n\x02\x02\x03\x12\v\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x02\x04\x03\x02%(\x03\x02#" +
		"$\x02\xDA\x02\x17\x03\x02\x02\x02\x04!\x03\x02\x02\x02\x06#\x03\x02\x02" +
		"\x02\b%\x03\x02\x02\x02\n\'\x03\x02\x02\x02\f-\x03\x02\x02\x02\x0EC\x03" +
		"\x02\x02\x02\x10o\x03\x02\x02\x02\x12\x86\x03\x02\x02\x02\x14\x16\x05" +
		"\x10\t\x02\x15\x14\x03\x02\x02\x02\x16\x19\x03\x02\x02\x02\x17\x15\x03" +
		"\x02\x02\x02\x17\x18\x03\x02\x02\x02\x18\x03\x03\x02\x02\x02\x19\x17\x03" +
		"\x02\x02\x02\x1A\"\x07 \x02\x02\x1B\x1C\x07!\x02\x02\x1C\"\x07 \x02\x02" +
		"\x1D\"\x07\x02\x02\x03\x1E\x1F\x07!\x02\x02\x1F\"\x07\x02\x02\x03 \"\x07" +
		"!\x02\x02!\x1A\x03\x02\x02\x02!\x1B\x03\x02\x02\x02!\x1D\x03\x02\x02\x02" +
		"!\x1E\x03\x02\x02\x02! \x03\x02\x02\x02\"\x05\x03\x02\x02\x02#$\t\x02" +
		"\x02\x02$\x07\x03\x02\x02\x02%&\t\x03\x02\x02&\t\x03\x02\x02\x02\'(\x07" +
		"+\x02\x02()\x07\x03\x02\x02)+\x05\x06\x04\x02*,\x07\x04\x02\x02+*\x03" +
		"\x02\x02\x02+,\x03\x02\x02\x02,\v\x03\x02\x02\x02-.\x07+\x02\x02./\x07" +
		"\x03\x02\x02/1\x05\x12\n\x0202\x07\x04\x02\x0210\x03\x02\x02\x0212\x03" +
		"\x02\x02\x022\r\x03\x02\x02\x0237\x07\x05\x02\x0246\x05\x10\t\x0254\x03" +
		"\x02\x02\x0269\x03\x02\x02\x0275\x03\x02\x02\x0278\x03\x02\x02\x028:\x03" +
		"\x02\x02\x0297\x03\x02\x02\x02:D\x07\x06\x02\x02;?\x07\x07\x02\x02<>\x05" +
		"\x10\t\x02=<\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02?@\x03" +
		"\x02\x02\x02@B\x03\x02\x02\x02A?\x03\x02\x02\x02BD\x07\x06\x02\x02C3\x03" +
		"\x02\x02\x02C;\x03\x02\x02\x02D\x0F\x03\x02\x02\x02EF\x05\x12\n\x02FG" +
		"\x05\x04\x03\x02Gp\x03\x02\x02\x02HI\x05\b\x05\x02IJ\x07+\x02\x02JK\x07" +
		"\x03\x02\x02KL\x05\x06\x04\x02LM\x05\x04\x03\x02Mp\x03\x02\x02\x02NO\x05" +
		"\b\x05\x02OP\x07+\x02\x02PQ\x07\b\x02\x02QR\x05\x12\n\x02RS\x05\x04\x03" +
		"\x02Sp\x03\x02\x02\x02TU\x07+\x02\x02UV\x07\b\x02\x02VW\x05\x12\n\x02" +
		"WX\x05\x04\x03\x02Xp\x03\x02\x02\x02YZ\x07)\x02\x02Z[\x07+\x02\x02[_\x07" +
		"\t\x02\x02\\^\x05\n\x06\x02]\\\x03\x02\x02\x02^a\x03\x02\x02\x02_]\x03" +
		"\x02\x02\x02_`\x03\x02\x02\x02`b\x03\x02\x02\x02a_\x03\x02\x02\x02bc\x07" +
		"\n\x02\x02cd\x07\v\x02\x02de\x05\x06\x04\x02ef\x05\x0E\b\x02fg\x05\x04" +
		"\x03\x02gp\x03\x02\x02\x02hi\x07*\x02\x02ij\x05\x12\n\x02jk\x05\x04\x03" +
		"\x02kp\x03\x02\x02\x02lp\x07 \x02\x02mn\x07 \x02\x02np\x07\x02\x02\x03" +
		"oE\x03\x02\x02\x02oH\x03\x02\x02\x02oN\x03\x02\x02\x02oT\x03\x02\x02\x02" +
		"oY\x03\x02\x02\x02oh\x03\x02\x02\x02ol\x03\x02\x02\x02om\x03\x02\x02\x02" +
		"p\x11\x03\x02\x02\x02qr\b\n\x01\x02r\x87\x07+\x02\x02s\x87\x07\x1E\x02" +
		"\x02t\x87\x07\x13\x02\x02u\x87\x07\x14\x02\x02v\x87\x07,\x02\x02wx\x07" +
		"\t\x02\x02xy\x05\x12\n\x02yz\x07\n\x02\x02z\x87\x03\x02\x02\x02{|\x07" +
		"+\x02\x02|\x80\x07\t\x02\x02}\x7F\x05\f\x07\x02~}\x03\x02\x02\x02\x7F" +
		"\x82\x03\x02\x02\x02\x80~\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81" +
		"\x83\x03\x02\x02\x02\x82\x80\x03\x02\x02\x02\x83\x87\x07\n\x02\x02\x84" +
		"\x85\x07\x1D\x02\x02\x85\x87\x05\x12\n\t\x86q\x03\x02\x02\x02\x86s\x03" +
		"\x02\x02\x02\x86t\x03\x02\x02\x02\x86u\x03\x02\x02\x02\x86v\x03\x02\x02" +
		"\x02\x86w\x03\x02\x02\x02\x86{\x03\x02\x02\x02\x86\x84\x03\x02\x02\x02" +
		"\x87\xB7\x03\x02\x02\x02\x88\x89\f\x14\x02\x02\x89\x8A\x07\f\x02\x02\x8A" +
		"\xB6\x05\x12\n\x15\x8B\x8C\f\x11\x02\x02\x8C\x8D\x07\x15\x02\x02\x8D\xB6" +
		"\x05\x12\n\x12\x8E\x8F\f\x10\x02\x02\x8F\x90\x07\x16\x02\x02\x90\xB6\x05" +
		"\x12\n\x11\x91\x92\f\x0F\x02\x02\x92\x93\x07\x17\x02\x02\x93\xB6\x05\x12" +
		"\n\x10\x94\x95\f\x0E\x02\x02\x95\x96\x07\x18\x02\x02\x96\xB6\x05\x12\n" +
		"\x0F\x97\x98\f\r\x02\x02\x98\x99\x07\x19\x02\x02\x99\xB6\x05\x12\n\x0E" +
		"\x9A\x9B\f\f\x02\x02\x9B\x9C\x07\x1A\x02\x02\x9C\xB6\x05\x12\n\r\x9D\x9E" +
		"\f\v\x02\x02\x9E\x9F\x07\x1B\x02\x02\x9F\xB6\x05\x12\n\f\xA0\xA1\f\n\x02" +
		"\x02\xA1\xA2\x07\x1C\x02\x02\xA2\xB6\x05\x12\n\v\xA3\xA4\f\b\x02\x02\xA4" +
		"\xA5\x07\r\x02\x02\xA5\xB6\x05\x12\n\t\xA6\xA7\f\x07\x02\x02\xA7\xA8\x07" +
		"\x0E\x02\x02\xA8\xB6\x05\x12\n\b\xA9\xAA\f\x06\x02\x02\xAA\xAB\x07\x0F" +
		"\x02\x02\xAB\xB6\x05\x12\n\x07\xAC\xAD\f\x05\x02\x02\xAD\xAE\x07\x10\x02" +
		"\x02\xAE\xB6\x05\x12\n\x06\xAF\xB0\f\x04\x02\x02\xB0\xB1\x07\x11\x02\x02" +
		"\xB1\xB6\x05\x12\n\x05\xB2\xB3\f\x03\x02\x02\xB3\xB4\x07\x12\x02\x02\xB4" +
		"\xB6\x05\x12\n\x04\xB5\x88\x03\x02\x02\x02\xB5\x8B\x03\x02\x02\x02\xB5" +
		"\x8E\x03\x02\x02\x02\xB5\x91\x03\x02\x02\x02\xB5\x94\x03\x02\x02\x02\xB5" +
		"\x97\x03\x02\x02\x02\xB5\x9A\x03\x02\x02\x02\xB5\x9D\x03\x02\x02\x02\xB5" +
		"\xA0\x03\x02\x02\x02\xB5\xA3\x03\x02\x02\x02\xB5\xA6\x03\x02\x02\x02\xB5" +
		"\xA9\x03\x02\x02\x02\xB5\xAC\x03\x02\x02\x02\xB5\xAF\x03\x02\x02\x02\xB5" +
		"\xB2\x03\x02\x02\x02\xB6\xB9\x03\x02\x02\x02\xB7\xB5\x03\x02\x02\x02\xB7" +
		"\xB8\x03\x02\x02\x02\xB8\x13\x03\x02\x02\x02\xB9\xB7\x03\x02\x02\x02\x0F" +
		"\x17!+17?C_o\x80\x86\xB5\xB7";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalcParser.__ATN) {
			CalcParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalcParser._serializedATN));
		}

		return CalcParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public stat(): StatContext[];
	public stat(i: number): StatContext;
	public stat(i?: number): StatContext | StatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatContext);
		} else {
			return this.getRuleContext(i, StatContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_prog; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterProg) {
			listener.enterProg(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitProg) {
			listener.exitProg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Stat_endContext extends ParserRuleContext {
	public NEWLINE(): TerminalNode | undefined { return this.tryGetToken(CalcParser.NEWLINE, 0); }
	public SEMICOL(): TerminalNode | undefined { return this.tryGetToken(CalcParser.SEMICOL, 0); }
	public EOF(): TerminalNode | undefined { return this.tryGetToken(CalcParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_stat_end; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterStat_end) {
			listener.enterStat_end(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitStat_end) {
			listener.exitStat_end(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitStat_end) {
			return visitor.visitStat_end(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypesContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(CalcParser.INT, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(CalcParser.DOUBLE, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(CalcParser.BOOL, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(CalcParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_types; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterTypes) {
			listener.enterTypes(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitTypes) {
			listener.exitTypes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitTypes) {
			return visitor.visitTypes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Declare_typesContext extends ParserRuleContext {
	public LET(): TerminalNode | undefined { return this.tryGetToken(CalcParser.LET, 0); }
	public VAR(): TerminalNode | undefined { return this.tryGetToken(CalcParser.VAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_declare_types; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterDeclare_types) {
			listener.enterDeclare_types(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitDeclare_types) {
			listener.exitDeclare_types(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitDeclare_types) {
			return visitor.visitDeclare_types(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Arg_typeContext extends ParserRuleContext {
	public _id!: Token;
	public _type!: TypesContext;
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public types(): TypesContext {
		return this.getRuleContext(0, TypesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_arg_type; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterArg_type) {
			listener.enterArg_type(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitArg_type) {
			listener.exitArg_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitArg_type) {
			return visitor.visitArg_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Arg_valueContext extends ParserRuleContext {
	public _id!: Token;
	public _value!: ExprContext;
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_arg_value; }
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterArg_value) {
			listener.enterArg_value(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitArg_value) {
			listener.exitArg_value(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitArg_value) {
			return visitor.visitArg_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_statContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_block_stat; }
	public copyFrom(ctx: Block_statContext): void {
		super.copyFrom(ctx);
	}
}
export class BlockStatContext extends Block_statContext {
	public _body!: StatContext;
	public stat(): StatContext[];
	public stat(i: number): StatContext;
	public stat(i?: number): StatContext | StatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatContext);
		} else {
			return this.getRuleContext(i, StatContext);
		}
	}
	constructor(ctx: Block_statContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterBlockStat) {
			listener.enterBlockStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitBlockStat) {
			listener.exitBlockStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitBlockStat) {
			return visitor.visitBlockStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_stat; }
	public copyFrom(ctx: StatContext): void {
		super.copyFrom(ctx);
	}
}
export class ExprStatContext extends StatContext {
	public _expression!: ExprContext;
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterExprStat) {
			listener.enterExprStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitExprStat) {
			listener.exitExprStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitExprStat) {
			return visitor.visitExprStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclareStatContext extends StatContext {
	public _declare_type!: Declare_typesContext;
	public _id!: Token;
	public _type!: TypesContext;
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public declare_types(): Declare_typesContext {
		return this.getRuleContext(0, Declare_typesContext);
	}
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public types(): TypesContext {
		return this.getRuleContext(0, TypesContext);
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterDeclareStat) {
			listener.enterDeclareStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitDeclareStat) {
			listener.exitDeclareStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitDeclareStat) {
			return visitor.visitDeclareStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DeclareValueStatContext extends StatContext {
	public _declare_type!: Declare_typesContext;
	public _id!: Token;
	public _value!: ExprContext;
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public declare_types(): Declare_typesContext {
		return this.getRuleContext(0, Declare_typesContext);
	}
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterDeclareValueStat) {
			listener.enterDeclareValueStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitDeclareValueStat) {
			listener.exitDeclareValueStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitDeclareValueStat) {
			return visitor.visitDeclareValueStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignStatContext extends StatContext {
	public _id!: Token;
	public _value!: ExprContext;
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterAssignStat) {
			listener.enterAssignStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitAssignStat) {
			listener.exitAssignStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitAssignStat) {
			return visitor.visitAssignStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FuncDeclareStatContext extends StatContext {
	public _id!: Token;
	public _argument!: Arg_typeContext;
	public _type!: TypesContext;
	public _body!: Block_statContext;
	public FUNC(): TerminalNode { return this.getToken(CalcParser.FUNC, 0); }
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public types(): TypesContext {
		return this.getRuleContext(0, TypesContext);
	}
	public block_stat(): Block_statContext {
		return this.getRuleContext(0, Block_statContext);
	}
	public arg_type(): Arg_typeContext[];
	public arg_type(i: number): Arg_typeContext;
	public arg_type(i?: number): Arg_typeContext | Arg_typeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Arg_typeContext);
		} else {
			return this.getRuleContext(i, Arg_typeContext);
		}
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterFuncDeclareStat) {
			listener.enterFuncDeclareStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitFuncDeclareStat) {
			listener.exitFuncDeclareStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitFuncDeclareStat) {
			return visitor.visitFuncDeclareStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReturnStatContext extends StatContext {
	public _value!: ExprContext;
	public RTN(): TerminalNode { return this.getToken(CalcParser.RTN, 0); }
	public stat_end(): Stat_endContext {
		return this.getRuleContext(0, Stat_endContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterReturnStat) {
			listener.enterReturnStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitReturnStat) {
			listener.exitReturnStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitReturnStat) {
			return visitor.visitReturnStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EmptStatContext extends StatContext {
	public NEWLINE(): TerminalNode { return this.getToken(CalcParser.NEWLINE, 0); }
	public EOF(): TerminalNode | undefined { return this.tryGetToken(CalcParser.EOF, 0); }
	constructor(ctx: StatContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterEmptStat) {
			listener.enterEmptStat(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitEmptStat) {
			listener.exitEmptStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitEmptStat) {
			return visitor.visitEmptStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CalcParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class NameContext extends ExprContext {
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberContext extends ExprContext {
	public NUMBER(): TerminalNode { return this.getToken(CalcParser.NUMBER, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TrueContext extends ExprContext {
	public TRUE(): TerminalNode { return this.getToken(CalcParser.TRUE, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterTrue) {
			listener.enterTrue(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitTrue) {
			listener.exitTrue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitTrue) {
			return visitor.visitTrue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FalseContext extends ExprContext {
	public FALSE(): TerminalNode { return this.getToken(CalcParser.FALSE, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterFalse) {
			listener.enterFalse(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitFalse) {
			listener.exitFalse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitFalse) {
			return visitor.visitFalse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringContext extends ExprContext {
	public STR(): TerminalNode { return this.getToken(CalcParser.STR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterString) {
			listener.enterString(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitString) {
			listener.exitString(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitString) {
			return visitor.visitString(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecimalContext extends ExprContext {
	public _int!: ExprContext;
	public _frac!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterDecimal) {
			listener.enterDecimal(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitDecimal) {
			listener.exitDecimal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitDecimal) {
			return visitor.visitDecimal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesesContext extends ExprContext {
	public _inner!: ExprContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterParentheses) {
			listener.enterParentheses(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitParentheses) {
			listener.exitParentheses(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitParentheses) {
			return visitor.visitParentheses(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FuncCallContext extends ExprContext {
	public _id!: Token;
	public _argument!: Arg_valueContext;
	public ID(): TerminalNode { return this.getToken(CalcParser.ID, 0); }
	public arg_value(): Arg_valueContext[];
	public arg_value(i: number): Arg_valueContext;
	public arg_value(i?: number): Arg_valueContext | Arg_valueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Arg_valueContext);
		} else {
			return this.getRuleContext(i, Arg_valueContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterFuncCall) {
			listener.enterFuncCall(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitFuncCall) {
			listener.exitFuncCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitFuncCall) {
			return visitor.visitFuncCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public EQUAL(): TerminalNode { return this.getToken(CalcParser.EQUAL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterEqual) {
			listener.enterEqual(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitEqual) {
			listener.exitEqual(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitEqual) {
			return visitor.visitEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public NOTEQUAL(): TerminalNode { return this.getToken(CalcParser.NOTEQUAL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterNotEqual) {
			listener.enterNotEqual(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitNotEqual) {
			listener.exitNotEqual(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitNotEqual) {
			return visitor.visitNotEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanOrEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public GREATERTHANOREQUAL(): TerminalNode { return this.getToken(CalcParser.GREATERTHANOREQUAL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterGreaterThanOrEqual) {
			listener.enterGreaterThanOrEqual(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitGreaterThanOrEqual) {
			listener.exitGreaterThanOrEqual(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitGreaterThanOrEqual) {
			return visitor.visitGreaterThanOrEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LessThanOrEqualContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LESSTHANOREQUAL(): TerminalNode { return this.getToken(CalcParser.LESSTHANOREQUAL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterLessThanOrEqual) {
			listener.enterLessThanOrEqual(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitLessThanOrEqual) {
			listener.exitLessThanOrEqual(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitLessThanOrEqual) {
			return visitor.visitLessThanOrEqual(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GreaterThanContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public GREATERTHAN(): TerminalNode { return this.getToken(CalcParser.GREATERTHAN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterGreaterThan) {
			listener.enterGreaterThan(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitGreaterThan) {
			listener.exitGreaterThan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitGreaterThan) {
			return visitor.visitGreaterThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LessThanContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LESSTHAN(): TerminalNode { return this.getToken(CalcParser.LESSTHAN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterLessThan) {
			listener.enterLessThan(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitLessThan) {
			listener.exitLessThan(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitLessThan) {
			return visitor.visitLessThan(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalAndContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LOGICALAND(): TerminalNode { return this.getToken(CalcParser.LOGICALAND, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterLogicalAnd) {
			listener.enterLogicalAnd(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitLogicalAnd) {
			listener.exitLogicalAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitLogicalAnd) {
			return visitor.visitLogicalAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalOrContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LOGICALOR(): TerminalNode { return this.getToken(CalcParser.LOGICALOR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterLogicalOr) {
			listener.enterLogicalOr(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitLogicalOr) {
			listener.exitLogicalOr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitLogicalOr) {
			return visitor.visitLogicalOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalNotContext extends ExprContext {
	public _operator!: Token;
	public _argument!: ExprContext;
	public LOGICALNOT(): TerminalNode { return this.getToken(CalcParser.LOGICALNOT, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterLogicalNot) {
			listener.enterLogicalNot(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitLogicalNot) {
			listener.exitLogicalNot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitLogicalNot) {
			return visitor.visitLogicalNot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public POW(): TerminalNode { return this.getToken(CalcParser.POW, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterPower) {
			listener.enterPower(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitPower) {
			listener.exitPower(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitPower) {
			return visitor.visitPower(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicationContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public MUL(): TerminalNode { return this.getToken(CalcParser.MUL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterMultiplication) {
			listener.enterMultiplication(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitMultiplication) {
			listener.exitMultiplication(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitMultiplication) {
			return visitor.visitMultiplication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DivisionContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public DIV(): TerminalNode { return this.getToken(CalcParser.DIV, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterDivision) {
			listener.enterDivision(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitDivision) {
			listener.exitDivision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitDivision) {
			return visitor.visitDivision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditionContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ADD(): TerminalNode { return this.getToken(CalcParser.ADD, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterAddition) {
			listener.enterAddition(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitAddition) {
			listener.exitAddition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitAddition) {
			return visitor.visitAddition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubtractionContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public SUB(): TerminalNode { return this.getToken(CalcParser.SUB, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterSubtraction) {
			listener.enterSubtraction(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitSubtraction) {
			listener.exitSubtraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitSubtraction) {
			return visitor.visitSubtraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ModuloContext extends ExprContext {
	public _left!: ExprContext;
	public _operator!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public MOD(): TerminalNode { return this.getToken(CalcParser.MOD, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CalcListener): void {
		if (listener.enterModulo) {
			listener.enterModulo(this);
		}
	}
	// @Override
	public exitRule(listener: CalcListener): void {
		if (listener.exitModulo) {
			listener.exitModulo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CalcVisitor<Result>): Result {
		if (visitor.visitModulo) {
			return visitor.visitModulo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


