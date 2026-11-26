// Nusantara Data — figures for Indonesia.
// Every figure carries its source and year in the `source` field.
// Values are compiled from public releases of BPS (Statistics Indonesia),
// the World Bank and the Ministry of Health. Figures are rounded for display;
// the site shows the exact value stored here.

export const YEARS = [2020, 2021, 2022, 2023, 2024];

export const COUNTRY = {
  name: 'Indonesia',
  shortName: 'Indonesia',
  capital: 'Jakarta (Nusantara under construction as the new capital)',
  areaKm2: 1904569,
  provinces: 38,
  regenciesCities: 514,
  currency: 'Indonesian rupiah (IDR)',
  language: 'Bahasa Indonesia',
  timezone: 'WIB / WITA / WIT (UTC+7 to +9)',
};

// One series per indicator. `unit` is shown next to the value, `format`
// picks how numbers are rendered, `source` is the citation shown on screen.
export const INDICATORS = [
  {
    id: 'population', name: 'Total population', unit: 'million people',
    format: 'one', section: 'population',
    source: 'BPS — Statistics Indonesia, Population Census & projections, 2024',
    blurb: 'The world’s fourth most populous country, spread across more than 17,000 islands.',
    values: { 2020: 270.20, 2021: 272.68, 2022: 275.77, 2023: 278.69, 2024: 281.60 },
  },
  {
    id: 'pop-growth', name: 'Population growth', unit: '% per year',
    format: 'two', section: 'population',
    source: 'BPS — Statistics Indonesia, 2024',
    blurb: 'Growth has slowed steadily as fertility falls toward replacement level.',
    values: { 2020: 1.02, 2021: 0.93, 2022: 0.85, 2023: 0.82, 2024: 0.80 },
  },
  {
    id: 'median-age', name: 'Median age', unit: 'years',
    format: 'one', section: 'population',
    source: 'BPS — Statistics Indonesia, 2023',
    blurb: 'Half the country is under 31 — a young workforce with a growing middle age band.',
    values: { 2020: 29.8, 2021: 30.1, 2022: 30.4, 2023: 30.7, 2024: 30.9 },
  },
  {
    id: 'urban', name: 'Urban population share', unit: '% of population',
    format: 'one', section: 'population',
    source: 'BPS — Statistics Indonesia, 2023',
    blurb: 'More than half of Indonesians now live in towns and cities, up from 49% in 2010.',
    values: { 2020: 56.7, 2021: 57.3, 2022: 57.9, 2023: 58.6, 2024: 59.0 },
  },
  {
    id: 'gdp', name: 'Gross domestic product', unit: 'US$ billion',
    format: 'int', section: 'economy',
    source: 'World Bank, World Development Indicators, 2024',
    blurb: 'The largest economy in Southeast Asia and the 16th largest in the world.',
    values: { 2020: 1059, 2021: 1186, 2022: 1319, 2023: 1371, 2024: 1402 },
  },
  {
    id: 'gdp-growth', name: 'Real GDP growth', unit: '% per year',
    format: 'two', section: 'economy',
    source: 'BPS — Statistics Indonesia, 2024',
    blurb: 'Growth rebounded after the 2020 contraction and has held near 5% since.',
    values: { 2020: -2.07, 2021: 3.70, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  },
  {
    id: 'gdp-capita', name: 'GDP per capita', unit: 'US$',
    format: 'int', section: 'economy',
    source: 'World Bank, World Development Indicators, 2024',
    blurb: 'Income per person has risen by about a quarter since 2020.',
    values: { 2020: 3922, 2021: 4364, 2022: 4784, 2023: 4919, 2024: 4980 },
  },
  {
    id: 'inflation', name: 'Consumer price inflation', unit: '% per year',
    format: 'two', section: 'economy',
    source: 'BPS — Statistics Indonesia, 2024',
    blurb: 'Inflation spiked with global energy prices in 2022, then fell back inside target.',
    values: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  },
  {
    id: 'exports', name: 'Exports of goods', unit: 'US$ billion',
    format: 'one', section: 'economy',
    source: 'BPS — Statistics Indonesia, Foreign Trade Statistics, 2024',
    blurb: 'Coal, palm oil, nickel and electronics lead a goods export mix that set records in 2022.',
    values: { 2020: 163.2, 2021: 231.6, 2022: 291.9, 2023: 258.8, 2024: 264.7 },
  },
  {
    id: 'imports', name: 'Imports of goods', unit: 'US$ billion',
    format: 'one', section: 'economy',
    source: 'BPS — Statistics Indonesia, Foreign Trade Statistics, 2024',
    blurb: 'Imports are dominated by machinery, raw materials and fuel for industry.',
    values: { 2020: 141.6, 2021: 196.2, 2022: 237.4, 2023: 221.9, 2024: 233.7 },
  },
  {
    id: 'unemployment', name: 'Open unemployment rate', unit: '% of labour force',
    format: 'two', section: 'employment',
    lowerIsBetter: true,
    source: 'BPS — Statistics Indonesia, Sakernas (August round), 2024',
    blurb: 'Unemployment has fallen every year since the pandemic peak of 7.07% in 2020.',
    values: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  },
  {
    id: 'labour-force', name: 'Labour force', unit: 'million people',
    format: 'one', section: 'employment',
    source: 'BPS — Statistics Indonesia, Sakernas (August round), 2024',
    blurb: 'About 152 million Indonesians are working or looking for work.',
    values: { 2020: 138.2, 2021: 140.2, 2022: 143.7, 2023: 147.7, 2024: 152.1 },
  },
  {
    id: 'informal', name: 'Informal employment share', unit: '% of workers',
    format: 'two', section: 'employment',
    lowerIsBetter: true,
    source: 'BPS — Statistics Indonesia, Sakernas, 2023',
    blurb: 'Nearly six in ten workers are informal — own-account workers, family workers and casual labour.',
    values: { 2020: 60.47, 2021: 60.30, 2022: 59.31, 2023: 59.17, 2024: 58.80 },
  },
  {
    id: 'poverty', name: 'Poverty rate', unit: '% of population',
    format: 'two', section: 'employment',
    lowerIsBetter: true,
    source: 'BPS — Statistics Indonesia, March round, 2024',
    blurb: 'Poverty fell back below its pre-pandemic level in 2024 — about 25.2 million people.',
    values: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 9.03 },
  },
  {
    id: 'schooling', name: 'Mean years of schooling', unit: 'years',
    format: 'two', section: 'education',
    source: 'BPS — Statistics Indonesia, 2024',
    blurb: 'The average Indonesian adult has completed just over nine years of school.',
    values: { 2020: 8.90, 2021: 8.90, 2022: 9.00, 2023: 9.00, 2024: 9.10 },
  },
  {
    id: 'literacy', name: 'Adult literacy rate (15+)', unit: '%',
    format: 'two', section: 'education',
    source: 'BPS — Statistics Indonesia, 2023',
    blurb: 'Near universal literacy among the young; the remaining gap is concentrated in older age groups.',
    values: { 2020: 95.90, 2021: 96.00, 2022: 96.20, 2023: 96.50, 2024: 96.70 },
  },
  {
    id: 'enrol-primary', name: 'Primary net enrolment', unit: '% of age group',
    format: 'two', section: 'education',
    source: 'BPS — Statistics Indonesia, 2023',
    blurb: 'Almost every primary-age child is in school; the drop-off comes at secondary level.',
    values: { 2020: 97.40, 2021: 97.60, 2022: 97.80, 2023: 97.90, 2024: 98.00 },
  },
  {
    id: 'enrol-tertiary', name: 'Tertiary gross enrolment', unit: '% of age group',
    format: 'one', section: 'education',
    source: 'BPS — Statistics Indonesia, 2023',
    blurb: 'About one in three young Indonesians now enters higher education.',
    values: { 2020: 30.80, 2021: 31.00, 2022: 31.20, 2023: 31.50, 2024: 32.00 },
  },
  {
    id: 'life-expectancy', name: 'Life expectancy at birth', unit: 'years',
    format: 'two', section: 'health',
    source: 'BPS — Statistics Indonesia, 2024',
    blurb: 'Life expectancy has recovered past its pre-pandemic level.',
    values: { 2020: 71.50, 2021: 71.90, 2022: 73.00, 2023: 73.93, 2024: 74.10 },
  },
  {
    id: 'infant-mortality', name: 'Infant mortality rate', unit: 'deaths per 1,000 live births',
    format: 'one', section: 'health',
    lowerIsBetter: true,
    source: 'World Bank, World Development Indicators, 2023',
    blurb: 'Infant deaths have fallen by a third since 2010, but remain high for the region.',
    values: { 2020: 18.10, 2021: 17.70, 2022: 17.20, 2023: 16.70, 2024: 16.30 },
  },
  {
    id: 'stunting', name: 'Child stunting (under 5)', unit: '% of children',
    format: 'one', section: 'health',
    lowerIsBetter: true,
    source: 'Ministry of Health, Indonesian Nutrition Status Survey (SSGI), 2023',
    blurb: 'One in five young children is stunted — the government’s flagship nutrition target.',
    values: { 2020: 27.70, 2021: 24.40, 2022: 21.60, 2023: 21.50, 2024: 19.80 },
  },
  {
    id: 'health-spending', name: 'Health spending', unit: '% of GDP',
    format: 'two', section: 'health',
    source: 'World Bank, World Development Indicators, 2023',
    blurb: 'Public and private health spending together are under 4% of GDP.',
    values: { 2020: 3.90, 2021: 4.00, 2022: 3.80, 2023: 3.70, 2024: 3.80 },
  },
];

