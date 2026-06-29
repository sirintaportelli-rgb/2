import { useState, useEffect, useRef, useCallback } from "react";
import STEMCityCreator from "./STEMCityCreator";
import STEMCityTerrain from "./STEMCityTerrain";
import { createMenuMusic, playClickSound } from "./MusicEngine";

const LandingSVG = () => (
<svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
<defs>
<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1882c8"/><stop offset="30%" stopColor="#4aace0"/><stop offset="60%" stopColor="#80ccf0"/><stop offset="100%" stopColor="#c0e8fa"/></linearGradient>
<linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a9a3a"/><stop offset="100%" stopColor="#387828"/></linearGradient>
</defs>
<rect width="680" height="420" fill="url(#sk)"/>
<circle cx="570" cy="65" r="32" fill="#fff8d0" opacity="0.9"/><circle cx="570" cy="65" r="40" fill="#fff8d0" opacity="0.12"/><circle cx="570" cy="65" r="52" fill="#fff8d0" opacity="0.05"/>
<g stroke="#fff8d0" strokeWidth="0.8" opacity="0.08"><line x1="570" y1="15" x2="570" y2="0"/><line x1="605" y1="30" x2="618" y2="18"/><line x1="620" y1="65" x2="635" y2="65"/><line x1="605" y1="100" x2="618" y2="112"/><line x1="535" y1="30" x2="522" y2="18"/><line x1="520" y1="65" x2="505" y2="65"/><line x1="535" y1="100" x2="522" y2="112"/></g>
<g fill="#fff"><ellipse cx="90" cy="55" rx="40" ry="13" opacity="0.8"/><ellipse cx="110" cy="50" rx="28" ry="11" opacity="0.7"/><ellipse cx="70" cy="52" rx="22" ry="9" opacity="0.6"/><ellipse cx="300" cy="40" rx="50" ry="14" opacity="0.7"/><ellipse cx="320" cy="35" rx="32" ry="11" opacity="0.6"/><ellipse cx="280" cy="38" rx="25" ry="9" opacity="0.5"/><ellipse cx="460" cy="80" rx="30" ry="9" opacity="0.4"/><ellipse cx="660" cy="42" rx="25" ry="8" opacity="0.3"/></g>
<path d="M0,215 Q50,175 100,200 Q150,225 200,190 Q250,155 300,185 Q350,215 400,175 Q450,135 500,180 Q550,225 600,185 Q650,150 680,180 L680,295 L0,295Z" fill="#80aa70" opacity="0.35"/>
<path d="M0,245 Q55,205 110,235 Q165,265 220,225 Q275,185 330,220 Q385,255 440,215 Q495,175 550,225 Q605,275 660,235 L680,240 L680,295 L0,295Z" fill="#60994a" opacity="0.45"/>
<path d="M0,270 Q40,248 80,262 Q120,276 160,255 Q200,234 240,258 Q280,282 320,260 Q360,238 400,265 Q440,292 480,262 Q520,232 560,265 Q600,298 640,270 Q660,258 680,268 L680,310 L0,310Z" fill="#4a8a3a" opacity="0.55"/>
<text x="180" y="200" fill="#2a5a1a" fontFamily="monospace" fontSize="8" opacity="0.15" transform="rotate(-6,180,200)">y = sin(x)</text>
<text x="480" y="170" fill="#2a5a1a" fontFamily="monospace" fontSize="7" opacity="0.12" transform="rotate(4,480,170)">y = cos(x)</text>
<rect x="0" y="295" width="680" height="125" fill="url(#gr)"/>
<g opacity="0.05" stroke="#1a4a0a" strokeWidth="0.5"><line x1="68" y1="295" x2="68" y2="420"/><line x1="136" y1="295" x2="136" y2="420"/><line x1="204" y1="295" x2="204" y2="420"/><line x1="272" y1="295" x2="272" y2="420"/><line x1="340" y1="295" x2="340" y2="420"/><line x1="408" y1="295" x2="408" y2="420"/><line x1="476" y1="295" x2="476" y2="420"/><line x1="544" y1="295" x2="544" y2="420"/><line x1="612" y1="295" x2="612" y2="420"/><line x1="0" y1="330" x2="680" y2="330"/><line x1="0" y1="365" x2="680" y2="365"/><line x1="0" y1="400" x2="680" y2="400"/></g>
<rect x="0" y="330" width="680" height="11" fill="#908878" opacity="0.55" rx="1"/>
<line x1="0" y1="335.5" x2="680" y2="335.5" stroke="#d4c060" strokeWidth="0.8" strokeDasharray="14 9" opacity="0.45"/>
<path d="M0,370 Q60,355 120,372 Q180,389 240,365 Q300,341 360,368 Q420,395 480,365 Q540,335 600,362 Q640,378 680,365 L680,380 Q640,393 600,377 Q540,350 480,380 Q420,410 360,383 Q300,356 240,380 Q180,404 120,387 Q60,370 0,385Z" fill="#4898c0" opacity="0.55"/>
<path d="M50,370 Q90,365 130,375" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.2"/><path d="M280,360 Q320,355 360,365" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.2"/><path d="M500,358 Q530,353 560,363" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.2"/>
{/* Buildings */}
<g transform="translate(55,215)"><rect x="0" y="0" width="32" height="80" fill="#c8d8e8" stroke="#5078a0" strokeWidth="0.8"/><polygon points="0,0 12,-10 44,-10 32,0" fill="#d8e8f4" stroke="#5078a0" strokeWidth="0.6"/><polygon points="32,0 44,-10 44,70 32,80" fill="#a8c0d8" stroke="#5078a0" strokeWidth="0.6"/><rect x="4" y="5" width="6" height="8" fill="#7ab0d0" opacity="0.5" rx="0.5"/><rect x="13" y="5" width="6" height="8" fill="#7ab0d0" opacity="0.3" rx="0.5"/><rect x="22" y="5" width="6" height="8" fill="#7ab0d0" opacity="0.6" rx="0.5"/><rect x="4" y="18" width="6" height="8" fill="#7ab0d0" opacity="0.4" rx="0.5"/><rect x="13" y="18" width="6" height="8" fill="#e8c050" opacity="0.5" rx="0.5"/><rect x="22" y="18" width="6" height="8" fill="#7ab0d0" opacity="0.5" rx="0.5"/><rect x="4" y="31" width="6" height="8" fill="#7ab0d0" opacity="0.6" rx="0.5"/><rect x="13" y="31" width="6" height="8" fill="#7ab0d0" opacity="0.4" rx="0.5"/><rect x="22" y="31" width="6" height="8" fill="#7ab0d0" opacity="0.3" rx="0.5"/><rect x="4" y="44" width="6" height="8" fill="#7ab0d0" opacity="0.3" rx="0.5"/><rect x="13" y="44" width="6" height="8" fill="#7ab0d0" opacity="0.5" rx="0.5"/><rect x="22" y="44" width="6" height="8" fill="#e8c050" opacity="0.4" rx="0.5"/><rect x="4" y="57" width="6" height="8" fill="#7ab0d0" opacity="0.5" rx="0.5"/><rect x="13" y="57" width="6" height="8" fill="#7ab0d0" opacity="0.6" rx="0.5"/><rect x="22" y="57" width="6" height="8" fill="#7ab0d0" opacity="0.4" rx="0.5"/></g>
<g transform="translate(105,275)"><rect x="0" y="0" width="18" height="20" fill="#e0d0b8" stroke="#907858" strokeWidth="0.6"/><polygon points="0,0 9,-8 18,0" fill="#c05030" stroke="#903828" strokeWidth="0.5"/><rect x="6" y="10" width="6" height="10" fill="#907858" rx="0.5"/></g>
<g transform="translate(128,278)"><rect x="0" y="0" width="16" height="17" fill="#d8c8b0" stroke="#887050" strokeWidth="0.6"/><polygon points="0,0 8,-7 16,0" fill="#c86040" stroke="#a04830" strokeWidth="0.5"/><rect x="5" y="8" width="5" height="9" fill="#887050" rx="0.5"/></g>
<g transform="translate(155,242)"><polygon points="22,0 0,53 44,53" fill="#e0d0b0" stroke="#906830" strokeWidth="0.8"/><polygon points="22,0 34,-8 56,45 44,53" fill="#d0c0a0" stroke="#906830" strokeWidth="0.6"/><circle cx="22" cy="32" r="6" fill="#c0a060" stroke="#906830" strokeWidth="0.5"/><line x1="22" y1="26" x2="22" y2="38" stroke="#906830" strokeWidth="0.4"/><line x1="16" y1="32" x2="28" y2="32" stroke="#906830" strokeWidth="0.4"/></g>
<g transform="translate(218,208)"><rect x="0" y="12" width="30" height="87" fill="#e8d8c8" stroke="#907050" strokeWidth="0.8"/><ellipse cx="15" cy="12" rx="15" ry="6" fill="#f0e4d8" stroke="#907050" strokeWidth="0.7"/><rect x="4" y="22" width="5" height="7" fill="#c8b090" opacity="0.5" rx="0.5"/><rect x="12" y="22" width="5" height="7" fill="#c8b090" opacity="0.4" rx="0.5"/><rect x="20" y="22" width="5" height="7" fill="#c8b090" opacity="0.6" rx="0.5"/><rect x="4" y="34" width="5" height="7" fill="#c8b090" opacity="0.4" rx="0.5"/><rect x="12" y="34" width="5" height="7" fill="#e8c050" opacity="0.5" rx="0.5"/><rect x="20" y="34" width="5" height="7" fill="#c8b090" opacity="0.5" rx="0.5"/><rect x="4" y="46" width="5" height="7" fill="#c8b090" opacity="0.5" rx="0.5"/><rect x="12" y="46" width="5" height="7" fill="#c8b090" opacity="0.3" rx="0.5"/><rect x="20" y="46" width="5" height="7" fill="#c8b090" opacity="0.6" rx="0.5"/><rect x="4" y="58" width="5" height="7" fill="#c8b090" opacity="0.3" rx="0.5"/><rect x="12" y="58" width="5" height="7" fill="#c8b090" opacity="0.5" rx="0.5"/><rect x="20" y="58" width="5" height="7" fill="#c8b090" opacity="0.4" rx="0.5"/><rect x="4" y="70" width="5" height="7" fill="#c8b090" opacity="0.5" rx="0.5"/><rect x="12" y="70" width="5" height="7" fill="#c8b090" opacity="0.6" rx="0.5"/><rect x="20" y="70" width="5" height="7" fill="#e8c050" opacity="0.3" rx="0.5"/></g>
<g transform="translate(270,230)"><polygon points="40,0 0,65 80,65" fill="#e4d098" stroke="#a08038" strokeWidth="0.8"/><polygon points="40,0 80,65 98,52 58,-10" fill="#d4c088" stroke="#a08038" strokeWidth="0.7"/><line x1="15" y1="48" x2="65" y2="48" stroke="#b09058" strokeWidth="0.3" opacity="0.3"/><line x1="22" y1="32" x2="58" y2="32" stroke="#b09058" strokeWidth="0.3" opacity="0.3"/><line x1="30" y1="16" x2="50" y2="16" stroke="#b09058" strokeWidth="0.3" opacity="0.3"/></g>
<g transform="translate(360,175)"><rect x="0" y="0" width="38" height="120" fill="#c0d8e8" stroke="#4070a0" strokeWidth="1"/><rect x="0" y="-5" width="38" height="5" fill="#90b8d0" stroke="#4070a0" strokeWidth="0.5"/><line x1="19" y1="-5" x2="19" y2="-20" stroke="#708898" strokeWidth="1"/><circle cx="19" cy="-22" r="2" fill="#90b8d0"/><g opacity="0.5"><rect x="4" y="6" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="15" y="6" width="7" height="9" fill="#80b8d8" opacity="0.7" rx="0.5"/><rect x="26" y="6" width="7" height="9" fill="#e8c050" opacity="0.4" rx="0.5"/><rect x="4" y="20" width="7" height="9" fill="#80b8d8" opacity="0.6" rx="0.5"/><rect x="15" y="20" width="7" height="9" fill="#80b8d8" opacity="0.4" rx="0.5"/><rect x="26" y="20" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="4" y="34" width="7" height="9" fill="#80b8d8" opacity="0.4" rx="0.5"/><rect x="15" y="34" width="7" height="9" fill="#e8c050" opacity="0.5" rx="0.5"/><rect x="26" y="34" width="7" height="9" fill="#80b8d8" opacity="0.6" rx="0.5"/><rect x="4" y="48" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="15" y="48" width="7" height="9" fill="#80b8d8" opacity="0.3" rx="0.5"/><rect x="26" y="48" width="7" height="9" fill="#80b8d8" opacity="0.7" rx="0.5"/><rect x="4" y="62" width="7" height="9" fill="#80b8d8" opacity="0.3" rx="0.5"/><rect x="15" y="62" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="26" y="62" width="7" height="9" fill="#80b8d8" opacity="0.4" rx="0.5"/><rect x="4" y="76" width="7" height="9" fill="#e8c050" opacity="0.3" rx="0.5"/><rect x="15" y="76" width="7" height="9" fill="#80b8d8" opacity="0.6" rx="0.5"/><rect x="26" y="76" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="4" y="90" width="7" height="9" fill="#80b8d8" opacity="0.4" rx="0.5"/><rect x="15" y="90" width="7" height="9" fill="#80b8d8" opacity="0.5" rx="0.5"/><rect x="26" y="90" width="7" height="9" fill="#80b8d8" opacity="0.6" rx="0.5"/></g></g>
<g transform="translate(415,255)"><rect x="3" y="22" width="34" height="18" fill="#c0c8d0" stroke="#607080" strokeWidth="0.7"/><circle cx="20" cy="20" r="18" fill="#d0d8e0" stroke="#607080" strokeWidth="0.8"/><ellipse cx="20" cy="16" rx="14" ry="3.5" fill="none" stroke="#9aacbc" strokeWidth="0.4" opacity="0.4"/><ellipse cx="20" cy="24" rx="16" ry="3.5" fill="none" stroke="#9aacbc" strokeWidth="0.4" opacity="0.3"/><ellipse cx="20" cy="20" rx="3" ry="16" fill="none" stroke="#9aacbc" strokeWidth="0.4" opacity="0.3"/><rect x="16" y="12" width="8" height="5" fill="#8098b0" rx="1"/></g>
<g transform="translate(465,262)"><polygon points="14,0 28,6 28,22 14,28 0,22 0,6" fill="#c8d8c0" stroke="#508050" strokeWidth="0.8"/><polygon points="14,0 28,6 38,-1 24,-7" fill="#d8e8d0" stroke="#508050" strokeWidth="0.5"/><polygon points="28,6 38,-1 38,15 28,22" fill="#b0c8a8" stroke="#508050" strokeWidth="0.5"/><rect x="4" y="8" width="5" height="5" fill="#80a878" opacity="0.4" rx="0.5"/><rect x="12" y="8" width="5" height="5" fill="#80a878" opacity="0.5" rx="0.5"/><rect x="4" y="17" width="5" height="5" fill="#80a878" opacity="0.5" rx="0.5"/><rect x="12" y="17" width="5" height="5" fill="#90b888" opacity="0.6" rx="0.5"/></g>
<g transform="translate(500,270)"><polygon points="10,0 20,5 20,17 10,22 0,17 0,5" fill="#d0e0c8" stroke="#508050" strokeWidth="0.6"/><polygon points="10,0 20,5 28,-1 18,-6" fill="#dde8d8" stroke="#508050" strokeWidth="0.4"/><polygon points="20,5 28,-1 28,11 20,17" fill="#b8d0b0" stroke="#508050" strokeWidth="0.4"/><rect x="3" y="6" width="4" height="4" fill="#80a878" opacity="0.4" rx="0.5"/><rect x="10" y="6" width="4" height="4" fill="#80a878" opacity="0.5" rx="0.5"/></g>
<g transform="translate(540,248)"><rect x="0" y="22" width="45" height="25" fill="#d8c8b8" stroke="#887058" strokeWidth="0.7"/><rect x="6" y="10" width="33" height="12" fill="#d0c0b0" stroke="#887058" strokeWidth="0.6"/><rect x="12" y="0" width="21" height="10" fill="#c8b8a8" stroke="#887058" strokeWidth="0.6"/><rect x="4" y="28" width="5" height="5" fill="#b8a888" opacity="0.4" rx="0.5"/><rect x="13" y="28" width="5" height="5" fill="#b8a888" opacity="0.5" rx="0.5"/><rect x="22" y="28" width="5" height="5" fill="#e8c050" opacity="0.4" rx="0.5"/><rect x="31" y="28" width="5" height="5" fill="#b8a888" opacity="0.5" rx="0.5"/><rect x="10" y="14" width="4" height="4" fill="#b8a888" opacity="0.4" rx="0.5"/><rect x="18" y="14" width="4" height="4" fill="#b8a888" opacity="0.5" rx="0.5"/><rect x="26" y="14" width="4" height="4" fill="#b8a888" opacity="0.4" rx="0.5"/></g>
<g transform="translate(605,278)"><rect x="0" y="0" width="20" height="17" fill="#e8d8c0" stroke="#907858" strokeWidth="0.5"/><polygon points="0,0 10,-8 20,0" fill="#b84828" stroke="#903820" strokeWidth="0.4"/><rect x="7" y="7" width="6" height="10" fill="#907858" rx="0.5"/></g>
<g transform="translate(630,280)"><rect x="0" y="0" width="16" height="15" fill="#ddd0b8" stroke="#887050" strokeWidth="0.5"/><polygon points="0,0 8,-6 16,0" fill="#c05838" stroke="#a04028" strokeWidth="0.4"/><rect x="3" y="4" width="4" height="4" fill="#b0a080" opacity="0.5" rx="0.5"/><rect x="9" y="7" width="5" height="8" fill="#887050" rx="0.5"/></g>
<g opacity="0.4"><rect x="140" y="250" width="10" height="14" fill="#b0c0a0" stroke="#607050" strokeWidth="0.4"/><polygon points="140,250 145,244 150,250" fill="#a05030" stroke="#804020" strokeWidth="0.3"/><rect x="520" y="252" width="8" height="12" fill="#b8c8b0" stroke="#607050" strokeWidth="0.3"/><polygon points="520,252 524,247 528,252" fill="#b05838" stroke="#904028" strokeWidth="0.3"/><rect x="30" y="268" width="12" height="12" fill="#c0c8b8" stroke="#607050" strokeWidth="0.4"/><rect x="650" y="266" width="10" height="10" fill="#c0c8b8" stroke="#607050" strokeWidth="0.3"/></g>
{/* Trees */}
<g><rect x="42" y="302" width="2.5" height="10" fill="#5a4828"/><circle cx="43" cy="299" r="7" fill="#5a9830" opacity="0.7"/><rect x="148" y="303" width="2.5" height="9" fill="#5a4828"/><circle cx="149" cy="300" r="6" fill="#4a8828" opacity="0.7"/><rect x="253" y="304" width="2" height="8" fill="#5a4828"/><circle cx="254" cy="301" r="5.5" fill="#60a838" opacity="0.65"/><rect x="337" y="302" width="2.5" height="10" fill="#5a4828"/><circle cx="338" cy="299" r="7" fill="#509830" opacity="0.7"/><rect x="410" y="304" width="2" height="8" fill="#5a4828"/><circle cx="411" cy="301" r="5" fill="#5a9830" opacity="0.65"/><rect x="458" y="303" width="2" height="9" fill="#5a4828"/><circle cx="459" cy="300" r="6" fill="#60a838" opacity="0.7"/><rect x="533" y="303" width="2.5" height="9" fill="#5a4828"/><circle cx="534" cy="300" r="6.5" fill="#4a8828" opacity="0.7"/><rect x="598" y="304" width="2" height="8" fill="#5a4828"/><circle cx="599" cy="301" r="5" fill="#5a9830" opacity="0.65"/><rect x="8" y="305" width="2" height="8" fill="#5a4828"/><circle cx="9" cy="302" r="5" fill="#509830" opacity="0.6"/><rect x="670" y="305" width="2" height="7" fill="#5a4828"/><circle cx="671" cy="302" r="4.5" fill="#509830" opacity="0.55"/></g>
{/* Bridges */}
<path d="M200,332 Q240,305 280,332" fill="none" stroke="#988868" strokeWidth="2.5"/><path d="M200,332 Q240,307 280,332" fill="none" stroke="#b0a080" strokeWidth="1.2"/><line x1="218" y1="332" x2="218" y2="320" stroke="#887858" strokeWidth="1.2"/><line x1="240" y1="332" x2="240" y2="310" stroke="#887858" strokeWidth="1.2"/><line x1="262" y1="332" x2="262" y2="320" stroke="#887858" strokeWidth="1.2"/>
<path d="M480,332 Q505,318 530,332" fill="none" stroke="#988868" strokeWidth="2"/><line x1="495" y1="332" x2="495" y2="324" stroke="#887858" strokeWidth="1"/><line x1="515" y1="332" x2="515" y2="324" stroke="#887858" strokeWidth="1"/>
{/* Wind turbines */}
<g transform="translate(160,228)"><line x1="0" y1="0" x2="0" y2="22" stroke="#c8c8c0" strokeWidth="1.2"/><circle cx="0" cy="0" r="1.5" fill="#d8d8d0"/><line x1="0" y1="0" x2="-7" y2="-10" stroke="#e8e8e0" strokeWidth="1" strokeLinecap="round"/><line x1="0" y1="0" x2="8" y2="-5" stroke="#e8e8e0" strokeWidth="1" strokeLinecap="round"/><line x1="0" y1="0" x2="-1" y2="10" stroke="#e8e8e0" strokeWidth="1" strokeLinecap="round"/></g>
<g transform="translate(188,234)"><line x1="0" y1="0" x2="0" y2="18" stroke="#c8c8c0" strokeWidth="1"/><circle cx="0" cy="0" r="1.2" fill="#d8d8d0"/><line x1="0" y1="0" x2="-5" y2="-8" stroke="#e8e8e0" strokeWidth="0.8" strokeLinecap="round"/><line x1="0" y1="0" x2="7" y2="-4" stroke="#e8e8e0" strokeWidth="0.8" strokeLinecap="round"/><line x1="0" y1="0" x2="-2" y2="8" stroke="#e8e8e0" strokeWidth="0.8" strokeLinecap="round"/></g>
<g transform="translate(500,230)"><line x1="0" y1="0" x2="0" y2="20" stroke="#c8c8c0" strokeWidth="1"/><circle cx="0" cy="0" r="1.3" fill="#d8d8d0"/><line x1="0" y1="0" x2="-6" y2="-9" stroke="#e8e8e0" strokeWidth="0.9" strokeLinecap="round"/><line x1="0" y1="0" x2="7" y2="-4" stroke="#e8e8e0" strokeWidth="0.9" strokeLinecap="round"/><line x1="0" y1="0" x2="-1" y2="9" stroke="#e8e8e0" strokeWidth="0.9" strokeLinecap="round"/></g>
{/* Solar panels */}
<g transform="translate(305,310)"><rect x="0" y="0" width="14" height="8" fill="#3a6090" stroke="#2a5080" strokeWidth="0.4" rx="0.5" transform="rotate(-18,7,4)"/><rect x="17" y="0" width="14" height="8" fill="#3a6090" stroke="#2a5080" strokeWidth="0.4" rx="0.5" transform="rotate(-18,24,4)"/></g>
<g transform="translate(560,312)"><rect x="0" y="0" width="12" height="7" fill="#3a6090" stroke="#2a5080" strokeWidth="0.3" rx="0.5" transform="rotate(-18,6,3.5)"/></g>
{/* Faint formulas */}
<g fontFamily="monospace" opacity="0.07" fill="#205080"><text x="40" y="140" fontSize="9">V = pi r2 h</text><text x="520" y="140" fontSize="8">a2 + b2 = c2</text><text x="300" y="130" fontSize="8">A = 1/2 bh</text><text x="150" y="160" fontSize="7">4/3 pi r3</text><text x="430" y="155" fontSize="7">C = 2 pi r</text><text x="600" y="165" fontSize="7">Q = V / T</text></g>
{/* Cars on the road */}
<g>
{/* right-bound cars (upper lane, y~331) */}
<g>
<rect x="0" y="0" width="14" height="4.5" rx="1.5" fill="#d64545"/><rect x="3" y="-2.2" width="7" height="3" rx="1" fill="#b83a3a"/><rect x="4" y="-1.6" width="5" height="2" rx="0.5" fill="#bfe3ff" opacity="0.7"/><circle cx="3.5" cy="4.5" r="1.3" fill="#1a1a1a"/><circle cx="10.5" cy="4.5" r="1.3" fill="#1a1a1a"/>
<animateTransform attributeName="transform" type="translate" from="-60 331" to="740 331" dur="9s" repeatCount="indefinite"/>
</g>
<g>
<rect x="0" y="0" width="13" height="4.3" rx="1.5" fill="#4577d6"/><rect x="3" y="-2" width="6.5" height="2.8" rx="1" fill="#3a63b8"/><rect x="4" y="-1.4" width="4.5" height="1.9" rx="0.5" fill="#bfe3ff" opacity="0.7"/><circle cx="3.3" cy="4.3" r="1.2" fill="#1a1a1a"/><circle cx="9.7" cy="4.3" r="1.2" fill="#1a1a1a"/>
<animateTransform attributeName="transform" type="translate" from="-60 331" to="740 331" dur="13s" begin="-5s" repeatCount="indefinite"/>
</g>
{/* left-bound cars (lower lane, y~335) */}
<g>
<rect x="0" y="0" width="14" height="4.5" rx="1.5" fill="#d9dde2"/><rect x="4" y="-2.2" width="7" height="3" rx="1" fill="#b9c0c8"/><rect x="5" y="-1.6" width="5" height="2" rx="0.5" fill="#bfe3ff" opacity="0.7"/><circle cx="3.5" cy="4.5" r="1.3" fill="#1a1a1a"/><circle cx="10.5" cy="4.5" r="1.3" fill="#1a1a1a"/>
<animateTransform attributeName="transform" type="translate" from="740 335.5" to="-60 335.5" dur="11s" repeatCount="indefinite"/>
</g>
<g>
<rect x="0" y="0" width="12.5" height="4.2" rx="1.5" fill="#e0b840"/><rect x="3.5" y="-2" width="6" height="2.7" rx="1" fill="#c79e2e"/><rect x="4.4" y="-1.4" width="4.2" height="1.8" rx="0.5" fill="#bfe3ff" opacity="0.7"/><circle cx="3.2" cy="4.2" r="1.2" fill="#1a1a1a"/><circle cx="9.3" cy="4.2" r="1.2" fill="#1a1a1a"/>
<animateTransform attributeName="transform" type="translate" from="740 335.5" to="-60 335.5" dur="15s" begin="-7s" repeatCount="indefinite"/>
</g>
</g>
{/* People walking on the grass */}
<g>
{/* strolling across to the right */}
<g>
<circle cx="0" cy="0" r="1.6" fill="#f0c8a0"/><rect x="-1.3" y="1.4" width="2.6" height="4" rx="1" fill="#d65a7a"/><line x1="-0.7" y1="5.3" x2="-1.5" y2="7.8" stroke="#3a3a3a" strokeWidth="0.8" strokeLinecap="round"/><line x1="0.7" y1="5.3" x2="1.5" y2="7.8" stroke="#3a3a3a" strokeWidth="0.8" strokeLinecap="round"/>
<animateTransform attributeName="transform" type="translate" from="-12 318" to="692 318" dur="24s" repeatCount="indefinite"/>
</g>
{/* strolling across to the left */}
<g>
<circle cx="0" cy="0" r="1.6" fill="#e8b890"/><rect x="-1.3" y="1.4" width="2.6" height="4" rx="1" fill="#4a9ad6"/><line x1="-0.7" y1="5.3" x2="-1.5" y2="7.8" stroke="#3a3a3a" strokeWidth="0.8" strokeLinecap="round"/><line x1="0.7" y1="5.3" x2="1.5" y2="7.8" stroke="#3a3a3a" strokeWidth="0.8" strokeLinecap="round"/>
<animateTransform attributeName="transform" type="translate" from="692 312" to="-12 312" dur="28s" begin="-9s" repeatCount="indefinite"/>
</g>
{/* pacing near the houses */}
<g>
<circle cx="0" cy="0" r="1.5" fill="#f0c8a0"/><rect x="-1.2" y="1.3" width="2.4" height="3.7" rx="1" fill="#6ac06a"/><line x1="-0.6" y1="4.9" x2="-1.3" y2="7.2" stroke="#3a3a3a" strokeWidth="0.7" strokeLinecap="round"/><line x1="0.6" y1="4.9" x2="1.3" y2="7.2" stroke="#3a3a3a" strokeWidth="0.7" strokeLinecap="round"/>
<animateTransform attributeName="transform" type="translate" values="120 322;156 322;120 322" keyTimes="0;0.5;1" dur="13s" repeatCount="indefinite"/>
</g>
<g>
<circle cx="0" cy="0" r="1.5" fill="#e8b890"/><rect x="-1.2" y="1.3" width="2.4" height="3.7" rx="1" fill="#e0a040"/><line x1="-0.6" y1="4.9" x2="-1.3" y2="7.2" stroke="#3a3a3a" strokeWidth="0.7" strokeLinecap="round"/><line x1="0.6" y1="4.9" x2="1.3" y2="7.2" stroke="#3a3a3a" strokeWidth="0.7" strokeLinecap="round"/>
<animateTransform attributeName="transform" type="translate" values="438 306;406 306;438 306" keyTimes="0;0.5;1" dur="16s" repeatCount="indefinite"/>
</g>
</g>
{/* Overlay */}
<rect width="680" height="420" fill="#000" opacity="0.25"/>
</svg>
);

