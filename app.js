const sampleInitiatives = [
  {
    id: "wwe-fan-clips",
    name: "Fan Clip Compliance Agent",
    bu: "WWE",
    owner: "VP, Digital Operations",
    phase: "Production",
    buildPath: "Vendor pod + TKO engineering",
    scope: "Automates review triage for social video clips before partner publishing.",
    roiTarget: 920000,
    roiActual: 760000,
    adoption: 82,
    risk: 22,
    vendor: "On Track",
    blocker: "None",
    nextGate: "Scale decision",
    dependency: "Rights taxonomy",
    milestoneSlip: 0,
    scopeStability: 91,
    technicalQuality: 88,
    changePlan: "Embedded in weekly digital ops workflow",
  },
  {
    id: "ufc-matchmaking",
    name: "Fight Week Staffing Optimizer",
    bu: "UFC",
    owner: "SVP, Event Operations",
    phase: "Build",
    buildPath: "Vendor pod",
    scope: "Recommends staff coverage plans for live event operations based on venue, schedule, and incident patterns.",
    roiTarget: 640000,
    roiActual: 210000,
    adoption: 48,
    risk: 71,
    vendor: "Watch",
    blocker: "Venue data normalization",
    nextGate: "Pilot readiness",
    dependency: "Event staffing feed",
    milestoneSlip: 12,
    scopeStability: 63,
    technicalQuality: 76,
    changePlan: "Pilot managers identified; role impacts unresolved",
  },
  {
    id: "img-rights",
    name: "Rights Intelligence Briefing Agent",
    bu: "IMG",
    owner: "Head of Commercial Strategy",
    phase: "Scoping",
    buildPath: "COE spec + vendor estimate",
    scope: "Creates partner-ready briefs from rights inventory, sales notes, and campaign performance.",
    roiTarget: 1180000,
    roiActual: 0,
    adoption: 0,
    risk: 38,
    vendor: "Pending SOW",
    blocker: "Requirements brief in review",
    nextGate: "DTC intake approval",
    dependency: "CRM field mapping",
    milestoneSlip: 0,
    scopeStability: 84,
    technicalQuality: 0,
    changePlan: "Sales enablement path drafted",
  },
  {
    id: "location-premium",
    name: "Premium Hospitality Demand Forecaster",
    bu: "On Location",
    owner: "VP, Revenue Management",
    phase: "Production",
    buildPath: "Internal analytics + vendor workflow layer",
    scope: "Forecasts package demand shifts and suggests inventory actions for premium hospitality events.",
    roiTarget: 1540000,
    roiActual: 1690000,
    adoption: 91,
    risk: 18,
    vendor: "Accepted",
    blocker: "None",
    nextGate: "Capability transfer closeout",
    dependency: "Pricing model refresh",
    milestoneSlip: 0,
    scopeStability: 94,
    technicalQuality: 90,
    changePlan: "Revenue managers using weekly action queue",
  },
  {
    id: "pbr-sponsor",
    name: "Sponsor Activation Recap Agent",
    bu: "PBR",
    owner: "Director, Partnerships",
    phase: "Pilot",
    buildPath: "Vendor pod",
    scope: "Turns event, media, and brand activation notes into sponsor recap packages.",
    roiTarget: 430000,
    roiActual: 170000,
    adoption: 54,
    risk: 58,
    vendor: "Watch",
    blocker: "Incomplete activation templates",
    nextGate: "Adoption evidence",
    dependency: "Sponsor recap standard",
    milestoneSlip: 6,
    scopeStability: 70,
    technicalQuality: 82,
    changePlan: "Partner success leads trained; templates inconsistent",
  },
  {
    id: "css-invoice",
    name: "Invoice Exception Resolution Agent",
    bu: "CSS",
    owner: "VP, Finance Operations",
    phase: "Build",
    buildPath: "TKO engineering + vendor QA",
    scope: "Classifies invoice exceptions and recommends next best resolution action.",
    roiTarget: 780000,
    roiActual: 260000,
    adoption: 37,
    risk: 81,
    vendor: "Escalate",
    blocker: "ERP access and control signoff",
    nextGate: "Risk remediation",
    dependency: "ERP exception export",
    milestoneSlip: 18,
    scopeStability: 59,
    technicalQuality: 68,
    changePlan: "Finance supervisors aligned; controls approval pending",
  },
];

