Gatling Training Exercises (TypeScript)
=======================================

A TypeScript Gatling project used as the support material for the Gatling
training session. The `main` branch is the starting point. Each exercise has
its own branch holding the cumulative solution up to that step.

How to use
----------

`main` is what trainees start from. To check the expected solution for any
step, switch to the matching branch:

```sh
git switch exercise-1-1   # solution after exercise 1-1
git switch exercise-1-4   # solution after exercise 1-4
git switch main           # back to starting point
```

Branches
--------

| Branch                | What it adds                                              |
|-----------------------|-----------------------------------------------------------|
| `main`                | Starting scaffold: one Simulation hitting `/session`      |
| `exercise-1-1`        | Homepage + Session endpoints, endpoint classes            |
| `exercise-1-2`        | Login endpoint + JSON feeder for credentials              |
| `exercise-1-3`        | Products endpoint + add-to-cart with templated body       |
| `exercise-1-4`        | Checkout endpoint with bearer token                       |
| `refactor-groups`     | Extract scenarioGroups + actions, slim home group         |
| `exercise-1-5`        | `testType` system property                                |
| `exercise-1-6`        | Global assertions (response time + failed requests)       |
| `exercise-1-7`        | Dynamic injection profile per `testType`                  |
| `exercise-1-8`        | Dynamic assertions per `testType`                         |
| `exercise-2-1`        | Scenario 2 added — user visits the home page              |
| `exercise-2-2`        | Scenario 2 — user logs in                                 |
| `exercise-2-3`        | Scenario 2 — loop through pages, add a random product each|
| `exercise-2-4`        | Scenario 2 — user checks out                              |
| `exercise-2-5`        | Scenario switch feature via `-DscenarioNumber=1\|2`       |

Tooling
-------

* Node.js 18+ required
* `@gatling.io/core` + `@gatling.io/http` (JS/TS SDK)
* Install: `npm install`
* Run a simulation: `npx gatling run --simulation=basicSimulation`
* Pass system properties: `npx gatling run --simulation=basicSimulation -- -DtestType=stress -Dvu=10 -Dduration=30`
* Pick a scenario (from `exercise-2-5` onward): `... -DscenarioNumber=2`
