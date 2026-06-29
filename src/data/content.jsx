// Game content: generators, buildings, tech, tasks, etc. (data only)
import React from "react";

export const CLIMATE_THEMES = {
  tropical: { ground: "#2d5a27", groundAlt: "#3a6b33", water: "#1a8a7a", waterDeep: "#0d6b5e", tree: "#1e7a22", treeAlt: "#4a9a30", sand: "#c4a44a", sky: "linear-gradient(180deg, #1a6090 0%, #5ab0d0 40%, #2d5a27 100%)", ambient: "#e8f5e0", name: "Tropical" },
  dry: { ground: "#b8956a", groundAlt: "#a88555", water: "#5a9ab5", waterDeep: "#3a7a9a", tree: "#7a8a3a", treeAlt: "#9a9a4a", sand: "#d4b87a", sky: "linear-gradient(180deg, #c4880a 0%, #e8c060 40%, #b8956a 100%)", ambient: "#f8f0e0", name: "Arid" },
  temperate: { ground: "#4a7a3a", groundAlt: "#5a8a4a", water: "#3a7ab0", waterDeep: "#2a5a8a", tree: "#2a6a25", treeAlt: "#5a9a40", sand: "#c4b07a", sky: "linear-gradient(180deg, #4a80b0 0%, #8ac0e0 40%, #4a7a3a 100%)", ambient: "#f0f5f0", name: "Temperate" },
  continental: { ground: "#5a6a4a", groundAlt: "#6a7a5a", water: "#4a6a8a", waterDeep: "#3a5a7a", tree: "#3a5a30", treeAlt: "#5a7a45", sand: "#9a8a6a", sky: "linear-gradient(180deg, #4a5a7a 0%, #8a9ab0 40%, #5a6a4a 100%)", ambient: "#e8eae0", name: "Continental" },
  polar: { ground: "#c8d8e8", groundAlt: "#b0c4d8", water: "#4a7090", waterDeep: "#3a5a7a", tree: "#4a6a5a", treeAlt: "#6a8a7a", sand: "#a0b0c0", sky: "linear-gradient(180deg, #2a3a5a 0%, #6a8aaa 40%, #c8d8e8 100%)", ambient: "#f0f4f8", name: "Polar" },
};

export const TERRAIN_FEATURES = {
  island: { waterPct: 0.4, label: "Island" },
  rural: { waterPct: 0.08, label: "Rural" },
  coastal: { waterPct: 0.25, label: "Coastal" },
  town: { waterPct: 0.05, label: "Town" },
  busy: { waterPct: 0.03, label: "Metropolis" },
};

export const BUILDINGS = {
  road: { icon: "🛤️", name: "Road", cat: "infra", cost: 10, size: 1, color: "#555" },
  house: { icon: "🏠", name: "House", cat: "residential", cost: 50, size: 1, color: "#4ade80" },
  apartment: { icon: "🏢", name: "Apartment", cat: "residential", cost: 120, size: 1, color: "#22c55e" },
  shop: { icon: "🏪", name: "Shop", cat: "commercial", cost: 80, size: 1, color: "#3b82f6" },
  office: { icon: "🏬", name: "Office", cat: "commercial", cost: 150, size: 1, color: "#2563eb" },
  factory: { icon: "🏭", name: "Factory", cat: "industrial", cost: 200, size: 1, color: "#f59e0b" },
  school: { icon: "🏫", name: "School", cat: "civic", cost: 300, size: 1, color: "#8b5cf6" },
  hospital: { icon: "🏥", name: "Hospital", cat: "civic", cost: 500, size: 1, color: "#ec4899" },
  park: { icon: "🌳", name: "Park", cat: "civic", cost: 100, size: 1, color: "#10b981" },
  power: { icon: "⚡", name: "Power Plant", cat: "utility", cost: 400, size: 1, color: "#ef4444" },
  water: { icon: "💧", name: "Water Tower", cat: "utility", cost: 250, size: 1, color: "#06b6d4" },
  fire: { icon: "🚒", name: "Fire Station", cat: "civic", cost: 350, size: 1, color: "#f97316" },
  police: { icon: "🚔", name: "Police", cat: "civic", cost: 300, size: 1, color: "#6366f1" },
  temple: { icon: "🕌", name: "Temple", cat: "culture", cost: 200, size: 1, color: "#a855f7" },
  market: { icon: "🏪", name: "Market", cat: "commercial", cost: 60, size: 1, color: "#14b8a6" },
  port: { icon: "⚓", name: "Port", cat: "infra", cost: 400, size: 1, color: "#0ea5e9" },
  fort: { icon: "🏰", name: "Fort", cat: "military", cost: 500, size: 1, color: "#78716c" },
};

