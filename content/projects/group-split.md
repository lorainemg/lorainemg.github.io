---
title: GroupSplit
description: "A group expense-splitting app built as a team of four on .NET 10: one shared Blazor UI running on the web, WebAssembly, and native mobile/desktop through MAUI, orchestrated with Aspire."
category: web
skills: [C#, .NET, Blazor, MudBlazor, .NET MAUI, ASP.NET Core, Entity Framework, PostgreSQL, Aspire]
github: https://github.com/Sussman-Club/group-split
featured: false
weight: 8
---

An expense-splitting app for groups — who paid what, who owes whom — built
with friends as a team of four. The ambitious part is the delivery model:
a single shared Blazor UI that runs as a web app, as a WebAssembly client,
and as a native mobile and desktop app through .NET MAUI, all from the
same Razor components.

The backend is an ASP.NET Core minimal API over PostgreSQL with Entity
Framework, with ASP.NET Identity handling auth (bearer tokens for the
API, a BFF-style forwarder for the web host). The domain model goes
beyond "split evenly": split rules are versioned over time and scoped to
expense categories, so a group can change how rent is divided without
rewriting its history.

Everything is orchestrated with Aspire, including homegrown
extensions that bootstrap Docker, run EF migrations, and launch the MAUI
app alongside the services, with Playwright-based end-to-end tests
running against the full distributed application.

My part is the frontend: the MudBlazor theming and layout, and the
groups and transactions views. An in-progress project, with the UI
currently ahead of the API wiring, and an ongoing excuse to explore the
newest corners of the .NET ecosystem with friends.
