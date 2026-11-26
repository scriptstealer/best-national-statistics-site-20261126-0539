// app.js — router, controls and defensive data loading for Nusantara Data.
// The figures live in data.js. This file loads that module by name first
// (dynamic import); if it is missing or broken, the site falls back to the
// small built-in set in fallback.js and shows a notice instead of crashing.
// Nothing here fetches from the network.

import { VIEWS, drawChartsFor } from './views.js';
import { FALLBACK } from './fallback.js';

const state = {
  year: 2024,
  chartType: 'bar',
  query: '',
  sortKey: 'pop',
  sortDir: 'desc',
  province: 'Jakarta',
  route: 'overview',
  data: null,
  dataNotice: '',
};

function parseRoute() {
  const hash = window.location.hash || '#/overview';
  const id = hash.replace(/^#\/?/, '').split('/')[0];
  return FALLBACK.sections.some((s) => s.id === id) ? id : 'overview';
}

async function loadData() {
  try {
    const mod = await import('./data.js');
    if (!mod || !Array.isArray(mod.INDICATORS) || mod.INDICATORS.length === 0) {
      throw new Error('data module empty');
    }
    state.data = {
      indicators: mod.INDICATORS,
      years: mod.YEARS,
      sections: mod.SECTIONS,
      sectors: mod.SECTORS,
      ageGroups: mod.AGE_GROUPS,
      provinces: mod.PROVINCES,
      tradePartners: mod.TRADE_PARTNERS,
      sourcesNote: mod.SOURCES_NOTE,
    };
    state.dataNotice = '';
  } catch (err) {
    // Named resource first, built-in fallback second: never an empty page.
    state.data = FALLBACK;
    state.dataNotice =
      'Showing the built-in figures set because the full data file could not be loaded.';
  }
}

function render() {
  const main = document.getElementById('main');
  const view = VIEWS[state.route] || VIEWS.overview;
  let html = view(state.data, state);
  if (state.dataNotice) {
    html = '<p class="notice" role="status">' + state.dataNotice + '</p>' + html;
  }
  main.innerHTML = html;
  drawChartsFor(state.data, state);
  document.querySelectorAll('#nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === state.route);
    if (a.dataset.route === state.route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const yearSel = document.getElementById('year-select');
  if (yearSel) yearSel.value = String(state.year);
  const q = document.getElementById('indicator-search');
  if (q && q.value !== state.query) q.value = state.query;
  window.scrollTo(0, 0);
}

function bindControls() {
  document.addEventListener('click', (ev) => {
    const chartBtn = ev.target.closest('[data-chart-type]');
    if (chartBtn) {
      state.chartType = chartBtn.dataset.chartType;
      render();
      return;
    }
    const sortBtn = ev.target.closest('[data-sort]');
    if (sortBtn) {
      const key = sortBtn.dataset.sort;
      if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else {
        state.sortKey = key;
        state.sortDir = key === 'name' ? 'asc' : 'desc';
      }
      render();
    }
  });

  document.addEventListener('change', (ev) => {
    if (ev.target.id === 'year-select') {
      state.year = Number(ev.target.value);
      render();
    }
    if (ev.target.id === 'province-select') {
      state.province = ev.target.value;
      render();
    }
  });

  document.addEventListener('input', (ev) => {
    if (ev.target.id === 'indicator-search') {
      state.query = ev.target.value;
      if (state.route !== 'overview') {
        state.route = 'overview';
        window.location.hash = '#/overview';
      }
      render();
    }
  });

  window.addEventListener('hashchange', () => {
    state.route = parseRoute();
    render();
  });
}

async function boot() {
  state.route = parseRoute();
  await loadData();
  bindControls();
  render();
}

boot();
