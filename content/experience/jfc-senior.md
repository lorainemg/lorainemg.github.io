---
title: Senior Full Stack Developer
company: Jack's Flight Club
location: Tampa, Florida
workMode: Remote
employmentType: Full-time
website: https://jacksflightclub.com
startDate: 2024-09-01
endDate: 2025-04-15
skills: [Python, TypeScript, Docker, FastAPI, SQLAlchemy, Sentry, Google Sheets, MLFlow]
softSkills: [Ownership & initiative, Cross-team collaboration]
---

- Led a redesign of how the platform stores and shares its core geographic data (airports, routes, regions), replacing duplicated data spread across two databases with a single fast central store. This simplified the codebase and eliminated a whole category of data-consistency bugs.
- Significantly sped up the deal-scanning process by optimizing database queries, batching writes, adding caching, and running work in parallel, allowing the system to handle growing data volumes without slowing down.
- Set up error monitoring across all services with **Sentry**, tied into the deploy process so every release is tracked. This cut the time from "something broke" to "we know exactly where and why."
- Automated database housekeeping: scheduled backups, cleanup of old data, and weekly refreshes of the test environment with production data. This was work that previously had to be done by hand.
- Automated reporting into Google Sheets and scheduled alerts for flight deals by region, reducing manual work and making sure high-value opportunities were flagged on time.
- Maintained and improved the machine learning model running in production, fixing prediction issues and adding safeguards against false positives.
- Added new data sources to the platform, including working around anti-bot protections on external sites.
- Worked closely with the deals team to make sure tools matched how they actually worked day to day.
