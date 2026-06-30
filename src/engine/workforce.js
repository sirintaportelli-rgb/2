// Workforce simulation — pure functions.

// Splits adults across primary/secondary/tertiary by the job result, plus
// production per sector and the hard-mode probability figures.
export function computeWorkerSplit(jobResult, demographics, SECTOR_PRODUCTION) {
  if (!jobResult) return { primary: 0, secondary: 0, tertiary: 0, totalAdults: 0, production: {} };
  const totalAdults = demographics.adults;
  const workers = {
    primary: Math.round(totalAdults * jobResult.split.primary / 100),
    secondary: Math.round(totalAdults * jobResult.split.secondary / 100),
    tertiary: Math.round(totalAdults * jobResult.split.tertiary / 100),
  };
  const production = {};
  ["primary", "secondary", "tertiary"].forEach(s => {
    const sp = SECTOR_PRODUCTION[s];
    const raw = (workers[s] / sp.per) * sp.rate;
    production[s] = sp.divisor ? raw / sp.divisor : raw;
  });
  const N = workers[jobResult.dominant];
  const kVal = 6 / (N * N * N);
  const probUnderQuarter = 5 / 32;
  const underperformCount = Math.round(probUnderQuarter * N * 100) / 100;
  return { ...workers, totalAdults, production, hard: { N, kVal, probUnderQuarter, underperformCount } };
}
