import React from "react";
import { S } from "../styles";

// Loci sketching intro. Presentational: receives the turbine radius and a single
// onStart callback (the parent owns the loci state it sets up).
export default function LociIntro({ windRadiusM, onStart }) {
  return (
    <div style={S.popupOverlay}>
      <div style={{ ...S.popup, maxWidth: "480px", textAlign: "left" }}>
        <div style={S.popupGlow} />
        <div style={{ textAlign: "center", marginBottom: "14px", position: "relative" }}>
          <div style={{ fontSize: "48px", marginBottom: "4px" }}>🧭</div>
          <div style={{ ...S.popupBadge, background: "#f59e0b20", borderColor: "#f59e0b40", color: "#fbbf24" }}>LOCI · CONSTRUCTION</div>
        </div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6, marginBottom: "10px", position: "relative" }}>
          A wind turbine powers everything within <strong style={{ color: "#facc15" }}>{windRadiusM} m</strong>. The set of all points exactly {windRadiusM} m from it forms a <strong style={{ color: "#a5b4fc" }}>locus</strong> — a circle of radius {windRadiusM} m around the turbine.
        </p>
        <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "14px", position: "relative" }}>
          Sketch that locus for the two highlighted turbines: click a turbine, then click a point on the edge of its range. The live readout shows your radius — aim for {windRadiusM} m. Buildings placed inside the circle count as powered.
        </p>
        <button onClick={onStart} style={{ ...S.popupBtn, width: "100%", textAlign: "center", position: "relative" }}>✏️ Start sketching</button>
      </div>
    </div>
  );
}
