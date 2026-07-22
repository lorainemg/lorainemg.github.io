---
title: eHealth-KD Challenge 2021
description: "5th-place submission for the eHealth-KD Challenge at IberLEF 2021 by the UH-MMM team. Neural models for Named Entity Recognition and Relation Extraction in Spanish medical text."
category: ml-nlp
skills: [TensorFlow, Keras, Scikit-Learn, NLP, spaCy]
github: https://github.com/lorainemg/eHealthKD-competition
links:
  - name: Paper (PDF)
    url: https://github.com/lorainemg/eHealthKD-competition/blob/main/docs/ehealth_paper4.pdf
  - name: Task site
    url: https://ehealthkd.github.io/2021
featured: true
weight: 1
---

A machine learning system that reads Spanish medical text and extracts
structured knowledge: the medical concepts mentioned and how they relate.
Built as the UH-MMM team's entry in the eHealth-KD Challenge at IberLEF
2021, an international research competition, where it ranked 5th overall
in the main evaluation scenario.

The challenge has two subtasks. First, Named Entity Recognition finds and
classifies the entities in each sentence (concepts, actions, predicates,
references). Then Relation Extraction detects the semantic relations
between them, turning free text into a small knowledge graph.

Both tasks share one neural architecture: BiLSTM layers encode context,
and Dense layers decode the output tags. The models join word-level
embeddings (FastText, trained on Spanish medical text) with
character-level representations, which helps with the rare and unseen
words common in medical text. The entity model also uses multi-task
learning, predicting part-of-speech tags alongside entity tags to improve
its grasp of sentence structure.

The pipeline is built with TensorFlow and Keras, with spaCy and NLTK for
text preprocessing, and covers the full path from raw challenge data to
the submission format. The team's workshop paper linked above describes
the approach.
