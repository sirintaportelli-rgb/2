import React from "react";
import { S } from "../styles";

// Shared chrome for the four once-per-game higher-order events (power fault, worker
// shortage, pipe blockage, district cut off). Each is a two-phase popup: phase 1 is
// an Analysis numeric input, phase 2 is an Evaluation multiple-choice. Everything
// that differs between events is passed in: accent colours + icon, label, the
// scenario box content, the analysis question, the input placeholder, the options,
// the evaluation prompt, and the footer hints. State and handlers stay in the parent.
export default function HigherOrderEvent({
  drag, accent, label, phase, difficulty,
  scenario, question, placeholder, answer, setAnswer, onCheckAnalysis,
  evalPrompt, options, evalChoice, setEvalChoice, onSubmitEvaluation,
  feedback, setFeedback, footerAnalysis, footerEvaluation,
}) {
  const diffBadge = {
    bg: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20",
    color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24",
    border: difficulty === "easy" ? "#22c55e40" : difficulty === "hard" ? "#ef444440" : "#f59e0b40",
    label: difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard" : "🟡 Medium",
  };
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "500px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>{phase === 1 ? accent.icon : "🧠"}</div>
          <div style={{ ...S.popupBadge, background: accent.badgeBg, borderColor: accent.badgeBorder, color: accent.badgeColor }}>
            {label} · {phase === 1 ? "ANALYSIS" : "EVALUATION"}
          </div>
        </div>

        {/* Scenario */}
        <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "14px", border: `1px solid ${accent.scenarioBorder}`, position: "relative" }}>
          {scenario}
        </div>

        {phase === 1 ? <>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginBottom: "10px", fontSize: "10px", fontWeight: 700, position: "relative", background: diffBadge.bg, color: diffBadge.color, border: `1px solid ${diffBadge.border}` }}>
            {diffBadge.label}
          </div>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            {question}
          </p>
          <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && answer && onCheckAnalysis()}
            placeholder={placeholder}
            style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none", marginBottom: "12px" }} />
        </> : <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            <strong style={{ color: "#a5b4fc" }}>Evaluate.</strong> {evalPrompt}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px", position: "relative" }}>
            {options.map(opt => {
              const sel = evalChoice === opt.id;
              return (
                <button key={opt.id} onClick={() => { setEvalChoice(opt.id); setFeedback(null); }} style={{
                  textAlign: "left", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", lineHeight: 1.4,
                  border: sel ? "2px solid #a5b4fc" : "2px solid #1a2a4a", background: sel ? "#a5b4fc15" : "#080f1e", color: sel ? "#e2e8f0" : "#94a3b8",
                }}>{opt.text}</button>
              );
            })}
          </div>
        </>}

        {feedback && (
          <div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, lineHeight: 1.4, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>
            {feedback.msg}
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          {phase === 1 ? (
            <button onClick={onCheckAnalysis} disabled={!answer} style={{ ...S.popupBtn, flex: 1, textAlign: "center", opacity: answer ? 1 : 0.4, cursor: answer ? "pointer" : "not-allowed" }}>✓ Submit Analysis</button>
          ) : (
            <button onClick={onSubmitEvaluation} disabled={evalChoice == null} style={{ ...S.popupBtn, flex: 1, textAlign: "center", opacity: evalChoice != null ? 1 : 0.4, cursor: evalChoice != null ? "pointer" : "not-allowed" }}>✓ Submit Evaluation</button>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>
          {phase === 1 ? footerAnalysis : footerEvaluation}
        </div>
      </div>
    </div>
  );
}