export const TOOL_CATEGORIES = [
  { id: "select", icon: "🖱️", name: "Select" },
  { id: "road", icon: "🛤️", name: "Roads" },
  { id: "zone", icon: "🗺️", name: "Zones" },
  { id: "build", icon: "🏗️", name: "Build" },
  { id: "demolish", icon: "🗑️", name: "Demolish" },
  { id: "info", icon: "ℹ️", name: "Info" },
];

export const ZONE_TYPES = [
  { id: "residential", color: "#4ade8060", border: "#4ade80", icon: "🏠", name: "Residential" },
  { id: "commercial", color: "#3b82f660", border: "#3b82f6", icon: "🏪", name: "Commercial" },
  { id: "industrial", color: "#f59e0b60", border: "#f59e0b", icon: "🏭", name: "Industrial" },
];

export const BUILD_ITEMS = [
  { section: "Civic", items: ["school", "hospital", "park", "fire", "police"] },
  { section: "Utility", items: ["power", "water"] },
  { section: "Commercial", items: ["shop", "office", "market"] },
  { section: "Residential", items: ["house", "apartment"] },
  { section: "Industrial", items: ["factory"] },
  { section: "Culture", items: ["temple"] },
  { section: "Special", items: ["port", "fort"] },
];

export const GOODS_BUILDINGS = {
    farm: { id: "farm", name: "Farm", cost: 80000, energyCost: 5, satisfaction: 2, capacity: 30, sector: "primary", workerCap: 10, desc: "Produces food for your city. Employs 10 primary workers. §80K.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="18" width="12" height="10" rx="1" fill="#92400e" stroke="#b45309" strokeWidth="1.5"/><path d="M4 18l6-6 6 6" fill="#78350f" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round"/><rect x="8" y="22" width="4" height="6" rx="0.5" fill="#d97706"/><rect x="20" y="14" width="2" height="14" fill="#78350f"/><path d="M21 8c-3 0-4 3-4 6h8c0-3-1-6-4-6z" fill="#16a34a"/><rect x="18" y="26" width="12" height="2" rx="0.5" fill="#65a30d" opacity="0.4"/><rect x="18" y="22" width="12" height="2" rx="0.5" fill="#65a30d" opacity="0.3"/></svg> },
    mine: { id: "mine", name: "Mining Site", cost: 200000, energyCost: 25, satisfaction: -3, capacity: 0, sector: "primary", workerCap: 15, desc: "Extracts raw materials. Employs 15 primary workers. Pollutes. §200K.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 28l10-18 10 18z" fill="#44403c" stroke="#78716c" strokeWidth="1.5" strokeLinejoin="round"/><rect x="13" y="20" width="6" height="8" rx="1" fill="#292524"/><path d="M10 28h12" stroke="#78716c" strokeWidth="2"/><rect x="14" y="6" width="4" height="6" rx="0.5" fill="#a8a29e"/><path d="M12 6h8" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round"/><circle cx="16" cy="24" r="1.5" fill="#fbbf24" opacity="0.6"/><path d="M8 22l3-2M24 22l-3-2" stroke="#57534e" strokeWidth="1"/></svg> },
    village_shop: { id: "village_shop", name: "Village Shopping Area", cost: 100000, energyCost: 10, satisfaction: 5, capacity: 50, sector: "tertiary", workerCap: 8, desc: "Small local shops. Employs 8 tertiary workers, serves 50 people.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="14" width="24" height="14" rx="2" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1.5"/><path d="M4 14l12-6 12 6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/><rect x="12" y="20" width="8" height="8" rx="1" fill="#0ea5e9"/><rect x="7" y="17" width="4" height="4" rx="0.5" fill="#7dd3fc" opacity="0.5"/><rect x="21" y="17" width="4" height="4" rx="0.5" fill="#7dd3fc" opacity="0.5"/><rect x="14" y="22" width="4" height="2" fill="#38bdf8" opacity="0.3"/></svg> },
    mall: { id: "mall", name: "Shopping Mall", cost: 750000, energyCost: 60, satisfaction: 15, capacity: 500, sector: "tertiary", workerCap: 40, desc: "Large commercial centre. Employs 40 tertiary workers, serves 500 people. §750K.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="2" y="10" width="28" height="18" rx="3" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5"/><rect x="6" y="6" width="20" height="4" rx="1" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1"/><rect x="5" y="14" width="5" height="6" rx="1" fill="#3b82f6" opacity="0.3"/><rect x="13" y="14" width="6" height="6" rx="1" fill="#3b82f6" opacity="0.3"/><rect x="22" y="14" width="5" height="6" rx="1" fill="#3b82f6" opacity="0.3"/><rect x="12" y="22" width="8" height="6" rx="1" fill="#2563eb"/><line x1="16" y1="22" x2="16" y2="28" stroke="#60a5fa" strokeWidth="0.5"/><rect x="14" y="7" width="4" height="2" rx="0.5" fill="#fbbf24" opacity="0.6"/></svg> },
  };

export const EDUCATION_BUILDINGS = {
    school: { id: "school", name: "School", cost: 0, energyCost: 15, graduates: 5, desc: "Educates children. Produces 5 graduates per cycle. FREE.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="12" width="20" height="14" rx="2" fill="#3b1f7a" stroke="#c084fc" strokeWidth="1.5"/><path d="M4 12l12-6 12 6" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="13" y="18" width="6" height="8" rx="1" fill="#8b5cf6"/><rect x="8" y="15" width="4" height="4" rx="0.5" fill="#a78bfa" opacity="0.5"/><rect x="20" y="15" width="4" height="4" rx="0.5" fill="#a78bfa" opacity="0.5"/></svg> },
    university: { id: "university", name: "University", cost: 500000, energyCost: 40, rpPerCycle: 20, desc: "Converts graduates into research. §500K. Generates 20 RP per solved challenge.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="14" width="24" height="14" rx="2" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/><path d="M2 14l14-10 14 10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="14" x2="8" y2="28" stroke="#3b82f6" strokeWidth="1.5"/><line x1="16" y1="14" x2="16" y2="28" stroke="#3b82f6" strokeWidth="1.5"/><line x1="24" y1="14" x2="24" y2="28" stroke="#3b82f6" strokeWidth="1.5"/><rect x="12" y="20" width="8" height="8" rx="1" fill="#2563eb"/><circle cx="16" cy="6" r="2" fill="#60a5fa"/></svg> },
  };

export const TASKS = {
    1: { id: 1, title: "Power Up!", desc: "Your city needs energy! Build 5 wind turbines to power the grid. Other generators require tech research.", target: 5, type: "energy", icon: "⚡", reward: 500000 },
    2: { id: 2, title: "Population Boom!", desc: "Grow your city to 200 residents! Build houses (10 people) and condos (50 people).", target: 200, type: "housing", icon: "🏠", reward: 300000 },
    3: { id: 3, title: "Clean City!", desc: "Your city is growing but so is the waste. Build a garbage disposal unit to manage pollution.", target: 1, type: "pollution", icon: "♻️", reward: 200000 },
  };

export const HOUSING_TYPES = {
    house: { id: "house", name: "Houses", icon: "🏠", cost: 0, energyCost: 20, population: 10, desc: "5 family homes. Free to build, 20 kW/turn.", size: "1×1",
      ratio: { adults: 5, children: 4, elderly: 1 }, // 5:4:1 out of 10
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M4 16L16 6l12 10" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14v13h18V14" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2"/><rect x="13" y="20" width="6" height="7" rx="1" fill="#3b82f6"/><rect x="10" y="16" width="4" height="4" rx="0.5" fill="#93c5fd" opacity="0.6"/><rect x="18" y="16" width="4" height="4" rx="0.5" fill="#93c5fd" opacity="0.6"/></svg> },
    condo: { id: "condo", name: "Condo Block", icon: "🏢", cost: 0, energyCost: 40, population: 50, desc: "Apartment complex. Free to build, 40 kW/turn.", size: "1×1",
      ratio: { adults: 8, children: 1, elderly: 1 }, // 8:1:1 out of 10
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="4" width="20" height="24" rx="2" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5"/><rect x="9" y="7" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="15" y="7" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="21" y="7" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.3"/><rect x="9" y="12" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="15" y="12" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="21" y="12" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.3"/><rect x="9" y="17" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="15" y="17" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.5"/><rect x="21" y="17" width="4" height="3" rx="0.5" fill="#818cf8" opacity="0.3"/><rect x="13" y="22" width="6" height="6" rx="1" fill="#4f46e5"/></svg> },
  };

export const SECTOR_PRODUCTION = {
    primary: { rate: 35, unit: "kg", material: "raw materials", icon: "🌾", per: 10 },
    secondary: { rate: 24, unit: "units", material: "manufactured goods", icon: "🏭", per: 10 },
    tertiary: { rate: 50, unit: "RP", material: "research points", icon: "🏪", per: 10, divisor: 1000 },
  };

export const PIPE_SPECS = {
    water: { label: "Water Pipe", color: "#22d3ee", radiusCm: 15, timeSeconds: 60, icon: "💧", costPerM: 500 },
    sewage: { label: "Sewage Pipe", color: "#a3e635", radiusCm: 20, timeSeconds: 90, icon: "🟢", costPerM: 350 },
  };

export const WATER_USAGE = { // litres per day per building
    house: 100, condo: 400, school: 200, university: 500,
    farm: 300, mine: 150, village_shop: 120, mall: 800, garbage: 250,
    wind: 50, oil: 200, solar: 30, hydro: 100, geothermal: 300, nuclear: 500,
  };

export const UTILITY_BUILDINGS = {
    garbage: { id: "garbage", name: "Garbage Disposal", icon: "♻️", cost: 350000, energyCost: 30,
      pollution: { noise: 200, ground: 1000, air: 900 }, // metres
      desc: "Processes city waste. Generates noise (0.2km), ground (1km), and air (0.9km) pollution.",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="10" width="20" height="16" rx="2" fill="#3f3f46" stroke="#71717a" strokeWidth="1.5"/><rect x="8" y="6" width="16" height="4" rx="1" fill="#52525b" stroke="#71717a" strokeWidth="1"/><path d="M14 6V4h4v2" stroke="#a1a1aa" strokeWidth="1"/><rect x="10" y="14" width="3" height="4" rx="0.5" fill="#4ade80" opacity="0.5"/><rect x="15" y="14" width="3" height="4" rx="0.5" fill="#facc15" opacity="0.5"/><rect x="20" y="14" width="3" height="4" rx="0.5" fill="#f87171" opacity="0.5"/><path d="M10 22h12" stroke="#71717a" strokeWidth="1"/><circle cx="13" cy="28" r="2" fill="#52525b"/><circle cx="19" cy="28" r="2" fill="#52525b"/></svg> },
  };

export const TECH_TREE = {
    // ── SHARED FOUNDATIONS ──
    basic_engineering: { id: "basic_engineering", name: "Basic Engineering", branch: "engineering", cost: 30, icon: "🔧", desc: "Construction fundamentals, structural loads", requires: [], unlocks: ["Wind","Hydro","Nuclear"] },
    basic_electrics: { id: "basic_electrics", name: "Basic Electrics", branch: "electrical", cost: 30, icon: "🔌", desc: "Circuits, AC/DC, wiring", requires: [], unlocks: ["Wind","Solar"] },
    basic_mining: { id: "basic_mining", name: "Basic Mining", branch: "mining", cost: 30, icon: "⛏️", desc: "Extract common ores and stone", requires: [], unlocks: ["Oil","Geothermal","Nuclear"] },
    basic_physics: { id: "basic_physics", name: "Basic Physics", branch: "physics", cost: 30, icon: "📐", desc: "Mechanics, thermodynamics, waves", requires: [], unlocks: ["Solar","Geothermal","Nuclear"] },
    basic_metallurgy: { id: "basic_metallurgy", name: "Basic Metallurgy", branch: "materials", cost: 30, icon: "🔩", desc: "Smelt and shape common metals", requires: [], unlocks: ["Solar","Nuclear"] },
    basic_chemistry: { id: "basic_chemistry", name: "Basic Chemistry", branch: "chemistry", cost: 30, icon: "🧪", desc: "Chemical reactions, hydrocarbons", requires: [], unlocks: ["Oil"] },

    // ── WIND TURBINE (5 techs) ──
    gear_systems: { id: "gear_systems", name: "Gear Systems", branch: "engineering", cost: 60, icon: "⚙️", desc: "Gearbox converts slow blade rotation to fast generator spin", requires: ["basic_engineering"], unlocks: ["Wind"] },
    generator_coils: { id: "generator_coils", name: "Generator Coils", branch: "electrical", cost: 60, icon: "🧲", desc: "Electromagnetic induction — spinning magnets produce current", requires: ["basic_electrics"], unlocks: ["Wind"] },
    blade_design: { id: "blade_design", name: "Blade Design", branch: "aerodynamics", cost: 50, icon: "🌀", desc: "Aerofoil shape to maximise lift, lightweight composites", requires: [], unlocks: ["Wind"] },

    // ── OIL POWER PLANT (7 techs) ──
    geological_survey: { id: "geological_survey", name: "Geological Survey", branch: "mining", cost: 80, icon: "🗺️", desc: "Locate underground deposits — oil, minerals, uranium", requires: ["basic_mining"], unlocks: ["Oil","Geothermal","Nuclear"] },
    oil_drilling: { id: "oil_drilling", name: "Oil Drilling", branch: "mining", cost: 120, icon: "🛢️", desc: "Drill wells, pump crude oil to surface", requires: ["geological_survey"], unlocks: ["Oil"] },
    oil_refining: { id: "oil_refining", name: "Oil Refining", branch: "chemistry", cost: 150, icon: "🏭", desc: "Fractional distillation — separate crude into fuel grades", requires: ["basic_chemistry"], unlocks: ["Oil"] },
    combustion_engines: { id: "combustion_engines", name: "Combustion Engines", branch: "engineering", cost: 100, icon: "🔥", desc: "Burn fuel to create high-pressure steam", requires: ["basic_engineering"], unlocks: ["Oil"] },
    steam_turbines: { id: "steam_turbines", name: "Steam Turbines", branch: "engineering", cost: 150, icon: "💨", desc: "Convert steam pressure to rotational energy for generators", requires: ["combustion_engines"], unlocks: ["Oil","Nuclear"] },

    // ── SOLAR POWER PLANT (7 techs) ──
    photovoltaic_theory: { id: "photovoltaic_theory", name: "Photovoltaic Theory", branch: "physics", cost: 100, icon: "☀️", desc: "Photons knock electrons free in semiconductor junctions", requires: ["basic_physics"], unlocks: ["Solar"] },
    silicon_processing: { id: "silicon_processing", name: "Silicon Processing", branch: "materials", cost: 120, icon: "💎", desc: "Purify silicon crystals for semiconductor wafers", requires: ["basic_metallurgy"], unlocks: ["Solar"] },
    solar_cell_fab: { id: "solar_cell_fab", name: "Solar Cell Fabrication", branch: "materials", cost: 180, icon: "🔲", desc: "Layer p-type and n-type silicon to create photovoltaic cells", requires: ["silicon_processing"], unlocks: ["Solar"] },
    inverter_tech: { id: "inverter_tech", name: "Inverter Technology", branch: "electrical", cost: 100, icon: "🔄", desc: "Convert DC from panels to AC for the city grid", requires: ["basic_electrics"], unlocks: ["Solar"] },

    // ── HYDRO POWER PLANT (7 techs) ──
    concrete_engineering: { id: "concrete_engineering", name: "Concrete Engineering", branch: "engineering", cost: 100, icon: "🧱", desc: "Mass concrete for dam walls — hundreds of metres thick", requires: ["basic_engineering"], unlocks: ["Hydro","Nuclear"] },
    dam_construction: { id: "dam_construction", name: "Dam Construction", branch: "engineering", cost: 200, icon: "🌊", desc: "Arch or gravity dam across river to create reservoir", requires: ["concrete_engineering"], unlocks: ["Hydro"] },
    fluid_mechanics: { id: "fluid_mechanics", name: "Fluid Mechanics", branch: "physics", cost: 80, icon: "💧", desc: "Water pressure, flow rates, pipe dynamics", requires: [], unlocks: ["Hydro"] },
    penstock_design: { id: "penstock_design", name: "Penstock Design", branch: "engineering", cost: 150, icon: "🔧", desc: "Large pipe channelling water from reservoir to turbine", requires: ["fluid_mechanics"], unlocks: ["Hydro"] },
    water_turbines: { id: "water_turbines", name: "Water Turbines", branch: "engineering", cost: 120, icon: "⚡", desc: "Francis or Kaplan turbine — water spins blades at high RPM", requires: [], unlocks: ["Hydro"] },
    transformer_tech: { id: "transformer_tech", name: "Transformer Technology", branch: "electrical", cost: 120, icon: "🔌", desc: "Step up voltage for long-distance grid transmission", requires: ["water_turbines"], unlocks: ["Hydro"] },

    // ── GEOTHERMAL PLANT (9 techs) ──
    deep_drilling: { id: "deep_drilling", name: "Deep Drilling", branch: "mining", cost: 200, icon: "🕳️", desc: "Drill 2-5km into Earth's crust to reach hot rock", requires: ["geological_survey"], unlocks: ["Geothermal","Nuclear"] },
    heat_exchange: { id: "heat_exchange", name: "Heat Exchange Systems", branch: "thermal", cost: 120, icon: "🌡️", desc: "Transfer underground heat to working fluid without mixing", requires: ["basic_physics"], unlocks: ["Geothermal"] },
    heat_pump_tech: { id: "heat_pump_tech", name: "Heat Pump Technology", branch: "thermal", cost: 180, icon: "♨️", desc: "Cycle fluid underground — absorb heat at depth, release at surface", requires: ["heat_exchange"], unlocks: ["Geothermal"] },
    corrosion_resistance: { id: "corrosion_resistance", name: "Corrosion Resistance", branch: "materials", cost: 150, icon: "🛡️", desc: "Pipes survive acidic fluids, extreme heat, mineral deposits", requires: ["basic_metallurgy"], unlocks: ["Geothermal"] },
    binary_cycle_turbines: { id: "binary_cycle_turbines", name: "Binary Cycle Turbines", branch: "engineering", cost: 200, icon: "🔄", desc: "Low-boiling-point fluid drives turbine at lower temps", requires: ["basic_engineering"], unlocks: ["Geothermal"] },

    // ── NUCLEAR POWER PLANT (22 techs — includes shared + unique) ──
    // Mining path
    uranium_extraction: { id: "uranium_extraction", name: "Uranium Extraction", branch: "mining", cost: 300, icon: "☢️", desc: "Mine and separate raw uranium ore (U₃O₈ yellowcake)", requires: ["deep_drilling"], unlocks: ["Nuclear"] },
    uranium_enrichment: { id: "uranium_enrichment", name: "Uranium Enrichment", branch: "mining", cost: 500, icon: "🔬", desc: "Centrifuge separation to increase U-235 to 3-5%", requires: ["uranium_extraction", "nuclear_physics"], unlocks: ["Nuclear"] },
    // Materials path
    steel_production: { id: "steel_production", name: "Steel Production", branch: "materials", cost: 100, icon: "🏗️", desc: "Structural steel for reactor containment building", requires: ["basic_metallurgy"], unlocks: ["Nuclear"] },
    reinforced_concrete: { id: "reinforced_concrete", name: "Reinforced Concrete", branch: "materials", cost: 180, icon: "🧱", desc: "Ultra-thick containment walls (1m+ reinforced)", requires: ["steel_production"], unlocks: ["Nuclear"] },
    alloy_research: { id: "alloy_research", name: "Alloy Research", branch: "materials", cost: 200, icon: "⚗️", desc: "Zircaloy cladding for fuel rods — resists corrosion at extreme heat", requires: ["steel_production"], unlocks: ["Nuclear"] },
    radiation_shielding: { id: "radiation_shielding", name: "Radiation Shielding", branch: "materials", cost: 350, icon: "🛡️", desc: "Lead, boron, and concrete composites to contain gamma rays", requires: ["alloy_research", "nuclear_physics"], unlocks: ["Nuclear"] },
    // Physics path
    atomic_theory: { id: "atomic_theory", name: "Atomic Theory", branch: "physics", cost: 100, icon: "⚛️", desc: "Structure of the atom: protons, neutrons, electrons, isotopes", requires: ["basic_physics"], unlocks: ["Nuclear"] },
    nuclear_physics: { id: "nuclear_physics", name: "Nuclear Physics", branch: "physics", cost: 250, icon: "🧬", desc: "Radioactive decay, half-lives, binding energy", requires: ["atomic_theory"], unlocks: ["Nuclear"] },
    fission_theory: { id: "fission_theory", name: "Fission Theory", branch: "physics", cost: 400, icon: "💥", desc: "Splitting U-235: neutron bombardment releases energy + more neutrons", requires: ["nuclear_physics"], unlocks: ["Nuclear"] },
    chain_reaction_control: { id: "chain_reaction_control", name: "Chain Reaction Control", branch: "physics", cost: 500, icon: "🎛️", desc: "Control rods (boron/cadmium) absorb neutrons to regulate reaction rate", requires: ["fission_theory"], unlocks: ["Nuclear"] },
    // Engineering path
    pressure_vessels: { id: "pressure_vessels", name: "Pressure Vessels", branch: "engineering", cost: 200, icon: "🫙", desc: "Sealed steel vessel containing reactor core at 150+ atmospheres", requires: ["basic_engineering", "steel_production"], unlocks: ["Nuclear"] },
    cooling_systems: { id: "cooling_systems", name: "Cooling Systems", branch: "engineering", cost: 250, icon: "❄️", desc: "Primary/secondary water loops to transfer heat from core", requires: ["pressure_vessels"], unlocks: ["Nuclear"] },
    reactor_core_design: { id: "reactor_core_design", name: "Reactor Core Design", branch: "engineering", cost: 600, icon: "☢️", desc: "Fuel rod arrangement, moderator, control rod placement", requires: ["steam_turbines", "fission_theory", "alloy_research"], unlocks: ["Nuclear"] },
    // Safety path
    environmental_survey: { id: "environmental_survey", name: "Environmental Survey", branch: "safety", cost: 100, icon: "🌍", desc: "Assess site geology, water table, seismic risk, population radius", requires: ["geological_survey"], unlocks: ["Nuclear"] },
    emergency_systems: { id: "emergency_systems", name: "Emergency Systems", branch: "safety", cost: 350, icon: "🚨", desc: "SCRAM shutdown, backup cooling, diesel generators", requires: ["cooling_systems", "radiation_shielding"], unlocks: ["Nuclear"] },
    containment_building: { id: "containment_building", name: "Containment Building", branch: "safety", cost: 500, icon: "🏛️", desc: "Multi-layer dome: inner steel liner + outer reinforced concrete shell", requires: ["emergency_systems", "reinforced_concrete"], unlocks: ["Nuclear"] },
  };

export const GENERATORS = {
    wind: { id: "wind", icon: "🌬️", name: "Wind Turbine", cost: 150000, power: 80, co2: 0, radiusM: 300, reliability: "Variable — depends on wind",
      techReqs: [], techLabel: "No research needed — available from start",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="15" y="12" width="2" height="18" fill="#94a3b8"/><circle cx="16" cy="12" r="2.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1"/><path d="M16 12L10 4" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round"/><path d="M16 12L24 8" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round"/><path d="M16 12L14 22" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round"/></svg> },
    oil: { id: "oil", icon: "🛢️", name: "Oil Power Plant", cost: 400000, power: 300, co2: 85, radiusM: 500, reliability: "High — runs continuously",
      techReqs: ["oil_drilling", "oil_refining", "steam_turbines"], techLabel: "Oil Drilling + Oil Refining + Steam Turbines",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="14" width="16" height="14" rx="2" fill="#44403c" stroke="#78716c" strokeWidth="1.5"/><rect x="22" y="8" width="5" height="20" rx="1" fill="#57534e" stroke="#78716c" strokeWidth="1.5"/><path d="M24 4v4" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="3" r="1.5" fill="#78716c"/><rect x="7" y="18" width="4" height="3" rx="0.5" fill="#fbbf24" opacity="0.6"/><rect x="13" y="18" width="4" height="3" rx="0.5" fill="#fbbf24" opacity="0.6"/></svg> },
    solar: { id: "solar", icon: "☀️", name: "Solar Power Plant", cost: 250000, power: 120, co2: 0, radiusM: 400, reliability: "Daytime only — reduced in cloudy/polar",
      techReqs: ["photovoltaic_theory", "solar_cell_fab", "inverter_tech"], techLabel: "Photovoltaic Theory + Solar Cells + Inverter",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="16" width="24" height="2" fill="#475569" rx="1"/><rect x="6" y="8" width="20" height="8" rx="1" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/><line x1="10" y1="8" x2="10" y2="16" stroke="#3b82f6" strokeWidth="0.5"/><line x1="16" y1="8" x2="16" y2="16" stroke="#3b82f6" strokeWidth="0.5"/><line x1="22" y1="8" x2="22" y2="16" stroke="#3b82f6" strokeWidth="0.5"/><line x1="6" y1="12" x2="26" y2="12" stroke="#3b82f6" strokeWidth="0.5"/><rect x="14" y="18" width="4" height="10" fill="#475569" rx="0.5"/></svg> },
    hydro: { id: "hydro", icon: "🌊", name: "Hydro Power Plant", cost: 500000, power: 400, co2: 0, radiusM: 600, reliability: "Steady — requires river or coast",
      techReqs: ["dam_construction", "penstock_design", "transformer_tech"], techLabel: "Dam + Penstock + Transformer",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="16" rx="2" fill="#1e3a5f" stroke="#0ea5e9" strokeWidth="1.5"/><path d="M4 18c4-3 8 3 12 0s8 3 12 0" stroke="#38bdf8" strokeWidth="2" fill="none"/><path d="M4 22c4-3 8 3 12 0s8 3 12 0" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.5"/><rect x="12" y="4" width="8" height="6" rx="1" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1"/></svg> },
    geothermal: { id: "geothermal", icon: "🌋", name: "Geothermal Plant", cost: 600000, power: 350, co2: 5, radiusM: 500, reliability: "Very steady — location dependent",
      techReqs: ["deep_drilling", "heat_pump_tech", "corrosion_resistance", "binary_cycle_turbines"], techLabel: "Deep Drilling + Heat Pumps + Corrosion Resistance + Binary Turbines",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="14" width="20" height="14" rx="2" fill="#7c2d12" stroke="#ea580c" strokeWidth="1.5"/><path d="M12 14V8c0-2 2-4 4-4s4 2 4 4v6" stroke="#f97316" strokeWidth="2" fill="none"/><path d="M14 6c0 0 1-3 2-3s2 3 2 3" stroke="#fbbf24" strokeWidth="1.5" fill="none"/><rect x="9" y="18" width="3" height="3" rx="0.5" fill="#f97316" opacity="0.5"/><rect x="20" y="18" width="3" height="3" rx="0.5" fill="#f97316" opacity="0.5"/><path d="M10 28v2M16 28v2M22 28v2" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    nuclear: { id: "nuclear", icon: "☢️", name: "Nuclear Power Plant", cost: 1000000, power: 800, co2: 0, radiusM: 800, reliability: "Extremely high — expensive",
      techReqs: ["uranium_enrichment", "radiation_shielding", "chain_reaction_control", "reactor_core_design", "containment_building"], techLabel: "Enrichment + Shielding + Chain Reaction + Core Design + Containment",
      svg: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="16" width="24" height="12" rx="2" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5"/><path d="M10 16V6c0-1 1-2 2-2h0c1 0 2 1 2 2v10" fill="#334155" stroke="#6366f1" strokeWidth="1.5"/><path d="M18 16V6c0-1 1-2 2-2h0c1 0 2 1 2 2v10" fill="#334155" stroke="#6366f1" strokeWidth="1.5"/><circle cx="16" cy="22" r="3" fill="none" stroke="#a5b4fc" strokeWidth="1.5"/><circle cx="16" cy="22" r="1" fill="#a5b4fc"/></svg> },
  };

