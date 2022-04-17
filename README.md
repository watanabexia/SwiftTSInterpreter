# Swift-Barcelona: Swift Language Support for Source Academy
Swift-Barcelona is a subset of Swift 5. This repository is the Source-academy compatible implementation of Swift-Barcelona, conforming to the `<language>-slang` API.

Installation
=====

To write Swift-Barcelona codes on Source Academy on your local machine,

## Clone repository
1. Clone the repository [cs4215-project-2022-barcelona](https://github.com/nus-cs4215/cs4215-project-2022-barcelona) to your machine.

This repository contains the implementation of Swift-Barcelona.

2. Clone the repository [cs4215-project-2022-frontend-barcelona](https://github.com/nus-cs4215/cs4215-project-2022-frontend-barcelona) to the same
folder on your machine. 

This repository contains the Source Academy.

## Build Swift-Barcelona
1. Go to the repository folder `cs4215-project-2022-barcelona` in the terminal.
2. Run the following command to install required dependencies:
``` {.}
$ yarn install
```
3. Replace the file `node_modules/@types/estree/index.d.ts` with [this file](https://github.com/nus-cs4215/cs4215-project-2022-barcelona/blob/master/node_modules/%40types/estree/index.d.ts).

The reason for this step is that installing the dependencies in the previous
step would overwrite the modified ESTree file, and the modified ESTree file is
necessary for Swift-Barcelona.

4. Generate the antlr4ts lexer and parser with the following command:
``` {.}
$ yarn run antlr4ts
```
5. Delete line 9-11 of the file `src/lang/CalcLexer.ts`.
``` typescript
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators"; // REMOVE
import { Override } from "antlr4ts/Decorators"; // REMOVE
import { RuleContext } from "antlr4ts/RuleContext"; // REMOVE
import { Vocabulary } from "antlr4ts/Vocabulary";
```

The reason for this step is that although `NotNull`, `Override`, `RuleContext` are auto-generated, they are never used in this file which will stop users from building the project.

6. Delete line 7, 9, 13-14 of the file `src/lang/CalcParser.ts`.
``` typescript
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators"; // REMOVE
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators"; // REMOVE
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener"; // REMOVE
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor"; // REMOVE
import { RecognitionException } from "antlr4ts/RecognitionException";
```

The reason for this step is that although `NotNull`, `Override`,
`ParserTreeListener`, `ParserTreeVisitor` are auto-generated, they are
never used in this file which will stop users from building the project.

7. Build the project with the following command:
```{.}
$ yarn build
```
8.  Link the project:
```{.}
$ yarn link
```

## Link to, build and run Source Academy

1. Go to the folder `cs4215-project-2022-frontend-barcelona` in the terminal.
    
2. Link the frontend to the built implementation of Swift-Barcelona:
```{.}
$ yarn link x-slang
```
3.  Delete line 49 of the file `package.json`
```json
"flexboxgrid-helpers": "^1.1.3",
"x-slang": "^0.4.70", // REMOVE
"lodash": "^4.17.20",
```

The reason for this step is that we are using the x-slang of our own. Delete
this line so that it will not try to find x-slang online when installing the
dependencies in the next step. We will need to add it back after installing the dependencies in step 16.

4.  Install required dependencies:
```{.}
$ yarn install
```
5. Add
`"x-slang":"^0.4.70",`
back to the file `package.json`.
```json
"flexboxgrid-helpers": "^1.1.3",
"x-slang": "^0.4.70", // ADD
"lodash": "^4.17.20",
```

6. Start the Source Academy:
```{.}
$ yarn run start
```
7. When you see `Compiled successfully!` in the terminal, access Source
Academy in your browser at [localhost:8000](http://localhost:8000).

## Happy coding!

Test Case
=====
The sample test code can be found in [testcase](https://github.com/nus-cs4215/cs4215-project-2022-barcelona/tree/master/testcase).