// Population simulation — pure functions.

// Population by age group contributed by all placed housing (from each type's ratio).
export function computeHousingPop(placed, HOUSING_TYPES) {
  let total = 0, adults = 0, children = 0, elderly = 0;
  for (const b of Object.values(placed)) {
    const h = HOUSING_TYPES[b.type];
    if (!h) continue;
    const totalParts = h.ratio.adults + h.ratio.children + h.ratio.elderly;
    const perPart = h.population / totalParts;
    adults += Math.round(h.ratio.adults * perPart);
    children += Math.round(h.ratio.children * perPart);
    elderly += Math.round(h.ratio.elderly * perPart);
    total += h.population;
  }
  return { total, adults, children, elderly };
}

// Raw population added by housing (excludes the initial citizens).
export function computePopFromHousing(placed, HOUSING_TYPES) {
  let p = 0;
  for (const b of Object.values(placed)) {
    if (HOUSING_TYPES[b.type]) p += HOUSING_TYPES[b.type].population;
  }
  return p;
}
