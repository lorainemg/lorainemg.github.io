---
title: Claude Sync
description: "A desktop app that keeps MCP server configurations in sync between Claude Desktop and Claude Code, with care for the mess of running both across Windows and WSL."
category: tooling
skills: [Python, Flet, Pydantic, MCP, Desktop GUI]
github: https://github.com/lorainemg/claude-sync
featured: false
weight: 9
---

Claude Desktop and Claude Code each keep their own list of MCP (Model
Context Protocol) servers, in different files with different formats. Set
up a server in one and the other knows nothing about it. Claude Sync is a
small desktop app that fixes that: a two-pane view of each side's servers,
one-click copying in either direction, and a management tab for cleaning
up.

The hard part is WSL. Claude Desktop runs on Windows, but the MCP servers
often live inside WSL, where the language runtimes are. The app bridges
the two: it wraps commands with `wsl.exe` through a login shell so version
managers like nvm resolve, inlines environment variables (Windows cannot
pass them into WSL), and turns remote servers into a local proxy for
Desktop, which only speaks stdio.

It also manages Claude Code skills, importing and exporting them as
portable archives. Everything reads and writes the official config files
directly, keeping any fields it does not understand, and the providers sit
behind a common interface so other tools (Cursor, Windsurf) can join
later.

Built with Flet, Python's Flutter-based UI framework, to fix my own daily
annoyance; it turned into a good exercise in cross-platform paths and
config files.
