---
title: Trakt.tv Telegram Bot
description: "A Telegram bot written in Go that keeps a group chat in sync with Trakt.tv: new-episode notifications with streaming links, shared watch tracking, and two-way sync between chat buttons and Trakt history."
category: backend
skills: [Go, PostgreSQL, GORM, Telegram Bot API, REST APIs, OpenTelemetry, Aspire, Docker, CI/CD]
github: https://github.com/lorainemg/traktv-tg-bot
featured: true
weight: 3
---

A bot for groups that watch shows together. When a new episode of a
followed show airs, it posts a rich notification to the chat: episode
details, air date in the chat's timezone, ratings, where to stream it, and
a one-tap Stremio link. Inline buttons let each member mark the episode as
watched, and every notification tracks who in the group has caught up and
who hasn't; once everyone has, the message can quietly delete itself.

The sync is two-way. Marking an episode watched in Telegram updates Trakt,
and a background poller picks up anything watched directly on Trakt and
edits the existing chat messages to match. Beyond episodes, the bot checks
weekly trending movies, lets each user browse and follow them from the
chat, routes notifications by genre into Telegram forum topics, and
handles Trakt authentication with the OAuth device flow, so no web server
is needed.

Under the hood, commands become tasks on a channel consumed by a single
worker goroutine, with results flowing back over a second channel — a
clean concurrency model that keeps Telegram I/O separate from the logic.
Storage and Trakt access sit behind interfaces with hand-written mocks,
and nearly every module has a matching test file. The stack is GORM over
PostgreSQL with OpenTelemetry tracing end to end, and Aspire orchestrates
the bot and its database — hot reload in development, traces in the
Aspire dashboard, and a CI/CD pipeline that builds through it and deploys
to a home server on every push.

Started as a project to learn Go; it picked up production habits along
the way.
