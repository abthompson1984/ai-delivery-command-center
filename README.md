# AI Delivery Command Center

An MVP showcase for enterprise AI portfolio governance, delivery accountability, vendor oversight, adoption tracking, and value realization.

This prototype was built for an **AI Portfolio & Solutions Lead** style role: the person responsible for turning prioritized AI use cases into shipped solutions, measurable business outcomes, and executive-ready delivery narratives across multiple business units.

The product is intentionally not another chatbot or generic analytics dashboard. It is a lightweight operating model for the work that actually makes enterprise AI succeed: intake discipline, sequencing, milestone gates, sponsor accountability, vendor delivery health, adoption evidence, ROI tracking, and concise leadership communication.

## Live Demo

View the MVP:

```text
https://abthompson1984.github.io/ai-delivery-command-center/
```

## Why This Exists

Enterprise AI programs often fail in the space between strategy and execution. Use cases get approved, vendors start building, pilots launch, and leadership gets activity updates, but the harder questions remain unclear:

- Which initiatives are actually delivery-ready?
- What is in scoping, build, pilot, production, or stalled?
- Which vendor milestones should be accepted, held, or escalated?
- Are users adopting the solution after launch?
- Is the initiative producing measurable value, or just completing tasks?
- What does leadership need to decide next?

The AI Delivery Command Center turns those questions into a simple portfolio control tower.

## What The MVP Demonstrates

- **Portfolio orchestration:** initiative-level view of scope, phase, build path, owner, health, adoption, vendor state, blockers, and next gate.
- **Intake qualification agent:** deterministic scoring for business value, data readiness, change complexity, dependency load, projected ROI, and time-to-value.
- **Delivery health agent:** risk labels, milestone hold signals, vendor watch flags, and recommended action logic.
- **ROI realization agent:** projected versus realized value by business unit, adoption risk, and commercial governance findings.
- **Executive narrative agent:** leadership-ready memo summarizing value proof, delivery risk, adoption risk, sequencing, and the recommended ask.

The MVP uses sample data and deterministic logic. There are no API keys, backend services, or live LLM calls required.

## Role Alignment

This project is designed to mirror the operating responsibilities of an AI Portfolio & Solutions Lead:

- Own the active delivery portfolio across business units.
- Translate approved use cases into sequenced delivery work.
- Hold milestone gates on scope, value, adoption, and vendor readiness.
- Track projected versus realized ROI after launch.
- Surface delivery risks early with a recommended path, not just a status update.
- Support executive forums with a clear, honest view of what AI is producing.
- Connect technical delivery, business adoption, vendor performance, and commercial outcomes in one operating rhythm.

## Demo Walkthrough

Use the left-side navigation to walk through the delivery lifecycle:

- **Portfolio:** review active AI initiatives across WWE, UFC, IMG, On Location, PBR, and CSS-style business units, including phase, health, adoption, ROI, vendor status, blockers, and next gate.
- **Intake:** score a new AI use case against business value, data readiness, change complexity, and dependency load, then add it to the portfolio as a scoped initiative.
- **Value:** compare projected versus realized value and review adoption and commercial governance findings.
- **Narrative:** generate an executive-ready leadership update with value proof, delivery risk, adoption risk, sequencing, and the recommended ask.

## Suggested Interview Framing

> I built a prototype operating model for enterprise AI portfolio governance and value realization. It is not meant to show off model complexity; it is meant to show how I would run the delivery side of an AI transformation portfolio: qualify demand, sequence work, govern vendor delivery, require adoption evidence, track realized value, and turn portfolio health into an executive narrative.

## Design Choices

- **Static by design:** easy to review, host, and share through GitHub Pages.
- **No fake backend complexity:** the focus is the operating model, not infrastructure.
- **Executive-first outputs:** every view is oriented around decisions, gates, value, and accountability.
- **Reusable sample logic:** scoring, risk flags, ROI summaries, and narrative generation can be replaced later with real data or LLM-assisted workflows.

## GitHub Pages

This repository is configured for GitHub Pages from the `main` branch root.

No build step is required.

## Files

- `index.html` - static app shell.
- `styles.css` - responsive dashboard styling.
- `app.js` - sample portfolio data and deterministic agent logic.
