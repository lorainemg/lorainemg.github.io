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
Vercel's official Next.js Learn course: the hands-on way to learn the App
Router and the modern React server-side model from the team that builds
the framework.

The app covers the core of a real admin panel: an overview page with a
revenue chart and the latest invoices, an invoices section with
URL-driven search and pagination, and a customers table. Data lives in
PostgreSQL, and React Server Components fetch it, with Suspense
boundaries and skeleton components streaming the slow parts of the page
in as they load: the chapter of the course where the architecture
clicks.

The stack is TypeScript, Tailwind CSS, Zod for validation, and the
postgres.js client for the data layer, deployed on Vercel with the
database seeded through a route handler. Even the revenue chart is
hand-rolled with CSS instead of a charting library, which keeps the
focus on the framework itself.

A learning project by design: the value was not the dashboard but
learning how Server Components, streaming, and caching change the way a
React app fits together.
