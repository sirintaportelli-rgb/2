import { checkRoadAnswer } from "./roads.js";
function ok(c, m) { if (!c) { console.error("FAIL", m); process.exit(1); } }
// Sloped road through (0,0)-(2,4): m=2, c=0
const sloped = { mc1: { x: 0, y: 0 }, mc2: { x: 2, y: 4 }, gradient: 2, yIntercept: 0 };
ok(checkRoadAnswer(sloped, 1, "2").correct, "t1 gradient exact");
ok(checkRoadAnswer(sloped, 1, "2.02").correct, "t1 gradient within tolerance");
ok(!checkRoadAnswer(sloped, 1, "3").correct, "t1 gradient wrong");
ok(checkRoadAnswer(sloped, 2, "y=2x+0").correct, "t2 equation");
ok(!checkRoadAnswer(sloped, 2, "y=5x+1").correct, "t2 equation wrong");
const p3 = checkRoadAnswer(sloped, 3, "-0.5");
ok(p3.correct && p3.perpGradient === -0.5, "t3 perpendicular gradient");
ok(!checkRoadAnswer(sloped, 3, "2").correct, "t3 perpendicular wrong");
const t4 = checkRoadAnswer(sloped, 4, "2x-1y+0=0");
ok(t4.correct && t4.coeffs.a === 2 && t4.coeffs.b === -1 && t4.coeffs.cc === 0, "t4 ax+by+c=0 simplified");
// Vertical road x=3: dx=0
const vert = { mc1: { x: 3, y: 0 }, mc2: { x: 3, y: 5 }, gradient: Infinity, yIntercept: 0 };
ok(checkRoadAnswer(vert, 1, "undefined").correct, "t1 vertical undefined");
ok(checkRoadAnswer(vert, 1, "inf").correct, "t1 vertical inf");
const vp3 = checkRoadAnswer(vert, 3, "0");
ok(vp3.correct && vp3.perpGradient === 0, "t3 perpendicular of vertical is 0");
console.log("roads engine tests passed");
