---
title: Crypto Market Analysis Dashboard
description: "An interactive dashboard for analyzing cryptocurrency markets, combining technical indicators computed from live price data with sentiment analysis of Twitter activity."
category: data-science
skills: [Python, Streamlit, Pandas, Plotly, CoinGecko API, Twitter API, Sentiment Analysis, Jenkins]
github: https://github.com/lorainemg/crypto-forecasting
featured: true
weight: 4
---

An interactive dashboard that brings together the two signals crypto traders
watch most: what the market is doing and what people are saying about it.
Users pick a coin and a timeframe, and the app builds the analysis on the
fly.

On the market side, the app pulls historical and current price data from the
CoinGecko API and computes classic technical indicators from scratch: simple,
cumulative, and exponential moving averages, MACD, RSI, and momentum, all
visualized as interactive charts.

On the social side, it analyzes tweets about the selected coin and classifies
their sentiment, showing how positive and negative conversation volume evolves
over time alongside the price.

Built in Python with Streamlit and Pandas, with a Jenkins pipeline for
continuous integration.