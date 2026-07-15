---
title: Vimasm, A Text Editor in Pure Assembly
description: "A Vim-like text editor written entirely in x86 assembly that boots directly on the hardware: no operating system, no libraries, just the keyboard, the screen, and the code in between."
category: systems
skills: [Assembly (NASM), x86, Low-Level Programming, Operating Systems, Bare Metal]
github: https://github.com/lorainemg/vimasm
featured: true
weight: 5
---

A recreation of Vim's core editing experience built with no safety net at
all: the entire editor is written in x86 assembly and boots directly on the
machine through GRUB, with no operating system underneath. Every capability
a programmer normally takes for granted (reading a keystroke, drawing a
character, remembering what changed) had to be built from the hardware up.

The editor implements the essence of Vim: modal editing with normal, visual,
and replace modes, operators and movement commands with repetition counts,
block selection, find and replace, text search, and undo.

Under the hood, that means direct keyboard input handling, video memory
manipulation for rendering, and text buffer management with undo history,
all in assembly, organized into clean modules for booting, input, display,
and each editing mode.

Built as a systems programming project, it's the kind of exercise that
permanently changes how you read the phrase "high-level language."