export default function STEMCityApp() {
  const [screen, setScreen] = useState("landing"); // "landing" | "creator" | "game"
  const [config, setConfig] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  const [muted, setMuted] = useState(false);
  const menuMusicRef = useRef(null);

  useEffect(() => {
    try { setHasSave(!!localStorage.getItem("supercity_save")); } catch (e) { setHasSave(false); }
  }, []);

  // Start/stop menu music based on screen
  const startMenuMusic = useCallback(async () => {
    if (muted) return;
    try {
      if (menuMusicRef.current) { menuMusicRef.current.stop(); menuMusicRef.current.dispose(); }
      const engine = await createMenuMusic();
      menuMusicRef.current = engine;
      engine.start();
    } catch (e) { console.log("Audio not available:", e.message); }
  }, [muted]);

  const stopMenuMusic = useCallback(() => {
    if (menuMusicRef.current) {
      try { menuMusicRef.current.stop(); menuMusicRef.current.dispose(); } catch(e) {}
      menuMusicRef.current = null;
    }
  }, []);

  // Note: we stop the menu track in the New City / Load handlers, BEFORE the terrain
  // mounts and starts the gameplay track. The two tracks share Tone's global transport,
  // so stopping the menu track from a screen effect (which runs after the terrain's
  // start) would silence gameplay music. Hence no screen-based stop here.
  useEffect(() => {
    if (muted) stopMenuMusic();
  }, [muted, stopMenuMusic]);

  const loadGame = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("supercity_save"));
      if (saved) { stopMenuMusic(); setConfig({ ...saved, _loaded: true }); setScreen("game"); }
    } catch (e) { alert("No saved game found."); }
  };

  if (screen === "landing") {
    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#1882c8", fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "900px" }}><LandingSVG /></div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "clamp(40px, 8vw, 64px)", fontWeight: 900, color: "#fff", textShadow: "0 3px 16px rgba(0,0,0,0.4)", letterSpacing: "-2px", lineHeight: 1 }}>SUPER CITY</div>
            <div style={{ fontSize: "clamp(13px, 2.5vw, 17px)", color: "#fde68a", fontWeight: 600, marginTop: "10px", textShadow: "0 1px 8px rgba(0,0,0,0.5)", letterSpacing: "1.5px" }}>USING MATHEMATICS TO BUILD A BETTER WORLD</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "min(300px, 80vw)" }}>
            <button onClick={async () => { await startMenuMusic(); playClickSound(); setScreen("creator"); }} style={{ padding: "18px 24px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", fontSize: "18px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 24px rgba(245,158,11,0.4)", textShadow: "0 1px 2px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "transform 0.15s" }}>
              <span style={{ fontSize: "24px" }}>🏗️</span> New City
            </button>
            <button onClick={loadGame} style={{ padding: "16px 24px", borderRadius: "14px", border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "16px", fontWeight: 700, cursor: hasSave ? "pointer" : "default", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", opacity: hasSave ? 1 : 0.4, transition: "transform 0.15s, background 0.2s" }}>
              <span style={{ fontSize: "20px" }}>📂</span> Load Saved City
            </button>
          </div>
          <div style={{ position: "absolute", bottom: "20px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {["Coordinates","Trigonometry","Volume","Statistics","Probability","Ratio"].map(t => (
              <span key={t} style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", padding: "3px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px" }}>{t}</span>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "6px", fontSize: "9px", color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setMuted(m => !m)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "3px 8px", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "11px", fontFamily: "inherit" }}>{muted ? "🔇 Unmute" : "🔊 Music"}</button>
            <span>v0.1</span>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "creator") {
    return <STEMCityCreator onLaunch={(cfg) => { stopMenuMusic(); setConfig(cfg); setScreen("game"); }} />;
  }

  return <STEMCityTerrain config={config} muted={muted} onToggleMute={() => setMuted(m => !m)} />;
}
