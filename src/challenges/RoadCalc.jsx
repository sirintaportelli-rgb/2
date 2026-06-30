import React from "react";
import { S } from "../styles";

// Road calculation challenge (medium/hard). Presentational: one text input across
// four question types (1 gradient, 2 equation, 3 perpendicular gradient, 4 ax+by+c=0).
// The parent owns the answer state and the checker; this just renders and reports
// back via onSubmit / onCancel.
export default function RoadCalc({
  drag, pendingRoad, questionType, answer, setAnswer, onSubmit, feedback, attempts, onCancel,
}) {
  const input = (placeholder) => (
    <input value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder={placeholder}
      style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
  );
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "500px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>🛣️</div>
          <div style={{ ...S.popupBadge, background: "#9ca3af20", borderColor: "#9ca3af40", color: "#9ca3af" }}>ROAD CHALLENGE</div>
        </div>

        <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Your Road</div>
          <div style={{ display: "flex", gap: "16px", fontSize: "13px", fontFamily: "monospace", fontWeight: 700 }}>
            <span style={{ color: "#60a5fa" }}>Start: ({pendingRoad.mc1?.x}, {pendingRoad.mc1?.y})</span>
            <span style={{ color: "#4ade80" }}>End: ({pendingRoad.mc2?.x}, {pendingRoad.mc2?.y})</span>
          </div>
        </div>

        {questionType === 1 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Using the two coordinate points on your road, what is the <strong style={{ color: "#facc15" }}>gradient</strong> of this road?
          </p>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "12px" }}>💡 m = (y₂ − y₁) ÷ (x₂ − x₁)</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#facc15" }}>m =</span>
            {input("e.g. 0.5")}
          </div>
        </>}

        {questionType === 2 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Using the two coordinate points on your road, what is the <strong style={{ color: "#facc15" }}>equation</strong> of this road?
          </p>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "12px", lineHeight: 1.5 }}>💡 Find m first, then use y − y₁ = m(x − x₁)<br />Write in the form y = mx + c</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
            {input("e.g. y=2x+3")}
          </div>
        </>}

        {questionType === 3 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            You need to make a road <strong style={{ color: "#c084fc" }}>perpendicular</strong> to this road. What is the <strong style={{ color: "#facc15" }}>gradient</strong> of the perpendicular road?
          </p>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "12px" }}>💡 Perpendicular gradient = −1 ÷ original gradient</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#c084fc" }}>m⊥ =</span>
            {input("e.g. -2")}
          </div>
          <div style={{ fontSize: "9px", color: "#94a3b8", marginBottom: "8px" }}>After answering, you'll draw the perpendicular road on the map.</div>
        </>}

        {questionType === 4 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            What is the equation of this road in the form <strong style={{ color: "#facc15" }}>ax + by + c = 0</strong>?
          </p>
          <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "12px", lineHeight: 1.5 }}>💡 Start with y = mx + c, then rearrange so everything is on one side</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
            {input("e.g. 2x-y+3=0")}
          </div>
        </>}

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}
        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          <button onClick={onSubmit} style={{ ...S.popupBtn, flex: 1, textAlign: "center", background: "linear-gradient(135deg, #6b7280, #4b5563)" }}>✓ Submit</button>
          <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: "12px", fontFamily: "inherit" }}>Cancel</button>
        </div>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
