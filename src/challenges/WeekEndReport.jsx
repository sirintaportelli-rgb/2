import React from "react";
import { S } from "../styles";
import { GENERATORS, HOUSING_TYPES, GOODS_BUILDINGS } from "../data/content";

// End-of-Week 1 report. Presentational: it receives the city snapshot and a single
// onClose callback. The draggable wiring is passed in as `drag`.
export default function WeekEndReport({
  drag, onClose, happiness, coins, totalPop, demographics, research,
  energyBalance, powerCap, energyConsumption, placed, cityLevel, energyCount,
  placedPipes, placedRoads, heoStats,
}) {
  const homes = Object.values(placed).filter(p => HOUSING_TYPES[p.type]).length;
  const biz = Object.values(placed).filter(p => GOODS_BUILDINGS[p.type]).length;
  const co2 = Object.values(placed).reduce((s, b) => s + (GENERATORS[b.type]?.co2 || 0), 0);
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "540px", textAlign: "left", ...drag.style }}>
        <div {...drag.handleProps} style={{ ...S.dragHandle, ...drag.handleProps.style }}><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /><span style={S.dragDots} /></div>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "14px", position: "relative" }}>
          <div style={{ fontSize: "52px", marginBottom: "4px" }}>🗓️</div>
          <div style={{ ...S.popupBadge, background: "#4ade8020", borderColor: "#4ade8040", color: "#86efac" }}>END OF WEEK 1</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "8px 0 4px", position: "relative" }}>Week 1 Complete!</h2>
          <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5, position: "relative" }}>
            You've finished all of Week 1's challenges. City status:{" "}
            <strong style={{ color: happiness >= 75 ? "#4ade80" : happiness >= 50 ? "#fbbf24" : "#fca5a5" }}>
              {happiness >= 75 ? "Thriving" : happiness >= 50 ? "Stable" : "Struggling"}
            </strong>
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px", position: "relative" }}>
          {[
            { icon: "💰", label: "Treasury", value: `§${coins.toLocaleString()}` },
            { icon: "👥", label: "Population", value: `${totalPop}`, sub: `${demographics.adults}A · ${demographics.children}C · ${demographics.elderly}E` },
            { icon: "😊", label: "Satisfaction", value: `${Math.round(happiness)}%` },
            { icon: "🔬", label: "Research", value: `${research} RP` },
            { icon: "⚡", label: "Power balance", value: `${energyBalance >= 0 ? "+" : ""}${energyBalance}`, sub: `${powerCap} cap · ${energyConsumption} demand` },
            { icon: "🌍", label: "CO₂ output", value: `${co2}` },
            { icon: "🏙️", label: "City level", value: `${cityLevel}` },
            { icon: "🏗️", label: "Buildings", value: `${energyCount + homes + biz}`, sub: `${energyCount} gen · ${homes} homes · ${biz} biz` },
            { icon: "🚰", label: "Infrastructure", value: `${placedPipes.length + placedRoads.length}`, sub: `${placedPipes.length} pipes · ${placedRoads.length} roads` },
          ].map((s, i) => (
            <div key={i} style={{ flex: "1 1 30%", minWidth: "140px", background: "#0a0f1a", border: "1px solid #1a2a4a", borderRadius: "10px", padding: "10px 12px" }}>
              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: "16px", color: "#e2e8f0", fontWeight: 800, marginTop: "2px" }}>{s.value}</div>
              {s.sub && <div style={{ fontSize: "9px", color: "#475569", marginTop: "1px", fontFamily: "monospace" }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        <div style={{ background: "#a855f715", border: "1px solid #a855f740", borderRadius: "10px", padding: "10px 12px", marginBottom: "10px", position: "relative" }}>
          <div style={{ fontSize: "12px", color: "#d8b4fe", lineHeight: 1.5, fontWeight: 700 }}>🧠 Higher-order challenges (analysis &amp; evaluation)</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.5, marginTop: "2px" }}>
            {heoStats.faced === 0 ? "None came up this week — keep playing to face power, water, road and workforce dilemmas." : `Solved ${heoStats.solved} of ${heoStats.faced} — ${heoStats.perfect} on the first try${heoStats.faced - heoStats.perfect > 0 ? `, ${heoStats.faced - heoStats.perfect} needed another go` : ""}.`}
          </div>
        </div>
        <div style={{ background: "#1882c815", border: "1px solid #1882c840", borderRadius: "10px", padding: "10px 12px", marginBottom: "14px", position: "relative" }}>
          <div style={{ fontSize: "12px", color: "#7dd3fc", lineHeight: 1.5, fontWeight: 600 }}>📦 This is the end of the demo.</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.5, marginTop: "2px" }}>In the full game, Week 2 unlocks new districts, a fresh budget, and tougher engineering and maths challenges.</div>
        </div>

        <button onClick={onClose} style={{ ...S.popupBtn, width: "100%", textAlign: "center", position: "relative" }}>🏗️ Keep building (sandbox) →</button>
      </div>
    </div>
  );
}
