---
title: AutoGOAL - Meta-Learning Extension
description: "A meta-learning subsystem for AutoGOAL, an open-source AutoML framework: it learns from past experiments to predict which ML pipelines will do well on a new dataset, before training anything."
category: ml
skills: [Python, AutoML, Meta-Learning, Scikit-Learn, XGBoost, Machine Learning Research]
github: https://github.com/lorainemg/autogoal
links:
  - name: Experiments (thesis)
    url: https://github.com/lorainemg/experiments-thesis
  - name: Dissertation
    url: https://github.com/lorainemg/dissertation
featured: true
weight: 2
---

AutoGOAL is an open-source AutoML framework that finds machine learning
pipelines for a given problem by searching a huge space of algorithm
combinations. That search is powerful but starts from zero on every new
problem. My contribution attacks that: a meta-learning subsystem that lets
the framework learn from its own past experiments.

The idea is to treat machine learning itself as a learning problem. A set
of meta-features (size, number of classes, statistical properties)
describes every dataset, and every past experiment records how well each
pipeline performed. From that experience, a meta-learner predicts which
pipelines look promising for a dataset it has never seen, so the search
starts from likely winners instead of random guesses, cutting training
time and improving the solutions found.

The work spans the full pipeline: automated extraction of meta-features
from datasets, processing of past pipeline results into training data,
two meta-learner implementations (nearest-neighbors and a neural network
with different ranking strategies), and the experimental infrastructure
to test the approach across many datasets.

Machine learning research at the University of Havana, building on the
AutoGOAL framework created by the university's AI research group (over
100 commits on the research branch).
