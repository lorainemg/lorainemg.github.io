---
title: Tic-Tac-Toe, Framework by Framework
description: "The same game implemented independently in different frontend stacks — React on one side, Python's FastHTML with HTMX on the other — as a minimal, comparable playground for trying frameworks."
category: web
skills: [React, JavaScript, Python, FastHTML, HTMX]
github: https://github.com/lorainemg/tic-tac-toe
featured: false
weight: 24
---

Tic-tac-toe is small enough to build in an afternoon but complete enough
to exercise the things that matter in a frontend framework: state,
events, conditional rendering, and componentization. This repository
uses it as a fixed problem to compare stacks against, with each
implementation written independently in its own idiom — no shared logic,
because the point is to see how each framework wants you to think.

The React version extends the classic board with time-travel: every move
is kept in history, any past state can be revisited, and the winning
line is highlighted when the game ends. The FastHTML version flips the
model entirely: the game is server-rendered Python, with HTMX attributes
wiring clicks to routes, so the board updates without a line of
handwritten JavaScript.

Two implementations so far, with room for more — a small, honest
playground for answering "what does this framework actually feel like?"
with the same game every time.
