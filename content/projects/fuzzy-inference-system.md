---
title: Fuzzy Inference System
description: "A fuzzy logic engine built from scratch that reasons with imprecise concepts like 'near' or 'hot', covering the full pipeline from fuzzification to defuzzification."
category: ai
skills: [Python, Fuzzy Logic, Inference Systems, Control Systems]
github: https://github.com/lorainemg/fuzzy-inference-system
featured: false
weight: 22
---

Classical logic forces every statement to be true or false, but human
reasoning works in degrees: a camera subject is not "in focus" or "out of
focus", it is somewhat in focus. Fuzzy inference systems formalize that
kind of reasoning, and this project builds one from scratch, with no fuzzy
logic libraries.

The code covers the full inference pipeline. Membership functions
(triangular, trapezoidal, and S-shaped) turn crisp inputs into fuzzy
values. The engine evaluates rules with fuzzy set operations, aggregates
them with either of two classic inference methods, Mamdani and Larsen,
and turns the fuzzy result back into a concrete output through six
defuzzification strategies, from centroid of area to mean of maximum.

A camera autofocus case study exercises the system: an interactive example
where you give the inputs, pick the inference and defuzzification methods,
and watch how each combination changes the decision.

Written in Python with full notes on the theory behind each component.
