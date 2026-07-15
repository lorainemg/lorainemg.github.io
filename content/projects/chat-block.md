---
title: Chat-Block
description: "A proof-of-concept chat channel built on a blockchain structure: every message becomes a block, making the conversation history tamper-evident."
category: misc
skills: [Python, Blockchain, Cryptographic Hashing, Data Structures]
github: https://github.com/lorainemg/chat-block
featured: false
weight: 20
---

A small experiment answering a simple question: what if a chat's history
could not be silently edited? Chat-Block implements a chat channel on top of
a blockchain structure built from scratch, where each message is stored as a
block linked to the previous one through cryptographic hashes. Any attempt to
alter a past message breaks the chain, making tampering immediately
detectable.

The implementation is pure Python with no external dependencies, organized
into clean, single-responsibility modules: the block, the chain, and the
message model, plus configuration and usage examples.

Built as an educational project to understand blockchain fundamentals by
implementing them from zero rather than using a library.