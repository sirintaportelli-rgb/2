import React from "react";
import { S } from "../styles";

// Water-consumption challenge. Easy/medium sum (count x usage) across building
// types; hard treats each type as an arithmetic series (each extra building uses d
// litres more). Presentational: the parent owns the answer, the precomputed
// waterCalcData breakdown, the series step d, and the checker.
export default function WaterConsumption({
  drag, difficulty, seriesD, data, answer, setAnswer, onSubmit, feedback,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "560px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>💧</div>
          <div style={{ ...S.popupBadge, background: "#60a5fa20", borderColor: "#60a5fa40", color: "#60a5fa" }}>WATER CONSUMPTION</div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24" }}>
            {difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard — Arithmetic Series" : "🟡 Medium"}
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
          {difficulty === "hard"
            ? <>Due to increasing pipe distances, each additional building of the same type uses <strong style={{ color: "#fca5a5" }}>{seriesD} litres more</strong> per day than the previous one. Find the <strong style={{ color: "#60a5fa" }}>total daily consumption</strong>.</>
            : <>Calculate your city's <strong style={{ color: "#60a5fa" }}>total daily water consumption</strong> in litres based on all placed buildings.</>}
        </p>

        <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
            {difficulty === "hard" ? "Series Data" : "Water Usage Rates"} (litres/day)
          </div>

          {difficulty === "hard" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {data.breakdown.map(b => (
                <div key={b.type} style={{ padding: "8px 10px", borderRadius: "6px", background: "#1a2a4a30" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#e2e8f0" }}>{b.name} <span style={{ color: "#64748b" }}>× {b.n}</span></span>
                    <span style={{ fontSize: "9px", color: "#c084fc", fontFamily: "monospace" }}>a = {b.a}, d = {seriesD}, n = {b.n}</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#94a3b8", fontFamily: "monospace", lineHeight: 1.5 }}>
                    1st: {b.a}L → 2nd: {b.a + seriesD}L → 3rd: {b.a + 2 * seriesD}L{b.n > 3 ? ` → ... → ${b.n}th: ${b.a + (b.n - 1) * seriesD}L` : ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              {data.breakdown.map(b => (
                <div key={b.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", borderRadius: "4px", background: "#1a2a4a30", fontSize: "10px" }}>
                  <span style={{ color: "#e2e8f0" }}>{b.name} <span style={{ color: "#64748b" }}>×{b.n}</span></span>
                  <span style={{ color: "#60a5fa", fontFamily: "monospace", fontWeight: 700 }}>{b.a} L</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: difficulty === "hard" ? "#c084fc10" : "#60a5fa10", border: `1px solid ${difficulty === "hard" ? "#c084fc30" : "#60a5fa30"}`, fontSize: "9px", color: difficulty === "hard" ? "#c084fc" : "#60a5fa", fontFamily: "monospace", lineHeight: 1.6 }}>
            {difficulty === "hard" ? (<>
              💡 For each building type, use the arithmetic series formula:<br />
              Sₙ = n/2 × (2a + (n − 1)d)<br />
              where a = base usage, d = {seriesD}, n = count<br />
              Then sum all building types together
            </>) : (<>
              💡 Total = Σ (building count × water usage per building)
            </>)}
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#60a5fa" }}>Total =</span>
          <input value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="litres/day" style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} autoFocus />
          <span style={{ fontSize: "11px", color: "#64748b" }}>L/day</span>
        </div>

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}

        <button onClick={onSubmit} style={{ ...S.popupBtn, width: "100%", textAlign: "center", background: difficulty === "hard" ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #60a5fa, #3b82f6)" }}>✓ Submit Total</button>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
