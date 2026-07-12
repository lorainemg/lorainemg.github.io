---
title: eHealth-KD Challenge 2021
description: "Final submission for the eHealth-KD Challenge by the UH-MMM team at IberLEF 2021. Focuses on Named Entity Recognition (NER) and Relation Extraction (RE) using machine learning models (BiLSTM and Dense layers)."
category: ml-nlp
skills: [Scikit-Learn, Keras, TensorFlow, NLTK, spaCy]
github: https://github.com/lorainemg/eHealthKD-competition
links:
  - name: Paper (PDF)
    url: https://github.com/lorainemg/eHealthKD-competition/blob/main/docs/ehealth_paper4.pdf
featured: true
weight: 1
---

Final submission for the eHealth-KD Challenge, presented by the UH-MMM team at
IberLEF 2021. The shared task combines two subtasks: Named Entity Recognition
(NER) and Relation Extraction (RE).

Both tasks share a common architecture: BiLSTM layers act as contextual
encoders, with Dense layers as the tag decoder. The pipeline was built with
Scikit-Learn, Keras and TensorFlow, using spaCy and NLTK for text
preprocessing.

The system ranked 5th overall in the challenge's main evaluation scenario, as
documented in the team's workshop paper linked below.
