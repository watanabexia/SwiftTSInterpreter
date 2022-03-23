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
IF: 'if';
ELSE: 'else';

/*
 * Productions
 */
prog: stat+ ;

stat_end: NEWLINE
        | SEMICOL NEWLINE
        | EOF
        | SEMICOL EOF
        ;

stat: expression=expr stat_end                                                      # ExprStat
    | IF test=expr consequent=block_stat (ELSE alternate=block_stat)? stat_end      # IfStatement
    | IF test=expr consequent=block_stat (ELSE alternate=stat)? stat_end            # IfStatement
    | NEWLINE                                                                       # EmptStat
    | NEWLINE EOF                                                                   # EmptStat
    ;

block_stat: '{' body=stat* '}'                                     # BlockStat
          | '{\n' body=stat* '}'                                   # BlockStat
          ;

expr
   : NUMBER                                             # Number
   | TRUE                                               # True
   | FALSE                                              # False
   | int=expr '.' frac=expr                             # Decimal
   | '(' inner=expr ')'                                 # Parentheses
   | left=expr operator=EQUAL right=expr                # Equal
   | left=expr operator=NOTEQUAL right=expr             # NotEqual
   | left=expr operator=GREATERTHANOREQUAL right=expr   # GreaterThanOrEqual
   | left=expr operator=LESSTHANOREQUAL right=expr      # LessThanOrEqual
   | left=expr operator=GREATERTHAN right=expr          # GreaterThan
   | left=expr operator=LESSTHAN right=expr             # LessThan
   | left=expr operator=LOGICALAND right=expr           # LogicalAnd
   | left=expr operator=LOGICALOR right=expr            # LogicalOr
   | operator=LOGICALNOT argument=expr                  # LogicalNot
   | left=expr operator=POW right=expr                  # Power
   | left=expr operator=MUL right=expr                  # Multiplication
   | left=expr operator=DIV right=expr                  # Division
   | left=expr operator=ADD right=expr                  # Addition
   | left=expr operator=SUB right=expr                  # Subtraction
   | left=expr operator=MOD right=expr                  # Modulo
//    | left=expr operator=MOD right=expr  # Modulo
   ;