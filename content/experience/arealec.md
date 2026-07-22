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

- Designed and built a platform that manages smart street lighting over **LoRaWAN** (long-range, low-power radio), from the lamp controllers in the field to a web dashboard: devices report energy use and status to the cloud, and operators send commands back to single lamps or whole groups.
- Built the backend in **Python** (**FastAPI**, **SQLAlchemy**, **MySQL**) with a data model that covers the whole lighting domain: installations in nested trees, schedules and calendars with exceptions, work orders, alarms, energy reports, and a full audit log.
- Wrote the device communication layer: a custom binary protocol that packs commands and sensor readings into the tiny messages low-power radio allows, plus logic that runs multi-step device operations with retries and failure handling.
- Added over-the-air firmware updates for devices in the field: the system splits firmware into fragments, broadcasts them to whole groups of lamps at once, and tracks each session with progress reports and recovery from failures.
- Built a scheduling engine that cuts energy use: lamps switch on and off at the real sunrise and sunset times for their GPS location and dim through the night on set programs, and the system checks that each lamp applied its schedule, raising an alert if one does not confirm.
- Built the web dashboard (**Vue 3**) where operators manage everything: a map of every device, live status over **WebSockets**, manual control of lamps and groups, schedule and calendar editors, user management, alarms, and work orders.
- Designed a permission system that grants access per group in the installation tree and inherits it downward, so a city can give each contractor or operator exactly the visibility and control they need.
- Set up energy analytics and monitoring with **Grafana** dashboards embedded in the app: consumption trends, lamp and gateway status, active alarms, and email alerts for odd behavior.
- Deployed self-hosted error monitoring (**GlitchTip**, **Sentry**-compatible) across every service, automated so a fresh server wires up its own projects and alerts on first boot.
- Ran the platform as **Docker** services behind an HTTPS reverse proxy, with automated deploys to several environments through **GitHub Actions**, database migrations, backup and recovery scripts, and written operations guides.
- Built a test suite (protocol encoding and decoding, permissions, schedule resolution, work-order state changes) that runs on every change.
- Worked with the hardware engineers to define the device protocol and make cloud-to-field communication more reliable.
