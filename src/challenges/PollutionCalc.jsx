import React from "react";
import { S } from "../styles";

// Pollution analysis challenge. Easy: identify the three circular loci. Medium: a
// quadratic sickness model y = kx^2 over two phases (find k, then predict). Hard:
// integrate a probability density. Presentational: parent owns the answer state,
// the loci-confirmed map, POLL_K, and the checker.
export default function PollutionCalc({
  drag, difficulty, phase, lociConfirmed, setLociConfirmed, answers, setAnswers, pollK,
  feedback, attempts, onSubmit,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "540px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>☣️</div>
          <div style={{ ...S.popupBadge, background: "#f59e0b20", borderColor: "#f59e0b40", color: "#fb923c" }}>POLLUTION ANALYSIS</div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24" }}>
            {difficulty === "easy" ? "🟢 Easy — Loci Identification" : difficulty === "hard" ? "🔴 Hard — Probability Function" : "🟡 Medium — Quadratic Model"}{phase > 1 && ` — Step ${phase}`}
          </div>
        </div>

        {/* Pollution data */}
        <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Garbage Disposal Pollution Radii</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "100px", padding: "8px", borderRadius: "6px", background: "#1a2a4a40", textAlign: "center" }}>
              <div style={{ fontSize: "18px" }}>🔊</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#fb923c" }}>Noise</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24", fontFamily: "monospace" }}>0.2 km</div>
              <div style={{ fontSize: "9px", color: "#64748b" }}>200m radius</div>
            </div>
            <div style={{ flex: 1, minWidth: "100px", padding: "8px", borderRadius: "6px", background: "#1a2a4a40", textAlign: "center" }}>
              <div style={{ fontSize: "18px" }}>🟤</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#a16207" }}>Ground</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24", fontFamily: "monospace" }}>1.0 km</div>
              <div style={{ fontSize: "9px", color: "#64748b" }}>1000m radius</div>
            </div>
            <div style={{ flex: 1, minWidth: "100px", padding: "8px", borderRadius: "6px", background: "#1a2a4a40", textAlign: "center" }}>
              <div style={{ fontSize: "18px" }}>💨</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444" }}>Air</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24", fontFamily: "monospace" }}>0.9 km</div>
              <div style={{ fontSize: "9px", color: "#64748b" }}>900m radius</div>
            </div>
          </div>
          <div style={{ marginTop: "8px", fontSize: "9px", color: "#94a3b8" }}>
            🚰 Water &amp; Sewage pipes also generate noise pollution: 0.3 km (300m) from each endpoint
          </div>
        </div>

        {/* EASY: Loci sketch identification */}
        {difficulty === "easy" && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Identify the <strong style={{ color: "#facc15" }}>three pollution loci</strong> around your garbage disposal. Each type creates a circular exclusion zone where <strong style={{ color: "#ef4444" }}>housing should not be built</strong>.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px", position: "relative" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", marginBottom: "4px" }}>Tick each locus you can identify on the map:</div>
            {[
              { key: "noise", icon: "🔊", label: "Noise locus", desc: "Circle with radius 200m (2 grid cells) from the garbage disposal", color: "#fb923c" },
              { key: "ground", icon: "🟤", label: "Ground contamination locus", desc: "Circle with radius 1000m (10 grid cells) — the largest zone", color: "#a16207" },
              { key: "air", icon: "💨", label: "Air pollution locus", desc: "Circle with radius 900m (9 grid cells) from the garbage disposal", color: "#ef4444" },
            ].map(l => (
              <button key={l.key} onClick={() => setLociConfirmed(p => ({ ...p, [l.key]: !p[l.key] }))} style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "8px", width: "100%",
                border: lociConfirmed[l.key] ? `2px solid ${l.color}` : "2px solid #2a3a5e",
                background: lociConfirmed[l.key] ? `${l.color}15` : "#080f1e",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: lociConfirmed[l.key] ? l.color : "#2a3a5e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "12px", flexShrink: 0 }}>
                  {lociConfirmed[l.key] ? "✓" : ""}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: lociConfirmed[l.key] ? l.color : "#94a3b8" }}>{l.icon} {l.label}</div>
                  <div style={{ fontSize: "9px", color: "#64748b", marginTop: "2px" }}>{l.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: "6px", padding: "8px", marginBottom: "16px", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace", lineHeight: 1.5 }}>
            💡 A locus is a set of points that satisfy a condition.<br />
            Each pollution type creates a circular locus: all points within distance r from the source.<br />
            Housing must be placed OUTSIDE the largest locus (ground: 1000m) to be safe.
          </div>
        </>}

        {/* MEDIUM Phase 1: Find k */}
        {difficulty === "medium" && phase === 1 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            The number of people that get sick in a pollution zone (<strong style={{ color: "#ef4444" }}>y</strong>) follows the model:
          </p>
          <div style={{ textAlign: "center", padding: "14px", background: "#0a0f1a", borderRadius: "10px", border: "1px solid #1a2a4a", marginBottom: "16px", position: "relative" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#facc15", fontFamily: "monospace" }}>y = kx²</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px" }}>where x = distance in metres inside the pollution locus boundary</div>
          </div>
          <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "10px", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "#e2e8f0", lineHeight: 1.6 }}>
              <strong style={{ color: "#22d3ee" }}>Given:</strong> 40 people got sick when they were <strong style={{ color: "#facc15" }}>10 metres</strong> inside the pollution locus.
            </div>
            <div style={{ fontSize: "12px", color: "#fb923c", fontWeight: 700, marginTop: "6px" }}>Find the value of k.</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", display: "block", marginBottom: "4px" }}>k =</label>
            <input value={answers.k} onChange={e => setAnswers(p => ({ ...p, k: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "16px" }}>💡 Substitute y = 40 and x = 10 into y = kx², then solve for k</div>
        </>}

        {/* MEDIUM Phase 2: Predict sick at 21m */}
        {difficulty === "medium" && phase === 2 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Using <strong style={{ color: "#facc15" }}>k = {pollK}</strong>, how many people would get sick if they were <strong style={{ color: "#ef4444" }}>21 metres</strong> inside the pollution locus?
          </p>
          <div style={{ textAlign: "center", padding: "14px", background: "#0a0f1a", borderRadius: "10px", border: "1px solid #1a2a4a", marginBottom: "16px", position: "relative" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#facc15", fontFamily: "monospace" }}>y = {pollK}x²</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>x = 21 metres, y = ?</div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", display: "block", marginBottom: "4px" }}>Number of sick people =</label>
            <input value={answers.sick} onChange={e => setAnswers(p => ({ ...p, sick: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "16px" }}>💡 Substitute x = 21 into y = {pollK} × x². Accept 1 d.p.</div>
        </>}

        {/* HARD: Integration of probability function */}
        {difficulty === "hard" && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            The probability density of someone being sick in a pollution locus is represented by:
          </p>
          <div style={{ textAlign: "center", padding: "14px", background: "#0a0f1a", borderRadius: "10px", border: "1px solid #ef444440", marginBottom: "6px", position: "relative" }}>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#fca5a5", fontFamily: "monospace" }}>F(X) = 0.5X(1 − X)</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px", fontFamily: "monospace" }}>0 &lt; X &lt; 1</div>
            <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>F(X) = 0 otherwise</div>
            <div style={{ fontSize: "11px", color: "#fb923c", marginTop: "8px" }}>X represents the distance (km) inside the pollution locus boundary</div>
          </div>
          <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "#e2e8f0", lineHeight: 1.8 }}>
              If there are <strong style={{ color: "#22d3ee" }}>100 people</strong> in the pollution locus, how many are estimated to be sick <strong style={{ color: "#facc15" }}>0.2 km</strong> from the locus boundary?
            </div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "10px", lineHeight: 1.8 }}>
              <strong style={{ color: "#c084fc" }}>Steps:</strong><br />
              1. Expand F(X) = 0.5X(1 − X)<br />
              2. Integrate to get the cumulative function<br />
              3. Evaluate with boundaries [0, 0.2]<br />
              4. Multiply by 100 to get the expected number
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#c084fc", display: "block", marginBottom: "4px" }}>Expected number of sick people =</label>
            <input value={answers.hard} onChange={e => setAnswers(p => ({ ...p, hard: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. 0.87" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "16px", lineHeight: 1.6 }}>
            💡 0.5X(1−X) = 0.5X − 0.5X²<br />
            ∫(0.5X − 0.5X²)dX = 0.25X² − X³/6<br />
            Evaluate at [0, 0.2], then × 100
          </div>
        </>}

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}
        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}

        <button onClick={onSubmit} style={{ ...S.popupBtn, width: "100%", textAlign: "center", background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          {difficulty === "easy" ? "✓ Confirm Loci" : phase === 1 && difficulty === "medium" ? "✓ Submit k" : "✓ Submit Answer"}
        </button>
        {difficulty === "medium" && phase === 1 && <div style={{ textAlign: "center", marginTop: "6px", fontSize: "9px", color: "#f59e0b", position: "relative" }}>Step 1 of 2</div>}
        <div style={{ textAlign: "center", marginTop: "6px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
