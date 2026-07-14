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

- Designed and built an end-to-end platform for managing smart street lighting over LoRaWAN (long-range, low-power radio), covering the full path from physical lamp controllers in the field to a web dashboard: devices report energy usage and status to the cloud, and operators send lighting commands back down to individual lamps or entire groups at once.
- Built the core backend in Python (FastAPI, SQLAlchemy, MySQL) with a rich data model for the whole lighting domain: installations organized in hierarchical trees, lighting schedules and calendars with exceptions, work orders, alarms, energy reports, and a full audit log.
- Developed the device communication layer, including a custom binary protocol that packs commands and sensor readings into the tiny message sizes low-power radio allows, plus the orchestration logic for multi-step device operations with retries and failure handling.
- Implemented over-the-air firmware updates for devices in the field: firmware is split into fragments, broadcast to whole groups of lamps at once, and tracked through a session with progress reporting and recovery from failures.
- Built an intelligent scheduling engine that cuts energy usage: lamps turn on and off based on the actual sunrise and sunset times at their GPS location, follow configurable dimming programs through the night, and the system verifies each lamp actually applied its schedule, raising an alert if one didn't confirm.
- Created the web dashboard (Vue 3) where operators manage everything: an interactive map of all devices, live status updates over WebSockets, manual control of lamps and groups, schedule and calendar editors, user management, alarms, and work orders.
- Designed a fine-grained permission system where access is granted per group in the installation tree and inherited downward, so a city can give each contractor or operator exactly the visibility and control they need.
- Set up energy analytics and monitoring with Grafana dashboards embedded in the app: consumption trends, lamp and gateway status, active alarms, and automated email alerts for unusual behavior.
- Deployed self-hosted error monitoring (GlitchTip, Sentry-compatible) across every service, fully automated so a fresh server sets up its own projects and alert wiring on first boot.
- Ran the whole platform as Docker services behind an HTTPS reverse proxy, with automated deployments to multiple environments via GitHub Actions, database migrations, backup and recovery scripts, and written operations documentation.
- Established a solid test suite (device protocol encoding/decoding, permissions, schedule resolution, work-order state changes) that runs automatically on every change.
- Worked directly with the IoT hardware engineers to define the device protocol and iterate on communication reliability between the cloud and the field.
