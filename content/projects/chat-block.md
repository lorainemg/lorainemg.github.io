---
title: Chat-Block
description: "A proof-of-concept chat channel built on a blockchain: every message becomes a block, so no one can quietly edit the history."
category: misc
skills: [Python, Blockchain, Cryptographic Hashing, Data Structures]
github: https://github.com/lorainemg/chat-block
featured: false
weight: 27
---

A small experiment around one question: what if no one could quietly edit a
chat's history? Chat-Block builds a chat channel on a blockchain written
from scratch, where each message is a block linked to the one before it
through cryptographic hashes. Change a past message and the chain breaks,
so tampering shows at once.

The code is pure Python with no outside dependencies, split into small
modules with one job each: the block, the chain, and the message model,
plus configuration and usage examples.

Built to learn blockchain basics by writing them from zero rather than
using a library.