let initiatives = loadInitiatives();
let selectedId = initiatives[0]?.id;
let lastScore = null;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadInitiatives() {
  const stored = window.localStorage.getItem("aiDeliveryInitiatives");
  if (!stored) return structuredClone(sampleInitiatives);
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(sampleInitiatives);
  } catch {
    return structuredClone(sampleInitiatives);
  }
}

function saveInitiatives() {
  window.localStorage.setItem("aiDeliveryInitiatives", JSON.stringify(initiatives));
}

function getFilteredInitiatives() {
  const bu = document.querySelector("#buFilter").value;
  const phase = document.querySelector("#phaseFilter").value;
  return initiatives.filter((initiative) => {
    const buMatch = bu === "All" || initiative.bu === bu;
    const phaseMatch = phase === "All" || initiative.phase === phase;
    return buMatch && phaseMatch;
  });
}

function healthFor(initiative) {
  if (initiative.risk >= 75 || initiative.vendor === "Escalate") {
    return { label: "Escalate", className: "status-red" };
  }
  if (initiative.risk >= 50 || initiative.milestoneSlip > 5) {
    return { label: "Watch", className: "status-amber" };
  }
  if (initiative.phase === "Scoping") {
    return { label: "Scoping", className: "status-blue" };
  }
  return { label: "Healthy", className: "status-green" };
}

function recommendationFor(initiative) {
  if (initiative.vendor === "Escalate") {
    return `Escalate ${initiative.blocker.toLowerCase()} with a decision memo that names the owner, deadline, and production gate impact.`;
  }
  if (initiative.adoption > 80 && initiative.roiActual >= initiative.roiTarget) {
    return "Close the milestone, capture reusable assets, and move capability transfer into the next portfolio planning cycle.";
  }
  if (initiative.adoption < 55 && initiative.phase !== "Scoping") {
    return "Pair the next delivery milestone with a change-management sprint and require adoption evidence before scale approval.";
  }
  if (initiative.phase === "Scoping") {
    return "Approve scoping only after success metrics, data owner, build path, and vendor acceptance criteria are explicit.";
  }
  return "Keep the build moving while watching scope stability and confirming the next milestone ties to measurable value.";
}

function narrativeFor(initiative) {
  const roiPct = initiative.roiTarget ? Math.round((initiative.roiActual / initiative.roiTarget) * 100) : 0;
  if (initiative.phase === "Scoping") {
    return `${initiative.name} is in scoping with a projected annual value of ${formatCurrency(initiative.roiTarget)}. The current decision is whether the requirements brief is delivery-ready and sequenced against vendor capacity.`;
  }
  return `${initiative.name} is ${initiative.phase.toLowerCase()} with ${initiative.adoption}% adoption and ${roiPct}% of projected value currently evidenced. The delivery path is ${initiative.buildPath.toLowerCase()}.`;
}

function populateFilters() {
  const buFilter = document.querySelector("#buFilter");
  const phaseFilter = document.querySelector("#phaseFilter");
  const currentBu = buFilter.value || "All";
  const currentPhase = phaseFilter.value || "All";
  const bus = [...new Set(initiatives.map((item) => item.bu))].sort();
  const phases = [...new Set(initiatives.map((item) => item.phase))].sort();

  buFilter.innerHTML = `<option value="All">All</option>${bus
    .map((bu) => `<option value="${escapeHtml(bu)}">${escapeHtml(bu)}</option>`)
    .join("")}`;
  phaseFilter.innerHTML = `<option value="All">All</option>${phases
    .map((phase) => `<option value="${escapeHtml(phase)}">${escapeHtml(phase)}</option>`)
    .join("")}`;

  buFilter.value = bus.includes(currentBu) ? currentBu : "All";
  phaseFilter.value = phases.includes(currentPhase) ? currentPhase : "All";
}

function renderMetrics() {
  const approved = initiatives.filter((item) => item.phase !== "Scoping");
  const inFlight = initiatives.filter((item) => ["Build", "Pilot", "Production"].includes(item.phase));
  const projected = approved.reduce((sum, item) => sum + item.roiTarget, 0);
  const realized = approved.reduce((sum, item) => sum + item.roiActual, 0);
  const escalations = initiatives.filter((item) => healthFor(item).label === "Escalate").length;
  const buildCount = initiatives.filter((item) => item.phase === "Build").length;
  const realizedPct = projected ? Math.round((realized / projected) * 100) : 0;

  document.querySelector("#metricInFlight").textContent = inFlight.length;
  document.querySelector("#metricInFlightNote").textContent = `${buildCount} in build`;
  document.querySelector("#metricProjected").textContent = formatCurrency(projected);
  document.querySelector("#metricRealized").textContent = formatCurrency(realized);
  document.querySelector("#metricRealizedNote").textContent = `${realizedPct}% of target`;
  document.querySelector("#metricEscalations").textContent = escalations;
  document.querySelector("#metricEscalationNote").textContent =
    escalations === 1 ? "1 critical blocker" : `${escalations} critical blockers`;
}

