import React from "react";
import { S } from "../styles";
import { TECH_TREE } from "../data/content";

// Research challenge popup. Presentational: the parent generates the question
// (q = { difficulty, question }) and owns the answer state + checker.
export default function ResearchCalc({
  drag, q, universityCount, activeResearch, researchProgress, answer, setAnswer, onSubmit, feedback, onClose,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "460px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "40px", marginBottom: "4px" }}>🔬</div>
          <div style={{ ...S.popupBadge, background: "#c084fc20", borderColor: "#c084fc40", color: "#c084fc" }}>RESEARCH CHALLENGE</div>
          <div style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>Difficulty: Level {q.difficulty}/10 · {universityCount} {universityCount === 1 ? "university" : "universities"} = +{universityCount * 20} RP</div>
        </div>

        {activeResearch && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#0a0f1a", borderRadius: "8px", border: "1px solid #c084fc30", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "#64748b" }}>Researching</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#c084fc" }}>{TECH_TREE[activeResearch]?.icon} {TECH_TREE[activeResearch]?.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#fbbf24", fontFamily: "monospace" }}>{researchProgress}/{TECH_TREE[activeResearch]?.cost} RP</div>
            <div style={{ width: "80px", height: "4px", background: "#1a2a4a", borderRadius: "2px", marginTop: "3px" }}>
              <div style={{ width: `${Math.min(100, (researchProgress / TECH_TREE[activeResearch]?.cost) * 100)}%`, height: "100%", background: "#c084fc", borderRadius: "2px" }} />
            </div>
          </div>
        </div>}

        <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "16px", marginBottom: "16px", border: "1px solid #1a2a4a", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#e2e8f0", fontFamily: "monospace", lineHeight: 1.6 }}>{q.question}</div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <input value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="Your answer" style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} autoFocus />
        </div>

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onSubmit} style={{ ...S.popupBtn, flex: 1, textAlign: "center", background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}>✓ Submit</button>
          <button onClick={onClose} style={{ padding: "10px 16px", borderRadius: "10px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: "12px", fontFamily: "inherit" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
