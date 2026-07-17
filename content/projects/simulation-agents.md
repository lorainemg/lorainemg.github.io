---
title: Intelligent Agents Simulation
description: "A multi-agent simulation where an autonomous robot must keep a house clean while children move around making a mess, exploring how reactive agent behavior performs in a dynamic environment."
category: ai
skills: [Python, Intelligent Agents, Simulation, AI]
github: https://github.com/lorainemg/agent
featured: false
weight: 28
---

An agent-based simulation with a mischievous premise: an autonomous robot
must keep a house clean while children wander around generating dirt. The
robot succeeds if it pens all the children and gets the house spotless; it
fails if dirt ever covers 60% of the floor.

The house is modeled as a discrete grid where everything happens in turns:
agents act first, then the environment changes on its own at random
intervals, so the robot's plans are constantly being disrupted. The robot
observes the full state of the world and must decide, every turn, whether to
chase children, carry them to the playpen, or clean, and in which order,
with its strategy competing against the pace of chaos.

The project explores how different agent behaviors perform under this
pressure, with a written report analyzing the strategies and their results
across simulation runs.

Implemented in Python from scratch, including the environment, the agents,
and the simulation loop.
