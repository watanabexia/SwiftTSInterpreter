grammar Calc;

/*
 * Tokens (terminal)
 */
POW: '^';
MUL: '*';
DIV: '/';
ADD: '+';
SUB: '-';
TRUE: 'true';
FALSE: 'false';
// MOD: '%';
NUMBER: [0-9]+;
WHITESPACE: [ \t]+ -> skip;
NEWLINE: '\r'? '\n';
SEMICOL: ';' ;

/*
 * Productions
 */
prog: stat+ ;

stat: expression=expr NEWLINE                      # ExprStat
    | expression=expr SEMICOL NEWLINE              # ExprStat
    | expression=expr EOF                          # ExprStat
    | expression=expr SEMICOL EOF                  # ExprStat
    | NEWLINE                           # EmptStat
    | NEWLINE EOF                       # EmptStat
    ;

expr
   : NUMBER                             # Number
   | TRUE                               # True
   | FALSE                              # False
   | int=expr '.' frac=expr             # Decimal
   | '(' inner=expr ')'                 # Parentheses
   | left=expr operator=POW right=expr  # Power
   | left=expr operator=MUL right=expr  # Multiplication
   | left=expr operator=DIV right=expr  # Division
   | left=expr operator=ADD right=expr  # Addition
   | left=expr operator=SUB right=expr  # Subtraction
//    | left=expr operator=MOD right=expr  # Modulo
   ;