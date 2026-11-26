# Nusantara Data — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/scriptstealer/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/scriptstealer/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original, independent national statistics site for **Indonesia** — one open
notebook of the country's official figures, with every number labelled by its
source and year. Built for the make.fun bounty
"Make the best national statistics site".

## What it is

- **Overview** — Indonesia at a glance: population, GDP, growth, unemployment,
  poverty and life expectancy, with a headline GDP-growth chart.
- **Population** — total population, growth, median age, urban share and the
  2024 age structure.
- **Economy** — GDP, growth, GDP per capita, inflation, exports and imports,
  plus GDP by sector and the top export destinations.
- **Employment** — unemployment, labour force, informal work and poverty.
- **Education** — years of schooling, literacy and enrolment from primary to
  higher education.
- **Health** — life expectancy, infant mortality, child stunting and health
  spending.
- **Regions** — a sortable table of 16 provinces plus a province picker that
  shows population, GRDP per capita and poverty for the province you choose.

Every page is reached from the top navigation. The **year selector**
(2020–2024) changes the headline figures and highlights that year on every
chart. The **indicator search** filters all indicators by name. The
**Bars / Line** toggle redraws every chart, and the regions table sorts by
tapping a column heading. Figures come from BPS — Statistics Indonesia, the
World Bank and the Ministry of Health; each indicator card names its source.

## How to run it

No build step, no network. Serve `app/` with any static server:

```sh
cd app
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a desktop browser or on a phone.
Charts are drawn on canvas by the site's own code (`app/charts.js`); the
figures live in `app/data.js`, the pages in `app/views.js`, routing and
controls in `app/app.js`, and the design in `app/style.css`. If `data.js`
cannot be loaded, the site falls back to a small built-in figures set in
`app/fallback.js` and says so on screen instead of rendering empty.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
