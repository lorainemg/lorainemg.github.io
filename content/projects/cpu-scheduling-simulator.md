---
title: CPU Scheduler Simulator
description: "A simulator of how operating systems share the processor between competing jobs, with four classic scheduling algorithms and a comparison of their performance."
category: systems
skills: [Python, NumPy, Operating Systems, Scheduling Algorithms, Simulation]
github: https://github.com/lorainemg/scheduler
featured: false
weight: 18
---

A simulator for a core operating systems question: given many jobs
competing for one processor, in what order should they run? The project
builds four classic scheduling strategies from scratch: First-Come
First-Served, Shortest Job First, Shortest Time to Completion First, and
Round Robin.

The simulator models jobs with different arrival times, run lengths, and
I/O interruptions, runs them through each strategy, and measures the
results with standard metrics such as turnaround time and response time.
This makes the trade-offs concrete: some strategies favor short jobs, some
favor fairness, and the numbers show what each choice costs.

Written in Python with the job model, the scheduling algorithms, and the
metrics kept separate, so new strategies are easy to add and compare.
