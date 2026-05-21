# AI Delivery Command Center

A static MVP prototype for enterprise AI portfolio governance and value realization. It is designed as a job-application showcase for an AI Portfolio & Solutions Lead role: the product demonstrates delivery orchestration, intake qualification, vendor health tracking, adoption evidence, ROI realization, and executive reporting without requiring backend services, API keys, or live LLM calls.

## What It Shows

- **Portfolio orchestration:** initiative-level view of scope, phase, build path, owner, health, adoption, vendor state, blockers, and next gate.
- **Intake qualification agent:** deterministic scoring for business value, data readiness, change complexity, dependency load, projected ROI, and time-to-value.
- **Delivery health agent:** risk labels, milestone hold signals, vendor watch flags, and recommended action logic.
- **ROI realization agent:** projected versus realized value by business unit, adoption risk, and commercial governance findings.
- **Executive narrative agent:** leadership-ready memo summarizing value proof, delivery risk, adoption risk, sequencing, and the recommended ask.

All data is sample data and can be reset from the Portfolio view.

## Run Locally

Open `index.html` directly in a browser, or serve it with:

```bash
python3 -m http.server 8765
```

Then visit:

```text
http://127.0.0.1:8765/
```

## Publish To GitHub Pages

1. Create a new GitHub repository.
2. Push this folder to the repository root.
3. In GitHub, go to **Settings > Pages**.
4. Set the source to the main branch root.
5. Open the Pages URL after GitHub finishes deployment.

No build step is required.

## Positioning

Suggested framing:

> I built a prototype operating model for enterprise AI portfolio governance and value realization. It shows how I would manage intake, sequencing, vendor accountability, adoption evidence, ROI tracking, and executive narrative for a cross-BU AI delivery portfolio.

## Files

- `index.html` - static app shell.
- `styles.css` - responsive dashboard styling.
- `app.js` - sample portfolio data and deterministic agent logic.