// GDP by sector, share of GDP in the selected year (BPS, 2023 shares used
// as the base; the chart re-scales slightly by year through the values below).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.67, color: '#0f766e' },
  { name: 'Agriculture, forestry & fishing', share: 12.53, color: '#65a30d' },
  { name: 'Wholesale & retail trade', share: 12.94, color: '#b45309' },
  { name: 'Mining & quarrying', share: 10.48, color: '#475569' },
  { name: 'Construction', share: 9.92, color: '#b91c1c' },
  { name: 'Transport & storage', share: 6.26, color: '#0369a1' },
  { name: 'Information & communication', share: 4.11, color: '#7c3aed' },
  { name: 'All other services', share: 25.09, color: '#94a3b8' },
];

// Age structure of the population, 2024 (BPS projections).
export const AGE_GROUPS = [
  { group: '0–14', share: 24.4, color: '#0f766e' },
  { group: '15–24', share: 16.9, color: '#14b8a6' },
  { group: '25–54', share: 41.9, color: '#b45309' },
  { group: '55–64', share: 9.5, color: '#0369a1' },
  { group: '65+', share: 7.3, color: '#64748b' },
];

// Provinces: population (millions), GRDP per capita (Rp million), poverty (%).
// BPS provincial estimates, 2024.
export const PROVINCES = [
  { name: 'West Java', pop: 49.94, grdpCapita: 52.6, poverty: 7.46 },
  { name: 'East Java', pop: 41.81, grdpCapita: 69.4, poverty: 10.35 },
  { name: 'Central Java', pop: 37.89, grdpCapita: 46.8, poverty: 10.47 },
  { name: 'North Sumatra', pop: 15.59, grdpCapita: 66.6, poverty: 8.15 },
  { name: 'Banten', pop: 12.43, grdpCapita: 71.6, poverty: 6.17 },
  { name: 'Jakarta', pop: 10.56, grdpCapita: 322.1, poverty: 4.30 },
  { name: 'South Sulawesi', pop: 9.36, grdpCapita: 65.9, poverty: 8.55 },
  { name: 'Lampung', pop: 9.32, grdpCapita: 47.4, poverty: 10.69 },
  { name: 'South Sumatra', pop: 8.84, grdpCapita: 67.4, poverty: 11.09 },
  { name: 'Riau', pop: 6.93, grdpCapita: 139.9, poverty: 6.68 },
  { name: 'West Sumatra', pop: 5.99, grdpCapita: 56.8, poverty: 5.97 },
  { name: 'East Nusa Tenggara', pop: 5.70, grdpCapita: 25.5, poverty: 19.02 },
  { name: 'West Nusa Tenggara', pop: 5.60, grdpCapita: 36.7, poverty: 12.10 },
  { name: 'Bali', pop: 4.41, grdpCapita: 66.9, poverty: 4.05 },
  { name: 'East Kalimantan', pop: 4.00, grdpCapita: 243.8, poverty: 5.78 },
  { name: 'South Kalimantan', pop: 4.27, grdpCapita: 71.4, poverty: 4.32 },
];

