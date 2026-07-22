---
title: Airport Discrete-Event Simulation
description: "A discrete-event simulation of a week of airport operations, estimating runway idle time under scheduled flights, random arrivals, maintenance, and weather."
category: systems
skills: [Python, Discrete-Event Simulation, Probability, Statistics, Modeling]
github: https://github.com/lorainemg/discrete-event-simulation
featured: false
weight: 13
---

How much of the time do an airport's runways sit empty? This project
answers that by simulating a full week of airport operations and measuring
runway use, an estimate hard to compute analytically because too many
random factors interact.

The simulation treats the airport as a discrete-event system: instead of
advancing time continuously, it jumps from event to event (a flight
arrives, a runway closes for maintenance, weather changes) and updates the
state of the world at each one. The model combines scheduled flights with
random arrivals and departures, runway maintenance windows, and weather
that disrupts operations.

Written in Python from scratch (no simulation framework), with a report on
the model design, the assumptions, and the results.
