---
title: Schizophrenia Classification from Brain Signals
description: "A machine learning study on distinguishing schizophrenic patients from healthy controls using EEG brain responses, with wavelet-based feature extraction and SVM classification."
category: ml
skills: [Python, Signal Processing, Wavelets, SVM, EEG, Machine Learning]
github: https://github.com/lorainemg/schizophrenic-classification
featured: false
weight: 11
---

Can a machine learning model tell a schizophrenic patient from a healthy
person by looking at their brain's electrical response to a visual stimulus?
This project explores that question on real clinical data: EEG recordings of
evoked potentials from the P300 visual paradigm, in a dataset of 54 patients
and 54 healthy controls matched by age and sex.

The raw brain signals are too noisy to classify directly, so the approach
first extracts meaningful structure from them: a discrete wavelet transform
(Daubechies wavelets) decomposes each signal into frequency components
across multiple scales, producing 180 features per subject. A Support Vector
Machine is then trained on those features and evaluated with
cross-validation.

The model reaches around 63% accuracy, a modest but genuine signal on a
notoriously difficult problem, and the study is documented in a full paper
covering the methodology, results, and limitations.
