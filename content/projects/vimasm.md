---
title: Vimasm, A Text Editor in Pure Assembly
description: "A Vim-like text editor written wholly in x86 assembly that boots straight on the hardware: no operating system, no libraries, just the keyboard, the screen, and the code in between."
category: systems
skills: [x86 Assembly, NASM, Low-Level Programming, Operating Systems, Bare Metal]
github: https://github.com/lorainemg/vimasm
featured: true
weight: 7
---

A recreation of Vim's core editing experience with nothing beneath it:
the whole editor is x86 assembly and boots straight on the machine
through GRUB, with no operating system underneath. Everything a
programmer takes for granted (reading a keystroke, drawing a character,
remembering what changed) had to be built from the hardware up.

The editor implements the essence of Vim: modal editing with normal,
visual, and replace modes, operators and movement commands with
repetition counts, block selection, find and replace, text search, and
undo.

In practice that means direct keyboard input handling, video memory
manipulation for rendering, and text buffer management with undo history,
all in assembly, split into clean modules for booting, input, display,
and each editing mode.

Built as a systems programming project, the kind of exercise that changes
for good how you read the phrase "high-level language."
