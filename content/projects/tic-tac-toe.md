---
title: Tic-Tac-Toe, Framework by Framework
description: "The same game built independently in different frontend stacks, React on one side and Python's FastHTML with HTMX on the other, as a small, comparable playground for trying frameworks."
category: web
skills: [React, JavaScript, Python, FastHTML, HTMX]
github: https://github.com/lorainemg/tic-tac-toe
featured: false
weight: 24
---

Tic-tac-toe is small enough to build in an afternoon but complete enough
to exercise what matters in a frontend framework: state, events,
conditional rendering, and components. This repository uses it as a fixed
problem for comparing stacks, each implementation written on its own in
its own idiom, with no shared logic, because the point is to see how each
framework wants you to think.

The React version extends the classic board with time-travel: it keeps
every move in history, lets you revisit any past state, and highlights
the winning line when the game ends. The FastHTML version flips the
model: the game is server-rendered Python, with HTMX attributes wiring
clicks to routes, so the board updates without a line of handwritten
JavaScript.

Two implementations so far, with room for more: a small, honest
playground for asking "what does this framework feel like?" with the
same game every time.
