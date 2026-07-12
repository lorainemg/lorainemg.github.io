---
title: Detection of Negation
description: '"The automatic detection of negation and the words they affect is an important task that could benefit other Natural Language Processing tasks such as Information Extraction, Sentiment Analysis, and Question Answering." A two-phase supervised machine learning approach for identifying negation signals and their scope in Spanish texts, with text preprocessing, model training, and a containerized Streamlit application for testing.'
category: ml-nlp
skills: [Python, NLTK, spaCy, Scikit-Learn, Streamlit]
github: https://github.com/lorainemg/negation-detection
links:
  - name: Paper (PDF)
    url: https://github.com/lorainemg/negation-detection/blob/main/docs/paper.pdf
  - name: SFU ReviewSP-NEG corpus
    url: http://clic.ub.edu/corpus/es/node/171
featured: false
weight: 4
---

"The automatic detection of negation and the words they affect is an
important task that could benefit other Natural Language Processing tasks
such as Information Extraction, Sentiment Analysis, and Question Answering."

The project implements a two-phase supervised machine learning approach for
identifying negation signals and their scope in Spanish texts, covering text
preprocessing and model training with Scikit-Learn, spaCy and NLTK.

A containerized Streamlit application exposes the trained models for
interactive testing. Training and evaluation draw on the SFU ReviewSP-NEG
corpus, linked below alongside the project's paper.
