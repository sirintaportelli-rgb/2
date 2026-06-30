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

   STARTED. Extracted so far:
   - `src/challenges/WeekEndReport.jsx`     the End-of-Week 1 report
   - `src/challenges/LociIntro.jsx`         the loci sketching intro
   - `src/challenges/HigherOrderEvent.jsx`  ONE shared component for all four
     two-phase Bloom events (power fault, worker shortage, pipe blockage, district
     cut off) — see note below on sharing.
   - `src/challenges/JobLottery.jsx`        the job-sector spinning-ball randomiser
   - `src/challenges/RoadCalc.jsx`          the road calc (gradient / equation /
     perpendicular / ax+by+c=0) — its answer-checking was pulled into the engine
   - `src/challenges/ResearchCalc.jsx`      the research question popup
   - `src/challenges/DemographicsCalc.jsx`  the three-phase demographics calc
   - `src/challenges/PipeCalc.jsx`          the multi-step pipe calc (h, V, Q; hard
     is a related-rates step)
   - `src/challenges/CurvedRoadCalc.jsx`    the three-phase curved-road calc (find
     A & B, log-linearisation, domain & range)
   - `src/challenges/PollutionCalc.jsx`     the pollution calc (easy loci tick,
     medium quadratic over two phases, hard integration)
   - `src/challenges/WaterConsumption.jsx`  the water-consumption calc (sum, and a
     hard arithmetic-series variant)
   - `src/challenges/WorkerCalc.jsx`         the five-phase worker challenge (count,
     like terms, Venn, production scaling, probability density) — its maths is
     engine-backed by computeWorkerSplit
   - `src/challenges/EnergyCalc.jsx`         the energy calc (totals; hard standard
     form, medium kW conversion)

   ALL maths challenge popups are now extracted (13 components in src/challenges/).
   What remains inline in STEMCityTerrain.jsx are two UI panels, not maths
   challenges: the tech-tree modal and the task popup. If you want the parent
   smaller still, those are the next candidates, but they belong in a `ui/` or
   `panels/` folder rather than `challenges/`.

   Answer-checking in the engine: `RoadCalc`'s correctness logic now lives in
   `src/engine/roads.js` as `checkRoadAnswer(pendingRoad, questionType, rawAnswer)`,
   a pure function returning `{ correct, perpGradient?, coeffs? }`, with
   `roads.test.mjs` covering all four question types plus vertical roads. The
   component stays presentational; the parent handler calls the engine function and
   keeps the side effects (treasury penalty, feedback, placing the road). Do this
   wherever a popup's checking is real maths. `ResearchCalc`, `DemographicsCalc` and
   `PipeCalc` were NOT given engine checkers on purpose — their correct values are
   already precomputed in the parent (the research question carries its own answer;
   demographics uses the newResidentDemo memo; pipe uses pendingPipe.lengthM /
   volumeM3), so the check is a tolerance compare, not maths worth isolating. Judge
   per popup. (A future option: move the demographics/pipe derivations themselves
   into the engine and test those.)

   The pattern: each popup is a presentational component that imports `S` and any
   data maps it needs directly, and takes the live values plus callbacks as props.
   State stays in the parent; the parent keeps the `{showX && <Component .../>}`
   guard and owns the handlers. When several popups share a shape, prefer one
   parameterised component (HigherOrderEvent); when they differ, keep them separate
   (the calc popups). Extract, build, mount-test, commit, repeat.

   Each extracted component can be render-tested in isolation by importing it with
   mock props and rendering to a jsdom root (verify each branch/phase).

   Still inline: the water-consumption calc, then the worker challenge. The worker
   challenge is the most entangled (multi-phase with its own internal state, the
   like-terms and Venn steps) so it is deliberately last.

5. Grid rendering -> `src/components/` (GameGrid, overlays, HUD).

End state: a small `STEMCityTerrain.jsx` that wires together
`data/  engine/  challenges/  components/  styles.js  utils/`.

## The engine extraction (Step 3, done)

The deterministic simulation now lives in `src/engine/` as pure functions that take
the current state and data maps as arguments and import nothing React. The component
calls each one inside its existing `useMemo`, with the same dependencies as before, so
behaviour is unchanged:

    power.js        computePowerCapacity(placed, GENERATORS)
                    computeEnergyConsumption(placed, { HOUSING_TYPES, ... })
    population.js   computeHousingPop(placed, HOUSING_TYPES)
                    computePopFromHousing(placed, HOUSING_TYPES)
    workforce.js    computeWorkerSplit(jobResult, demographics, SECTOR_PRODUCTION)
    economy.js      computeGeneratorTotals(placed, GENERATORS)
                    computeCityLevel(energyCount, totalPop, garbageCount, roadCount)
                    computeResearchPoints(placed, government)
                    computeMaterialsProduction(placed, civics)
    pollution.js    computePollutionZones(placed, placedPipes, { UTILITY_BUILDINGS, GOODS_BUILDINGS })
                    POLLUTION_SOURCES   (the source data, also imported by the component)

Each module has a plain-node test (no framework) next to it:

    node src/engine/power.test.mjs        # -> "power engine tests passed"
    node src/engine/population.test.mjs
    node src/engine/workforce.test.mjs
    node src/engine/economy.test.mjs

Still inline in STEMCityTerrain.jsx, left for a later pass because they are more
entangled with component state: `workerDistribution` (the building-assignment
algorithm) and `waterCalcData`. Trivial count selectors (energyCount, garbageCount,
etc.) are also left inline by design - they are one-liners, not simulation logic.

## Safety rules

- `git commit` after every successful extraction so you can always revert.
- Don't add features mid-refactor.
- After each move, run `npm run dev` and click through the energy task to confirm
  nothing broke.
