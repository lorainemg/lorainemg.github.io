---
title: COOL Compiler to MIPS
description: "A complete compiler for COOL, a statically-typed object-oriented language, that goes from source code to runnable MIPS assembly through all four classic phases: lexing, parsing, semantic analysis, and code generation."
category: compilers
skills: [Python, PLY, Compilers, Type Systems, MIPS Assembly, Visitor Pattern]
github: https://github.com/lorainemg/cool-compiler-2020
featured: true
weight: 6
---

A full compiler for COOL (Classroom Object-Oriented Language), a small
statically-typed language with classes, inheritance, and automatic memory
management. The compiler takes a COOL program and produces MIPS assembly
that runs on the SPIM simulator, passing through every stage a textbook
compiler has.

The lexer and parser are built with PLY (Python Lex-Yacc), including
lexer states for nested comments and error productions for syntactic
recovery. Semantic analysis runs four visitor passes over the AST:
collecting the declared types, building their attributes and inheritance
relations, resolving variables and scopes, and finally type-checking the
whole program with COOL's standard error categories.

Code generation happens in two steps. The AST is first lowered to CIL, a
custom three-address intermediate language, and then translated to MIPS
with register allocation following the standard MIPS convention. The
compiler is validated against a suite of roughly 390 test cases covering
every phase, from malformed tokens to complete programs (Game of Life,
prime sieves, a book list manager) whose output is compared against
expected results.

Built by a team of three for the compilers course in 4th year of Computer
Science at the University of Havana — the class where languages stop
being magic.
