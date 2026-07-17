---
title: Household Energy Consumption Analysis
description: "A statistical analysis of four years of household electric power measurements, applying hypothesis testing, regression, PCA, and clustering to uncover consumption patterns."
category: data-science
skills: [R, Statistics, Hypothesis Testing, Regression, PCA, Clustering, ANOVA]
github: https://github.com/lorainemg/Household-Analysis
featured: false
weight: 21
---

A statistical deep-dive into the Individual Household Electric Power
Consumption dataset from the UCI Machine Learning Repository: four years of
minute-by-minute electrical measurements (active and reactive power, voltage,
current) from a single household.

The analysis proceeds in two phases. The first is classical statistics:
sampling from the population, testing hypotheses about consumption behavior,
comparing variances, and fitting regressions to identify linear relationships
between the electrical variables. The second phase brings in multivariate
techniques: principal component analysis to reduce the dimensionality of the
measurements, clustering to find natural groupings in consumption behavior,
and ANOVA to test whether those groups genuinely differ.

Conducted entirely in R, with written reports documenting the methodology
and findings of each phase.
