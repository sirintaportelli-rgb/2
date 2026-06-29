import { useState } from "react";

const CATEGORIES = [
  {
    id: "climate",
    title: "Climate",
    icon: "🌍",
    desc: "Your region's climate affects construction costs, energy needs, and available resources.",
    options: [
      { id: "tropical", icon: "🌴", name: "Tropical", desc: "Hot & humid year-round. Dense vegetation, monsoon rains, rich biodiversity.", tags: ["High rainfall", "Dense vegetation", "Disease risk"] },
      { id: "dry", icon: "🏜️", name: "Dry / Arid", desc: "Low rainfall, extreme heat. Water is precious, solar energy abundant.", tags: ["Water scarcity", "Solar potential", "Low vegetation"] },
      { id: "temperate", icon: "🌿", name: "Temperate", desc: "Mild seasons, moderate rainfall. Balanced conditions for growth.", tags: ["Four seasons", "Moderate rain", "Fertile soil"] },
      { id: "continental", icon: "❄️", name: "Continental", desc: "Extreme seasons — scorching summers, freezing winters. Energy demands high.", tags: ["Extreme temps", "Heating costs", "Rich minerals"] },
      { id: "polar", icon: "🧊", name: "Polar", desc: "Permanently cold. Construction is hard but resources lie beneath the ice.", tags: ["Permafrost", "Short days", "Rare minerals"] },
    ],
  },
  {
    id: "terrain",
    title: "Terrain",
    icon: "🗺️",
    desc: "The landscape shapes your transport networks, building options, and trade routes.",
    options: [
      { id: "island", icon: "🏝️", name: "Island", desc: "Surrounded by water. Limited land, strong trade by sea, unique ecosystems.", tags: ["Sea trade", "Limited land", "Fishing"] },
      { id: "rural", icon: "🌾", name: "Rural", desc: "Open farmland and countryside. Space is plentiful, people are few.", tags: ["Cheap land", "Agriculture", "Low density"] },
      { id: "coastal", icon: "🌊", name: "Coastal", desc: "Where land meets sea. Port access, flood risk, tourism potential.", tags: ["Port access", "Flood risk", "Tourism"] },
      { id: "town", icon: "🏘️", name: "Town", desc: "An existing small settlement. Some infrastructure already in place.", tags: ["Existing roads", "Population", "Limited space"] },
      { id: "busy", icon: "🏙️", name: "Metropolis", desc: "Dense urban environment. Everything costs more, but opportunity is everywhere.", tags: ["High costs", "Large workforce", "Infrastructure"] },
    ],
  },
  {
    id: "government",
    title: "Government Focus",
    icon: "🏛️",
    desc: "Your government's priority shapes research speed, funding, and citizen expectations.",
    options: [
      { id: "education", icon: "🎓", name: "Education", desc: "Knowledge is power. Schools and universities drive innovation and happiness.", tags: ["Research speed", "Skilled workers", "High expectations"] },
      { id: "trade", icon: "💰", name: "Trade", desc: "Commerce above all. Strong economy, but social services may suffer.", tags: ["Income bonus", "Market access", "Inequality risk"] },
      { id: "technological", icon: "🔬", name: "Technological", desc: "Innovation-first. Cutting-edge infrastructure, expensive to maintain.", tags: ["Tech bonus", "Automation", "High costs"] },
    ],
  },
  {
    id: "civics",
    title: "Civics",
    icon: "⚖️",
    desc: "Your society's values affect how citizens behave, what they demand, and how they respond to change.",
    options: [
      { id: "militarist", icon: "🛡️", name: "Militarist", desc: "Order and discipline. Strong defence, structured society, strict building codes.", tags: ["Defence bonus", "Discipline", "Rigid planning"] },
      { id: "spiritual", icon: "🕌", name: "Spiritual", desc: "Faith and community. High happiness, cultural buildings, slower modernisation.", tags: ["Happiness bonus", "Cultural sites", "Slow tech"] },
      { id: "technologist", icon: "⚡", name: "Technologist", desc: "Progress at all costs. Fast innovation, environmental trade-offs.", tags: ["Fast research", "Pollution risk", "Automation"] },
      { id: "merchant", icon: "🪙", name: "Merchant", desc: "Everything has a price. Wealthy but materialistic — citizens demand luxury.", tags: ["Wealth bonus", "Trade routes", "High demands"] },
      { id: "insular", icon: "🏔️", name: "Insular", desc: "Self-sufficient and isolated. Sustainable but slow to grow.", tags: ["Self-sufficient", "Low trade", "Sustainability"] },
    ],
  },
];

