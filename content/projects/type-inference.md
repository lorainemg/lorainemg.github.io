---
title: Type Inference for COOL
description: "An interpreter for the COOL programming language extended with automatic type inference: declare a variable as AUTO_TYPE and the system deduces what it must be."
category: compilers
skills: [Python, Flask, Compilers, Type Systems, Semantic Analysis, Interpreters]
github: https://github.com/lorainemg/type-inference
featured: false
weight: 25
---

COOL (Classroom Object-Oriented Language) is a small object-oriented
language used to teach compiler construction. This project implements an
interpreter for it with one significant extension: an AUTO_TYPE keyword that
lets programmers omit type annotations and have the interpreter figure them
out, the same convenience that powers `var` in C# or `auto` in C++.

The inference works by collecting constraints from how each value is
actually used: what a variable is initialized with, what a function returns,
what operations are applied to an attribute. From those clues the system
deduces the most concrete type it can justify. It handles progressively
harder cases, from simple variable declarations up to recursive functions,
and is honest about the limits: some cases, like mutually recursive
functions, cannot always be inferred, and the system reports this rather
than guessing.

The interpreter is written in Python and wrapped in a small Flask web
interface where you can type COOL programs and watch the inferred types come
back.
