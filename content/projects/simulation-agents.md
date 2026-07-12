---
title: Simulation Agents
description: "Simulates agents interacting within a dynamic environment, modeled as a discrete NxM grid containing obstacles, dirt, children, a barnyard (corral), and house robots (agents). The simulation operates in discrete time steps; the environment is fully observable. Agents act in turns (one action per turn), then the environment may change; one unit of time comprises an agent turn plus an environment change turn. Elements: obstacles (single space, movable), dirt (appears on empty cells), corral (adjacent squares equal to child count), children (move randomly, push obstacles, generate dirt based on quantity). House robots clean, control children, move one square normally or two while carrying a child. Simulation ends when the house reaches 60% dirty (robot fired) or all children are penned and 100% of squares are clean."
category: ml-nlp
skills: [Python]
github: https://github.com/lorainemg/agent
featured: false
weight: 21
---
