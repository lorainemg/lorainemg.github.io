---
title: Negation Detection in Spanish Text
description: "An NLP system that detects negation in Spanish text: it finds the words that express negation and works out which parts of the sentence they affect."
category: ml-nlp
skills: [Python, Scikit-Learn, NLP, Machine Learning, Docker]
github: https://github.com/lorainemg/negation-detection
links:
  - name: Paper (PDF)
    url: https://github.com/lorainemg/negation-detection/blob/main/docs/paper.pdf
  - name: SFU ReviewSP-NEG corpus
    url: http://clic.ub.edu/corpus/es/node/171
featured: false
weight: 5
---

Negation is a quiet failure mode of language processing: a system that
reads "no presenta fiebre" and extracts "fiebre" without noticing the
negation gets the meaning backwards. This project detects negation in
Spanish text so downstream tasks like information extraction, sentiment
analysis, and question answering can account for it.

The system works in two supervised phases. First, a classifier finds
negation cues, the words or expressions that signal a negation. Then a
second phase works out each cue's scope: which words in the sentence it
affects.

The models are linear classifiers (scikit-learn) built on linguistic
features: each word's form, lemma, and part-of-speech tag, plus a window
of context around it. Training data comes from an annotated Spanish
corpus, and the pipeline covers corpus parsing, training, and evaluation.

The project ships in Docker, with a ready-to-use development environment.
