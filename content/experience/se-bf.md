---
title: Software Engineer
company: Blue Frontier
location: Boca Raton, Florida
workMode: Remote
employmentType: Full-time
website: https://bluefrontierac.com/
startDate: 2025-03-01
endDate: null
skills: [Python, TypeScript, HTML & CSS, Linux, Docker, Git, FastAPI, SQLAlchemy, PostgreSQL, TimescaleDB, Redis, Svelte, TailwindCSS, WebSockets, Azure, Terraform, Prefect, Grafana, OpenTelemetry, GitHub Actions, Pandas, NumPy, scikit-learn, Pytest]
softSkills: [Ownership & initiative, Cross-team collaboration]
---

- Designed and built two internal products end to end (**SvelteKit** + **FastAPI** on **Azure**) at Blue Frontier, a manufacturer of ultra-efficient smart air-conditioning units: a sales performance simulator and a fleet operations console.
- Built the sales tool that simulates a full year of a building's energy use against real historical weather, comparing the customer's current AC system with a Blue Frontier unit and generating customer-ready proposals (PDF, Excel, Word).
- Ported the company's core energy model from a legacy **Excel/VBA** workbook into a **Python** engine (**Pandas**/**NumPy**), making it ~16x faster while matching the reference spreadsheet more closely.
- Built the operations console the team uses to monitor and control every deployed unit: live fleet status, remote control, and commissioning workflows with progress streamed to the browser over **WebSockets**.
- Implemented single sign-on and role-based permissions across both apps with **Microsoft Entra ID**, from login to per-endpoint access control.
- Developed ETL pipelines (**Prefect**) over the fleet's IoT telemetry in **TimescaleDB**: ingesting and transforming raw sensor data, computing runtime, uptime, and health metrics, and keeping environments in sync.
- Built an interactive energy measurement & verification dashboard: extracts raw sensor telemetry with **SQL**, cleans, resamples, and aggregates it with **Pandas**, and trains regression models (**scikit-learn**) to analyze unit power trends.
- Managed **Grafana** monitoring as code for the whole fleet: dashboards, alerting, energy-savings counters, and a geographic fleet map, with an export/import toolchain for automated provisioning.
- Created shared tooling used across the organization: a **Svelte** component library published as a private **npm** package, reusable **GitHub Actions**, and a validation library for the controllers inside each unit.
- Owned infrastructure and delivery: **Terraform** on **Azure**, CI/CD pipelines that only redeploy what changed, secrets in **Azure Key Vault**, and **OpenTelemetry** observability across services.
- Established testing from scratch in four repositories, with backend and frontend suites running on every change.
