import { computeWorkerSplit } from "./workforce.js";
const SECTOR_PRODUCTION = { primary: { per: 1, rate: 2 }, secondary: { per: 1, rate: 3 }, tertiary: { per: 1, rate: 4, divisor: 2 } };
const jobResult = { dominant: "primary", split: { primary: 50, secondary: 30, tertiary: 20 } };
const r = computeWorkerSplit(jobResult, { adults: 100 }, SECTOR_PRODUCTION);
function ok(c, m) { if (!c) { console.error("FAIL", m); process.exit(1); } }
ok(r.primary === 50 && r.secondary === 30 && r.tertiary === 20, "split");
ok(r.production.primary === 100 && r.production.secondary === 90 && r.production.tertiary === 40, "production (divisor on tertiary)");
ok(r.hard.N === 50 && r.hard.underperformCount === 7.81, "hard figures");
const z = computeWorkerSplit(null, { adults: 100 }, SECTOR_PRODUCTION);
ok(z.primary === 0 && z.totalAdults === 0, "null jobResult guard");
console.log("workforce engine tests passed");
