// Pollution simulation — pure functions + the source data.

export const POLLUTION_SOURCES = {
  water_pipe: { noise: 300 },   // 0.3 km
  sewage_pipe: { noise: 300 },  // 0.3 km
  garbage: { noise: 200, ground: 1000, air: 900 }, // all three types
  mine: { noise: 400, ground: 500 },
};

// Builds the noise/ground/air pollution zones from pipes and buildings.
export function computePollutionZones(placed, placedPipes, maps) {
  const { UTILITY_BUILDINGS, GOODS_BUILDINGS } = maps;
  const zones = { noise: [], ground: [], air: [] };
  placedPipes.forEach(p => {
    const src = p.type === "water" ? POLLUTION_SOURCES.water_pipe : POLLUTION_SOURCES.sewage_pipe;
    if (src.noise) {
      zones.noise.push({ x: p.x1, y: p.y1, radiusM: src.noise, source: `${p.type} pipe` });
      zones.noise.push({ x: p.x2, y: p.y2, radiusM: src.noise, source: `${p.type} pipe` });
    }
  });
  Object.entries(placed).forEach(([k, b]) => {
    const src = POLLUTION_SOURCES[b.type];
    if (!src) return;
    const [gx, gy] = k.split(",").map(Number);
    const bName = UTILITY_BUILDINGS[b.type]?.name || GOODS_BUILDINGS[b.type]?.name || b.type;
    if (src.noise) zones.noise.push({ x: gx, y: gy, radiusM: src.noise, source: bName });
    if (src.ground) zones.ground.push({ x: gx, y: gy, radiusM: src.ground, source: bName });
    if (src.air) zones.air.push({ x: gx, y: gy, radiusM: src.air, source: bName });
  });
  return zones;
}
