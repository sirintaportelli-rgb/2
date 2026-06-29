// Power simulation — pure functions, no React, no data imports.
// Data maps are passed in so these can be unit-tested with mock data.

// Total generating capacity (MW) from every placed generator.
export function computePowerCapacity(placed, GENERATORS) {
  let total = 0;
  for (const b of Object.values(placed)) {
    if (b.type === "power") total += 500;
    if (GENERATORS[b.type]) total += GENERATORS[b.type].power;
  }
  return total;
}

// Total energy demand (MW) from every power-consuming building.
export function computeEnergyConsumption(placed, maps) {
  const { HOUSING_TYPES, UTILITY_BUILDINGS, EDUCATION_BUILDINGS, GOODS_BUILDINGS } = maps;
  let total = 0;
  for (const b of Object.values(placed)) {
    if (HOUSING_TYPES[b.type]) total += HOUSING_TYPES[b.type].energyCost;
    if (UTILITY_BUILDINGS[b.type]) total += UTILITY_BUILDINGS[b.type].energyCost;
    if (EDUCATION_BUILDINGS[b.type]) total += EDUCATION_BUILDINGS[b.type].energyCost;
    if (GOODS_BUILDINGS[b.type]) total += GOODS_BUILDINGS[b.type].energyCost;
  }
  return total;
}
