import React from "react";
import { S } from "../styles";
import { SECTOR_PRODUCTION } from "../data/content";

// Worker sector challenge — the largest popup. Phases by difficulty:
//   easy:   1 count workers -> 4 like terms -> 5 Venn diagram
//   medium: 1 count workers -> 2 production scaling
//   hard:   1 count workers -> 3 probability density (hardStep 1 find k, 2 percentage & count)
// Presentational: the parent owns every answer object, the engine-computed `correct`
// (computeWorkerSplit), the randomised `venn` numbers, and the checker. SECTOR_PRODUCTION
// is data, imported here directly.
export default function WorkerCalc({
  drag, difficulty, phase, hardStep, jobResult, correct, venn,
  phase1Answers, setPhase1Answers, algAnswers, setAlgAnswers, vennAnswers, setVennAnswers,
  prodAnswers, setProdAnswers, hardAnswers, setHardAnswers,
  feedback, attempts, onSubmit,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "520px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>💼</div>
          <div style={{ ...S.popupBadge, background: "#eab30820", borderColor: "#eab30840", color: "#eab308" }}>WORKER SECTOR ANALYSIS</div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24" }}>
            {difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard" : "🟡 Medium"}{phase === 2 && " — Step 2"}{phase === 3 && ` — Step ${hardStep + 1}`}
          </div>
        </div>

        {/* Phase 1: Calculate workers */}
        {phase === 1 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Your city's economy is <strong style={{ color: "#eab308" }}>{jobResult.dominant}</strong> sector dominant. Calculate how many <strong style={{ color: "#60a5fa" }}>adult workers</strong> are employed in each sector.
          </p>

          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Given Data</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, padding: "8px", borderRadius: "6px", background: "#1a2a4a40", textAlign: "center" }}>
                <div style={{ fontSize: "9px", color: "#64748b" }}>Total Adults</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: "#60a5fa", fontFamily: "monospace" }}>{correct.totalAdults}</div>
                <div style={{ fontSize: "8px", color: "#64748b" }}>Only adults work — not children or elderly</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { id: "primary", label: "Primary", icon: "🌾", desc: "Farming, mining, fishing", color: "#22c55e" },
                { id: "secondary", label: "Secondary", icon: "🏭", desc: "Manufacturing, construction", color: "#3b82f6" },
                { id: "tertiary", label: "Tertiary", icon: "🏪", desc: "Services, education, research", color: "#a855f7" },
              ].map(s => (
                <div key={s.id} style={{ flex: 1, padding: "8px", borderRadius: "6px", background: jobResult.dominant === s.id ? `${s.color}15` : "#1a2a4a40", border: `1px solid ${jobResult.dominant === s.id ? s.color + "40" : "#1a2a4a"}`, textAlign: "center" }}>
                  <div style={{ fontSize: "16px" }}>{s.icon}</div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: s.color }}>{s.label}</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#fbbf24", fontFamily: "monospace" }}>{jobResult.split[s.id]}%</div>
                  <div style={{ fontSize: "7px", color: "#64748b" }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: "#f59e0b10", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace", lineHeight: 1.5 }}>
              💡 Workers in sector = Total adults × sector percentage ÷ 100
            </div>
          </div>

          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", marginBottom: "8px" }}>How many adult workers in each sector?</div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", position: "relative" }}>
            {[
              { k: "primary", l: "🌾 Primary", c: "#22c55e", pct: jobResult.split.primary },
              { k: "secondary", l: "🏭 Secondary", c: "#3b82f6", pct: jobResult.split.secondary },
              { k: "tertiary", l: "🏪 Tertiary", c: "#a855f7", pct: jobResult.split.tertiary },
            ].map(f => (
              <div key={f.k} style={{ flex: 1 }}>
                <label style={{ fontSize: "10px", fontWeight: 700, color: f.c, display: "block", marginBottom: "4px" }}>{f.l} ({f.pct}%)</label>
                <input value={phase1Answers[f.k]} onChange={e => setPhase1Answers(p => ({ ...p, [f.k]: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
            ))}
          </div>
        </>}

        {/* Phase 4: Collecting like terms (easy) */}
        {phase === 4 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "14px", position: "relative" }}>
            Now write it with <strong style={{ color: "#a855f7" }}>algebra</strong>. Let <strong style={{ fontFamily: "monospace", color: "#22c55e" }}>p</strong> = primary jobs, <strong style={{ fontFamily: "monospace", color: "#3b82f6" }}>s</strong> = secondary jobs and <strong style={{ fontFamily: "monospace", color: "#a855f7" }}>t</strong> = tertiary jobs.
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "14px", border: "1px solid #1a2a4a", position: "relative" }}>
            <label style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: "6px" }}>1. Write an expression for the total number of jobs you have filled.</label>
            <input value={algAnswers.total} onChange={e => setAlgAnswers(pp => ({ ...pp, total: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. p + s + t" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none", marginBottom: "12px" }} />
            <label style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: "6px" }}>2. How would you represent a worker who can do <strong style={{ color: "#fbbf24" }}>both</strong> a primary and a secondary job?</label>
            <input value={algAnswers.both} onChange={e => setAlgAnswers(pp => ({ ...pp, both: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. p + s" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: "#a855f710", border: "1px solid #a855f730", fontSize: "9px", color: "#c4b5fd", fontFamily: "monospace", lineHeight: 1.5 }}>
              💡 Collecting like terms: add the quantities of the same kind together.
            </div>
          </div>
        </>}

        {/* Phase 5: Venn diagram (easy) */}
        {phase === 5 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            Some workers are trained in more than one sector. This Venn diagram shows how many workers can do <strong style={{ color: "#22c55e" }}>primary</strong> jobs, <strong style={{ color: "#3b82f6" }}>secondary</strong> jobs, or both.
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "10px", marginBottom: "12px", border: "1px solid #1a2a4a", position: "relative", display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 320 185" style={{ width: "100%", maxWidth: "320px" }}>
              <circle cx="120" cy="100" r="72" fill="#22c55e22" stroke="#22c55e" strokeWidth="2" />
              <circle cx="200" cy="100" r="72" fill="#3b82f622" stroke="#3b82f6" strokeWidth="2" />
              <text x="78" y="30" fill="#22c55e" fontSize="13" fontWeight="800" textAnchor="middle">Primary</text>
              <text x="242" y="30" fill="#3b82f6" fontSize="13" fontWeight="800" textAnchor="middle">Secondary</text>
              <text x="82" y="107" fill="#e2e8f0" fontSize="22" fontWeight="800" textAnchor="middle">{venn.onlyP}</text>
              <text x="160" y="107" fill="#fbbf24" fontSize="22" fontWeight="800" textAnchor="middle">{venn.both}</text>
              <text x="238" y="107" fill="#e2e8f0" fontSize="22" fontWeight="800" textAnchor="middle">{venn.onlyS}</text>
              <text x="160" y="178" fill="#64748b" fontSize="10" textAnchor="middle">Neither: {venn.neither}</text>
            </svg>
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px", position: "relative" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "10px", fontWeight: 700, color: "#22c55e", display: "block", marginBottom: "4px" }}>How many can do a primary job?</label>
              <input value={vennAnswers.primary} onChange={e => setVennAnswers(pp => ({ ...pp, primary: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "10px", fontWeight: 700, color: "#a855f7", display: "block", marginBottom: "4px" }}>How many can do at least one job?</label>
              <input value={vennAnswers.atLeastOne} onChange={e => setVennAnswers(pp => ({ ...pp, atLeastOne: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            </div>
          </div>
        </>}

        {/* Phase 2: Production scaling (medium) */}
        {phase === 2 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Using the workers you calculated, work out each sector's <strong style={{ color: "#eab308" }}>daily production</strong>.
          </p>

          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Production Rates & Your Workers</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { id: "primary", label: "Primary", icon: "🌾", color: "#22c55e" },
                { id: "secondary", label: "Secondary", icon: "🏭", color: "#3b82f6" },
                { id: "tertiary", label: "Tertiary", icon: "🏪", color: "#a855f7" },
              ].map(s => {
                const prod = SECTOR_PRODUCTION[s.id];
                return (
                  <div key={s.id} style={{ padding: "10px", borderRadius: "8px", background: "#1a2a4a40", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: s.color }}>{s.icon} {s.label}</div>
                      <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{prod.per} workers produce <strong style={{ color: "#fbbf24" }}>{prod.rate} {prod.unit}</strong> of {prod.material} per day{prod.divisor ? <span style={{ color: "#fb923c" }}> (÷ {prod.divisor})</span> : ""}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "9px", color: "#64748b" }}>Your workers</div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{correct[s.id]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: "#f59e0b10", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace", lineHeight: 1.5 }}>
              💡 Daily output = (Your workers ÷ {SECTOR_PRODUCTION.primary.per}) × rate per {SECTOR_PRODUCTION.primary.per} workers<br />
              🏪 Tertiary: then ÷ {SECTOR_PRODUCTION.tertiary.divisor} to convert to research points
            </div>
          </div>

          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", marginBottom: "8px" }}>How much does each sector produce per day?</div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", position: "relative" }}>
            {[
              { k: "primary", l: "🌾 kg", c: "#22c55e" },
              { k: "secondary", l: "🏭 units", c: "#3b82f6" },
              { k: "tertiary", l: "🏪 RP", c: "#a855f7" },
            ].map(f => (
              <div key={f.k} style={{ flex: 1 }}>
                <label style={{ fontSize: "10px", fontWeight: 700, color: f.c, display: "block", marginBottom: "4px" }}>{f.l}</label>
                <input value={prodAnswers[f.k]} onChange={e => setProdAnswers(p => ({ ...p, [f.k]: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
            ))}
          </div>
        </>}

        {/* Phase 3: Continuous probability distribution (hard) */}
        {phase === 3 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            The daily output (<strong style={{ color: "#facc15" }}>x</strong> kg) of a randomly selected worker in your <strong style={{ color: "#eab308" }}>{jobResult.dominant}</strong> sector follows the probability density function:
          </p>

          <div style={{ textAlign: "center", padding: "14px", background: "#0a0f1a", borderRadius: "10px", border: "1px solid #ef444440", marginBottom: "10px", position: "relative" }}>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#fca5a5", fontFamily: "monospace" }}>f(x) = kx({correct.hard.N} − x)</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px", fontFamily: "monospace" }}>0 &lt; x &lt; {correct.hard.N}</div>
            <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>f(x) = 0 otherwise</div>
            <div style={{ fontSize: "10px", color: "#fb923c", marginTop: "6px" }}>N = {correct.hard.N} (workers in the {jobResult.dominant} sector)</div>
          </div>

          {hardStep === 1 && <>
            <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#e2e8f0", lineHeight: 1.8 }}>
                <strong style={{ color: "#c084fc" }}>Step 1:</strong> For f(x) to be a valid probability density function, the total area under the curve must equal 1. Find the value of <strong style={{ color: "#facc15" }}>k</strong>.
              </div>
              <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "8px", lineHeight: 1.8 }}>
                Solve: ∫₀ᴺ kx(N − x) dx = 1
              </div>
            </div>
            <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#c084fc10", border: "1px solid #c084fc30", fontSize: "9px", color: "#c084fc", fontFamily: "monospace", lineHeight: 1.6, marginBottom: "14px" }}>
              💡 Expand: kx(N−x) = k(Nx − x²)<br />
              Integrate: k[Nx²/2 − x³/3] from 0 to N<br />
              Set = 1, solve for k
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#facc15" }}>k =</span>
              <input value={hardAnswers.k} onChange={e => setHardAnswers(p => ({ ...p, k: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder={`e.g. ${(6 / Math.pow(correct.hard.N, 3)).toFixed(6).substring(0, 8)}...`} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            </div>
          </>}

          {hardStep === 2 && <>
            <div style={{ background: "#4ade8010", borderRadius: "8px", padding: "8px 12px", marginBottom: "12px", border: "1px solid #4ade8030" }}>
              <span style={{ fontSize: "10px", color: "#4ade80", fontWeight: 700 }}>✓ k = 6/{correct.hard.N}³ = {(correct.hard.kVal).toFixed(6)}</span>
            </div>
            <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#e2e8f0", lineHeight: 1.8 }}>
                <strong style={{ color: "#c084fc" }}>Step 2:</strong> What <strong style={{ color: "#facc15" }}>percentage</strong> of workers produce less than <strong style={{ color: "#22d3ee" }}>{correct.hard.N / 4}</strong> kg per day?
              </div>
              <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "8px", lineHeight: 1.8 }}>
                Find P(X &lt; N/4) = ∫₀^(N/4) f(x) dx
              </div>
              <div style={{ fontSize: "12px", color: "#fb923c", fontWeight: 700, marginTop: "8px" }}>
                Then: how many of your {correct.hard.N} workers is that?
              </div>
            </div>
            <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#c084fc10", border: "1px solid #c084fc30", fontSize: "9px", color: "#c084fc", fontFamily: "monospace", lineHeight: 1.6, marginBottom: "14px" }}>
              💡 Integrate (6/N³)·x(N−x) from 0 to N/4<br />
              = (6/N³)[Nx²/2 − x³/3] from 0 to N/4<br />
              Then × 100 for percentage, × {correct.hard.N} for count
            </div>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "#facc15", display: "block", marginBottom: "4px" }}>Percentage (%)</label>
                <input value={hardAnswers.percent} onChange={e => setHardAnswers(p => ({ ...p, percent: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. 15.6" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "#22d3ee", display: "block", marginBottom: "4px" }}>Number of workers</label>
                <input value={hardAnswers.count} onChange={e => setHardAnswers(p => ({ ...p, count: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder={`out of ${correct.hard.N}`} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
            </div>
          </>}
        </>}

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}
        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}

        <button onClick={onSubmit} style={{ ...S.popupBtn, width: "100%", textAlign: "center", background: phase === 3 ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #eab308, #ca8a04)" }}>{phase === 1 ? "✓ Submit Workers" : phase === 2 ? "✓ Submit Production" : phase === 4 ? "✓ Submit Expressions" : phase === 5 ? "✓ Submit Venn" : hardStep === 1 ? "✓ Submit k" : "✓ Submit Answer"}</button>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
