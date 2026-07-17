---
title: AutoGOAL - Meta-Learning Extension
description: "A meta-learning subsystem for AutoGOAL, an open-source AutoML framework: it learns from past experiments to predict which ML pipelines will perform well on a new dataset, before training anything."
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

AutoGOAL is an open-source AutoML framework that automatically finds machine
learning pipelines for a given problem by searching a huge space of possible
algorithm combinations. That search is powerful but starts from zero on every
new problem. My contribution attacks exactly that: a meta-learning subsystem
that lets the framework learn from its own past experiments.

The idea is to treat machine learning itself as a learning problem. Every
dataset is described by a set of meta-features (its size, number of classes,
statistical properties), and every past experiment records how well each
pipeline performed. From that experience, a meta-learner predicts which
pipelines are promising for a dataset it has never seen, so the search can
start from likely winners instead of random guesses, reducing training time
and improving the quality of the solutions found.

The work spans the full pipeline: automated extraction of meta-features from
datasets, processing of historical pipeline results into training data, and
two meta-learner implementations (nearest-neighbors and a neural network
with different ranking strategies), plus the experimental infrastructure to
evaluate the approach across many datasets.

Developed as machine learning research at the University of Havana, building
on the AutoGOAL framework created by the university's AI research group
(over 100 commits on the research branch).
