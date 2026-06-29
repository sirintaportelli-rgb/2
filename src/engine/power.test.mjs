// Plain-node test (no framework): run with `node src/engine/power.test.mjs`
import assert from "node:assert";
import { computePowerCapacity, computeEnergyConsumption } from "./power.js";

const placed = { "1,1": { type: "wind" }, "2,2": { type: "solar" }, "3,3": { type: "house" } };
const GENERATORS = { wind: { power: 80 }, solar: { power: 50 } };
assert.equal(computePowerCapacity(placed, GENERATORS), 130);

const maps = {
  HOUSING_TYPES: { house: { energyCost: 10 } },
  UTILITY_BUILDINGS: {}, EDUCATION_BUILDINGS: {}, GOODS_BUILDINGS: {},
};
assert.equal(computeEnergyConsumption(placed, maps), 10);

console.log("power engine tests passed");
