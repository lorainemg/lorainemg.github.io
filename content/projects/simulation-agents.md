---
title: Intelligent Agents Simulation
description: "A multi-agent simulation where a robot must keep a house clean while children move around making a mess, testing how reactive agent behavior holds up in a changing environment."
category: ai
skills: [Python, Intelligent Agents, Simulation, AI]
github: https://github.com/lorainemg/agent
featured: false
weight: 28
---

An agent-based simulation with a mischievous premise: a robot must keep a
house clean while children wander around making dirt. The robot wins if it
pens all the children and gets the house spotless; it loses if dirt ever
covers 60% of the floor.

The house is a discrete grid where everything happens in turns: agents act
first, then the environment changes on its own at random intervals, so the
robot's plans keep breaking. The robot sees the full state of the world
and must decide, every turn, whether to chase children, carry them to the
playpen, or clean, and in which order, with its strategy racing the spread
of mess.

The project tests how different agent behaviors hold up under this
pressure, with a written report on the strategies and their results across
simulation runs.

Written in Python from scratch, including the environment, the agents, and
the simulation loop.
