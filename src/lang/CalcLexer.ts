// Generated from ./src/lang/Calc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CalcLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly POW = 4;
	public static readonly MUL = 5;
	public static readonly DIV = 6;
	public static readonly ADD = 7;
	public static readonly SUB = 8;
	public static readonly TRUE = 9;
	public static readonly FALSE = 10;
	public static readonly NUMBER = 11;
	public static readonly WHITESPACE = 12;
	public static readonly NEWLINE = 13;
	public static readonly SEMICOL = 14;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "POW", "MUL", "DIV", "ADD", "SUB", "TRUE", "FALSE", 
		"NUMBER", "WHITESPACE", "NEWLINE", "SEMICOL",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'.'", "'('", "')'", "'^'", "'*'", "'/'", "'+'", "'-'", "'true'", 
		"'false'", undefined, undefined, undefined, "';'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "POW", "MUL", "DIV", "ADD", 
		"SUB", "TRUE", "FALSE", "NUMBER", "WHITESPACE", "NEWLINE", "SEMICOL",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CalcLexer._LITERAL_NAMES, CalcLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CalcLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(CalcLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Calc.g4"; }

	// @Override
	public get ruleNames(): string[] { return CalcLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return CalcLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return CalcLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return CalcLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x10M\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t" +
		"\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\f\x06\f<\n\f\r\f\x0E\f=\x03\r\x06\rA\n\r\r\r\x0E\rB\x03\r\x03\r" +
		"\x03\x0E\x05\x0EH\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x02\x02\x02\x10" +
		"\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02" +
		"\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D" +
		"\x02\x10\x03\x02\x04\x03\x022;\x04\x02\v\v\"\"\x02O\x02\x03\x03\x02\x02" +
		"\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02" +
		"\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02" +
		"\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02" +
		"\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02" +
		"\x02\x1D\x03\x02\x02\x02\x03\x1F\x03\x02\x02\x02\x05!\x03\x02\x02\x02" +
		"\x07#\x03\x02\x02\x02\t%\x03\x02\x02\x02\v\'\x03\x02\x02\x02\r)\x03\x02" +
		"\x02\x02\x0F+\x03\x02\x02\x02\x11-\x03\x02\x02\x02\x13/\x03\x02\x02\x02" +
		"\x154\x03\x02\x02\x02\x17;\x03\x02\x02\x02\x19@\x03\x02\x02\x02\x1BG\x03" +
		"\x02\x02\x02\x1DK\x03\x02\x02\x02\x1F \x070\x02\x02 \x04\x03\x02\x02\x02" +
		"!\"\x07*\x02\x02\"\x06\x03\x02\x02\x02#$\x07+\x02\x02$\b\x03\x02\x02\x02" +
		"%&\x07`\x02\x02&\n\x03\x02\x02\x02\'(\x07,\x02\x02(\f\x03\x02\x02\x02" +
		")*\x071\x02\x02*\x0E\x03\x02\x02\x02+,\x07-\x02\x02,\x10\x03\x02\x02\x02" +
		"-.\x07/\x02\x02.\x12\x03\x02\x02\x02/0\x07v\x02\x0201\x07t\x02\x0212\x07" +
		"w\x02\x0223\x07g\x02\x023\x14\x03\x02\x02\x0245\x07h\x02\x0256\x07c\x02" +
		"\x0267\x07n\x02\x0278\x07u\x02\x0289\x07g\x02\x029\x16\x03\x02\x02\x02" +
		":<\t\x02\x02\x02;:\x03\x02\x02\x02<=\x03\x02\x02\x02=;\x03\x02\x02\x02" +
		"=>\x03\x02\x02\x02>\x18\x03\x02\x02\x02?A\t\x03\x02\x02@?\x03\x02\x02" +
		"\x02AB\x03\x02\x02\x02B@\x03\x02\x02\x02BC\x03\x02\x02\x02CD\x03\x02\x02" +
		"\x02DE\b\r\x02\x02E\x1A\x03\x02\x02\x02FH\x07\x0F\x02\x02GF\x03\x02\x02" +
		"\x02GH\x03\x02\x02\x02HI\x03\x02\x02\x02IJ\x07\f\x02\x02J\x1C\x03\x02" +
		"\x02\x02KL\x07=\x02\x02L\x1E\x03\x02\x02\x02\x06\x02=BG\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CalcLexer.__ATN) {
			CalcLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CalcLexer._serializedATN));
		}

		return CalcLexer.__ATN;
	}

}

