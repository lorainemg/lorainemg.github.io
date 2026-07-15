---
title: Hidato Puzzle Solver & Generator
description: "A solver and generator for Hidato logic puzzles written in Haskell: it can crack any puzzle you give it, and invent new solvable ones from scratch."
category: algorithms
skills: [Haskell, Functional Programming, Backtracking, Constraint Solving]
github: https://github.com/lorainemg/Sudoku-Hidato
featured: false
weight: 10
---

Hidato is a logic puzzle where you fill a grid with consecutive numbers so
that each one touches the next, horizontally, vertically, or diagonally.
This project does both halves of the puzzle's life cycle: solving any given
board, and generating fresh puzzles of arbitrary dimensions that are
guaranteed to have a solution.

Solving is a search problem: from each placed number, the solver explores
where the next one can legally go, backtracking when a path dead-ends. The
generator works from the opposite direction, building a valid solution first
and then hiding numbers to produce a playable puzzle.

The interesting constraint is the language: everything is written in
Haskell, where the absence of mutable state pushes the whole design toward
pure functions and recursion. The result is a compact solver where the
search logic reads close to its mathematical definition, documented in an
included report.
