// views.js — one render function per section of the site.
// Each view is a pure function of (data, state) returning HTML; app.js
// inserts it and then calls drawChartsFor(section) to paint the canvases.
// All figures come through the `data` object so the site works with the
// full data.js set or the small built-in fallback set.

import { drawBarChart, drawLineChart, drawDonut, drawHBarChart } from './charts.js';

export function fmt(value, format) {
  if (format === 'int') return Math.round(value).toLocaleString('en-US');
  if (format === 'one') return value.toFixed(1);
  return value.toFixed(2);
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function seriesPoints(ind, years) {
  return years.map((y) => ({ label: String(y), value: ind.values[y] }));
}

function changeSince(ind, year) {
  const prev = ind.values[year - 1];
  if (prev === undefined || prev === 0) return null;
  return ((ind.values[year] - prev) / Math.abs(prev)) * 100;
}

function sectionOf(data, id) {
  return data.sections.find((s) => s.id === id) || { id, title: id, tagline: '' };
}

// One indicator card: big figure for the selected year, change vs last
// year, a sparkline chart and its source line.
export function indicatorCard(ind, year, chartType) {
  const val = ind.values[year];
  const chg = changeSince(ind, year);
  // For indicators where a fall is good news (poverty, unemployment,
  // stunting…), a decrease shows green and a rise shows red.
  const good = chg === null ? true : ind.lowerIsBetter ? chg <= 0 : chg >= 0;
  const chgHtml = chg === null
    ? ''
    : '<span class="chg ' + (good ? 'up' : 'down') + '">' +
      (chg >= 0 ? '▲' : '▼') + ' ' + Math.abs(chg).toFixed(1) + '% vs ' + (year - 1) + '</span>';
  return (
    '<article class="card ind-card" data-ind="' + esc(ind.id) + '">' +
    '<h3>' + esc(ind.name) + '</h3>' +
    '<p class="big">' + fmt(val, ind.format) + ' <span class="unit">' + esc(ind.unit) + '</span></p>' +
    '<p class="meta">' + chgHtml + ' <span class="year-tag">' + year + '</span></p>' +
    '<canvas class="spark" data-chart="' + esc(ind.id) + '" data-type="' + esc(chartType) + '" data-year="' + year + '" width="520" height="120" aria-label="Chart of ' + esc(ind.name) + ' 2020 to 2024"></canvas>' +
    '<p class="blurb">' + esc(ind.blurb) + '</p>' +
    '<p class="source">Source: ' + esc(ind.source) + '</p>' +
    '</article>'
  );
}

export function sectionCards(data, sectionId, state) {
  const list = data.indicators.filter((i) => i.section === sectionId);
  return list.map((ind) => indicatorCard(ind, state.year, state.chartType)).join('\n');
}

function sectionIntro(data, id, extra) {
  const sec = sectionOf(data, id);
  return (
    '<header class="sec-head"><h2>' + esc(sec.title) + '</h2>' +
    '<p>' + esc(sec.tagline) + '</p>' + (extra || '') + '</header>'
  );
}

function chartToggle(state) {
  return (
    '<div class="controls" role="group" aria-label="Chart type">' +
    '<span class="ctl-label">Chart:</span>' +
    '<button type="button" class="ctl-btn' + (state.chartType === 'bar' ? ' active' : '') + '" data-chart-type="bar">Bars</button>' +
    '<button type="button" class="ctl-btn' + (state.chartType === 'line' ? ' active' : '') + '" data-chart-type="line">Line</button>' +
    '</div>'
  );
}

// ---- Overview: key indicators, search box, headline chart, sources ----
export function renderOverview(data, state) {
  const key = ['population', 'gdp', 'gdp-growth', 'unemployment', 'poverty', 'life-expectancy'];
  const cards = key
    .map((id) => data.indicators.find((i) => i.id === id))
    .filter(Boolean)
    .map((ind) => indicatorCard(ind, state.year, state.chartType))
    .join('\n');
  const q = (state.query || '').trim().toLowerCase();
  const matches = q
    ? data.indicators.filter((i) => (i.name + ' ' + i.blurb + ' ' + i.unit).toLowerCase().includes(q))
    : [];
  const searchHtml = q
    ? '<div class="search-results"><h3>Indicators matching “' + esc(state.query) + '” (' + matches.length + ')</h3>' +
      (matches.length
        ? matches.map((ind) => indicatorCard(ind, state.year, state.chartType)).join('\n')
        : '<p class="empty">No indicator matches that search. Try “population”, “trade” or “school”.</p>') +
      '</div>'
    : '';
  return (
    '<section class="hero">' +
    '<h2>Indonesia in numbers</h2>' +
    '<p class="lede">One open notebook of the country’s official statistics — population, economy, work, ' +
    'schooling, health and the provinces — with every figure labelled by its source and year.</p>' +
    '<dl class="facts">' +
    '<div><dt>Population</dt><dd>281.6 million (2024)</dd></div>' +
    '<div><dt>GDP</dt><dd>US$1,402 billion (2024)</dd></div>' +
    '<div><dt>Provinces</dt><dd>38, across 17,000+ islands</dd></div>' +
    '<div><dt>Currency</dt><dd>Indonesian rupiah (IDR)</dd></div>' +
    '</dl></section>' +
    sectionIntro(data, 'overview') +
    chartToggle(state) +
    '<div class="grid">' + cards + '</div>' +
    '<div class="panel"><h3>GDP growth, 2020–2024</h3>' +
    '<p class="panel-sub">Real GDP growth, % per year — BPS, Statistics Indonesia.</p>' +
    '<canvas class="big-chart" data-chart="gdp-growth" data-type="' + esc(state.chartType) + '" data-year="' + state.year + '" width="1000" height="300"></canvas></div>' +
    searchHtml +
    '<div class="panel sources"><h3>Where the numbers come from</h3><p>' + esc(data.sourcesNote) + '</p></div>'
  );
}

// ---- Population ----
export function renderPopulation(data, state) {
  return (
    sectionIntro(data, 'population') + chartToggle(state) +
    '<div class="grid">' + sectionCards(data, 'population', state) + '</div>' +
    '<div class="panel"><h3>Age structure, 2024</h3>' +
    '<p class="panel-sub">Share of the population by age group — BPS projections, 2024.</p>' +
    '<canvas class="big-chart" data-hbar="age" width="1000" height="240"></canvas>' +
    '<p class="panel-sub">Indonesia’s working-age bulge (25–54) is its largest cohort: the demographic dividend is still open.</p></div>' +
    '<div class="panel"><h3>How to read it</h3><p>Java holds about 56% of all Indonesians on 7% of the land. ' +
    'The population is still growing, but slower every year — the growth rate fell from 1.02% in 2020 to 0.80% in 2024.</p></div>'
  );
}

// ---- Economy ----
export function renderEconomy(data, state) {
  const sectors = data.sectors.map((s) =>
    '<li><span class="swatch" style="background:' + s.color + '"></span>' + esc(s.name) +
    ' <strong>' + s.share.toFixed(2) + '%</strong></li>').join('');
  return (
    sectionIntro(data, 'economy') + chartToggle(state) +
    '<div class="grid">' + sectionCards(data, 'economy', state) + '</div>' +
    '<div class="panel"><h3>What the economy is made of</h3>' +
    '<p class="panel-sub">Share of GDP by sector, 2023 — BPS, Statistics Indonesia.</p>' +
    '<div class="split"><canvas class="donut" data-donut="sectors" width="420" height="300"></canvas>' +
    '<ul class="legend">' + sectors + '</ul></div></div>' +
    '<div class="panel"><h3>Trade partners, 2023</h3>' +
    '<p class="panel-sub">Share of goods exports by destination — BPS Foreign Trade Statistics, 2023.</p>' +
    '<canvas class="big-chart" data-hbar="trade" width="1000" height="300"></canvas></div>'
  );
}

// ---- Employment ----
export function renderEmployment(data, state) {
  return (
    sectionIntro(data, 'employment') + chartToggle(state) +
    '<div class="grid">' + sectionCards(data, 'employment', state) + '</div>' +
    '<div class="panel"><h3>Unemployment is falling, informality is sticky</h3>' +
    '<p>Open unemployment fell from 7.07% in 2020 to 4.91% in 2024, yet almost six in ten workers ' +
    'remain informal — without a contract, social security or a fixed wage. Poverty fell to 9.03% in ' +
    'March 2024, its lowest since before the pandemic. Sources: BPS Sakernas and poverty releases, 2024.</p></div>'
  );
}

// ---- Education ----
export function renderEducation(data, state) {
  return (
    sectionIntro(data, 'education') + chartToggle(state) +
    '<div class="grid">' + sectionCards(data, 'education', state) + '</div>' +
    '<div class="panel"><h3>The pipeline narrows after primary school</h3>' +
    '<p>Nearly every child finishes primary school (98.0% net enrolment in 2024), but only about a ' +
    'third of young people reach higher education (32.0% gross enrolment). Mean years of schooling ' +
    'rose from 8.9 in 2020 to 9.1 in 2024. Sources: BPS, Statistics Indonesia, 2023–2024.</p></div>'
  );
}

// ---- Health ----
export function renderHealth(data, state) {
  return (
    sectionIntro(data, 'health') + chartToggle(state) +
    '<div class="grid">' + sectionCards(data, 'health', state) + '</div>' +
    '<div class="panel"><h3>Longer lives, unfinished nutrition</h3>' +
    '<p>Life expectancy reached 74.1 years in 2024 and infant mortality fell to 16.3 per 1,000 live ' +
    'births. The stubborn number is stunting: 19.8% of children under five in 2024, down from 27.7% ' +
    'in 2020 but still the government’s hardest target. Sources: BPS and Ministry of Health (SSGI), 2023–2024.</p></div>'
  );
}

// ---- Regions: sortable province table + province picker ----
export function renderRegions(data, state) {
  const rows = sortProvinces(data.provinces, state.sortKey, state.sortDir);
  const sel = state.province || 'Jakarta';
  const picked = data.provinces.find((p) => p.name === sel) || data.provinces[0];
  const options = data.provinces.map((p) =>
    '<option value="' + esc(p.name) + '"' + (p.name === picked.name ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('');
  const arrow = (key) => (state.sortKey === key ? (state.sortDir === 'asc' ? ' ▲' : ' ▼') : '');
  const body = rows.map((p) =>
    '<tr><td>' + esc(p.name) + '</td><td class="num">' + p.pop.toFixed(2) + '</td>' +
    '<td class="num">' + p.grdpCapita.toFixed(1) + '</td><td class="num">' + p.poverty.toFixed(2) + '</td></tr>').join('');
  return (
    sectionIntro(data, 'regions') +
    '<div class="panel"><h3>Compare a province</h3>' +
    '<label class="picker">Province <select id="province-select">' + options + '</select></label>' +
    '<dl class="facts">' +
    '<div><dt>Population</dt><dd>' + picked.pop.toFixed(2) + ' million (2024)</dd></div>' +
    '<div><dt>GRDP per capita</dt><dd>Rp ' + picked.grdpCapita.toFixed(1) + ' million (2024)</dd></div>' +
    '<div><dt>Poverty rate</dt><dd>' + picked.poverty.toFixed(2) + '% (2024)</dd></div>' +
    '</dl>' +
    '<p class="panel-sub">Provincial estimates — BPS, Statistics Indonesia, 2024. Jakarta’s output per person is more than twelve times East Nusa Tenggara’s; poverty runs from 4.05% in Bali to 19.02% in East Nusa Tenggara.</p></div>' +
    '<div class="panel"><h3>All provinces in this table</h3>' +
    '<p class="panel-sub">Tap a column heading to sort. Population in millions, GRDP per capita in Rp million, poverty in % — BPS, 2024.</p>' +
    '<div class="table-wrap"><table><thead><tr>' +
    '<th><button type="button" data-sort="name">Province' + arrow('name') + '</button></th>' +
    '<th class="num"><button type="button" data-sort="pop">Population' + arrow('pop') + '</button></th>' +
    '<th class="num"><button type="button" data-sort="grdpCapita">GRDP / capita' + arrow('grdpCapita') + '</button></th>' +
    '<th class="num"><button type="button" data-sort="poverty">Poverty' + arrow('poverty') + '</button></th>' +
    '</tr></thead><tbody>' + body + '</tbody></table></div></div>'
  );
}

export function sortProvinces(rows, key, dir) {
  const sorted = rows.slice();
  sorted.sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (typeof va === 'string') return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return dir === 'asc' ? va - vb : vb - va;
  });
  return sorted;
}

// ---- Chart painting after a view is inserted ----
export function drawChartsFor(data, state) {
  document.querySelectorAll('canvas[data-chart]').forEach((cv) => {
    const ind = data.indicators.find((i) => i.id === cv.dataset.chart);
    if (!ind) return;
    const pts = seriesPoints(ind, data.years);
    const hi = data.years.indexOf(state.year);
    const type = cv.dataset.type || 'bar';
    if (type === 'line') drawLineChart(cv, pts, { highlightIndex: hi });
    else drawBarChart(cv, pts, { highlightIndex: hi });
  });
  document.querySelectorAll('canvas[data-donut]').forEach((cv) => {
    drawDonut(cv, data.sectors.map((s) => ({ share: s.share, color: s.color })));
  });
  document.querySelectorAll('canvas[data-hbar="age"]').forEach((cv) => {
    drawHBarChart(cv, data.ageGroups.map((g) => ({ label: g.group, value: g.share, color: g.color })));
  });
  document.querySelectorAll('canvas[data-hbar="trade"]').forEach((cv) => {
    drawHBarChart(cv, data.tradePartners.map((t) => ({ label: t.name, value: t.share, color: '#0f766e' })));
  });
}

export const VIEWS = {
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  employment: renderEmployment,
  education: renderEducation,
  health: renderHealth,
  regions: renderRegions,
};
