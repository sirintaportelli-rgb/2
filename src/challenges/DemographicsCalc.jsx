import React from "react";
import { S } from "../styles";
import { HOUSING_TYPES } from "../data/content";

// Demographics challenge (three phases by difficulty): 1 split 200 residents by the
// housing ratios; 2 subtract and simplify the new ratio; 3 permutations P(n, 3).
// Presentational: the parent owns all three answer states, the precomputed correct
// values (newResidentDemo), and the checker.
export default function DemographicsCalc({
  drag, difficulty, phase, housingCount, newResidentDemo,
  phase1Answers, setPhase1Answers, phase2Answers, setPhase2Answers, hardAnswer, setHardAnswer,
  feedback, attempts, onSubmit,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "520px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>👥</div>
          <div style={{ ...S.popupBadge, background: "#60a5fa20", borderColor: "#60a5fa40", color: "#60a5fa" }}>DEMOGRAPHICS CHALLENGE</div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24" }}>
            {difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard" : "🟡 Medium"}{phase > 1 && ` — Step ${phase}`}
          </div>
        </div>

        {phase === 1 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Based on the population ratios of your homes, how many <strong style={{ color: "#60a5fa" }}>adults</strong>, <strong style={{ color: "#4ade80" }}>children</strong>, and <strong style={{ color: "#fb923c" }}>elderly</strong> are among the 200 people who move in?
          </p>

          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Your Housing</div>
            {housingCount.houses > 0 && <div style={{ padding: "8px 10px", borderRadius: "6px", background: "#1a2a4a40", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: "10px", color: "#64748b" }}>🏠 Houses</div><div style={{ fontSize: "13px", fontWeight: 700, color: "#60a5fa", fontFamily: "monospace" }}>{housingCount.houses} × {HOUSING_TYPES.house.population} = {housingCount.houses * HOUSING_TYPES.house.population} people</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: "9px", color: "#facc15" }}>Ratio 5 : 4 : 1</div><div style={{ fontSize: "8px", color: "#94a3b8" }}>adults : children : elderly</div></div>
              </div>
            </div>}
            {housingCount.condos > 0 && <div style={{ padding: "8px 10px", borderRadius: "6px", background: "#1a2a4a40", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: "10px", color: "#64748b" }}>🏢 Condos</div><div style={{ fontSize: "13px", fontWeight: 700, color: "#818cf8", fontFamily: "monospace" }}>{housingCount.condos} × {HOUSING_TYPES.condo.population} = {housingCount.condos * HOUSING_TYPES.condo.population} people</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: "9px", color: "#facc15" }}>Ratio 8 : 1 : 1</div><div style={{ fontSize: "8px", color: "#94a3b8" }}>adults : children : elderly</div></div>
              </div>
            </div>}
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#f59e0b10", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace", lineHeight: 1.5 }}>💡 Split each type using its ratio. e.g. House: 10 people, ratio 5:4:1 → 5 adults, 4 children, 1 elderly</div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", position: "relative" }}>
            {[{ k: "adults", l: "👤 Adults", c: "#60a5fa" }, { k: "children", l: "👶 Children", c: "#4ade80" }, { k: "elderly", l: "👴 Elderly", c: "#fb923c" }].map(f =>
              <div key={f.k} style={{ flex: 1 }}><label style={{ fontSize: "10px", fontWeight: 700, color: f.c, display: "block", marginBottom: "4px" }}>{f.l}</label><input value={phase1Answers[f.k]} onChange={e => setPhase1Answers(p => ({ ...p, [f.k]: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div>
            )}
          </div>
        </>}

        {phase === 2 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            <strong style={{ color: "#ef4444" }}>10 adults</strong>, <strong style={{ color: "#ef4444" }}>2 children</strong>, and <strong style={{ color: "#ef4444" }}>2 elderly</strong> do not move in as planned. What are the <strong style={{ color: "#facc15" }}>new ratios</strong>? Give your answer in <strong style={{ color: "#facc15" }}>simplest whole numbers</strong>.
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>ORIGINAL (from step 1)</div>
            <div style={{ display: "flex", gap: "12px", fontSize: "13px", fontFamily: "monospace", fontWeight: 700, marginBottom: "10px" }}>
              <span style={{ color: "#60a5fa" }}>Adults: {newResidentDemo.adults}</span><span style={{ color: "#4ade80" }}>Children: {newResidentDemo.children}</span><span style={{ color: "#fb923c" }}>Elderly: {newResidentDemo.elderly}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#fca5a5", fontWeight: 600 }}>Subtract: −10 adults, −2 children, −2 elderly</div>
            <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#f59e0b10", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace" }}>💡 Subtract, then find the HCF to simplify the ratio</div>
          </div>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "8px", fontWeight: 600 }}>New ratio (simplest form): Adults : Children : Elderly</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", position: "relative", alignItems: "center" }}>
            {[{ k: "adults", c: "#60a5fa" }, { k: "children", c: "#4ade80" }, { k: "elderly", c: "#fb923c" }].map((f, i) =>
              <React.Fragment key={f.k}>{i > 0 && <span style={{ color: "#64748b", fontSize: "18px", fontWeight: 700 }}>:</span>}<div style={{ flex: 1 }}><input value={phase2Answers[f.k]} onChange={e => setPhase2Answers(p => ({ ...p, [f.k]: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div></React.Fragment>
            )}
          </div>
        </>}

        {phase === 3 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            You have <strong style={{ color: "#facc15" }}>{housingCount.total} housing units</strong> and <strong style={{ color: "#c084fc" }}>3 community groups</strong> (families, couples, singles). Each group must be assigned to a different housing unit. How many <strong style={{ color: "#facc15" }}>unique arrangements</strong> are possible?
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>PERMUTATIONS</div>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace", lineHeight: 1.6 }}>n = {housingCount.total} housing units, r = 3 groups<br />P(n, r) = n! ÷ (n − r)!</div>
            <div style={{ marginTop: "8px", padding: "6px 8px", borderRadius: "6px", background: "#c084fc10", border: "1px solid #c084fc30", fontSize: "9px", color: "#c084fc", fontFamily: "monospace" }}>💡 First group: {housingCount.total} choices. Second: {housingCount.total - 1}. Third: {housingCount.total - 2}.</div>
          </div>
          <div><label style={{ fontSize: "11px", fontWeight: 700, color: "#c084fc", display: "block", marginBottom: "4px" }}>Total unique arrangements</label><input value={hardAnswer} onChange={e => setHardAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none", marginBottom: "16px" }} /></div>
        </>}

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}
        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}
        <button onClick={onSubmit} style={{ ...S.popupBtn, width: "100%", textAlign: "center", background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>{phase === 1 ? "✓ Submit Demographics" : phase === 2 ? "✓ Submit Ratio" : "✓ Submit Answer"}</button>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
