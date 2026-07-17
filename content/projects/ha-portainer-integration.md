---
title: Portainer Dashboard Generator for Home Assistant
description: "A C++ command-line tool that keeps a Home Assistant dashboard in sync with a homelab's Docker containers: it queries Portainer, reconciles the result against a curated YAML file, and regenerates the Lovelace view."
category: tooling
skills: [C++, CMake, Boost, WebSockets, REST APIs, Docker, Portainer, Home Assistant, GoogleTest]
github: https://github.com/lorainemg/ha-portainer-integration
featured: false
weight: 10
---

A homelab grows containers faster than anyone updates dashboards. This
tool closes that gap: it queries the Portainer API for the stacks and
containers actually running, compares them against a curated YAML file,
and walks through the differences interactively — new stack, approve or
ignore? — before regenerating a Home Assistant dashboard view with status
badges, per-stack sections, and container power controls, pushed over
Home Assistant's WebSocket API.

The reconciliation loop is what makes it more than a script. The YAML
file is the source of truth for names, icons, and what to ignore; the
tool updates it with each decision but never overwrites what the user
customized. A GitHub Actions workflow can run the whole thing
unattended and commit the updated YAML back to the repository —
dashboard-as-code for a Docker homelab.

It's written in modern C++17, deliberately: the project doubles as a
C++ learning exercise, and it leans into the good parts. Boost.Beast
handles WebSocket and HTTPS, nlohmann/json and yaml-cpp handle the data,
and the design is dependency-injected throughout — the HTTP and
WebSocket layers sit behind interfaces so the domain logic is covered by
GoogleTest without touching the network.

Probably the most over-engineered way to know whether Immich is up, and
that was exactly the point.
