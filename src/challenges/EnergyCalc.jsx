import React from "react";
import { S } from "../styles";

// Energy calculation challenge (the first maths popup, after 5 generators). Phase 1
// asks total MW and cost (hard wants standard form); medium adds a phase-2 kW
// conversion. Presentational: the parent owns the answers, generatorTotals, the
// toStdForm helper, and the checker.
export default function EnergyCalc({
  drag, phase, difficulty, energyCount, generatorTotals, calcMode, toStdForm,
  answerEnergy, setAnswerEnergy, answerCost, setAnswerCost, answerKW, setAnswerKW,
  feedback, attempts, passed, onSubmit,
}) {
  const phase1Ready = answerEnergy && answerCost;
  const ready = phase === 1 ? phase1Ready : answerKW;
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "500px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>🧮</div>
          <div style={{ ...S.popupBadge, background: "#3b82f620", borderColor: "#3b82f640", color: "#60a5fa" }}>CALCULATION CHALLENGE</div>
        </div>

        <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
          {phase === 1 ? <>You've placed {energyCount} energy generators. Now calculate the <strong style={{ color: "#facc15" }}>total energy output</strong> and <strong style={{ color: "#4ade80" }}>total cost</strong> of all your generators.{difficulty === "hard" && <span style={{ color: "#ef4444" }}> Express your answers in standard form.</span>}{difficulty === "medium" && <span style={{ color: "#f59e0b" }}> You'll then need to convert to kW.</span>}</> : <>Now convert <strong style={{ color: "#22d3ee" }}>{generatorTotals.totalMW} MW</strong> into <strong style={{ color: "#facc15" }}>kilowatts (kW)</strong>.</>}
        </p>

        {/* Difficulty badge */}
        <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginBottom: "12px", fontSize: "10px", fontWeight: 700, position: "relative", background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24", border: `1px solid ${difficulty === "easy" ? "#22c55e40" : difficulty === "hard" ? "#ef444440" : "#f59e0b40"}` }}>
          {difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard — Standard Form" : "🟡 Medium — with kW conversion"}
        </div>

        {phase === 1 && <>
          {/* Generator breakdown */}
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Your generators</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {generatorTotals.breakdown.map((g, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", borderRadius: "6px", background: "#1a2a4a40", fontSize: "12px" }}>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{g.name}</span>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <span style={{ color: "#22d3ee", fontFamily: "monospace", fontWeight: 700 }}>{difficulty === "hard" ? toStdForm(g.power) : g.power} MW</span>
                    <span style={{ color: "#fbbf24", fontFamily: "monospace", fontWeight: 700 }}>§{difficulty === "hard" ? toStdForm(g.cost) : g.cost.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            {difficulty === "hard" && <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#ef444415", border: "1px solid #ef444430", fontSize: "9px", color: "#fca5a5" }}>🔴 Values shown in standard form. Answer in standard form (e.g. 9.6 × 10^2)</div>}
            {!calcMode && <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#f59e0b15", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b" }}>✏️ Calculator is OFF — work it out yourself!</div>}
          </div>

          {/* Input fields - Phase 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px", position: "relative" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#22d3ee", display: "block", marginBottom: "4px" }}>⚡ Total Energy Output (MW){difficulty === "hard" && " — in standard form"}</label>
              <input type="text" value={answerEnergy} onChange={e => setAnswerEnergy(e.target.value)} onKeyDown={e => e.key === "Enter" && answerCost && onSubmit()} placeholder={difficulty === "hard" ? "e.g. 9.6 × 10^2" : "e.g. 960"} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#fbbf24", display: "block", marginBottom: "4px" }}>💰 Total Cost (§){difficulty === "hard" && " — in standard form"}</label>
              <input type="text" value={answerCost} onChange={e => setAnswerCost(e.target.value)} onKeyDown={e => e.key === "Enter" && answerEnergy && onSubmit()} placeholder={difficulty === "hard" ? "e.g. 2.35 × 10^6" : "e.g. 2350000"} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
            </div>
          </div>
        </>}

        {/* Phase 2 - KW conversion (medium only) */}
        {phase === 2 && <div style={{ marginBottom: "16px", position: "relative" }}>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "16px", border: "1px solid #1a2a4a" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Conversion</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>1 MW = 1,000 kW</div>
            <div style={{ fontSize: "14px", color: "#22d3ee", fontFamily: "monospace", fontWeight: 700, marginTop: "6px" }}>Your total: {generatorTotals.totalMW} MW = ? kW</div>
          </div>
          <div>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", display: "block", marginBottom: "4px" }}>⚡ Total Energy in Kilowatts (kW)</label>
            <input type="text" value={answerKW} onChange={e => setAnswerKW(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. 960000" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
          </div>
        </div>}

        {feedback && (
          <div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, lineHeight: 1.4, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>
            {feedback.msg}
          </div>
        )}

        {attempts > 0 && !passed && (
          <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>
        )}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          <button onClick={onSubmit} disabled={!ready} style={{ ...S.popupBtn, flex: 1, textAlign: "center", opacity: ready ? 1 : 0.4, cursor: ready ? "pointer" : "not-allowed" }}>
            {phase === 2 ? "✓ Submit kW Answer" : "✓ Submit Answer"}
          </button>
        </div>

        {difficulty === "medium" && phase === 1 && <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#f59e0b", position: "relative" }}>Step 1 of 2 — kW conversion follows</div>}
        <div style={{ textAlign: "center", marginTop: "6px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
