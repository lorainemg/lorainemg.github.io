---
title: Full Stack Developer
company: Jack's Flight Club
location: Tampa, Florida
workMode: Remote
employmentType: Full-time
website: https://jacksflightclub.com
startDate: 2022-12-01
endDate: 2024-09-01
skills: [Python, TypeScript, HTML & CSS, Linux, Docker, FastAPI, SQLAlchemy, Pandas, Playwright, Svelte, Redis, PostgreSQL, Pytest, Cloudflare, Google BigQuery, Docker, GitHub Actions]
softSkills: [Ownership & initiative, Cross-team collaboration]
---

- Designed and built a flight-deal tracking platform as a set of independent services: scheduled scrapers collect flight prices from many sources, a processing layer cleans and standardizes the data, and a detection engine compares prices against historical averages to spot real deals.
- Built the data pipeline behind it: daily collection across 6 regions, cleanup of messy source data (airports, currencies, languages), and storage in well-structured databases with full version history.
- Trained a machine learning model that predicts whether a flight is a good deal, improved over time with feedback from the team's decisions. This automated much of what had been manual judgment.
- Built the datasets and training workflow behind the model: automated data extraction, human feedback folded into the training data, and experiment tracking so the team could compare and reproduce every model version.
- Created an internal dashboard (**Svelte**) where the team reviews, triages, and publishes deals in real time, with live views of what the system is finding.
- Built a **Slack** bot that became the team's main working interface: interactive commands, forms, and daily updates that cut manual status checks by about half.
- Automated delivery with **GitHub Actions**: tests run on every change, deploys take one click, and over 20 scheduled jobs keep tracking, reporting, and maintenance running on their own.
- Packaged every service with **Docker** so it runs the same in development and production, reducing "works on my machine" issues.
- Connected the platform to the rest of the business: the email marketing system, **Google Sheets** and **BigQuery** for analytics and reporting, and AI-assisted copy editing for deal write-ups.
- Set up testing from the start, building a suite that made it safe to change and ship code fast.
