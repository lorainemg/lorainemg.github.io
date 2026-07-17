---
title: Grammar Analyzer
description: "A web tool that analyzes context-free grammars: computes their key properties, determines which parser families can handle them, and suggests transformations to fix problematic grammars."
category: compilers
skills: [Python, Flask, Compiler Theory, Parsing, Formal Languages, Automata]
github: https://github.com/lorainemg/grammar-analyzer
featured: false
weight: 26
---

Anyone who has taken a compilers course knows the tedious part: computing
First and Follow sets by hand, building parsing tables, and figuring out
whether a grammar is LL(1) or needs a more powerful parser. This tool
automates all of it through a web interface: you type in a context-free
grammar and get the full analysis back.

Given a grammar, the analyzer computes its First and Follow sets and
determines which parsing techniques can handle it, checking LL(1), SLR, LR
and LALR compatibility. When a grammar has problems, the tool doesn't just
report them: it eliminates common prefixes and immediate left recursion,
producing a cleaned, transformed version without superfluous productions.

For regular grammars it goes further, converting them into their equivalent
finite automata and regular expressions, connecting the different formal
representations students usually study in isolation.

Built in Python with all the grammar algorithms implemented from scratch,
served through a Flask web app.
