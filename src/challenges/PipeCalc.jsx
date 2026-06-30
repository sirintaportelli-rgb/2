import React from "react";
import { S } from "../styles";
import { PIPE_SPECS } from "../data/content";
import { METERS_PER_CELL } from "../constants";

// Pipe calculation challenge. Easy/medium walk three steps (distance h, volume V,
// flow rate Q); hard is a single related-rates question (step 4). Presentational:
// the parent owns pipeCalcAnswer (an object keyed h/v/q/dhdt), the step, and the
// checker; correct values are precomputed on pendingPipe.
export default function PipeCalc({
  drag, pendingPipe, difficulty, step, answer, setAnswer, onSubmit, feedback, attempts, calcMode, onCancel,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "520px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>{PIPE_SPECS[pendingPipe.type]?.icon}</div>
          <div style={{ ...S.popupBadge, background: "#22d3ee20", borderColor: "#22d3ee40", color: "#22d3ee" }}>PIPE CALCULATION</div>
          <div style={{ display: "inline-block", padding: "2px 10px", borderRadius: "6px", marginTop: "6px", fontSize: "10px", fontWeight: 700, background: difficulty === "easy" ? "#22c55e20" : difficulty === "hard" ? "#ef444420" : "#f59e0b20", color: difficulty === "easy" ? "#4ade80" : difficulty === "hard" ? "#fca5a5" : "#fbbf24" }}>
            {difficulty === "easy" ? "🟢 Easy" : difficulty === "hard" ? "🔴 Hard — Related Rates" : "🟡 Medium"}
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "16px", position: "relative" }}>
          {difficulty === "hard"
            ? <>Solve this <strong style={{ color: "#ef4444" }}>related rates</strong> problem to lay your {PIPE_SPECS[pendingPipe.type]?.label.toLowerCase()}.</>
            : <>Calculate the water flow through your {PIPE_SPECS[pendingPipe.type]?.label.toLowerCase()}.</>}
        </p>

        {/* Given values - only shown for easy/medium */}
        {difficulty !== "hard" && <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "12px", marginBottom: "16px", border: "1px solid #1a2a4a", position: "relative" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Given values</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px" }}>
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#1a2a4a40" }}>
              <div style={{ fontSize: "9px", color: "#64748b" }}>Start point</div>
              <div style={{ fontWeight: 700, color: "#22d3ee", fontFamily: "monospace" }}>({pendingPipe.x1}, {pendingPipe.y1})</div>
            </div>
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#1a2a4a40" }}>
              <div style={{ fontSize: "9px", color: "#64748b" }}>End point</div>
              <div style={{ fontWeight: 700, color: "#22d3ee", fontFamily: "monospace" }}>({pendingPipe.x2}, {pendingPipe.y2})</div>
            </div>
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#1a2a4a40" }}>
              <div style={{ fontSize: "9px", color: "#64748b" }}>Pipe radius (r)</div>
              <div style={{ fontWeight: 700, color: "#facc15", fontFamily: "monospace" }}>{pendingPipe.radiusCm} cm = {pendingPipe.rMeters} m</div>
            </div>
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#1a2a4a40" }}>
              <div style={{ fontSize: "9px", color: "#64748b" }}>Time (T)</div>
              <div style={{ fontWeight: 700, color: "#fb923c", fontFamily: "monospace" }}>{pendingPipe.timeSeconds} seconds</div>
            </div>
            <div style={{ padding: "6px 8px", borderRadius: "6px", background: "#1a2a4a40", gridColumn: "span 2" }}>
              <div style={{ fontSize: "9px", color: "#64748b" }}>Grid scale</div>
              <div style={{ fontWeight: 700, color: "#94a3b8", fontFamily: "monospace" }}>1 cell = {METERS_PER_CELL}m</div>
            </div>
          </div>
        </div>}

        {/* Step progress */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px", position: "relative" }}>
          {(difficulty === "hard" ? [{ n: 4, l: "Related Rates" }] : [{ n: 1, l: "Distance (h)" }, { n: 2, l: "Volume (V)" }, { n: 3, l: "Flow Rate (Q)" }]).map(s => (
            <div key={s.n} style={{
              flex: 1, padding: "6px", borderRadius: "6px", textAlign: "center", fontSize: "10px", fontWeight: 700,
              background: step === s.n ? "#22d3ee20" : step > s.n ? "#4ade8020" : "#1a2a4a",
              border: `1px solid ${step === s.n ? "#22d3ee" : step > s.n ? "#4ade80" : "#2a3a5e"}`,
              color: step === s.n ? "#22d3ee" : step > s.n ? "#4ade80" : "#475569",
            }}>{step > s.n ? "✓ " : ""}{s.l}</div>
          ))}
        </div>

        {/* Current step input */}
        <div style={{ marginBottom: "16px", position: "relative" }}>
          {step === 1 && <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#22d3ee", marginBottom: "4px" }}>Step 1: Calculate the pipe length (h) in metres</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "8px", fontFamily: "monospace" }}>h = √((x₂−x₁)² + (y₂−y₁)²) × {METERS_PER_CELL}</div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#22d3ee" }}>h =</span>
              <input value={answer.h} onChange={e => setAnswer(p => ({ ...p, h: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="metres" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              <span style={{ fontSize: "12px", color: "#64748b" }}>m</span>
            </div>
          </div>}
          {step === 2 && <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", marginBottom: "4px" }}>Step 2: Calculate the volume (V) of the cylindrical pipe</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px", fontFamily: "monospace" }}>V = π × r² × h</div>
            <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "8px" }}>r = {pendingPipe.rMeters}m, h = {pendingPipe.lengthM.toFixed(1)}m</div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#facc15" }}>V =</span>
              <input value={answer.v} onChange={e => setAnswer(p => ({ ...p, v: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="m³" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              <span style={{ fontSize: "12px", color: "#64748b" }}>m³</span>
            </div>
          </div>}
          {step === 3 && <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4ade80", marginBottom: "4px" }}>Step 3: Calculate the flow rate (Q)</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px", fontFamily: "monospace" }}>Q = V ÷ T</div>
            <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "8px" }}>V = {pendingPipe.volumeM3.toFixed(2)} m³, T = {pendingPipe.timeSeconds}s</div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#4ade80" }}>Q =</span>
              <input value={answer.q} onChange={e => setAnswer(p => ({ ...p, q: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="m³/s" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              <span style={{ fontSize: "12px", color: "#64748b" }}>m³/s</span>
            </div>
          </div>}
          {step === 4 && <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", marginBottom: "8px" }}>🔴 Hard: Related Rates</div>
            <div style={{ background: "#0a0f1a", borderRadius: "10px", padding: "14px", marginBottom: "14px", border: "1px solid #ef444440" }}>
              <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, margin: 0 }}>
                Water flows at a rate of <strong style={{ color: "#22d3ee" }}>600 cm³/s</strong> through a cylindrical tank.
              </p>
              <p style={{ fontSize: "13px", color: "#fb923c", fontWeight: 700, lineHeight: 1.6, margin: "8px 0 0" }}>
                How fast is the height of the water level changing when the radius of the cylinder is <strong style={{ color: "#facc15" }}>50 cm</strong>?
              </p>
            </div>
            <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "10px", marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Given</div>
              <div style={{ display: "flex", gap: "12px", fontSize: "12px", fontFamily: "monospace" }}>
                <span style={{ color: "#22d3ee" }}>dV/dt = 600 cm³/s</span>
                <span style={{ color: "#facc15" }}>r = 50 cm</span>
              </div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginTop: "10px", marginBottom: "6px" }}>Find</div>
              <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#fb923c" }}>dh/dt = ? cm/s</div>
            </div>
            <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", marginBottom: "14px", lineHeight: 1.6, background: "#c084fc10", border: "1px solid #c084fc30", borderRadius: "6px", padding: "8px" }}>
              💡 V = πr²h<br />
              Differentiate with respect to time:<br />
              dV/dt = πr² × dh/dt<br />
              Rearrange to find dh/dt
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#ef4444" }}>dh/dt =</span>
              <input value={answer.dhdt} onChange={e => setAnswer(p => ({ ...p, dhdt: e.target.value }))} onKeyDown={e => e.key === "Enter" && onSubmit()} placeholder="e.g. 0.0764" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "2px solid #1a2a4a", background: "#080f1e", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "monospace", textAlign: "center", outline: "none" }} />
              <span style={{ fontSize: "12px", color: "#64748b" }}>cm/s</span>
            </div>
          </div>}
        </div>
        {feedback && (
          <div style={{
            padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "12px", fontWeight: 600, position: "relative",
            background: feedback.type === "success" ? "#4ade8015" : "#ef444415",
            border: `1px solid ${feedback.type === "success" ? "#4ade8040" : "#ef444440"}`,
            color: feedback.type === "success" ? "#4ade80" : "#fca5a5",
          }}>{feedback.msg}</div>
        )}

        {attempts > 0 && <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", marginBottom: "8px", position: "relative" }}>Attempts: {attempts}</div>}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          <button onClick={onSubmit} style={{ ...S.popupBtn, flex: 1, textAlign: "center", background: step === 4 ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #22d3ee, #0891b2)" }}>{step === 4 ? "✓ Submit Answer" : `✓ Submit Step ${step}`}</button>
          <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "#1a2a4a", border: "1px solid #2a3a5e", color: "#94a3b8", cursor: "pointer", fontWeight: 600, fontSize: "12px", fontFamily: "inherit" }}>Cancel</button>
        </div>

        {!calcMode && <div style={{ textAlign: "center", marginTop: "10px", fontSize: "9px", color: "#f59e0b", position: "relative" }}>✏️ Calculator is OFF — show your working!</div>}
        <div style={{ textAlign: "center", marginTop: "6px", fontSize: "9px", color: "#475569", position: "relative" }}>⚠ Each wrong answer costs 10% of your treasury</div>
      </div>
    </div>
  );
}
