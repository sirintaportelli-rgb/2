// Road challenge answer-checking — pure. Given the pending road (two grid points
// plus its gradient / y-intercept), the question type, and the player's raw answer
// string, decide whether it is correct. Returns { correct } plus, where the caller
// needs them, perpGradient (type 3) and coeffs (type 4) so the component can build
// its feedback without re-deriving the maths.
//   1: gradient   2: equation y = mx + c   3: perpendicular gradient   4: ax+by+c=0
export function checkRoadAnswer(pendingRoad, questionType, rawAnswer) {
  const { mc1, mc2, gradient, yIntercept } = pendingRoad;
  const dx = mc2.x - mc1.x;
  const dy = mc2.y - mc1.y;

  if (questionType === 1) {
    const ans = parseFloat(rawAnswer);
    const correctVal = dx === 0 ? Infinity : dy / dx;
    if (dx === 0 && (rawAnswer.toLowerCase().includes("undef") || rawAnswer.toLowerCase().includes("inf"))) return { correct: true };
    if (!isNaN(ans) && Math.abs(ans - correctVal) < 0.05) return { correct: true };
    return { correct: false };
  }

  if (questionType === 2) {
    const ans = rawAnswer.replace(/\s/g, "").toLowerCase();
    const m = gradient, c = yIntercept;
    let correct = false;
    if (dx === 0 && ans.includes(`x=${mc1.x}`)) correct = true;
    else if (dx !== 0) {
      const mStr = m % 1 === 0 ? String(m) : m.toFixed(2);
      const cStr = c % 1 === 0 ? String(Math.abs(c)) : Math.abs(c).toFixed(2);
      const expected = `y=${mStr}x${c >= 0 ? "+" : "-"}${cStr}`;
      if (ans === expected || ans === expected.replace("+", "")) correct = true;
      const ansM = parseFloat(ans.match(/y=([0-9.-]+)x/)?.[1]);
      const ansC = parseFloat(ans.match(/x([+-][0-9.]+)/)?.[1]);
      if (!isNaN(ansM) && !isNaN(ansC) && Math.abs(ansM - m) < 0.05 && Math.abs(ansC - c) < 0.5) correct = true;
    }
    return { correct };
  }

  if (questionType === 3) {
    const ans = parseFloat(rawAnswer);
    let perpGradient;
    if (gradient === 0) perpGradient = "vertical";
    else if (gradient === Infinity) perpGradient = 0;
    else perpGradient = -1 / gradient;
    if (perpGradient === "vertical" && (rawAnswer.toLowerCase().includes("undef") || rawAnswer.toLowerCase().includes("inf"))) return { correct: true, perpGradient };
    if (typeof perpGradient === "number" && !isNaN(ans) && Math.abs(ans - perpGradient) < 0.1) return { correct: true, perpGradient };
    return { correct: false, perpGradient };
  }

  if (questionType === 4) {
    const ans = rawAnswer.replace(/\s/g, "").toLowerCase();
    let a, b, cc;
    if (dx === 0) { a = 1; b = 0; cc = -mc1.x; }
    else {
      a = dy; b = -dx; cc = dx * mc1.y - dy * mc1.x;
      const gcd2 = (x, y) => y === 0 ? Math.abs(x) : gcd2(y, x % y);
      const g = [a, b, cc].reduce((acc, v) => gcd2(acc, Math.abs(v)));
      if (g > 0) { a /= g; b /= g; cc /= g; }
      if (a < 0) { a = -a; b = -b; cc = -cc; }
    }
    const expected = `${a}x${b >= 0 ? "+" : ""}${b}y${cc >= 0 ? "+" : ""}${cc}=0`;
    const expectedAlt = `${a}x${b >= 0 ? "+" : ""}${b}y${cc >= 0 ? "+" : ""}${cc}`;
    const correct = (ans === expected || ans === expectedAlt || ans === expected.replace(/\+/g, "") || ans + "=0" === expected);
    return { correct, coeffs: { a, b, cc } };
  }

  return { correct: false };
}
