---
title: CPU Scheduler Simulator
description: "A simulator of how operating systems share the processor between competing jobs, implementing four classic scheduling algorithms and comparing their performance."
category: systems
skills: [Python, NumPy, Operating Systems, Scheduling Algorithms, Simulation]
github: https://github.com/lorainemg/scheduler
featured: false
weight: 18
---

A simulator that answers a core operating systems question: given many jobs
competing for one processor, in what order should they run? The project
implements four classic scheduling strategies from scratch: First-Come
First-Served, Shortest Job First, Shortest Time to Completion First, and
Round Robin.

The simulator models jobs with different arrival times, execution durations,
and I/O interruptions, runs them through each scheduling strategy, and
measures the results with standard performance metrics such as turnaround
time and response time. This makes the trade-offs between algorithms
concrete: some favor short jobs, some favor fairness, and the numbers show
exactly what each choice costs.

Implemented in Python with a modular design separating the job model, the
scheduling algorithms, and the metrics, so new strategies can be added and
compared easily.
