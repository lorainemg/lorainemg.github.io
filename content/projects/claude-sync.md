---
title: Claude Sync
description: "A desktop app that keeps MCP server configurations in sync between Claude Desktop and Claude Code, with special care for the messy realities of running both across Windows and WSL."
category: tooling
skills: [Python, Flet, Pydantic, MCP, Desktop GUI]
github: https://github.com/lorainemg/claude-sync
featured: false
weight: 9
---

Claude Desktop and Claude Code each keep their own list of MCP (Model
Context Protocol) servers, in different files with different formats. Set
up a server in one and the other knows nothing about it. Claude Sync is a
small desktop app that fixes that: a two-pane view showing each side's
servers, with one-click copying in either direction and a management tab
for cleaning up.

The interesting part is the WSL support. Claude Desktop runs on Windows,
but the actual MCP servers often live inside WSL, where the language
runtimes are. The app bridges that gap automatically: it wraps commands
with `wsl.exe` through a login shell so version managers like nvm resolve
correctly, inlines environment variables (since Windows can't pass them
into WSL), and converts remote servers into a local proxy for Desktop,
which only speaks stdio.

It also manages Claude Code skills, importing and exporting them as
portable archives. Everything reads and writes the official config files
directly, preserving any fields it doesn't understand, and the providers
sit behind a common interface so other tools (Cursor, Windsurf) can be
added later.

Built with Flet, Python's Flutter-based UI framework, as a scratch-my-own
-itch tool that turned out to be a nice exercise in cross-platform paths
and config-file diplomacy.
