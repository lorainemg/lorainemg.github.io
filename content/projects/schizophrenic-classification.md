---
title: Schizophrenia Classification from Brain Signals
description: "A machine learning study on telling schizophrenic patients from healthy controls using EEG brain responses, with wavelet-based feature extraction and SVM classification."
category: ml
skills: [Python, Signal Processing, Wavelets, SVM, EEG, Machine Learning]
github: https://github.com/lorainemg/schizophrenic-classification
featured: false
weight: 16
---

Can a machine learning model tell a schizophrenic patient from a healthy
person by their brain's electrical response to a visual stimulus? This
project explores that question on real clinical data: EEG recordings of
evoked potentials from the P300 visual paradigm, in a dataset of 54
patients and 54 healthy controls matched by age and sex.

The raw brain signals are too noisy to classify directly, so the first
step pulls structure out of them: a discrete wavelet transform (Daubechies
wavelets) breaks each signal into frequency components across several
scales, yielding 180 features per subject. A Support Vector Machine trains
on those features, tested with cross-validation.

The model reaches about 63% accuracy, a modest but real signal on a hard
problem, and a full paper covers the method, results, and limits.