function renderPortfolio() {
  const rows = document.querySelector("#initiativeRows");
  const filtered = getFilteredInitiatives();
  if (!filtered.some((item) => item.id === selectedId)) {
    selectedId = filtered[0]?.id || initiatives[0]?.id;
  }

  rows.innerHTML = filtered
    .map((initiative) => {
      const health = healthFor(initiative);
      const roiPct = initiative.roiTarget ? Math.round((initiative.roiActual / initiative.roiTarget) * 100) : 0;
      return `
        <tr data-id="${escapeHtml(initiative.id)}" class="${initiative.id === selectedId ? "selected" : ""}">
          <td>
            <div class="initiative-name">
              <strong>${escapeHtml(initiative.name)}</strong>
              <span>${escapeHtml(initiative.owner)}</span>
            </div>
          </td>
          <td>${escapeHtml(initiative.bu)}</td>
          <td>${escapeHtml(initiative.phase)}</td>
          <td><span class="status-pill ${health.className}">${health.label}</span></td>
          <td>${initiative.adoption}%</td>
          <td>${roiPct}%</td>
          <td>${escapeHtml(initiative.vendor)}</td>
        </tr>
      `;
    })
    .join("");

  rows.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      selectedId = row.dataset.id;
      render();
    });
  });

  renderDetail();
}

function renderDetail() {
  const initiative = initiatives.find((item) => item.id === selectedId) || initiatives[0];
  if (!initiative) return;
  const health = healthFor(initiative);

  document.querySelector("#detailHealth").className = `status-pill ${health.className}`;
  document.querySelector("#detailHealth").textContent = health.label;
  document.querySelector("#detailPhase").textContent = initiative.phase;
  document.querySelector("#detailTitle").textContent = initiative.name;
  document.querySelector("#detailNarrative").textContent = narrativeFor(initiative);
  document.querySelector("#detailOwner").textContent = initiative.owner;
  document.querySelector("#detailBuild").textContent = initiative.buildPath;
  document.querySelector("#detailBlocker").textContent = initiative.blocker;
  document.querySelector("#detailGate").textContent = initiative.nextGate;
  document.querySelector("#detailAdoptionText").textContent = `${initiative.adoption}%`;
  document.querySelector("#detailAdoptionBar").style.width = `${initiative.adoption}%`;
  document.querySelector("#detailRecommendation").textContent = recommendationFor(initiative);
}

function scoreUseCase() {
  const businessValue = Number(document.querySelector("#businessValue").value);
  const dataReadiness = Number(document.querySelector("#dataReadiness").value);
  const changeComplexity = Number(document.querySelector("#changeComplexity").value);
  const dependencyLoad = Number(document.querySelector("#dependencyLoad").value);
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        businessValue * 18 +
          dataReadiness * 16 +
          (6 - changeComplexity) * 11 +
          (6 - dependencyLoad) * 9 -
          18
      )
    )
  );
  const decision =
    score >= 80 ? "Approve for scoping" : score >= 62 ? "Hold for clarification" : "Do not sequence yet";
  const timeToValue =
    dataReadiness >= 4 && dependencyLoad <= 2 ? "6-8 weeks" : dependencyLoad >= 4 ? "12-16 weeks" : "8-12 weeks";
  const roiTarget = (businessValue * 190000 + dataReadiness * 85000) * (changeComplexity >= 4 ? 0.82 : 1);

  lastScore = {
    name: document.querySelector("#intakeName").value.trim(),
    bu: document.querySelector("#intakeBu").value,
    problem: document.querySelector("#intakeProblem").value.trim(),
    score,
    decision,
    timeToValue,
    roiTarget: Math.round(roiTarget),
    businessValue,
    dataReadiness,
    changeComplexity,
    dependencyLoad,
  };

  const scoreColor = score >= 80 ? "var(--teal)" : score >= 62 ? "var(--amber)" : "var(--red)";
  document.querySelector("#scoreRing").style.background = `conic-gradient(${scoreColor} ${score}%, #e5edf2 0)`;
  document.querySelector("#scoreNumber").textContent = score;
  document.querySelector("#scoreDecision").textContent = decision;
  document.querySelector("#scoreSummary").textContent =
    `${lastScore.name} has an estimated ${timeToValue} time-to-value and ${formatCurrency(lastScore.roiTarget)} projected annual value.`;
  document.querySelector("#scoreDrivers").innerHTML = [
    ["Business value", businessValue],
    ["Data readiness", dataReadiness],
    ["Change complexity", changeComplexity],
    ["Dependency load", dependencyLoad],
  ]
    .map(([label, value]) => `<div class="driver"><span>${escapeHtml(label)}</span><span>${value}/5</span></div>`)
    .join("");
}

