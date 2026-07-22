---
title: GroupSplit
description: "A group expense-splitting app built by a team of four on .NET 10: one shared Blazor UI running on the web, WebAssembly, and native mobile/desktop through MAUI, orchestrated with Aspire."
category: web
skills: [C#, .NET, Blazor, MudBlazor, .NET MAUI, ASP.NET Core, Entity Framework, PostgreSQL, Aspire]
github: https://github.com/Sussman-Club/group-split
featured: false
weight: 8
---

An expense-splitting app for groups (who paid what, who owes whom), built
with friends as a team of four. The bold part is the delivery model: one
shared Blazor UI that runs as a web app, as a WebAssembly client, and as
a native mobile and desktop app through .NET MAUI, all from the same
Razor components.

The backend is an ASP.NET Core minimal API over PostgreSQL with Entity
Framework, and ASP.NET Identity handles auth (bearer tokens for the API,
a BFF-style forwarder for the web host). The domain model goes beyond
"split evenly": split rules carry versions over time and scope to expense
categories, so a group can change how it divides rent without rewriting
its history.

Aspire orchestrates everything, with homegrown extensions that bootstrap
Docker, run EF migrations, and launch the MAUI app alongside the
services, and Playwright end-to-end tests run against the full
distributed application.

My part is the frontend: the MudBlazor theming and layout, and the groups
and transactions views. Still in progress, with the UI ahead of the API
wiring, and a standing excuse to explore the newest corners of .NET with
friends.
