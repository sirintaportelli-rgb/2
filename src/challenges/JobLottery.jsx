import React from "react";
import { S } from "../styles";

// Job sector lottery (the spinning-ball economy randomiser). Presentational: the
// parent owns the timer/ball state and passes it in, plus onSpin / onAccept.
export default function JobLottery({
  drag, jobResult, civics, jobBarSections, jobBallPos, jobTimerRunning, jobTimeLeft,
  demographics, onSpin, onAccept,
}) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "480px", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "12px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>💼</div>
          <div style={{ ...S.popupBadge, background: "#eab30820", borderColor: "#eab30840", color: "#eab308" }}>
            {jobResult ? "JOB SECTOR RESULT" : "JOB SECTOR LOTTERY"}
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "6px", textAlign: "center", position: "relative" }}>
          {jobResult
            ? `Your city's economy is dominated by the ${jobResult.dominant} sector!`
            : "What type of economy will your city develop? The ball decides your fate!"}
        </p>

        {civics === "technologist" && !jobResult && (
          <div style={{ textAlign: "center", fontSize: "10px", color: "#c084fc", marginBottom: "12px", fontWeight: 600, position: "relative" }}>
            ⚡ Technologist bonus: Tertiary sector has 50% probability
          </div>
        )}

        {/* The bar */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          {/* Section labels above */}
          <div style={{ display: "flex", marginBottom: "4px", position: "relative" }}>
            {jobBarSections.map(s => (
              <div key={s.id} style={{ flex: s.end - s.start, textAlign: "center", fontSize: "9px", fontWeight: 700, color: s.color }}>
                {s.label} ({Math.round((s.end - s.start) * 100)}%)
              </div>
            ))}
          </div>

          {/* Bar */}
          <div style={{ display: "flex", height: "60px", borderRadius: "12px", overflow: "hidden", border: "2px solid #2a3a5e", position: "relative" }}>
            {jobBarSections.map(s => (
              <div key={s.id} style={{
                flex: s.end - s.start,
                background: `linear-gradient(180deg, ${s.color}cc 0%, ${s.color}88 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRight: s.id !== "tertiary" ? "2px solid #1a2a4a" : "none",
                transition: "opacity 0.3s",
                opacity: jobResult ? (jobResult.dominant === s.id ? 1 : 0.3) : 1,
              }}>
                <span style={{ fontSize: "16px", fontWeight: 900, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                  {s.id === "primary" ? "🏭" : s.id === "secondary" ? "🔧" : "💻"}
                </span>
              </div>
            ))}

            {/* Ball */}
            <div style={{
              position: "absolute", top: "50%", left: `${jobBallPos * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "28px", height: "28px", borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #fff 0%, #e2e8f0 40%, #94a3b8 100%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)",
              border: "2px solid #fff",
              transition: jobTimerRunning ? "left 0.05s linear" : "left 0.3s ease-out",
              zIndex: 2,
            }} />
          </div>

          {/* Timer bar */}
          {!jobResult && (
            <div style={{ marginTop: "8px", height: "6px", background: "#1a2a4a", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: jobTimeLeft > 0.5 ? "#22c55e" : jobTimeLeft > 0.2 ? "#eab308" : "#ef4444", borderRadius: "3px", width: `${(jobTimeLeft / 1) * 100}%`, transition: "width 0.1s linear" }} />
            </div>
          )}
          {!jobResult && <div style={{ textAlign: "center", marginTop: "4px", fontSize: "20px", fontWeight: 900, color: jobTimeLeft > 0.5 ? "#22c55e" : jobTimeLeft > 0.2 ? "#eab308" : "#ef4444", fontFamily: "monospace", position: "relative" }}>
            {jobTimerRunning ? jobTimeLeft.toFixed(1) + "s" : "Ready"}
          </div>}
        </div>

        {/* Result display */}
        {jobResult && (
          <div style={{ background: "#0a0f1a", borderRadius: "12px", padding: "16px", border: "1px solid #1a2a4a", marginBottom: "16px", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: 800, color: jobBarSections.find(s => s.id === jobResult.dominant)?.color }}>
                {jobResult.dominant === "primary" ? "🏭 Primary" : jobResult.dominant === "secondary" ? "🔧 Secondary" : "💻 Tertiary"} sector dominates at 60%
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["primary", "secondary", "tertiary"].map(s => {
                const section = jobBarSections.find(b => b.id === s);
                const pct = jobResult.split[s];
                const count = Math.round(demographics.adults * pct / 100);
                return (
                  <div key={s} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: `${section.color}15`, border: `1px solid ${section.color}40`, textAlign: "center" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: section.color }}>{s === "primary" ? "🏭 Primary" : s === "secondary" ? "🔧 Secondary" : "💻 Tertiary"}</div>
                    <div style={{ fontSize: "24px", fontWeight: 900, color: section.color, fontFamily: "monospace" }}>{pct}%</div>
                    <div style={{ fontSize: "9px", color: "#94a3b8" }}>{count} workers</div>
                    <div style={{ fontSize: "8px", color: "#64748b", marginTop: "2px" }}>{s === "primary" ? "Farming, Mining" : s === "secondary" ? "Manufacturing" : "Services, Tech"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Probability explanation */}
        {!jobResult && !jobTimerRunning && (
          <div style={{ background: "#1a2a4a40", borderRadius: "8px", padding: "8px 10px", marginBottom: "12px", fontSize: "9px", color: "#c084fc", fontFamily: "monospace", lineHeight: 1.5, position: "relative" }}>
            💡 Probability: Each section's width = its probability.<br />
            {civics === "technologist"
              ? "Technologist civic: P(Tertiary) = 0.50, P(Primary) = P(Secondary) = 0.25"
              : "Equal distribution: P(Primary) = P(Secondary) = P(Tertiary) = 0.33"}
            <br />The ball moves randomly — where it stops is weighted by section size.
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
          {!jobTimerRunning && !jobResult && (
            <button onClick={onSpin} style={{ ...S.popupBtn, flex: 1, textAlign: "center", background: "linear-gradient(135deg, #eab308, #ca8a04)" }}>
              🎲 Spin!
            </button>
          )}
          {jobResult && (
            <button onClick={onAccept} style={{ ...S.popupBtn, flex: 1, textAlign: "center" }}>
              Accept &amp; Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