const STEP_COLORS = ["#f59e0b", "#3b82f6", "#8b5cf6", "#10b981"];

export default function STEMCityCreator({ onLaunch }) {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState({});
  const [cityName, setCityName] = useState("");
  const [naming, setNaming] = useState(false);
  const [settings, setSettings] = useState(false);
  const [calcMode, setCalcMode] = useState(true); // true = calculator on
  const [startMoney, setStartMoney] = useState(5000000);
  const [mathDifficulty, setMathDifficulty] = useState("medium");
  const [launched, setLaunched] = useState(false);

  const category = CATEGORIES[step];
  const allChosen = Object.keys(choices).length === CATEGORIES.length;
  const color = STEP_COLORS[step] || "#f59e0b";

  const doLaunch = () => {
    if (onLaunch) {
      onLaunch({ ...choices, cityName: cityName || "New City", calcMode, startMoney, mathDifficulty });
    } else {
      setLaunched(true);
    }
  };

  // ═══ SETTINGS SCREEN ═══
  if (settings) {
    const MONEY_OPTIONS = [
      { value: 1000000, label: "§1,000,000", icon: "🪙", desc: "Hard mode — every coin counts. Careful planning required.", difficulty: "Hard" },
      { value: 5000000, label: "§5,000,000", icon: "💰", desc: "Balanced start — room to experiment but not unlimited.", difficulty: "Normal" },
      { value: 10000000, label: "§10,000,000", icon: "🏦", desc: "Wealthy start — focus on building, less on budgeting.", difficulty: "Easy" },
    ];
    return (
      <div style={S.namingScreen}>
        <div style={{ ...S.namingInner, maxWidth: "520px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>⚙️</div>
          <h2 style={S.namingTitle}>Game Settings</h2>
          <div style={S.namingSummary}>
            {CATEGORIES.map(cat => {
              const opt = cat.options.find(o => o.id === choices[cat.id]);
              return opt ? <span key={cat.id} style={S.summaryChip}>{opt.icon} {opt.name}</span> : null;
            })}
            <span style={S.summaryChip}>🏙️ {cityName}</span>
          </div>

          {/* Calculator toggle */}
          <div style={{ background: "#0d1520", border: "1px solid #1a2a4a", borderRadius: "12px", padding: "20px", marginBottom: "16px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>🔢 Calculations</div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>Should the game provide a calculator for STEM challenges?</div>
              </div>
              <button onClick={() => setCalcMode(!calcMode)} style={{
                width: "56px", height: "30px", borderRadius: "15px", border: "none", cursor: "pointer",
                background: calcMode ? "#22c55e" : "#475569", position: "relative", transition: "background 0.3s",
              }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "12px", background: "#fff",
                  position: "absolute", top: "3px", left: calcMode ? "29px" : "3px", transition: "left 0.3s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }} />
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{
                flex: 1, padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                border: calcMode ? "2px solid #22c55e" : "2px solid #2a3a5e",
                background: calcMode ? "#22c55e15" : "#0d1520",
              }} onClick={() => setCalcMode(true)}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>🧮</div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: calcMode ? "#22c55e" : "#94a3b8" }}>Calculator ON</div>
                <div style={{ fontSize: "9px", color: "#64748b", marginTop: "2px" }}>In-game calculator provided. Focus on understanding concepts.</div>
              </div>
              <div style={{
                flex: 1, padding: "10px 14px", borderRadius: "8px", cursor: "pointer",
                border: !calcMode ? "2px solid #f59e0b" : "2px solid #2a3a5e",
                background: !calcMode ? "#f59e0b15" : "#0d1520",
              }} onClick={() => setCalcMode(false)}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>✏️</div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: !calcMode ? "#f59e0b" : "#94a3b8" }}>Calculator OFF</div>
                <div style={{ fontSize: "9px", color: "#64748b", marginTop: "2px" }}>Work it out yourself! Full marks for correct manual calculations.</div>
              </div>
            </div>
          </div>

          {/* Starting money */}
          <div style={{ background: "#0d1520", border: "1px solid #1a2a4a", borderRadius: "12px", padding: "20px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>💰 Starting Budget</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "12px" }}>How much money does your city start with?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {MONEY_OPTIONS.map(m => {
                const sel = startMoney === m.value;
                return (
                  <button key={m.value} onClick={() => setStartMoney(m.value)} style={{
                    display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px",
                    borderRadius: "10px", border: sel ? "2px solid #fbbf24" : "2px solid #2a3a5e",
                    background: sel ? "#fbbf2415" : "#080f1e", cursor: "pointer", textAlign: "left",
                    transition: "all 0.2s",
                  }}>
                    <span style={{ fontSize: "28px" }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: sel ? "#fbbf24" : "#e2e8f0", fontFamily: "monospace" }}>{m.label}</div>
                      <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{m.desc}</div>
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 700,
                      background: m.difficulty === "Hard" ? "#ef444430" : m.difficulty === "Easy" ? "#22c55e30" : "#3b82f630",
                      color: m.difficulty === "Hard" ? "#fca5a5" : m.difficulty === "Easy" ? "#86efac" : "#93c5fd",
                    }}>{m.difficulty}</div>
                    {sel && <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 800, fontSize: "11px" }}>✓</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Math difficulty */}
          <div style={{ background: "#0d1520", border: "1px solid #1a2a4a", borderRadius: "12px", padding: "20px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>📐 Mathematical Difficulty</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "12px" }}>How challenging should the maths problems be?</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { id: "easy", icon: "🟢", label: "Easy", desc: "Whole numbers, simple shapes, guided steps. Foundation tier.", color: "#22c55e" },
                { id: "medium", icon: "🟡", label: "Medium", desc: "Decimals, multi-step problems, some unit conversion. Crossover.", color: "#f59e0b" },
                { id: "hard", icon: "🔴", label: "Hard", desc: "Complex calculations, minimal hints, higher tier content.", color: "#ef4444" },
              ].map(d => {
                const sel = mathDifficulty === d.id;
                return (
                  <button key={d.id} onClick={() => setMathDifficulty(d.id)} style={{
                    flex: 1, padding: "12px 10px", borderRadius: "10px", cursor: "pointer", textAlign: "center",
                    border: sel ? `2px solid ${d.color}` : "2px solid #2a3a5e",
                    background: sel ? `${d.color}15` : "#080f1e",
                    transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: "24px", marginBottom: "4px" }}>{d.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: sel ? d.color : "#94a3b8" }}>{d.label}</div>
                    <div style={{ fontSize: "8px", color: "#64748b", marginTop: "4px", lineHeight: 1.3 }}>{d.desc}</div>
                    {sel && <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: d.color, margin: "6px auto 0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "9px" }}>✓</div>}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={S.namingActions}>
            <button style={S.backBtn} onClick={() => setSettings(false)}>← City Name</button>
            <button style={S.launchBtn} onClick={doLaunch}>🚀 Start Building</button>
          </div>
        </div>
      </div>
    );
  }

  if (launched) {
    return (
      <div style={S.launchScreen}>
        <div style={S.launchInner}>
          <div style={{ fontSize: "72px", marginBottom: "12px" }}>🏙️</div>
          <h1 style={S.launchCity}>{cityName || "Your City"}</h1>
          <div style={S.launchParams}>
            {CATEGORIES.map(cat => {
              const opt = cat.options.find(o => o.id === choices[cat.id]);
              return opt ? (
                <div key={cat.id} style={S.launchParam}>
                  <span style={S.launchParamIcon}>{opt.icon}</span>
                  <div>
                    <div style={S.launchParamLabel}>{cat.title}</div>
                    <div style={S.launchParamVal}>{opt.name}</div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
          <div style={S.launchTagline}>Your STEM journey begins...</div>
          <div style={S.launchMissions}>
            <div style={S.launchMissionTitle}>First missions will adapt to your choices:</div>
            <div style={S.launchMissionList}>
              {choices.climate === "dry" && <span style={S.launchTag}>💧 Water conservation calculations</span>}
              {choices.climate === "tropical" && <span style={S.launchTag}>🌧️ Monsoon drainage geometry</span>}
              {choices.climate === "polar" && <span style={S.launchTag}>🧊 Insulation & heat transfer</span>}
              {choices.climate === "continental" && <span style={S.launchTag}>🌡️ Heating efficiency equations</span>}
              {choices.climate === "temperate" && <span style={S.launchTag}>🌿 Seasonal crop rotation</span>}
              {choices.terrain === "island" && <span style={S.launchTag}>⛵ Port coordinates & bearings</span>}
              {choices.terrain === "coastal" && <span style={S.launchTag}>🌊 Flood probability assessment</span>}
              {choices.terrain === "rural" && <span style={S.launchTag}>🌾 Land area zoning</span>}
              {choices.terrain === "busy" && <span style={S.launchTag}>🚦 Traffic flow statistics</span>}
              {choices.terrain === "town" && <span style={S.launchTag}>🛤️ Road network expansion</span>}
              {choices.government === "education" && <span style={S.launchTag}>🏫 School placement loci</span>}
              {choices.government === "trade" && <span style={S.launchTag}>📊 Market supply & demand</span>}
              {choices.government === "technological" && <span style={S.launchTag}>⚡ Circuit design for power grid</span>}
              {choices.civics === "militarist" && <span style={S.launchTag}>🛡️ Fortification angles</span>}
              {choices.civics === "spiritual" && <span style={S.launchTag}>🕌 Symmetrical temple design</span>}
              {choices.civics === "technologist" && <span style={S.launchTag}>🤖 Automation algorithms</span>}
              {choices.civics === "merchant" && <span style={S.launchTag}>💰 Trade ratio calculations</span>}
              {choices.civics === "insular" && <span style={S.launchTag}>♻️ Sustainability metrics</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (naming) {
    return (
      <div style={S.namingScreen}>
        <div style={S.namingInner}>
          <div style={{ fontSize: "56px", marginBottom: "8px" }}>🏗️</div>
          <h2 style={S.namingTitle}>Name Your City</h2>
          <div style={S.namingSummary}>
            {CATEGORIES.map(cat => {
              const opt = cat.options.find(o => o.id === choices[cat.id]);
              return opt ? <span key={cat.id} style={S.summaryChip}>{opt.icon} {opt.name}</span> : null;
            })}
          </div>
          <input
            style={S.nameInput}
            placeholder="Enter city name..."
            value={cityName}
            onChange={e => setCityName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && cityName.trim() && setSettings(true)}
            autoFocus
          />
          <div style={S.nameSuggestions}>
            <span style={S.nameSugLabel}>Suggestions:</span>
            {["Nova Haven", "Steelport", "Coral Bay", "Frostheim", "Dustwell", "Verdania", "Irongate", "Cloudpeak"].map(n => (
              <button key={n} style={S.nameSugBtn} onClick={() => setCityName(n)}>{n}</button>
            ))}
          </div>
          <div style={S.namingActions}>
            <button style={S.backBtn} onClick={() => setNaming(false)}>← Back</button>
            <button style={{ ...S.launchBtn, opacity: cityName.trim() ? 1 : 0.4, pointerEvents: cityName.trim() ? "auto" : "none" }} onClick={() => setSettings(true)}>
              ⚙️ Game Settings →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.container}>
      {/* Background pattern */}
      <div style={S.bgPattern} />

      {/* Header */}
      <div style={S.header}>
        <div style={{ fontSize: "32px" }}>🏙️</div>
        <div>
          <h1 style={S.title}>Super City</h1>
          <p style={S.subtitle}>Build your city. Choose wisely — every decision has consequences.</p>
        </div>
      </div>

      {/* Progress */}
      <div style={S.progress}>
        {CATEGORIES.map((cat, i) => {
          const chosen = choices[cat.id];
          const opt = cat.options.find(o => o.id === chosen);
          const active = step === i;
          const done = !!chosen;
          return (
            <button key={cat.id} onClick={() => setStep(i)} style={{
              ...S.progressStep,
              borderColor: active ? STEP_COLORS[i] : done ? "#22c55e" : "#2a3a5e",
              background: active ? `${STEP_COLORS[i]}15` : done ? "#064e3b15" : "transparent",
            }}>
              <div style={{ ...S.progressIcon, color: active ? STEP_COLORS[i] : done ? "#22c55e" : "#64748b" }}>
                {done ? "✓" : cat.icon}
              </div>
              <div style={S.progressLabel}>{cat.title}</div>
              {opt && <div style={{ ...S.progressChoice, color: STEP_COLORS[i] }}>{opt.icon} {opt.name}</div>}
            </button>
          );
        })}
      </div>

      {/* Category */}
      <div style={S.categoryHeader}>
        <span style={{ ...S.categoryIcon, color }}>{category.icon}</span>
        <div>
          <h2 style={{ ...S.categoryTitle, color }}>{category.title}</h2>
          <p style={S.categoryDesc}>{category.desc}</p>
        </div>
        <span style={S.stepIndicator}>{step + 1} / {CATEGORIES.length}</span>
      </div>

      {/* Options */}
      <div style={S.options}>
        {category.options.map(opt => {
          const selected = choices[category.id] === opt.id;
          return (
            <button key={opt.id} onClick={() => {
              setChoices(prev => ({ ...prev, [category.id]: opt.id }));
              // Auto-advance after short delay
              setTimeout(() => {
                if (step < CATEGORIES.length - 1) setStep(s => s + 1);
              }, 400);
            }} style={{
              ...S.option,
              borderColor: selected ? color : "#1a2a4a",
              background: selected ? `${color}20` : "#0d1f3c",
              boxShadow: selected ? `0 0 20px ${color}30` : "none",
              transform: selected ? "scale(1.02)" : "scale(1)",
            }}>
              <div style={S.optionTop}>
                <span style={S.optionIcon}>{opt.icon}</span>
                <div style={S.optionText}>
                  <h3 style={{ ...S.optionName, color: selected ? color : "#e2e8f0" }}>{opt.name}</h3>
                  <p style={S.optionDesc}>{opt.desc}</p>
                </div>
                {selected && <div style={{ ...S.selectedBadge, background: color }}>✓</div>}
              </div>
              <div style={S.tags}>
                {opt.tags.map(tag => (
                  <span key={tag} style={{ ...S.tag, borderColor: selected ? `${color}60` : "#2a3a5e", color: selected ? color : "#64748b" }}>{tag}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={S.nav}>
        <button style={{ ...S.navBtn, opacity: step > 0 ? 1 : 0.3 }} onClick={() => step > 0 && setStep(s => s - 1)}>
          ← Previous
        </button>
        <div style={S.navDots}>
          {CATEGORIES.map((_, i) => (
            <div key={i} style={{ ...S.dot, background: i === step ? color : choices[CATEGORIES[i].id] ? "#22c55e" : "#2a3a5e" }} />
          ))}
        </div>
        {allChosen ? (
          <button style={S.foundBtn} onClick={() => setNaming(true)}>Name Your City →</button>
        ) : (
          <button style={{ ...S.navBtn, opacity: step < CATEGORIES.length - 1 ? 1 : 0.3 }} onClick={() => step < CATEGORIES.length - 1 && setStep(s => s + 1)}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

const S = {
  container: { minHeight: "100vh", background: "#080f1e", color: "#e2e8f0", padding: "24px", fontFamily: "'Segoe UI', -apple-system, sans-serif", position: "relative", overflow: "hidden" },
  bgPattern: { position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)", pointerEvents: "none" },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", position: "relative" },
  title: { margin: 0, fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-1px" },
  subtitle: { margin: "2px 0 0", fontSize: "13px", color: "#64748b" },
  progress: { display: "flex", gap: "8px", marginBottom: "24px", position: "relative" },
  progressStep: { flex: 1, padding: "10px 12px", borderRadius: "10px", border: "2px solid", cursor: "pointer", background: "none", textAlign: "left", transition: "all 0.2s" },
  progressIcon: { fontSize: "16px", fontWeight: 800, marginBottom: "2px" },
  progressLabel: { fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" },
  progressChoice: { fontSize: "11px", fontWeight: 700, marginTop: "2px" },
  categoryHeader: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", padding: "16px 20px", borderRadius: "12px", background: "#0d1520", border: "1px solid #1a2a4a", position: "relative" },
  categoryIcon: { fontSize: "32px" },
  categoryTitle: { margin: 0, fontSize: "20px", fontWeight: 800 },
  categoryDesc: { margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" },
  stepIndicator: { position: "absolute", right: "20px", top: "16px", fontSize: "11px", color: "#475569", fontWeight: 700 },
  options: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", position: "relative" },
  option: { padding: "16px 20px", borderRadius: "12px", border: "2px solid", cursor: "pointer", textAlign: "left", transition: "all 0.25s", position: "relative" },
  optionTop: { display: "flex", alignItems: "flex-start", gap: "14px" },
  optionIcon: { fontSize: "32px", flexShrink: 0, marginTop: "2px" },
  optionText: { flex: 1, minWidth: 0 },
  optionName: { margin: 0, fontSize: "16px", fontWeight: 800 },
  optionDesc: { margin: "3px 0 0", fontSize: "12px", color: "#94a3b8", lineHeight: 1.4 },
  selectedBadge: { width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "12px", flexShrink: 0 },
  tags: { display: "flex", gap: "6px", marginTop: "10px", paddingLeft: "46px" },
  tag: { padding: "2px 10px", borderRadius: "6px", border: "1px solid", fontSize: "10px", fontWeight: 600 },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", position: "relative" },
  navBtn: { padding: "10px 24px", borderRadius: "10px", background: "#1a2a4a", color: "#e2e8f0", border: "1px solid #2a3a5e", cursor: "pointer", fontWeight: 700, fontSize: "13px", fontFamily: "inherit", transition: "opacity 0.2s" },
  navDots: { display: "flex", gap: "6px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", transition: "background 0.3s" },
  foundBtn: { padding: "12px 32px", borderRadius: "10px", background: "#22c55e", color: "#fff", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "15px", fontFamily: "inherit", boxShadow: "0 0 30px rgba(34,197,94,0.3)" },
  namingScreen: { minHeight: "100vh", background: "#080f1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" },
  namingInner: { textAlign: "center", maxWidth: "480px", width: "100%" },
  namingTitle: { fontSize: "24px", fontWeight: 900, color: "#fff", margin: "0 0 16px" },
  namingSummary: { display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" },
  summaryChip: { padding: "6px 14px", borderRadius: "8px", background: "#1a2a4a", border: "1px solid #2a3a5e", fontSize: "12px", fontWeight: 600, color: "#e2e8f0" },
  nameInput: { width: "100%", padding: "16px 20px", borderRadius: "12px", border: "2px solid #2a3a5e", background: "#0d1520", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "inherit", textAlign: "center", outline: "none", marginBottom: "12px" },
  nameSuggestions: { display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "24px", alignItems: "center" },
  nameSugLabel: { fontSize: "10px", color: "#64748b", fontWeight: 600 },
  nameSugBtn: { padding: "4px 12px", borderRadius: "6px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", fontSize: "11px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 },
  namingActions: { display: "flex", gap: "12px", justifyContent: "center" },
  backBtn: { padding: "10px 24px", borderRadius: "10px", background: "#1a2a4a", color: "#94a3b8", border: "1px solid #2a3a5e", cursor: "pointer", fontWeight: 600, fontSize: "13px", fontFamily: "inherit" },
  launchBtn: { padding: "14px 40px", borderRadius: "12px", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "16px", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(34,197,94,0.4)" },
  launchScreen: { minHeight: "100vh", background: "linear-gradient(180deg, #080f1e 0%, #0d2137 50%, #0a1a2e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" },
  launchInner: { textAlign: "center", maxWidth: "520px" },
  launchCity: { fontSize: "42px", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-1px" },
  launchParams: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" },
  launchParam: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", background: "#0d1f3c", border: "1px solid #1a2a4a", textAlign: "left" },
  launchParamIcon: { fontSize: "24px" },
  launchParamLabel: { fontSize: "9px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" },
  launchParamVal: { fontSize: "14px", fontWeight: 800, color: "#e2e8f0" },
  launchTagline: { fontSize: "18px", color: "#f59e0b", fontWeight: 700, marginBottom: "20px" },
  launchMissions: { background: "#0d1f3c", borderRadius: "12px", padding: "16px", border: "1px solid #1a2a4a", textAlign: "left" },
  launchMissionTitle: { fontSize: "11px", color: "#64748b", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" },
  launchMissionList: { display: "flex", gap: "6px", flexWrap: "wrap" },
  launchTag: { padding: "4px 12px", borderRadius: "6px", background: "#1a2a4a", border: "1px solid #2a3a5e", fontSize: "11px", fontWeight: 600, color: "#94a3b8" },
};
