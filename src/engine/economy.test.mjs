import { computeGeneratorTotals, computeCityLevel, computeResearchPoints, computeMaterialsProduction } from "./economy.js";
const GENERATORS = { wind: { name: "Wind", power: 80, cost: 150000 } };
const placedGen = { "0,0": { type: "wind" }, "1,0": { type: "wind" }, "2,0": { type: "house" } };
function ok(c, m) { if (!c) { console.error("FAIL", m); process.exit(1); } }
const g = computeGeneratorTotals(placedGen, GENERATORS);
ok(g.totalMW === 160 && g.totalCost === 300000 && g.breakdown.length === 2, "generatorTotals");
ok(computeCityLevel(0, 0, 0, 0) === 1, "level 1");
ok(computeCityLevel(5, 200, 1, 3) === 5, "level 5");
ok(computeCityLevel(5, 1000, 1, 6) === 7, "level 7");
const edu = { "0,0": { type: "school" }, "1,0": { type: "school" }, "2,0": { type: "hospital" } };
ok(computeResearchPoints(edu, "none") === 35, "research base");
ok(computeResearchPoints(edu, "education") === 43, "research education x1.25 floored");
ok(computeResearchPoints(edu, "technological") === 40, "research tech x1.15 floored");
const fac = { "0,0": { type: "factory" }, "1,0": { type: "factory" } };
ok(computeMaterialsProduction(fac, "none") === 80, "materials base");
ok(computeMaterialsProduction(fac, "merchant") === 96, "materials merchant x1.2 floored");
console.log("economy engine tests passed");
