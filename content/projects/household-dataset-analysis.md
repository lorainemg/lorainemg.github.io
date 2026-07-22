---
title: Household Energy Consumption Analysis
description: "A statistical analysis of four years of household electric power measurements, using hypothesis testing, regression, PCA, and clustering to find consumption patterns."
category: data-science
skills: [R, Statistics, Hypothesis Testing, Regression, PCA, Clustering, ANOVA]
github: https://github.com/lorainemg/Household-Analysis
featured: false
weight: 21
---

A statistical study of the Individual Household Electric Power Consumption
dataset from the UCI Machine Learning Repository: four years of
minute-by-minute electrical measurements (active and reactive power,
voltage, current) from one household.

The analysis runs in two phases. The first is classical statistics:
sampling from the population, testing hypotheses about consumption,
comparing variances, and fitting regressions to find linear relationships
between the electrical variables. The second brings in multivariate
techniques: principal component analysis to cut the dimensionality of the
measurements, clustering to find natural groups in consumption, and ANOVA
to test whether those groups really differ.

Done entirely in R, with written reports on the method and findings of
each phase.
