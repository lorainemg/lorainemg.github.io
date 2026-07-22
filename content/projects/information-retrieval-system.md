---
title: Information Retrieval System
description: "A search engine built from scratch on the vector space model: documents and queries become weighted vectors, ranked by similarity, with clustering, a web crawler, and evaluation on standard test collections."
category: ml-nlp
skills: [Python, Information Retrieval, TF-IDF, Clustering, NLP, Streamlit, Web Crawling]
github: https://github.com/lorainemg/information-retrieval-system
weight: 19
---

A search engine built from first principles: given a query, it finds and
ranks the most relevant documents in a collection, the core problem behind
every search box.

The system rests on the vector space model. It preprocesses documents and
queries with NLP techniques, converts them into weighted term vectors, and
computes relevance as similarity between them, producing a ranked result
list. On top of that, it clusters the document collection to group related
content and includes a web crawler for gathering new documents to index.

Rather than trust that it "seems to work", the evaluation follows IR
research practice: standard test collections with known relevance
judgments, objective retrieval metrics, and several corpora.

Written in Python with a Streamlit interface for running queries and
exploring results, and a full written report on the design and evaluation.
