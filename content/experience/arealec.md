---
title: Full Stack Developer
company: Arealec
location: Zaragoza, Spain
workMode: Remote
employmentType: Contract
website: https://www.araelec.com/
startDate: 2022-02-01
endDate: 2026-03-01
skills: [Python, SQLAlchemy, JavaScript, HTML & CSS, Linux, Docker, WebSockets, Git, FastAPI, MySQL, Vue, TailwindCSS, MQTT, gRPC, Redis, Grafana, GitHub Actions, Sentry, Caddy, Cloudflare]
softSkills: [Ownership & initiative, Cross-team collaboration, Technical documentation]
---

- Built a smart street-lighting platform on **LoRaWAN**, from the lamp controllers in the field to the operator dashboard: lamps report energy use and status, and operators control one lamp or a whole group.
- Wrote the backend in **Python** (**FastAPI**, **SQLAlchemy**, **MySQL**): nested installation trees, schedules and calendars with exceptions, work orders, alarms, energy reports, and a full audit log.
- Wrote the device layer: a binary protocol small enough for low-power radio messages, plus multi-step device jobs that retry and recover.
- Added over-the-air firmware updates: the system splits each image, sends it to a whole group of lamps at once, tracks progress, and recovers from failures.
- Built a scheduler that cuts energy use: lamps switch at the true sunrise and sunset for their GPS location and dim through the night on set programs. If a lamp does not confirm, the system raises an alarm.
- Built the **Vue 3** dashboard: a map of every device, live status over **WebSockets**, manual control of lamps and groups, schedule and calendar editors, user management, alarms, and work orders.
- Designed permissions that follow the installation tree: a grant on a group flows down to everything under it, so a city gives each contractor just what it needs.
- Embedded **Grafana** charts in the app: energy use over time, lamp and gateway status, live alarms, and email alerts when something looks wrong.
- Ran self-hosted error tracking (**GlitchTip**, **Sentry**-compatible) on every service. A new server sets up its own projects and alerts on first boot.
- Ran the platform as **Docker** services behind an HTTPS reverse proxy, with **GitHub Actions** deploys to several environments, database migrations, backup and restore scripts, and written guides.
- Built tests for protocol encoding, permissions, schedules, and work-order states. They run on every change.
- Worked with the hardware engineers on the device protocol and made the link between cloud and field more reliable.
