---
title: SensorTower App Market Scraper
description: "A data collection tool that gathers mobile app market statistics from SensorTower: rankings, downloads, and pricing for the top apps across countries and categories."
category: data-engineering
skills: [Python, Web Scraping, REST APIs, JSON, Data Collection]
github: https://github.com/lorainemg/sensortower-scraper
featured: false
weight: 23
---

A tool for collecting mobile app market data from SensorTower, the
industry reference for app store intelligence. It gathers rankings,
download counts, pricing, publisher, and release information for the top
100 apps, on both iOS and Android, in several countries and categories,
going back 90 days.

Rather than parse web pages, the scraper calls SensorTower's underlying
API endpoints directly, which makes collection faster and far more
reliable than HTML scraping. Results land in a JSON dataset by platform
and country, and failed requests get logged separately, so gaps in the
data are visible and recoverable.

A small tool built for dataset creation, the collection step at the start
of any app-market analysis.
