import React from "react";
import { S } from "../styles";

// Curved-road challenge (hard). Phase 0 finds y = Ax^2 + B from two points
// (simultaneous equations); phase 1 linearises y - B = Ax^2 with logs; phase 2 asks
// domain and range. Presentational: the parent owns the two answer objects, the
// precomputed A/B on pendingCurved, the checker, and the skip/cancel handlers.
export default function CurvedRoadCalc({
  drag, pendingCurved, phase, answersAB, setAnswersAB, bonusAnswers, setBonusAnswers,
  onSubmit, feedback, attempts, onSkip, onCancel,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "520px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>🟣</div>
          <div style={{ ...S.popupBadge, background: "#c084fc20", borderColor: "#c084fc40", color: "#c084fc" }}>
            {phase === 0 ? "CURVED ROAD — QUADRATIC" : phase === 1 ? "BONUS — LINEARISATION" : "BONUS — DOMAIN & RANGE"}
          </div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: "#ef444420", color: "#fca5a5" }}>🔴 Hard{phase > 0 && ` — Bonus ${phase}/2`}</div>
        </div>

        {/* Phase progress */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px", position: "relative" }}>
          {[{ n: 0, l: "Find A & B" }, { n: 1, l: "Linearise (logs)" }, { n: 2, l: "Domain & Range" }].map(s => (
            <div key={s.n} style={{
              flex: 1, padding: "5px", borderRadius: "6px", textAlign: "center", fontSize: "9px", fontWeight: 700,
              background: phase === s.n ? "#c084fc20" : phase > s.n ? "#4ade8020" : "#1a2a4a",
              border: `1px solid ${phase === s.n ? "#c084fc" : phase > s.n ? "#4ade80" : "#2a3a5e"}`,
              color: phase === s.n ? "#c084fc" : phase > s.n ? "#4ade80" : "#475569",
            }}>{phase > s.n ? "✓ " : ""}{s.l}</div>
          ))}
        </div>

        {/* Phase 0: Find A and B */}
        {phase === 0 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
            Your curved road passes through two points. Find the equation in the form <strong style={{ color: "#c084fc" }}>y = Ax² + B</strong>.
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #c084fc30", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Points on the curve</div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "#1a2a4a40", textAlign: "center" }}>
                <div style={{ fontSize: "9px", color: "#64748b" }}>Point 1</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#c084fc", fontFamily: "monospace" }}>({pendingCurved.mc1.x}, {pendingCurved.mc1.y})</div>
              </div>
              <div style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "#1a2a4a40", textAlign: "center" }}>
                <div style={{ fontSize: "9px", color: "#64748b" }}>Point 2</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#c084fc", fontFamily: "monospace" }}>({pendingCurved.mc2.x}, {pendingCurved.mc2.y})</div>
              </div>
            </div>
            <div style={{ marginTop: "10px", padding: "8px", borderRadius: "6px", background: "#c084fc08", border: "1px solid #c084fc20", fontSize: "9px", color: "#a78bfa", fontFamily: "monospace", lineHeight: 1.6 }}>
              💡 Simultaneous equations:<br />
              {pendingCurved.mc1.y} = A({pendingCurved.mc1.x})² + B &nbsp;... ①<br />
              {pendingCurved.mc2.y} = A({pendingCurved.mc2.x})² + B &nbsp;... ②<br />
              Subtract to eliminate B, find A, then B
            </div>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#c084fc", textAlign: "center", fontFamily: "monospace", marginBottom: "16px", position: "relative" }}>y = <span style={{ color: "#facc15" }}>A</span>x² + <span style={{ color: "#22d3ee" }}>B</span></div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px", position: "relative" }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", display: "block", marginBottom: "4px" }}>A =</label><input value={answersAB.a} onChange={e => setAnswersAB(p => ({ ...p, a: e.target.value }))} onKeyDown={e => e.key === "Enter" && answersAB.b && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: "11px", fontWeight: 700, color: "#22d3ee", display: "block", marginBottom: "4px" }}>B =</label><input value={answersAB.b} onChange={e => setAnswersAB(p => ({ ...p, b: e.target.value }))} onKeyDown={e => e.key === "Enter" && answersAB.a && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div>
          </div>
        </>}

        {/* Phase 1: Linearisation using logs */}
        {phase === 1 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            Your road equation is <strong style={{ color: "#c084fc" }}>y = {pendingCurved.A.toFixed(3)}x² + {pendingCurved.B.toFixed(2)}</strong>.
            Linearise the relationship <strong style={{ color: "#facc15" }}>y − B = Ax²</strong> using logarithms to express it in the form <strong style={{ color: "#4ade80" }}>Y = mX + c</strong>.
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #c084fc30", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Linearisation</div>
            <div style={{ fontSize: "12px", color: "#e2e8f0", fontFamily: "monospace", lineHeight: 1.8 }}>
              y − B = Ax²<br />
              <span style={{ color: "#64748b" }}>Take log₁₀ of both sides:</span><br />
              log(y − B) = log(A) + 2·log(x)<br />
              <span style={{ color: "#64748b" }}>Let Y = log(y − B), X = log(x):</span><br />
              <strong style={{ color: "#4ade80" }}>Y = mX + c</strong>
            </div>
            <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: "#4ade8010", border: "1px solid #4ade8030", fontSize: "9px", color: "#4ade80", fontFamily: "monospace" }}>
              💡 The power of x² becomes the gradient m. The log of A becomes the y-intercept c.
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px", position: "relative" }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", display: "block", marginBottom: "4px" }}>m (gradient) =</label><input value={bonusAnswers.m} onChange={e => setBonusAnswers(p => ({ ...p, m: e.target.value }))} onKeyDown={e => e.key === "Enter" && bonusAnswers.c && onSubmit()} placeholder="?" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: "11px", fontWeight: 700, color: "#22d3ee", display: "block", marginBottom: "4px" }}>c (y-intercept) =</label><input value={bonusAnswers.c} onChange={e => setBonusAnswers(p => ({ ...p, c: e.target.value }))} onKeyDown={e => e.key === "Enter" && bonusAnswers.m && onSubmit()} placeholder={`log₁₀(${Math.abs(pendingCurved.A).toFixed(3)})`} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "20px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} /></div>
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", textAlign: "center", marginBottom: "12px" }}>🎯 Bonus question — +§50,000 reward</div>
        </>}

        {/* Phase 2: Domain and range */}
        {phase === 2 && <>
          <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "12px", position: "relative" }}>
            Your curved road <strong style={{ color: "#c084fc" }}>y = {pendingCurved.A.toFixed(3)}x² + {pendingCurved.B.toFixed(2)}</strong> runs between the two endpoints. What are the <strong style={{ color: "#facc15" }}>domain</strong> and <strong style={{ color: "#22d3ee" }}>range</strong>?
          </p>
          <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "16px", border: "1px solid #c084fc30", position: "relative" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Endpoints</div>
            <div style={{ display: "flex", gap: "12px", fontSize: "13px", fontFamily: "monospace", fontWeight: 700 }}>
              <span style={{ color: "#c084fc" }}>({pendingCurved.mc1.x}, {pendingCurved.mc1.y})</span>
              <span style={{ color: "#64748b" }}>→</span>
              <span style={{ color: "#c084fc" }}>({pendingCurved.mc2.x}, {pendingCurved.mc2.y})</span>
            </div>
            <div style={{ marginTop: "10px", padding: "6px 8px", borderRadius: "6px", background: "#f59e0b10", border: "1px solid #f59e0b30", fontSize: "9px", color: "#f59e0b", fontFamily: "monospace", lineHeight: 1.6 }}>
              💡 Domain = set of valid x-values (between endpoints)<br />
              Range = set of y-values the curve takes{Math.min(pendingCurved.mc1.x, pendingCurved.mc2.x) <= 0 && Math.max(pendingCurved.mc1.x, pendingCurved.mc2.x) >= 0 ? " (check vertex at x=0!)" : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", position: "relative" }}>
            <div style={{ flex: 1, background: "#0a0f1a", borderRadius: "8px", padding: "10px", border: "1px solid #facc1530" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#facc15", marginBottom: "8px" }}>Domain (x-values)</div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input value={bonusAnswers.domMin} onChange={e => setBonusAnswers(p => ({ ...p, domMin: e.target.value }))} placeholder="min" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
                <span style={{ color: "#64748b", fontSize: "12px" }}>≤ x ≤</span>
                <input value={bonusAnswers.domMax} onChange={e => setBonusAnswers(p => ({ ...p, domMax: e.target.value }))} placeholder="max" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
            </div>
            <div style={{ flex: 1, background: "#0a0f1a", borderRadius: "8px", padding: "10px", border: "1px solid #22d3ee30" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#22d3ee", marginBottom: "8px" }}>Range (y-values)</div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input value={bonusAnswers.ranMin} onChange={e => setBonusAnswers(p => ({ ...p, ranMin: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="min" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
                <span style={{ color: "#64748b", fontSize: "12px" }}>≤ y ≤</span>
                <input value={bonusAnswers.ranMax} onChange={e => setBonusAnswers(p => ({ ...p, ranMax: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="max" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", textAlign: "center", marginBottom: "12px" }}>🎯 Bonus question — +§100,000 reward</div>
        </>}

        {feedback && (<div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative", background: feedback.type === "success" ? "#4ade8015" : "#ef444415", border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`, color: feedback.type === "success" ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>)}
        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          <button onClick={onSubmit} style={{ ...S.popupBtn, flex: 1, textAlign: "center", background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}>
            {phase === 0 ? "✓ Submit Equation" : phase === 1 ? "✓ Submit Linearisation" : "✓ Submit Domain & Range"}
          </button>
          {phase > 0 && <button onClick={onSkip} style={{ padding: "10px 16px", borderRadius: "10px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: "12px", fontFamily: "inherit" }}>Skip Bonus</button>}
          {phase === 0 && <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: "12px", fontFamily: "inherit" }}>Cancel</button>}
        </div>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