function addScoredInitiative() {
  if (!lastScore || !lastScore.name) {
    scoreUseCase();
  }
  const id = `${lastScore.bu}-${lastScore.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const existing = initiatives.find((item) => item.id === id);
  const newInitiative = {
    id: existing ? `${id}-${Date.now()}` : id,
    name: lastScore.name,
    bu: lastScore.bu,
    owner: "BU sponsor to confirm",
    phase: "Scoping",
    buildPath: "COE spec + vendor estimate",
    scope: lastScore.problem,
    roiTarget: lastScore.roiTarget,
    roiActual: 0,
    adoption: 0,
    risk: Math.max(20, 100 - lastScore.score),
    vendor: "Pending SOW",
    blocker: "Success criteria and data owner confirmation",
    nextGate: "DTC intake approval",
    dependency: "Data source mapping",
    milestoneSlip: 0,
    scopeStability: Math.max(58, lastScore.score),
    technicalQuality: 0,
    changePlan: "Adoption plan required during scoping",
  };

  initiatives.unshift(newInitiative);
  selectedId = newInitiative.id;
  saveInitiatives();
  populateFilters();
  document.querySelector("#buFilter").value = "All";
  document.querySelector("#phaseFilter").value = "All";
  switchView("portfolio");
  render();
}

function renderValue() {
  const byBu = initiatives.reduce((map, item) => {
    if (!map[item.bu]) map[item.bu] = { projected: 0, realized: 0 };
    map[item.bu].projected += item.roiTarget;
    map[item.bu].realized += item.roiActual;
    return map;
  }, {});
  const maxProjected = Math.max(...Object.values(byBu).map((item) => item.projected), 1);

  document.querySelector("#valueBars").innerHTML = Object.entries(byBu)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([bu, value]) => {
      const projectedWidth = Math.max(7, Math.round((value.projected / maxProjected) * 100));
      const realizedWidth = value.projected ? Math.round((value.realized / value.projected) * projectedWidth) : 0;
      return `
        <div class="chart-row">
          <strong>${escapeHtml(bu)}</strong>
          <div class="chart-track">
            <span class="projected" style="width: ${projectedWidth}%"></span>
            <span class="realized" style="width: ${realizedWidth}%"></span>
          </div>
          <span>${formatCurrency(value.realized)}</span>
        </div>
      `;
    })
    .join("");

  const approved = initiatives.filter((item) => item.phase !== "Scoping");
  const projected = approved.reduce((sum, item) => sum + item.roiTarget, 0);
  const realized = approved.reduce((sum, item) => sum + item.roiActual, 0);
  const avgAdoption = approved.length
    ? Math.round(approved.reduce((sum, item) => sum + item.adoption, 0) / approved.length)
    : 0;
  const vendorWatch = initiatives.filter((item) => ["Watch", "Escalate"].includes(item.vendor)).length;
  const strongest = [...approved].sort((a, b) => b.roiActual / b.roiTarget - a.roiActual / a.roiTarget)[0];

  document.querySelector("#roiFinding").textContent =
    `Approved work has realized ${formatCurrency(realized)} against ${formatCurrency(projected)} projected annual value. ${strongest.name} is the strongest value proof point.`;
  document.querySelector("#adoptionFinding").textContent =
    `Average adoption across non-scoping initiatives is ${avgAdoption}%. Initiatives below 55% should not move to scale without behavior-change evidence.`;
  document.querySelector("#commercialFinding").textContent =
    `${vendorWatch} initiative${vendorWatch === 1 ? "" : "s"} require vendor governance attention before the next milestone is accepted.`;
}

function renderGateStatus() {
  const escalated = initiatives.filter((item) => healthFor(item).label === "Escalate");
  const lowAdoption = initiatives.filter((item) => item.phase !== "Scoping" && item.adoption < 55);
  const gateStatus = document.querySelector("#gateStatus");
  const gateDetail = document.querySelector("#gateDetail");

  if (escalated.length) {
    gateStatus.textContent = "Milestone Hold";
    gateDetail.textContent = `${escalated[0].name} needs sponsor-level resolution before production acceptance.`;
    return;
  }
  if (lowAdoption.length) {
    gateStatus.textContent = "Adoption Watch";
    gateDetail.textContent = `${lowAdoption.length} initiative${lowAdoption.length === 1 ? "" : "s"} need stronger usage evidence.`;
    return;
  }
  gateStatus.textContent = "Green";
  gateDetail.textContent = "Active work meets current scope, value, and adoption gates.";
}

function renderMemo() {
  const approved = initiatives.filter((item) => item.phase !== "Scoping");
  const projected = approved.reduce((sum, item) => sum + item.roiTarget, 0);
  const realized = approved.reduce((sum, item) => sum + item.roiActual, 0);
  const realizedPct = projected ? Math.round((realized / projected) * 100) : 0;
  const escalations = initiatives.filter((item) => healthFor(item).label === "Escalate");
  const watchItems = initiatives.filter((item) => healthFor(item).label === "Watch");
  const production = initiatives.filter((item) => item.phase === "Production");
  const scoping = initiatives.filter((item) => item.phase === "Scoping");
  const topValue = [...approved].sort((a, b) => b.roiActual - a.roiActual)[0];

  document.querySelector("#executiveMemo").innerHTML = `
    <h3>Executive Delivery Update</h3>
    <p>The AI delivery portfolio includes <strong>${initiatives.length}</strong> initiatives across ${new Set(initiatives.map((item) => item.bu)).size} business units. Approved work is tracking at <strong>${realizedPct}%</strong> of projected annual value, with ${formatCurrency(realized)} evidenced against ${formatCurrency(projected)} projected.</p>
    <ul>
      <li><strong>Value proof:</strong> ${escapeHtml(topValue.name)} is the clearest production proof point, with ${formatCurrency(topValue.roiActual)} realized and ${topValue.adoption}% adoption.</li>
      <li><strong>Delivery risk:</strong> ${escalations.length ? `${escapeHtml(escalations[0].name)} is on milestone hold because ${escapeHtml(escalations[0].blocker.toLowerCase())}.` : "No active initiative requires sponsor escalation."}</li>
      <li><strong>Adoption risk:</strong> ${watchItems.length} initiative${watchItems.length === 1 ? "" : "s"} are on watch, primarily where workflow ownership or data readiness is not yet resolved.</li>
      <li><strong>Sequencing:</strong> ${production.length} initiative${production.length === 1 ? "" : "s"} are in production and ${scoping.length} are in scoping. Next sequencing decisions should prioritize reusable assets, capability transfer, and BU readiness over raw intake volume.</li>
    </ul>
    <p><strong>Recommended ask:</strong> approve sponsor intervention on escalated dependencies, require adoption evidence at every pilot-to-scale gate, and keep vendor milestone acceptance tied to value criteria rather than build completion alone.</p>
  `;
}

function switchView(viewName) {
  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active");
  });
  document.querySelector(`#${viewName}View`).classList.add("active");
}

function render() {
  renderMetrics();
  renderPortfolio();
  renderValue();
  renderGateStatus();
  renderMemo();
}

document.querySelectorAll(".nav-tab").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelector("#buFilter").addEventListener("change", render);
document.querySelector("#phaseFilter").addEventListener("change", render);

document.querySelector("#intakeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  scoreUseCase();
});

document.querySelectorAll("#intakeForm input, #intakeForm select, #intakeForm textarea").forEach((input) => {
  input.addEventListener("input", scoreUseCase);
});

document.querySelector("#addScoredInitiative").addEventListener("click", addScoredInitiative);

document.querySelector("#resetData").addEventListener("click", () => {
  initiatives = structuredClone(sampleInitiatives);
  selectedId = initiatives[0].id;
  saveInitiatives();
  populateFilters();
  render();
});

document.querySelector("#copyNarrative").addEventListener("click", async () => {
  const text = document.querySelector("#executiveMemo").innerText;
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector("#copyNarrative").textContent = "Copied";
    setTimeout(() => {
      document.querySelector("#copyNarrative").textContent = "Copy Memo";
    }, 1400);
  } catch {
    document.querySelector("#copyNarrative").textContent = "Select Memo";
  }
});

populateFilters();
scoreUseCase();
render();
