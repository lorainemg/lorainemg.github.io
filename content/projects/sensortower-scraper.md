---
title: SensorTower App Market Scraper
description: "A data collection tool that gathers mobile app market statistics from SensorTower: rankings, downloads, and pricing for the top apps across countries and categories."
category: data-engineering
skills: [Python, Web Scraping, REST APIs, JSON, Data Collection]
github: https://github.com/lorainemg/sensortower-scraper
featured: false
weight: 17
---

A tool for collecting mobile app market data from SensorTower, the industry
reference for app store intelligence. It gathers rankings, download counts,
pricing, publisher, and release information for the top 100 apps, across
both iOS and Android, in multiple countries and categories, going back 90
days.

Rather than parsing web pages, the scraper works against SensorTower's
underlying API endpoints directly, which makes collection faster and far
more reliable than HTML scraping. Results are organized into a JSON dataset
by platform and country, and failed requests are logged separately so
gaps in the data are visible and recoverable.

A small, focused utility built for dataset creation, the kind of collection
step that sits at the start of any app-market analysis.
