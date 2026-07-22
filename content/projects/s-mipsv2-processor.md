---
title: S-MIPSv2 Processor in Logisim
description: "A 32-bit MIPS-style processor built gate by gate in Logisim: register file, ALU, control unit, and split instruction/data caches, verified by running real assembly programs on it."
category: systems
skills: [Logisim, Computer Architecture, Digital Logic, MIPS Assembly, Python]
github: https://github.com/lorainemg/s-mipsv2-processor
featured: false
weight: 14
---

A complete 32-bit processor implementing the S-MIPSv2 instruction set
(Simplified MIPS), designed wholly in Logisim, the digital logic
simulator. The CPU has 32 general-purpose registers (R0 hardwired to
zero, R31 the stack pointer), Hi/Lo registers for multiplication and
division results, and plugs into a fixed memory board used for grading,
so the whole design lives in the processor itself.

The datapath is built from named subcircuits: instruction fetcher and
program counter, decoder, register file, ALU, and control unit, plus
separate instruction and data caches backed by RAM, with a wait circuit
to stall the processor during memory access. Every piece is wired from
Logisim primitives, with no black boxes.

Hand-written assembly programs verify the processor: arithmetic and
signed/unsigned multiplication and division, memory loads and stores,
stack push and pop, branching, and interactive programs that read the
keyboard and print to a TTY. A companion Python script parses the circuit
file and computes the hardware "cost" of the design, pricing every gate,
multiplexer, and RAM block, because in this course a working CPU was not
enough; it had to be cheap.
