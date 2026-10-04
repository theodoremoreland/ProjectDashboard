# THEO_DORA

<img src="/presentation/thumbnail.webp" width="700">

[View the application](https://project-dashboard.theodoremoreland.dev/)

## Table of contents

- [Overview](#overview)
  - [DORA Metrics](#dora-metrics)
- [Technologies Used](#technologies-used)

## Overview

DORA metrics, code quality, and metadata for my GitHub projects.

_NOTE: The terms "project" and "repository" are used interchangeably throughout this document._

### DORA Metrics

https://dora.dev/guides/dora-metrics/

#### Relationship between CFR and DRR

- **1 failure can cause multiple deployment reworks**
- **Multiple deployment reworks can happen without a single deployment failure**

**Option 2 ("all reworks require at least one failure") is false.**

---

### Why 1 Failure Can Cause Multiple Reworks

A single initial failure or outage in production often requires a multi-step response.

1. **Deployment 1 (Planned Feature):** Causes a memory leak in production. **(1 Change Failure)**
2. **Deployment 2 (Rework):** The team deploys an emergency patch to limit traffic or roll back a specific flag.
3. **Deployment 3 (Rework):** The patch didn't completely solve the memory leak, so they deploy a second follow-up fix.
4. **Deployment 4 (Rework):** A third deployment restores full service after fixing the root cause.

**Result:** $1$ Change Failure resulted in $3$ Deployment Reworks.

---

### Why Deployment Rework Can Happen Without a Deployment Failure

A **Deployment Failure** (CFR) specifically counts an original planned deployment that broke the system. However, **Deployment Rework** tracks _any_ unplanned deployment made in response to a production bug or incident.

Rework can occur without a corresponding deployment failure in several scenarios:

- **Environmental / Infrastructure Issues:** A third-party API changes, an SSL certificate unexpectedly expires, or cloud database load spikes. The original code deployment was perfectly fine, but you must trigger an **unplanned deployment** (e.g., config update or hotfix) to handle the outage.
- **Discovered Production Bugs (Not tied to a recent release):** A subtle edge-case bug that was deployed 6 months ago suddenly gets triggered by a surge in traffic today. Because it wasn't caused by a recent deployment, it doesn't flag a new Change Failure—yet fixing it requires an **unplanned hotfix deployment** (Rework).
- **User-Reported Data / UI Issues:** A bad data migration or broken UI element is discovered by users on live software. Even if it didn't crash the server or trigger a failed deployment alert, the emergency patch pushed to fix it counts as **Deployment Rework**.

## Technologies Used

- React
- TypeScript
- JavaScript
- HTML
- CSS
- Tanstack React Query
- MUI X Charts
- GitHub API
- SonarQube
- Vite
- Axios
