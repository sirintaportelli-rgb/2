import { computeHousingPop, computePopFromHousing } from "./population.js";
const HOUSING_TYPES = {
  house: { population: 10, ratio: { adults: 5, children: 4, elderly: 1 } },
  condo: { population: 10, ratio: { adults: 8, children: 1, elderly: 1 } },
};
const placed = { "0,0": { type: "house" }, "1,1": { type: "condo" }, "2,2": { type: "road" } };
function eq(a, b, m) { if (JSON.stringify(a) !== JSON.stringify(b)) { console.error("FAIL", m, "got", JSON.stringify(a), "want", JSON.stringify(b)); process.exit(1); } }
eq(computeHousingPop(placed, HOUSING_TYPES), { total: 20, adults: 13, children: 5, elderly: 2 }, "housingPop");
eq(computeHousingPop({}, HOUSING_TYPES), { total: 0, adults: 0, children: 0, elderly: 0 }, "housingPop empty");
eq(computePopFromHousing(placed, HOUSING_TYPES), 20, "popFromHousing");
console.log("population engine tests passed");
