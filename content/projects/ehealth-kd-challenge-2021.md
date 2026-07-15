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
structured knowledge from it: the medical concepts mentioned and how they
relate to each other. Built as the UH-MMM team's submission to the eHealth-KD
Challenge at IberLEF 2021, an international research competition, where it
ranked 5th overall in the main evaluation scenario.

The challenge combines two subtasks. First, Named Entity Recognition finds
and classifies the relevant entities in each sentence (concepts, actions,
predicates, references). Then, Relation Extraction detects the semantic
relations between them, turning free-form text into a small knowledge graph.

Both tasks share a common neural architecture: BiLSTM layers act as
contextual encoders, with Dense layers decoding the output tags. The models
combine word-level embeddings (FastText embeddings trained on Spanish medical
text) with character-level representations, which helps them handle the rare
and unseen words common in the medical domain. The entity
multi-task learning, predicting part-of-speech tags along
improve its grasp of sentence structure.

The pipeline was built with TensorFlow and Keras, with sp
text preprocessing, and includes the full workflow from t
challenge data to the submission format. The approach is
team's workshop paper linked above.