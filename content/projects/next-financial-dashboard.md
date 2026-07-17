---
title: Financial Dashboard in Next.js
description: "A full-stack financial dashboard built following Vercel's official Next.js Learn course: App Router, React Server Components, streaming, and a PostgreSQL data layer, deployed on Vercel."
category: web
skills: [TypeScript, Next.js, React, PostgreSQL, Tailwind CSS]
github: https://github.com/lorainemg/next-financial-dashboard
links:
  - name: Live demo
    url: https://next-financial-dashboard-two.vercel.app
featured: false
weight: 20
---

An invoicing dashboard for a fictional company, built by working through
Vercel's official Next.js Learn course — the hands-on way to learn the
App Router and the modern React server-side model from the team that
builds the framework.

The app covers the core of a real admin panel: an overview page with
revenue chart and latest invoices, an invoices section with URL-driven
search and pagination, and a customers table. Data lives in PostgreSQL
and is fetched in React Server Components, with Suspense boundaries and
skeleton components streaming the slow parts of the page in
progressively — the chapter of the course where the architecture really
clicks.

The stack is TypeScript, Tailwind CSS, Zod for validation, and the
postgres.js client for the data layer, deployed on Vercel with the
database seeded through a route handler. Even the revenue chart is
hand-rolled with CSS instead of a charting library, which keeps the
focus on the framework itself.

A learning project by design: the value wasn't the dashboard, it was
internalizing how Server Components, streaming, and caching change the
way a React app is put together.
