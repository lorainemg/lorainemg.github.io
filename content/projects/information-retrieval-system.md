---
title: Information Retrieval System
description: "A search engine built from scratch on the vector space model: documents and queries become weighted vectors, ranked by similarity, with clustering, a web crawler, and evaluation on standard test collections."
category: ml-nlp
skills: [Python, Information Retrieval, TF-IDF, Clustering, NLP, Streamlit, Web Crawling]
github: https://github.com/lorainemg/information-retrieval-system
weight: 14
---

A search engine implemented from first principles: given a query, it finds
and ranks the most relevant documents in a collection, the core problem
behind every search box.

The system is built on the vector space model. Documents and queries are
preprocessed with NLP techniques and converted into weighted term vectors,
and relevance is computed as similarity between them, producing a ranked
result list. On top of the core model, the system clusters the document
collection to group related content, and includes a web crawler for
gathering new documents to index.

Rather than trusting that it "seems to work", the system is evaluated the way
IR research does it: against standard test collections with known relevance
judgments, measuring retrieval quality with objective metrics across
different corpora.

Implemented in Python with a Streamlit interface for running queries and
exploring results, and a full written report on the design and evaluation.
