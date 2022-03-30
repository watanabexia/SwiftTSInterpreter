grammar Calc;

/*
 * Tokens (terminal)
 */
POW: '^';
MUL: '*';
DIV: '/';
ADD: '+';
SUB: '-';
MOD: '%';
TRUE: 'true';
FALSE: 'false';
EQUAL: '==';
NOTEQUAL: '!=';
GREATERTHANOREQUAL: '>=';
LESSTHANOREQUAL: '<=';
GREATERTHAN: '>';
LESSTHAN: '<';
LOGICALAND: '&&';
LOGICALOR: '||';
LOGICALNOT: '!';
NUMBER: [0-9]+;
WHITESPACE: [ \t]+ -> skip;
NEWLINE: '\r'? '\n';
SEMICOL: ';' ;
LINE_COMMENT: '//' ~[\r\n]* '\r'? '\n' -> skip;

LET: 'let';
VAR: 'var';

INT: 'Int';
DOUBLE: 'Double';
BOOL: 'Bool';
STRING: 'String';

FUNC: 'func';
RTN: 'return';

IF: 'if';
ELSE: 'else';

PRINT: 'print';

ID: [a-zA-Z_] [a-zA-Z0-9_]*;
STR: '"' ~[\r\n]* '"';

/*
 * Productions
 */
prog: stat* ;

stat_end: NEWLINE
        | SEMICOL NEWLINE
        | EOF
        | SEMICOL EOF
        | SEMICOL
        ;

types: INT
     | DOUBLE
     | BOOL
     | STRING
     ;

declare_types: LET
             | VAR
             ;

built_in: PRINT
        | INT
        ;

arg_type: id=ID ':' type=types ','?
   ;

arg_value: id=ID ':' value=expr ','?
         ;

block_stat: '{' body=stat* '}'                                     # BlockStat
          | '{\n' body=stat* '}'                                   # BlockStat
          ;

stat: expression=expr stat_end                                                          # ExprStat
    | IF test=expr consequent=block_stat (ELSE alternate=block_stat)? stat_end?         # IfStatement
    | IF test=expr consequent=block_stat (ELSE alternate=stat)? stat_end?               # IfStatement
    | declare_type=declare_types id=ID ':' type=types stat_end                          # DeclareStat
    | declare_type=declare_types id=ID '=' value=expr stat_end                          # DeclareValueStat
    | id=ID '=' value=expr stat_end                                                     # AssignStat
    | FUNC id=ID '(' argument=arg_type* ')' ('->' type=types)? body=block_stat stat_end # FuncDeclareStat
    | RTN value=expr stat_end                                                           # ReturnStat
    | NEWLINE                                                                           # EmptStat
    | NEWLINE EOF                                                                       # EmptStat
    ;


expr
   : ID                                                 # Name
   | NUMBER                                             # Number
   | TRUE                                               # True
   | FALSE                                              # False
   | STR                                                # String
   | int=NUMBER '.' frac=NUMBER                         # Decimal
   | '(' inner=expr ')'                                 # Parentheses
   | id=built_in '(' argument=expr ')'                  # BIFuncCall
   | id=ID '(' argument=arg_value* ')'                  # FuncCall
   | left=expr operator=MOD right=expr                  # Modulo
   | left=expr operator=MUL right=expr                  # Multiplication
   | left=expr operator=DIV right=expr                  # Division
   | left=expr operator=ADD right=expr                  # Addition
   | left=expr operator=SUB right=expr                  # Subtraction
   | left=expr operator=POW right=expr                  # Power
   | left=expr operator=EQUAL right=expr                # Equal
   | left=expr operator=NOTEQUAL right=expr             # NotEqual
   | left=expr operator=GREATERTHANOREQUAL right=expr   # GreaterThanOrEqual
   | left=expr operator=LESSTHANOREQUAL right=expr      # LessThanOrEqual
   | left=expr operator=GREATERTHAN right=expr          # GreaterThan
   | left=expr operator=LESSTHAN right=expr             # LessThan
   | left=expr operator=LOGICALAND right=expr           # LogicalAnd
   | left=expr operator=LOGICALOR right=expr            # LogicalOr
   | operator=LOGICALNOT argument=expr                  # LogicalNot
   | operator=SUB argument=expr                         # Negate
   ;