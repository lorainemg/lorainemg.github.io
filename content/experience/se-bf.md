---
title: Software Engineer
company: Blue Frontier
location: Boca Raton, Florida
workMode: Remote
employmentType: Full-time
website: https://bluefrontierac.com/
startDate: 2025-05-01
endDate: null
skills: [Python, TypeScript, HTML & CSS, Linux, Docker, Git, FastAPI, SQLAlchemy, PostgreSQL, TimescaleDB, Redis, Svelte, TailwindCSS, WebSockets, Azure, Terraform, Prefect, Grafana, OpenTelemetry, GitHub Actions, Pandas, NumPy, scikit-learn, Pytest]
softSkills: [Ownership & initiative, Cross-team collaboration]
---

- Built two internal tools (**SvelteKit** + **FastAPI** on **Azure**) for a maker of ultra-efficient smart air conditioners: a sales simulator and a fleet operations console.
- The sales tool runs a year of a building's energy use against real past weather, compares the customer's current AC with a Blue Frontier unit, and writes the proposal (PDF, Excel, Word).
- Moved the core energy model from an old **Excel/VBA** workbook to **Python** (**Pandas**/**NumPy**): about 16x faster, and closer to the reference sheet.
- The console watches and controls every unit in the field: live status, remote control, and commissioning runs that stream progress to the browser over **WebSockets**.
- Added **single sign-on** with **Microsoft Entra ID** and **role-based permissions** to both apps, from login down to each endpoint.
- Built **ETL** pipelines with **Prefect** over the fleet's **IoT** sensor data in **TimescaleDB**: they clean raw readings, work out runtime, uptime, and health, and keep environments in sync.
- Built a dashboard that measures and verifies energy savings: it pulls readings with **SQL**, cleans and groups them in **Pandas**, and fits **regression models** (**scikit-learn**) to each unit's power use.
- Kept **Grafana** as code for the whole fleet: dashboards, alerts, energy-saving counters, a map of every site, and export/import scripts to set it all up.
- Wrote shared tools the company still uses: a **Svelte** component library on private **npm**, reusable **GitHub Actions**, and a library that checks the controllers inside each unit.
- Ran infrastructure and delivery: **Terraform** on **Azure**, **CI/CD** pipelines that redeploy only what changed, secrets in **Azure Key Vault**, and **OpenTelemetry** across services.
- Set up tests in four repositories, backend and frontend, running on every change.
