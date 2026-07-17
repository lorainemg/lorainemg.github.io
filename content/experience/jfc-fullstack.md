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

- Designed and built the architecture of a flight-deal tracking platform as a set of independent services: scheduled scrapers collect flight prices from multiple sources, a processing layer cleans and standardizes the data, and a detection engine compares prices against historical averages to spot genuine deals.
- Built the full data pipeline behind it, collecting flight data across 6 geographic regions daily, normalizing messy source data (airports, currencies, languages), and storing everything in well-structured databases with full version history.
- Developed a machine learning model that predicts whether a flight is a genuinely good deal, trained on historical data and continuously improved through feedback from the team's actual decisions. This automated a large part of what was previously manual judgment.
- Built the datasets and training workflow behind the model: automated data extraction, incorporation of human feedback, and experiment tracking so every model version could be compared and reproduced.
- Created an internal dashboard (**Svelte**) where the team reviews, triages, and publishes deals in real time, with live-updating views of what the system is finding.
- Built a **Slack** bot that became the team's main working interface: interactive commands, forms, and automated daily updates that cut manual status checks roughly in half.
- Automated the entire delivery process with **GitHub Actions**: tests run on every change, and deployments happen with one click, including over 20 scheduled jobs that keep tracking, reporting, and maintenance running on their own.
- Used **Docker** to package every service identically across development and production, reducing "works on my machine" issues.
- Connected the platform to the wider business ecosystem: the email marketing system, **Google Sheets** and **BigQuery** for analytics and reporting, and AI-assisted copy editing for deal write-ups.
- Established testing practices from day one, building a test suite that made it safe to change and ship code quickly.