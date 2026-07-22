---
title: Portainer Dashboard Generator for Home Assistant
description: "A C++ command-line tool that keeps a Home Assistant dashboard in sync with a homelab's Docker containers: it queries Portainer, checks the result against a curated YAML file, and regenerates the Lovelace view."
category: tooling
skills: [C++, CMake, Boost, WebSockets, REST APIs, Docker, Portainer, Home Assistant, GoogleTest]
github: https://github.com/lorainemg/ha-portainer-integration
featured: false
weight: 10
---

A homelab grows containers faster than anyone updates dashboards. This
tool closes that gap: it asks the Portainer API which stacks and
containers are running, compares them against a curated YAML file, and
walks through the differences one by one (new stack: approve or ignore?)
before regenerating a Home Assistant dashboard view with status badges,
per-stack sections, and container power controls, pushed over Home
Assistant's WebSocket API.

The reconciliation loop makes it more than a script. The YAML file is the
source of truth for names, icons, and what to ignore; the tool updates it
with each decision but never overwrites what the user set. A GitHub
Actions workflow can run the whole thing unattended and commit the
updated YAML back to the repository: dashboard-as-code for a Docker
homelab.

It is written in modern C++17 on purpose: the project doubles as a C++
learning exercise, and it leans into the good parts. Boost.Beast handles
WebSocket and HTTPS, nlohmann/json and yaml-cpp handle the data, and the
HTTP and WebSocket layers sit behind injected interfaces so GoogleTest
covers the domain logic without touching the network.

Probably the most over-built way to know whether Immich is up, and that
was the point.
