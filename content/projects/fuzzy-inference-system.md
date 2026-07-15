---
title: Fuzzy Inference System
description: "A fuzzy logic engine built from scratch that reasons with imprecise concepts like 'near' or 'hot', implementing the full pipeline from fuzzification to defuzzification."
category: ai
skills: [Python, Fuzzy Logic, Inference Systems, Control Systems]
github: https://github.com/lorainemg/fuzzy-inference-system
featured: false
weight: 16
---

Classical logic forces every statement to be true or false, but human
reasoning works with degrees: a camera subject isn't "in focus" or "out of
focus", it's somewhat in focus. Fuzzy inference systems formalize that kind
of reasoning, and this project implements one entirely from scratch, with no
fuzzy logic libraries.

The implementation covers the full inference pipeline. Crisp input values are
fuzzified through configurable membership functions (triangular, trapezoidal,
and S-shaped). Rules are evaluated with fuzzy set operations and aggregated
using a choice of two classic inference methods, Mamdani and Larsen. The
fuzzy result is then converted back into a concrete output value through six
selectable defuzzification strategies, from centroid of area to mean of
maximum.

The system is validated with a camera autofocus case study: an interactive
example where you provide the inputs, choose the inference and
defuzzification methods, and watch how each combination changes the system's
decision.

Implemented in Python with full documentation of the theory behind each
component.