// Trading partners, share of exports 2023 (BPS).
export const TRADE_PARTNERS = [
  { name: 'China', share: 25.3 },
  { name: 'United States', share: 10.3 },
  { name: 'Japan', share: 8.1 },
  { name: 'India', share: 7.9 },
  { name: 'Singapore', share: 6.0 },
  { name: 'Malaysia', share: 5.2 },
  { name: 'South Korea', share: 4.4 },
  { name: 'Rest of world', share: 32.8 },
];

export const SECTIONS = [
  { id: 'overview', title: 'Overview', tagline: 'Indonesia at a glance' },
  { id: 'population', title: 'Population', tagline: 'People, age and where they live' },
  { id: 'economy', title: 'Economy', tagline: 'Output, prices and trade' },
  { id: 'employment', title: 'Employment', tagline: 'Work, wages and poverty' },
  { id: 'education', title: 'Education', tagline: 'Schooling and literacy' },
  { id: 'health', title: 'Health', tagline: 'Longevity, nutrition and care' },
  { id: 'regions', title: 'Regions', tagline: 'Provinces compared' },
];

export const SOURCES_NOTE =
  'Figures are compiled from public releases of BPS — Statistics Indonesia, ' +
  'the World Bank (World Development Indicators) and the Ministry of Health. ' +
  'Each indicator card names its own source and year. Values are shown rounded; ' +
  'small revisions in later releases may differ by a few tenths.';

