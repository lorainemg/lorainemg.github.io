---
title: GitOps Homelab
description: "Infrastructure-as-code for a single-node home server: about 25 containers across GitOps-managed Docker Compose stacks, published through a Cloudflare Tunnel and fully observable with Prometheus, Grafana, Loki, and Tempo."
category: infrastructure
skills: [Docker, GitHub Actions, GitOps, Portainer, Cloudflare, Caddy, Prometheus, Grafana, OpenTelemetry, Home Assistant]
github: https://github.com/lorainemg/homelab
featured: true
weight: 4
---

Everything needed to rebuild my home server from scratch lives in this
repository. A push to main deploys: GitHub Actions maps the diff to the
affected stacks, bakes their configuration into thin images, pushes them
to GHCR, and updates each stack through the Portainer API. Only the data
stays on the machine; runtime secrets live in GitHub Actions, and a
gitleaks pre-commit hook keeps them out of git.

The server runs about 25 containers across five Compose stacks: Immich
for photos, Home Assistant with a fully local voice assistant (Whisper
for speech-to-text, Piper for the reply, a Llama model served by
Ollama), a private Docker registry, a monitoring stack, and the control
plane. No inbound ports are open on the router: cloudflared keeps an
outbound-only tunnel to Cloudflare, which routes every public hostname
to a Caddy reverse proxy on a shared bridge network.

The interesting problem was the config flow. Pure configuration is baked
into images, so a stack needs nothing from the host but its volumes;
config that must sit next to runtime state flows through a single
config-agent container that syncs changed files into the live
directories and reloads the running services without recreating them.
The flow is two-way: once an hour the agent commits automations and
scenes edited in Home Assistant's UI back to the repository, so nothing
is lost between deploys. Observability covers all of it, with Prometheus
scraping the host and every container and an OpenTelemetry Collector
fanning traces and logs out to Tempo and Loki, wired together in
Grafana.

The Trakt.tv bot and the dashboard generator elsewhere on this page run
on this server; this is the repo that keeps their lights on.
