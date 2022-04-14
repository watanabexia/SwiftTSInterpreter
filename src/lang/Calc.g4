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
REQUIRED: 'required';
INIT: 'init';
RTN: 'return';

CLASS: 'class';
PROTOCOL: 'protocol';

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

//built_in: PRINT
//        | INT
//        ;

/*
Function Arguments
*/
arg_type: id=ID ':' type=types ','?
   ;

arg_value: id=ID ':' value=expr ','?
         ;

/*
Protocol
*/
protocol_body: '{' body=protocol_stat* '}'                                       # ProtocolBody
             | '{\n' body=protocol_stat* '}'                                     # ProtocolBody
             ;

protocol_stat: declare_type=declare_types id=ID ':' type=types '{' get='get' (set='set')? '}' stat_end?  # PropertyRequirement
             | FUNC id=ID '(' argument=arg_type* ')' ('->' type=types)? stat_end?                        # MethodRequirement
             | INIT '(' argument=arg_type* ')' stat_end?                                                 # InitRequirement
             | NEWLINE                                                                                   # EmptyRequirement
             ;

/*
Class
*/
class_body: '{' body=class_stat* '}'                                           # ClassBody
          | '{\n' body=class_stat* '}'                                         # ClassBody
          ;

class_stat: declare_type=declare_types id=ID '=' value=expr stat_end?                             # StorPropDeclStat
          | declare_type=declare_types id=ID ':' type=types stat_end?                             # StorPropTypeDeclStat
          | declare_type=declare_types id=ID ':' type=types body=comp_prop_block_stat stat_end?   # CompPropDeclStat
          | (required=REQUIRED)? INIT '(' argument=arg_type* ')' body=block_stat stat_end?        # InitStat
          | FUNC id=ID '(' argument=arg_type* ')' ('->' type=types)? body=block_stat stat_end?    # MethodStat
          | NEWLINE                                                                               # ClassEmptStat
          ;

/*
Computed Property
*/
comp_prop_block_stat: '{' body=comp_prop_stat* '}'                     # CompPropBody
                    | '{\n' body=comp_prop_stat* '}'                   # CompPropBody
                    ;

comp_prop_stat: id='get' body=block_stat stat_end?                        # GetStat
              | id='set' '(' input=ID')' body=block_stat stat_end?        # SetStat
              | NEWLINE                                                   # CompPropEmptStat
              ;

/*
others
*/
block_stat: '{' body=stat* '}'                                                          # BlockStat
          | '{\n' body=stat* '}'                                                        # BlockStat
          ;

stat: expression=expr stat_end                                                           # ExprStat
    | IF test=expr consequent=block_stat (ELSE alternate=block_stat)? stat_end?          # IfStatement
    | IF test=expr consequent=block_stat (ELSE alternate=stat)? stat_end?                # IfStatement
    | declare_type=declare_types id=ID ':' type=types stat_end?                          # DeclareStat
    | declare_type=declare_types id=ID '=' value=expr stat_end?                          # DeclareValueStat
    | obj=ID '.' prop=ID '=' value=expr stat_end?                                        # CompPropAssignStat
    | id=ID '=' value=expr stat_end?                                                     # AssignStat
    | FUNC id=ID '(' argument=arg_type* ')' ('->' type=types)? body=block_stat stat_end? # FuncDeclareStat
    | CLASS id=ID (':' superclass=ID)? body=class_body stat_end?                         # ClassDeclareStat
    | PROTOCOL id=ID body=protocol_body stat_end?                                        # ProtocolDeclareStat
    | RTN value=expr stat_end?                                                           # ReturnStat
    | NEWLINE                                                                            # EmptStat
    | NEWLINE EOF                                                                        # EmptStat
    ;

expr
   : ID                                                 # Name
   | NUMBER                                             # Number
   | TRUE                                               # True
   | FALSE                                              # False
   | STR                                                # String
   | object=ID '.' method=ID '('argument=arg_value*')'  # MethodCall
   | object=ID '.' property=ID                          # MemberExpression
   | int=NUMBER '.' frac=NUMBER                         # Decimal
   | '(' inner=expr ')'                                 # Parentheses
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
//   | id=built_in '(' argument=expr ')'                  # BIFuncCall
   ;