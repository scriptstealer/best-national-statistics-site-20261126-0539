// fallback.js — the built-in figures set for Nusantara Data.
// Used only when data.js cannot be loaded: the site still renders with
// real figures instead of an empty page. Kept deliberately small.

export const FALLBACK = {
  years: [2020, 2021, 2022, 2023, 2024],
  sections: [
    { id: 'overview', title: 'Overview', tagline: 'Indonesia at a glance' },
    { id: 'population', title: 'Population', tagline: 'People, age and where they live' },
    { id: 'economy', title: 'Economy', tagline: 'Output, prices and trade' },
    { id: 'employment', title: 'Employment', tagline: 'Work, wages and poverty' },
    { id: 'education', title: 'Education', tagline: 'Schooling and literacy' },
    { id: 'health', title: 'Health', tagline: 'Longevity, nutrition and care' },
    { id: 'regions', title: 'Regions', tagline: 'Provinces compared' },
  ],
  indicators: [
    {
      id: 'population', name: 'Total population', unit: 'million people',
      format: 'one', section: 'population',
      source: 'BPS — Statistics Indonesia, 2024',
      blurb: 'The world’s fourth most populous country.',
      values: { 2020: 270.20, 2021: 272.68, 2022: 275.77, 2023: 278.69, 2024: 281.60 },
    },
    {
      id: 'gdp', name: 'Gross domestic product', unit: 'US$ billion',
      format: 'int', section: 'economy',
      source: 'World Bank, 2024',
      blurb: 'The largest economy in Southeast Asia.',
      values: { 2020: 1059, 2021: 1186, 2022: 1319, 2023: 1371, 2024: 1402 },
    },
    {
      id: 'gdp-growth', name: 'Real GDP growth', unit: '% per year',
      format: 'two', section: 'economy',
      source: 'BPS — Statistics Indonesia, 2024',
      blurb: 'Growth has held near 5% since the 2020 contraction.',
      values: { 2020: -2.07, 2021: 3.70, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
    },
    {
      id: 'unemployment', name: 'Open unemployment rate', unit: '% of labour force',
      format: 'two', section: 'employment',
      lowerIsBetter: true,
      source: 'BPS — Statistics Indonesia, 2024',
      blurb: 'Unemployment has fallen every year since 2020.',
      values: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
    },
    {
      id: 'poverty', name: 'Poverty rate', unit: '% of population',
      format: 'two', section: 'employment',
      lowerIsBetter: true,
      source: 'BPS — Statistics Indonesia, 2024',
      blurb: 'Poverty fell back below its pre-pandemic level in 2024.',
      values: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 9.03 },
    },
    {
      id: 'life-expectancy', name: 'Life expectancy at birth', unit: 'years',
      format: 'two', section: 'health',
      source: 'BPS — Statistics Indonesia, 2024',
      blurb: 'Life expectancy has recovered past its pre-pandemic level.',
      values: { 2020: 71.50, 2021: 71.90, 2022: 73.00, 2023: 73.93, 2024: 74.10 },
    },
  ],
  sectors: [
    { name: 'Manufacturing', share: 18.67, color: '#0f766e' },
    { name: 'Agriculture, forestry & fishing', share: 12.53, color: '#65a30d' },
    { name: 'Wholesale & retail trade', share: 12.94, color: '#b45309' },
    { name: 'Mining & quarrying', share: 10.48, color: '#475569' },
    { name: 'Construction', share: 9.92, color: '#b91c1c' },
    { name: 'All other sectors', share: 37.46, color: '#94a3b8' },
  ],
  ageGroups: [
    { group: '0–14', share: 24.4, color: '#0f766e' },
    { group: '15–24', share: 16.9, color: '#14b8a6' },
    { group: '25–54', share: 41.9, color: '#b45309' },
    { group: '55–64', share: 9.5, color: '#0369a1' },
    { group: '65+', share: 7.3, color: '#64748b' },
  ],
  provinces: [
    { name: 'West Java', pop: 49.94, grdpCapita: 52.6, poverty: 7.46 },
    { name: 'East Java', pop: 41.81, grdpCapita: 69.4, poverty: 10.35 },
    { name: 'Central Java', pop: 37.89, grdpCapita: 46.8, poverty: 10.47 },
    { name: 'Jakarta', pop: 10.56, grdpCapita: 322.1, poverty: 4.30 },
    { name: 'East Nusa Tenggara', pop: 5.70, grdpCapita: 25.5, poverty: 19.02 },
  ],
  tradePartners: [
    { name: 'China', share: 25.3 },
    { name: 'United States', share: 10.3 },
    { name: 'Japan', share: 8.1 },
    { name: 'India', share: 7.9 },
    { name: 'Rest of world', share: 52.4 },
  ],
  sourcesNote:
    'Figures are compiled from public releases of BPS — Statistics Indonesia and the World Bank. ' +
    'Each indicator card names its own source and year.',
};
