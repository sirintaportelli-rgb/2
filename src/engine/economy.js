// Economy & progression simulation — pure functions.

// Total MW and cost of all placed generators, with a per-generator breakdown.
export function computeGeneratorTotals(placed, GENERATORS) {
  let totalMW = 0, totalCost = 0;
  const breakdown = [];
  for (const b of Object.values(placed)) {
    const gen = GENERATORS[b.type];
    if (gen) { totalMW += gen.power; totalCost += gen.cost; breakdown.push({ name: gen.name, power: gen.power, cost: gen.cost }); }
  }
  return { totalMW, totalCost, breakdown };
}

// City level from progress milestones.
export function computeCityLevel(energyCount, totalPop, garbageCount, roadCount) {
  let level = 1;
  if (energyCount >= 5) level = 2;
  if (totalPop >= 200) level = 3;
  if (garbageCount >= 1) level = 4;
  if (roadCount >= 3) level = 5;
  if (totalPop >= 500 && roadCount >= 6) level = 6;
  if (totalPop >= 1000) level = 7;
  return level;
}

// Research points from schools/hospitals, with government multipliers.
export function computeResearchPoints(placed, government) {
  let r = 0;
  for (const b of Object.values(placed)) {
    if (b.type === "school") r += 15;
    if (b.type === "hospital") r += 5;
  }
  if (government === "education") r = Math.floor(r * 1.25);
  if (government === "technological") r = Math.floor(r * 1.15);
  return r;
}

// Materials produced by factories, with the merchant-civics multiplier.
export function computeMaterialsProduction(placed, civics) {
  let m = 0;
  for (const b of Object.values(placed)) { if (b.type === "factory") m += 40; }
  if (civics === "merchant") m = Math.floor(m * 1.2);
  return m;
}
