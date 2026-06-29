# Super City

Educational maths city-builder. Migrated to Vite and partially modularised.

## Run it

    npm install
    npm run dev      # local dev server (hot reload)
    npm run build    # production build into dist/
    npm run preview  # preview the production build

Deploying: push to GitHub and import in Vercel. Vercel auto-detects Vite
(build command `vite build`, output `dist`), so your existing deploy flow keeps working.

## What changed in this refactor (Phase 1, part 1)

1. Build tool: moved from Create React App (react-scripts) to Vite.
   - Entry is now `index.html` (root) -> `src/main.jsx`.
   - `index.js` and `App.js` were renamed to `main.jsx` / `App.jsx`.

2. The single giant `STEMCityTerrain.jsx` had four concerns pulled out into
   their own modules (no behaviour change):
   - `src/constants.js`      grid + population constants (GRID_W, GRID_H, METERS_PER_CELL, INITIAL_POP)
   - `src/utils/geometry.js` distanceBetween, distanceInMeters, radiusInTiles
   - `src/styles.js`         the big `S` style object
   - `src/data/content.jsx`  all game data: GENERATORS, BUILDINGS, HOUSING_TYPES,
                             GOODS_BUILDINGS, EDUCATION_BUILDINGS, UTILITY_BUILDINGS,
                             PIPE_SPECS, WATER_USAGE, TECH_TREE, TASKS, SECTOR_PRODUCTION,
                             CLIMATE_THEMES, TERRAIN_FEATURES, TOOL_CATEGORIES, ZONE_TYPES, BUILD_ITEMS

   `STEMCityTerrain.jsx` now imports these at the top instead of defining them inline.

## The pattern (repeat this for the rest)

Each step is: move code into a new file, export it, import it back, run the game,
commit. Never change behaviour and refactor in the same commit.

Order that keeps the game working at every step:

3. Simulation engine -> `src/engine/`
   The `useMemo` blocks in the terrain file (demographics, power capacity/consumption,
   pollution zones, jobResult, workerDistribution) become pure functions that take the
   current state as arguments and return the result, e.g. `computePower(placed, GENERATORS)`.
   The component then calls them inside its existing `useMemo`. This makes the maths
   testable on its own.

4. Challenge popups -> `src/challenges/` (one component per file, one at a time)
   energy calc, pipe calc, road calc, the worker challenge, the four higher-order
   events, the loci step, the week-end report. Each takes what it needs as props and
   reports back via callbacks like `onComplete`. Extract ONE, run the game, commit, repeat.

5. Grid rendering -> `src/components/` (GameGrid, overlays, HUD).

End state: a small `STEMCityTerrain.jsx` that wires together
`data/  engine/  challenges/  components/  styles.js  utils/`.

## Worked example: the engine extraction (Step 3, started)

`src/engine/power.js` is the first piece of the simulation pulled out as pure
functions:

    computePowerCapacity(placed, GENERATORS)              -> total MW generated
    computeEnergyConsumption(placed, { HOUSING_TYPES, ... }) -> total MW demanded

They take the data maps as arguments and import nothing, so they have no React
dependency and can be tested in isolation. The component now just calls them:

    const powerCap = useMemo(() => computePowerCapacity(placed, GENERATORS), [placed]);

A plain-node test (no framework needed) lives next to it:

    node src/engine/power.test.mjs    # -> "power engine tests passed"

Repeat this for the other simulation blocks still inside STEMCityTerrain.jsx, one at
a time, running the game after each: demographics / housingPop, workerDistribution,
generatorTotals, pollutionZones, waterCalcData, researchPts, materialsProd.
Each becomes a pure function in `src/engine/` with its own small test.

## Safety rules

- `git commit` after every successful extraction so you can always revert.
- Don't add features mid-refactor.
- After each move, run `npm run dev` and click through the energy task to confirm
  nothing broke.
