---
title: Grammar Analyzer
description: "A web tool that analyzes context-free grammars: it computes their key properties, finds which parser families can handle them, and suggests fixes for problem grammars."
category: compilers
skills: [Python, Flask, Compiler Theory, Parsing, Formal Languages, Automata]
github: https://github.com/lorainemg/grammar-analyzer
featured: false
weight: 26
---

Anyone who has taken a compilers course knows the tedious part: computing
First and Follow sets by hand, building parsing tables, and working out
whether a grammar is LL(1) or needs a stronger parser. This tool does all
of it through a web interface: type in a context-free grammar and get the
full analysis back.

Given a grammar, the analyzer computes its First and Follow sets and finds
which parsing techniques can handle it, checking LL(1), SLR, LR and LALR.
When a grammar has problems, the tool does more than report them: it
removes common prefixes and immediate left recursion, producing a clean
transformed version without needless productions.

For regular grammars it goes further, converting them into their matching
finite automata and regular expressions, linking formal representations
students usually study apart.

Built in Python with every grammar algorithm written from scratch, served
through a Flask web app.
