/* VIII. 별과 우주 (교과서 278~315쪽) */
(function () {
  const U = (window.UNITS = window.UNITS || {});

  const svgParallax = `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="14">
    <rect x="20" y="10" width="560" height="40" rx="10" fill="#1c2551"/>
    <text x="300" y="36" text-anchor="middle" fill="#dbe4ff" font-weight="700">먼 배경 별 (천구)</text>
    <circle cx="200" cy="30" r="5" fill="#ff8787"/><text x="200" y="66" text-anchor="middle" fill="#e03131" font-weight="700">S₂</text>
    <circle cx="400" cy="30" r="5" fill="#ff8787"/><text x="400" y="66" text-anchor="middle" fill="#e03131" font-weight="700">S₁</text>
    <ellipse cx="300" cy="245" rx="150" ry="35" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-dasharray="5 5"/>
    <circle cx="300" cy="245" r="14" fill="#ffd43b"/><text x="300" y="285" text-anchor="middle" fill="currentColor" opacity=".8">태양</text>
    <circle cx="150" cy="245" r="9" fill="#339af0"/><text x="128" y="270" fill="#1c7ed6" font-weight="700">E₂ (6개월 후)</text>
    <circle cx="450" cy="245" r="9" fill="#339af0"/><text x="430" y="270" fill="#1c7ed6" font-weight="700">E₁</text>
    <line x1="150" y1="245" x2="400" y2="30" stroke="#2f9e44" stroke-width="2"/>
    <line x1="450" y1="245" x2="200" y2="30" stroke="#2f9e44" stroke-width="2"/>
    <circle cx="300" cy="116" r="8" fill="#e03131"/><text x="315" y="112" fill="#e03131" font-weight="800">별 S</text>
    <line x1="300" y1="116" x2="300" y2="245" stroke="#e03131" stroke-dasharray="4 4"/>
    <path d="M285,135 A22,22 0 0 0 315,135" fill="none" stroke="#f08c00" stroke-width="3"/>
    <text x="230" y="160" fill="#e67700" font-weight="800">시차</text>
    <path d="M300,140 A24,24 0 0 0 315,135" fill="none" stroke="#e03131" stroke-width="3"/>
    <text x="320" y="160" fill="#e03131" font-weight="800">연주 시차 = 시차 ÷ 2</text>
  </svg>`;

  const svgInverseSq = `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <circle cx="40" cy="100" r="16" fill="#ffd43b"/><text x="40" y="140" text-anchor="middle" fill="currentColor">별</text>
    <path d="M56,92 L520,10 M56,108 L520,190" stroke="#ffd43b" stroke-opacity=".6"/>
    ${[[150, 1, "r", "1배"], [300, 2, "2r", "1/4배"], [450, 3, "3r", "1/9배"]].map(([x, n, r, b]) => {
      const s = 20 * n; let cells = "";
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cells += `<rect x="${x - s / 2 + i * 20}" y="${100 - s / 2 + j * 20}" width="20" height="20" fill="${i === 0 && j === 0 ? "#ffe066" : "#fff3bf"}" stroke="#f59f00"/>`;
      return `${cells}<text x="${x}" y="${100 + s / 2 + 20}" text-anchor="middle" fill="currentColor" font-weight="700">거리 ${r}</text><text x="${x}" y="${100 + s / 2 + 38}" text-anchor="middle" fill="#e67700">면적 ${n * n}배 · 밝기 ${b}</text>`;
    }).join("")}
  </svg>`;

  const svgMag = `<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    ${[6, 5, 4, 3, 2, 1].map((m, i) => `<circle cx="${60 + i * 96}" cy="50" r="${6 + i * 4}" fill="#ffd43b" fill-opacity="${0.3 + i * 0.14}" stroke="#f59f00"/><text x="${60 + i * 96}" y="${95}" text-anchor="middle" fill="currentColor" font-weight="700">${m}등급</text>${i < 5 ? `<text x="${108 + i * 96}" y="20" text-anchor="middle" fill="#e67700">×2.5</text>` : ""}`).join("")}
    <text x="300" y="122" text-anchor="middle" fill="#e03131" font-weight="800">6등급 → 1등급 : 약 100배 (2.5⁵ ≈ 100)</text>
    <text x="20" y="122" fill="currentColor" opacity=".7">어둡다</text><text x="580" y="122" text-anchor="end" fill="currentColor" opacity=".7">밝다</text>
  </svg>`;

  const svgColor = `<svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><linearGradient id="tg8"><stop offset="0" stop-color="#ff4d4d"/><stop offset=".35" stop-color="#ffd43b"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#4dabf7"/></linearGradient></defs>
    <rect x="30" y="80" width="540" height="12" rx="6" fill="url(#tg8)" stroke="#ced4da"/>
    ${[["적색", "#ff4d4d"], ["주황색", "#ff922b"], ["황색", "#ffd43b"], ["황백색", "#fff3bf"], ["백색", "#ffffff"], ["청백색", "#d0ebff"], ["청색", "#4dabf7"]].map(([n, c], i) => `<circle cx="${55 + i * 82}" cy="40" r="18" fill="${c}" stroke="#adb5bd"/><text x="${55 + i * 82}" y="72" text-anchor="middle" fill="currentColor" font-weight="700">${n}</text>`).join("")}
    <text x="30" y="112" fill="currentColor" opacity=".8">표면 온도 낮다</text><text x="570" y="112" text-anchor="end" fill="currentColor" opacity=".8">높다 →</text>
  </svg>`;

  const svgGalaxy = `<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><radialGradient id="gc8"><stop offset="0" stop-color="#fff3bf"/><stop offset="1" stop-color="#fab005" stop-opacity="0"/></radialGradient></defs>
    <text x="150" y="20" text-anchor="middle" fill="currentColor" font-weight="800">위에서 본 모습</text>
    <g transform="translate(150,130)">
      <ellipse cx="0" cy="0" rx="34" ry="12" fill="#ffd43b" transform="rotate(-20)"/>
      <path d="M30,-10 C80,-20 100,40 40,80 C0,100 -70,80 -95,30" fill="none" stroke="#74c0fc" stroke-width="10" stroke-linecap="round" opacity=".7"/>
      <path d="M-30,10 C-80,20 -100,-40 -40,-80 C0,-100 70,-80 95,-30" fill="none" stroke="#74c0fc" stroke-width="10" stroke-linecap="round" opacity=".7"/>
      <circle cx="-62" cy="-62" r="6" fill="#ff922b"/><text x="-60" y="-75" text-anchor="middle" fill="#e8590c" font-weight="800">태양계</text>
      <text x="0" y="5" text-anchor="middle" fill="#7c5300" font-size="11" font-weight="700">막대 구조</text>
      <text x="70" y="65" fill="#1c7ed6" font-weight="700">나선팔</text>
      <line x1="-110" y1="110" x2="110" y2="110" stroke="currentColor" opacity=".5"/><text x="0" y="125" text-anchor="middle" fill="currentColor">지름 약 30000 pc</text>
    </g>
    <text x="450" y="20" text-anchor="middle" fill="currentColor" font-weight="800">옆에서 본 모습</text>
    <g transform="translate(450,130)">
      <ellipse cx="0" cy="0" rx="135" ry="12" fill="#74c0fc" opacity=".6"/>
      <ellipse cx="0" cy="0" rx="34" ry="24" fill="url(#gc8)"/><ellipse cx="0" cy="0" rx="18" ry="12" fill="#ffd43b"/>
      <circle cx="-80" cy="0" r="6" fill="#ff922b"/>
      <line x1="-80" y1="30" x2="0" y2="30" stroke="#e8590c"/><text x="-40" y="47" text-anchor="middle" fill="#e8590c" font-weight="700">약 8500 pc</text>
      ${[[-100, -70], [90, -60], [40, -90], [-50, 80], [110, 60], [-120, 40], [20, 95]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ff8787"/>`).join("")}
      <text x="0" y="-100" text-anchor="middle" fill="#e03131" font-size="12">● 구상 성단 (중심부·원반 둘레 구형 공간)</text>
      <text x="0" y="-18" text-anchor="middle" fill="#7c5300" font-size="11">볼록한 중심부</text>
    </g>
  </svg>`;

  /* ---------- labs ---------- */
  function labParallax(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <label>⭐ 별까지의 거리 <span data-d></span></label><input type="range" min="0.5" max="10" step="0.1" value="2" data-r>
        <div class="lab-out" data-out></div>
        <p style="font-size:13px;color:var(--muted)">공식: 거리(pc) = 1 ÷ 연주 시차(″). 그림의 각도는 보기 쉽게 과장했어요.</p>
      </div><div class="lab-svg" data-svg></div></div>`;
    const draw = () => {
      const d = +el.querySelector("[data-r]").value;
      const p = 1 / d;
      el.querySelector("[data-d]").textContent = `${d.toFixed(1)} pc`;
      el.querySelector("[data-out]").innerHTML = `연주 시차 = 1 ÷ ${d.toFixed(1)} = <b>${p.toFixed(3)}″</b><br>시차(6개월 간격) = <b>${(2 * p).toFixed(3)}″</b><br>거리 ≈ <b>${(d * 3.26).toFixed(1)} 광년</b> (1 pc ≈ 3.26 광년)`;
      const sy = 225 - (30 + d * 15); // 가까운 별일수록 지구 궤도에 가까워 시차(각)가 커짐
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 260" font-family="Pretendard,sans-serif" font-size="12">
        <rect x="10" y="5" width="370" height="26" rx="8" fill="#1c2551"/><text x="195" y="23" text-anchor="middle" fill="#dbe4ff">배경 별</text>
        <ellipse cx="195" cy="225" rx="110" ry="22" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="4 4"/>
        <circle cx="195" cy="225" r="10" fill="#ffd43b"/>
        <circle cx="85" cy="225" r="7" fill="#339af0"/><circle cx="305" cy="225" r="7" fill="#339af0"/>
        <line x1="85" y1="225" x2="195" y2="${sy}" stroke="#2f9e44" stroke-width="2"/><line x1="305" y1="225" x2="195" y2="${sy}" stroke="#2f9e44" stroke-width="2"/>
        <line x1="195" y1="${sy}" x2="${195 + (195 - 85) * (sy - 18) / (225 - sy)}" y2="18" stroke="#2f9e44" stroke-dasharray="3 3"/>
        <line x1="195" y1="${sy}" x2="${195 - (305 - 195) * (sy - 18) / (225 - sy)}" y2="18" stroke="#2f9e44" stroke-dasharray="3 3"/>
        <circle cx="195" cy="${sy}" r="7" fill="#e03131"/><text x="207" y="${sy + 4}" fill="#e03131" font-weight="800">별</text>
        <text x="70" y="250" fill="#1c7ed6">지구(1월)</text><text x="280" y="250" fill="#1c7ed6">지구(7월)</text></svg>`;
    };
    el.querySelector("[data-r]").oninput = draw;
    draw();
  }

  function labMagnitude(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <div class="seg" data-mode><button data-m="0" class="active">등급 차 → 밝기 배수</button><button data-m="1">겉보기 vs 절대 등급</button></div>
        <div data-p0>
          <label>별 A 등급 <span data-va></span></label><input type="range" min="-2" max="6" step="1" value="1" data-a>
          <label>별 B 등급 <span data-vb></span></label><input type="range" min="-2" max="6" step="1" value="6" data-b>
        </div>
        <div data-p1 style="display:none">
          <label>겉보기 등급 <span data-vm></span></label><input type="range" min="-3" max="8" step="0.5" value="2.1" data-mm>
          <label>절대 등급 <span data-vM></span></label><input type="range" min="-9" max="8" step="0.5" value="-3.5" data-MM>
        </div>
        <div class="lab-out" data-out></div>
      </div><div class="lab-svg" data-svg></div></div>`;
    let mode = 0;
    const q = (s) => el.querySelector(s);
    const draw = () => {
      q("[data-p0]").style.display = mode ? "none" : ""; q("[data-p1]").style.display = mode ? "" : "none";
      if (!mode) {
        const a = +q("[data-a]").value, b = +q("[data-b]").value;
        q("[data-va]").textContent = `${a}등급`; q("[data-vb]").textContent = `${b}등급`;
        const diff = Math.abs(a - b), ratio = Math.pow(2.5, diff);
        const br = a < b ? "A" : a > b ? "B" : null;
        q("[data-out]").innerHTML = br ? `등급 차 <b>${diff}</b> → <b>${br}</b>가 약 2.5<sup>${diff}</sup> ≈ <b>${ratio >= 100 ? Math.round(ratio) : ratio.toFixed(1)}배</b> 밝다.<br><span style="font-size:13px">교과서: 5등급 차이 = 100배 (2.5⁵ ≈ 97.7 ≈ 100)</span>` : "두 별의 밝기가 같아요.";
        const rA = 8 + (6 - a) * 4.5, rB = 8 + (6 - b) * 4.5;
        q("[data-svg]").innerHTML = `<svg viewBox="0 0 390 200" font-family="Pretendard,sans-serif" font-size="14"><rect width="390" height="200" rx="12" fill="#10142b"/>
          <circle cx="110" cy="95" r="${rA}" fill="#ffe066" opacity="${0.35 + (6 - a) * 0.08}"/><circle cx="280" cy="95" r="${rB}" fill="#ffe066" opacity="${0.35 + (6 - b) * 0.08}"/>
          <text x="110" y="185" text-anchor="middle" fill="#fff" font-weight="700">A (${a}등급)</text><text x="280" y="185" text-anchor="middle" fill="#fff" font-weight="700">B (${b}등급)</text></svg>`;
      } else {
        const m = +q("[data-mm]").value, M = +q("[data-MM]").value;
        q("[data-vm]").textContent = m; q("[data-vM]").textContent = M;
        const d = Math.pow(10, (m - M + 5) / 5);
        let rel;
        if (Math.abs(m - M) < 0.01) rel = "겉보기 등급 = 절대 등급 → <b>10 pc</b>에 있는 별";
        else if (m < M) rel = "겉보기 등급 &lt; 절대 등급 → <b>10 pc보다 가까이</b> 있는 별";
        else rel = "겉보기 등급 &gt; 절대 등급 → <b>10 pc보다 멀리</b> 있는 별";
        q("[data-out]").innerHTML = `${rel}<br><span style="font-size:13px;color:var(--muted)">(심화 계산값: 약 ${d < 1 ? d.toFixed(2) : d < 100 ? d.toFixed(1) : Math.round(d)} pc)</span><br><span style="font-size:13px">예) 북극성 2.1 / −3.7, 시리우스 −1.5 / 1.4, 태양 −26.8 / 4.8</span>`;
        const R = 70, pos = Math.min(170, Math.max(12, (Math.log10(d) + 1) / 3 * 170));
        q("[data-svg]").innerHTML = `<svg viewBox="0 0 390 220" font-family="Pretendard,sans-serif" font-size="12">
          <circle cx="40" cy="190" r="9" fill="#339af0"/><text x="40" y="212" text-anchor="middle" fill="currentColor">지구</text>
          <path d="M${40 + R * 1.6},190 A${R * 1.6},${R * 1.6} 0 0 0 40,${190 - R * 1.6}" fill="none" stroke="#e03131" stroke-dasharray="5 5" stroke-width="2"/>
          <text x="${40 + R * 1.3}" y="${190 - R * 1.3}" fill="#e03131" font-weight="700">10 pc</text>
          <line x1="40" y1="190" x2="${40 + pos * 1.6}" y2="${190 - pos * 0.8}" stroke="currentColor" opacity=".3"/>
          <circle cx="${40 + pos * 1.6}" cy="${190 - pos * 0.8}" r="8" fill="#ffd43b" stroke="#f59f00"/></svg>`;
      }
    };
    el.querySelectorAll("input").forEach((i) => (i.oninput = draw));
    el.querySelectorAll("[data-mode] button").forEach((b) => (b.onclick = () => { mode = +b.dataset.m; el.querySelectorAll("[data-mode] button").forEach((x) => x.classList.toggle("active", x === b)); draw(); }));
    draw();
  }

  function labColor(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <label>🌡️ 별의 표면 온도 <span data-v></span></label><input type="range" min="0" max="6" step="1" value="2" data-t>
        <div class="lab-out" data-out></div>
      </div><div class="lab-svg" data-svg></div></div>`;
    const C = [["적색", "#ff4d4d", "베텔게우스, 안타레스"], ["주황색", "#ff922b", "알데바란"], ["황색", "#ffd43b", "태양"], ["황백색", "#fff3bf", "프로키온"], ["백색", "#ffffff", "시리우스"], ["청백색", "#d0ebff", "리겔"], ["청색", "#4dabf7", "—"]];
    const draw = () => {
      const t = +el.querySelector("[data-t]").value;
      el.querySelector("[data-v]").textContent = ["매우 낮음", "낮음", "중간(태양 정도)", "약간 높음", "높음", "매우 높음", "가장 높음"][t];
      el.querySelector("[data-out]").innerHTML = `별의 색: <b>${C[t][0]}</b><br>예: ${C[t][2]}<br><span style="font-size:13px">표면 온도가 높을수록 파란색 빛을 더 많이 방출해 파랗게, 낮을수록 붉은색 빛을 더 많이 방출해 붉게 보여요.</span>`;
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 200"><rect width="390" height="200" rx="12" fill="#0b0f24"/>
        <defs><radialGradient id="sg8"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${C[t][1]}"/><stop offset="1" stop-color="${C[t][1]}" stop-opacity="0"/></radialGradient></defs>
        <circle cx="195" cy="100" r="80" fill="url(#sg8)"/></svg>`;
    };
    el.querySelector("[data-t]").oninput = draw;
    draw();
  }

  function labExpand(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <label>🎈 우주(풍선)의 크기 <span data-v></span></label><input type="range" min="1" max="2.2" step="0.05" value="1" data-s>
        <p style="font-size:14px">은하(붙임딱지)를 클릭하면 그 은하를 기준(관측자)으로 다른 은하까지의 거리를 보여 줘요.</p>
        <div class="lab-out" data-out></div>
      </div><div class="lab-svg" data-svg></div></div>`;
    const G = [[-60, -40, "ㄱ"], [50, -55, "ㄴ"], [20, 45, "ㄷ"], [-45, 50, "ㄹ"], [75, 15, "ㅁ"]];
    let obs = 0;
    const draw = () => {
      const s = +el.querySelector("[data-s]").value;
      el.querySelector("[data-v]").textContent = `${s.toFixed(2)}배`;
      const o = G[obs];
      const dist = G.map((g) => Math.hypot(g[0] - o[0], g[1] - o[1]));
      el.querySelector("[data-out]").innerHTML = `관측자: 은하 <b>${o[2]}</b><br>` + G.map((g, i) => i === obs ? "" : `${g[2]}까지: ${(dist[i] * 0.1).toFixed(1)} → <b>${(dist[i] * 0.1 * s).toFixed(1)}</b>`).filter(Boolean).join("<br>") + `<br><span style="font-size:13px">어느 은하에서 봐도 다른 은하가 모두 멀어져요 → <b>팽창하는 우주에는 중심이 없다.</b> 멀리 있는 은하일수록 더 많이 멀어져요.</span>`;
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="-195 -130 390 260" font-family="Pretendard,sans-serif" font-size="13">
        <circle r="${90 * s * 0.95}" fill="#ff8787" opacity=".25" stroke="#e03131"/>
        ${G.map((g, i) => i === obs ? "" : `<line x1="${o[0] * s * 0.95}" y1="${o[1] * s * 0.95}" x2="${g[0] * s * 0.95}" y2="${g[1] * s * 0.95}" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="3 3"/>`).join("")}
        ${G.map((g, i) => `<g data-g="${i}" style="cursor:pointer"><rect x="${g[0] * s * 0.95 - 11}" y="${g[1] * s * 0.95 - 11}" width="22" height="22" rx="5" fill="${i === obs ? "#4f46e5" : "#ffd43b"}"/><text x="${g[0] * s * 0.95}" y="${g[1] * s * 0.95 + 5}" text-anchor="middle" font-weight="800" fill="${i === obs ? "#fff" : "#000"}">${g[2]}</text></g>`).join("")}
      </svg>`;
      el.querySelectorAll("[data-g]").forEach((g) => (g.onclick = () => { obs = +g.dataset.g; draw(); }));
    };
    el.querySelector("[data-s]").oninput = draw;
    draw();
  }

  U["8"] = {
    id: "8", roman: "VIII", title: "별과 우주", short: "별과 우주", cls: "u8", icon: "🌌",
    desc: "연주 시차로 별까지의 거리를, 등급으로 별의 밝기를, 색으로 표면 온도를 알아내요. 우리은하의 구조와 구성 천체, 팽창하는 우주, 우주 탐사까지 정리해요.",
    chapters: [
      {
        title: "별의 특성",
        lessons: [
          {
            title: "별까지의 거리",
            goals: ["시차와 거리의 관계를 설명할 수 있다.", "연주 시차를 이용하여 별까지의 거리를 비교할 수 있다."],
            html: `
              <div class="box box-key"><p><span class="kw">시차</span>: 관측자의 위치가 달라질 때 먼 배경에 대하여 가까운 물체의 위치가 다르게 보이는 각도 → 관측자와 물체 사이의 거리가 <b>가까울수록 크고, 멀수록 작다.</b></p></div>
              <div class="box box-lab"><p><b>연필로 시차 확인하기</b>: 연필을 들고 왼쪽·오른쪽 눈을 번갈아 감으며 칠판의 붙임딱지 번호를 읽는다. 팔을 <b>구부렸을 때</b>(연필이 가까울 때) 위치 변화가 더 크다 → 시차가 더 크다.</p></div>
              <h4>연주 시차</h4>
              <p>지구는 태양 주위를 1년에 한 바퀴 공전한다. 지구가 E₁에 있을 때 별 S는 S₁에, 6개월 후 E₂에 있을 때는 S₂에 있는 것처럼 보인다. <b>6개월 간격으로 관측한 별의 시차(∠E₁SE₂)의 1/2</b>을 <span class="kw">연주 시차</span>라고 한다.</p>
              <figure class="dia">${svgParallax}<figcaption>그림 VIII-2 별의 연주 시차 — 멀리 있는 별 T의 연주 시차는 별 S보다 작다.</figcaption></figure>
              <ul>
                <li>연주 시차는 별까지의 거리가 <b>가까울수록 크고 멀수록 작다</b> (거리에 반비례).</li>
                <li>연주 시차는 매우 작아 초(″) 단위를 쓴다. 1° = 60′, 1′ = 60″, 1° = 3600″</li>
                <li>연주 시차가 1″인 별까지의 거리 = <span class="kw">1 pc(파섹)</span> ≈ 3.26 광년 (1 광년: 빛이 1년 동안 이동하는 거리)</li>
                <li>멀리 있는 별은 연주 시차가 너무 작아 측정이 어려우므로, <b>비교적 가까운 별</b>의 거리를 구할 때 이용한다.</li>
              </ul>
              <div class="eq">거리(pc) = 1 ÷ 연주 시차(″)</div>
              <div class="box box-exam"><p>별 A가 6개월 간격으로 기준 별의 왼쪽 0.06″ → 오른쪽 0.04″에 보였다면, 시차 = 0.06 + 0.04 = 0.1″, <b>연주 시차 = 0.05″</b> (반드시 ÷2!). 연주 시차는 <b>지구가 공전한다는 증거</b>이다.</p></div>
              <div class="box box-warn"><p><b>베셀</b>(1837~): 백조자리 61번 별을 6개월 간격으로 관측해 최초로 연주 시차(약 0.3″)를 측정 → 거리 약 10.3광년(최근값 약 11.4광년). 지구 공전을 더욱 확실히 증명했다.</p></div>`,
          },
          {
            title: "별의 밝기와 등급",
            goals: ["별까지의 거리와 밝기의 관계를 설명할 수 있다.", "별의 밝기와 등급을 설명할 수 있다."],
            html: `
              <h4>거리와 밝기</h4>
              <p>별빛은 퍼져 나가면서 점점 더 넓은 면적을 비춘다. 거리가 2배가 되면 면적은 4배, 3배가 되면 9배가 되어 같은 면적이 받는 빛의 양은 1/4, 1/9로 줄어든다.</p>
              <div class="eq">별의 밝기 ∝ 1 / (거리)²</div>
              <figure class="dia">${svgInverseSq}<figcaption>그림 VIII-3 거리에 따른 별의 밝기 변화</figcaption></figure>
              <div class="box box-lab"><p><b>광원으로부터의 거리에 따른 빛의 밝기</b>: 스마트 기기의 빛의 밝기 측정 앱(단위 럭스, lx)으로 전등에서 20 cm 간격으로 측정 → 거리가 멀어질수록 빛의 밝기가 어두워진다.</p></div>
              <h4>별의 등급</h4>
              <ul>
                <li><b>히파르코스</b>: 맨눈으로 가장 밝은 별을 1등성, 가장 어두운 별을 6등성으로 구분.</li>
                <li><span class="kw">겉보기 등급</span>: 우리 눈에 보이는 별의 밝기를 등급으로 나타낸 것. <b>등급이 작을수록 밝다</b>. (1등급보다 밝으면 0, −1등급…)</li>
                <li><b>1등급은 6등급보다 100배 밝고, 1등급 차이는 약 2.5배</b>의 밝기 차이.</li>
              </ul>
              <figure class="dia">${svgMag}<figcaption>그림 VIII-4 별의 밝기와 등급</figcaption></figure>
              <div class="table-wrap"><table class="t"><tr><th>천체</th><th>태양</th><th>보름달</th><th>목성</th><th>시리우스</th><th>북극성</th></tr><tr><th>겉보기 등급</th><td>−26.8</td><td>−12.5</td><td>−2.9</td><td>−1.5</td><td>2.1</td></tr></table></div>
              <h4>절대 등급</h4>
              <p>겉보기 등급은 거리에 따라 달라지므로 실제 밝기를 비교할 수 없다. 별이 모두 <b>10 pc</b>에 있다고 가정했을 때의 밝기를 등급으로 나타낸 것이 <span class="kw">절대 등급</span>이다. → 실제 밝기 비교는 절대 등급으로!</p>
              <div class="table-wrap"><table class="t">
                <tr><th>별</th><th>겉보기 등급</th><th>절대 등급</th><th>거리</th></tr>
                <tr><td>태양</td><td>−26.8</td><td>4.8</td><td>10 pc보다 가까움</td></tr>
                <tr><td>시리우스</td><td>−1.5</td><td>1.4</td><td>10 pc보다 가까움</td></tr>
                <tr><td>북극성</td><td>2.1</td><td>−3.7</td><td>10 pc보다 멂</td></tr>
                <tr><td>데네브</td><td>1.3</td><td>−8.7</td><td>10 pc보다 멂</td></tr>
                <tr><td>리겔</td><td>0.13</td><td>−7.8</td><td>10 pc보다 멂</td></tr>
              </table></div>
              <div class="box box-key"><p>겉보기 등급 &lt; 절대 등급 → <b>10 pc보다 가까움</b><br>겉보기 등급 = 절대 등급 → <b>10 pc</b><br>겉보기 등급 &gt; 절대 등급 → <b>10 pc보다 멂</b><br>(겉보기 등급 − 절대 등급)이 클수록 멀리 있는 별</p></div>
              <div class="box box-exam"><p>북극성은 실제로 시리우스보다 밝지만(절대 등급 −3.7 &lt; 1.4) 밤하늘에서는 시리우스가 더 밝게 보인다(−1.5 &lt; 2.1). → 시리우스가 북극성보다 <b>훨씬 가까이</b> 있기 때문.</p></div>`,
          },
          {
            title: "별의 색과 표면 온도",
            goals: ["별의 색과 표면 온도와의 관계를 설명할 수 있다."],
            html: `
              <p>전기난로의 니크롬선은 온도가 낮을 때 붉은색을 띠다가 온도가 높아지면 점차 노란색으로 변한다. 물체의 온도에 따라 방출하는 빛의 색이 달라지듯, <b>별의 색도 표면 온도에 따라 달라진다.</b></p>
              <ul>
                <li>표면 온도가 낮은 별: 파란색보다 <b>붉은색 빛</b>을 많이 방출 → 붉게 보임</li>
                <li>표면 온도가 높은 별: 붉은색보다 <b>파란색 빛</b>을 많이 방출 → 파랗게 보임</li>
              </ul>
              <figure class="dia">${svgColor}<figcaption>그림 VIII-7 별의 색과 표면 온도</figcaption></figure>
              <div class="box box-key"><p>표면 온도: 적색 &lt; 주황색 &lt; 황색 &lt; 황백색 &lt; 백색 &lt; 청백색 &lt; 청색<br>오리온자리: <b>리겔(청백색) &gt; 태양(황색) &gt; 베텔게우스(적색)</b></p></div>
              <div class="box box-exam"><p>온도계가 없던 대장간에서는 달군 쇳덩이의 <b>색</b>을 보고 온도를 추정했다 (온도가 높을수록 붉은색 → 노란색·흰색 쪽).</p></div>`,
          },
        ],
      },
      {
        title: "우리은하와 우주",
        lessons: [
          {
            title: "우리은하의 구조와 크기",
            goals: ["우리은하의 구조와 크기를 설명할 수 있다."],
            html: `
              <p>수천억 개의 별이 모여 있는 거대한 천체를 <span class="kw">은하</span>, 태양계가 속해 있는 은하를 <span class="kw">우리은하</span>라고 한다. 띠 모양의 <b>은하수</b>는 지구에서 본 우리은하의 일부이다.</p>
              <div class="box box-lab"><p><b>별의 분포 예상하기</b>: 길이가 다른 철사에 스타이로폼 공(별)을 꽂고 검은 우드록(천구)을 배경으로 앞에서 촬영 → 별이 납작한 원반에 분포하고 그 안에서 보면 <b>띠 모양</b>으로 보인다.</p></div>
              <figure class="dia">${svgGalaxy}<figcaption>그림 VIII-9 우리은하의 모양(상상도)</figcaption></figure>
              <ul>
                <li>별 약 <b>2000억 개</b>로 이루어진 거대한 집단</li>
                <li><b>위에서 보면</b>: 은하 중심을 가로지르는 <b>막대 모양 구조</b> + 소용돌이 모양의 <span class="kw">나선팔</span></li>
                <li><b>옆에서 보면</b>: 중심부가 약간 볼록한 <b>원반 모양</b></li>
                <li>지름 약 <b>30000 pc</b>, 태양계는 중심에서 약 <b>8500 pc</b> 떨어진 <b>나선팔</b>에 위치</li>
              </ul>
              <div class="box box-exam"><p>북반구에서 <b>여름철</b>에는 은하 중심부 방향을 바라보므로 겨울철보다 은하수가 <b>더 넓고 뚜렷하게</b> 보인다.</p></div>`,
          },
          {
            title: "우리은하의 구성 천체",
            goals: ["우리은하를 구성하는 천체의 종류와 특징을 설명할 수 있다.", "성운과 성단의 특징을 비교하여 설명할 수 있다."],
            html: `
              <p>별과 별 사이 공간의 가스와 티끌을 <span class="kw">성간 물질</span>, 성간 물질이 많이 모여 구름처럼 뿌옇게 보이는 천체를 <span class="kw">성운</span>이라고 한다.</p>
              <div class="table-wrap"><table class="t">
                <tr><th>성운</th><th>원리</th><th>색</th><th>예</th></tr>
                <tr><td>방출 성운</td><td>주변 별빛에 의해 <b>가열되어 스스로 빛</b>을 냄</td><td>주로 붉은색</td><td>초승달 성운</td></tr>
                <tr><td>반사 성운</td><td>주변 별빛을 <b>반사</b>하여 밝게 보임</td><td>주로 푸른색</td><td>마귀할멈 성운</td></tr>
                <tr><td>암흑 성운</td><td>뒤쪽에서 오는 별빛을 <b>가로막아</b> 어둡게 보임</td><td>어두움</td><td>말머리 성운</td></tr>
              </table></div>
              <p>많은 별이 모인 집단을 <span class="kw">성단</span>이라 한다.</p>
              <div class="table-wrap"><table class="t">
                <tr><th>구분</th><th>산개 성단</th><th>구상 성단</th></tr>
                <tr><td>별의 수</td><td>수십~수만 개</td><td>수만~수십만 개</td></tr>
                <tr><td>모양</td><td>비교적 듬성듬성</td><td>공 모양으로 빽빽</td></tr>
                <tr><td>별의 색</td><td>파란색 별이 상대적으로 많음</td><td>대부분 붉은색 별</td></tr>
                <tr><td>분포</td><td>주로 <b>나선팔</b></td><td>주로 <b>은하 중심부</b>·원반을 둘러싼 구형 공간</td></tr>
                <tr><td>예</td><td>NGC299, M44</td><td>NGC5139, M5</td></tr>
              </table></div>
              <div class="box box-key"><p><b>성운과 산개 성단</b>은 주로 우리은하의 <b>나선팔</b>에, <b>구상 성단</b>은 주로 <b>은하 중심부 또는 원반을 둘러싼 구형의 공간</b>에 분포한다.</p></div>
              <div class="box box-exam"><p>궁수자리 M8 성운까지 거리 약 1250 pc → 은하 중심(약 8500 pc)보다 훨씬 가까우므로 <b>나선팔</b>에 있다. 방출 성운이 붉다고 해서 반사 성운(푸름)보다 온도가 낮다고 판단하면 안 된다 — 반사 성운은 스스로 빛을 내지 않고 별빛을 반사할 뿐!</p></div>`,
          },
          {
            title: "팽창하는 우주",
            goals: ["모형을 이용하여 우주가 팽창하고 있음을 설명할 수 있다.", "외부 은하들이 우리은하로부터 멀어지고 있음을 설명할 수 있다."],
            html: `
              <p>우리은하와 비슷한 규모로 우주에 수없이 많이 존재하는 은하를 <span class="kw">외부 은하</span>라고 한다. <b>허블</b>은 외부 은하들이 우리은하로부터 멀어진다는 사실로 우주가 팽창함을 알아냈다.</p>
              <div class="box box-lab"><p><b>풍선 모형</b>: 풍선에 붙임딱지 ㄱ, ㄴ, ㄷ을 붙이고 바람을 더 불어 넣으면 <b>모든 붙임딱지 사이의 간격이 멀어진다</b>.<br>풍선 표면 = <b>우주 공간</b>, 붙임딱지 = <b>은하</b></p></div>
              <ul>
                <li>은하들이 실제로 움직여 멀어지는 것이 아니라 <b>우주 공간이 팽창</b>하기 때문이다.</li>
                <li>우주는 모든 지점에서 <b>균일하게</b> 팽창하므로 어느 곳에서 관측해도 외부 은하가 멀어진다.</li>
                <li>→ 우주는 우리은하를 중심으로 팽창하는 것이 아니며, <span class="kw">팽창하는 우주에는 중심이 없다.</span></li>
              </ul>
              <div class="box box-warn"><p>풍선 모형에서 붙임딱지 <b>크기는 변하지 않는다</b>(은하 자체가 커지는 것이 아님). 풍선 내부는 우주의 중심이 아니다 — 우주는 '표면'만!</p></div>
              <div class="box box-key"><p><b>안드로메다 은하의 발견</b>: 섀플리(우리은하 안 성운) vs 커티스(우리은하 밖 천체) 대논쟁 → 1924년 허블이 윌슨산 천문대 망원경으로 거리를 측정해 우리은하 밖 <b>외부 은하</b>임을 밝힘. 과학 지식은 새로운 증거에 따라 바뀔 수 있다.</p></div>`,
          },
          {
            title: "우주 탐사",
            goals: ["우주 탐사의 의의와 우주 탐사가 인류에 미친 영향을 조사하여 과학의 유용성을 설명할 수 있다."],
            html: `
              <div class="table-wrap"><table class="t">
                <tr><th>1957</th><th>1969</th><th>1990</th><th>1998</th><th>2015</th><th>2023</th></tr>
                <tr><td>최초의 인공위성 스푸트니크 1호</td><td>아폴로 11호 달 착륙</td><td>허블 우주 망원경 발사</td><td>국제 우주 정거장 건설</td><td>뉴호라이즌스호 명왕성 통과</td><td>목성 위성 탐사선 주스호 발사</td></tr>
              </table></div>
              <h4>우주 탐사의 의의와 영향</h4>
              <ul>
                <li>우주에 대한 <b>이해의 폭을 넓히고 호기심</b>을 해결했다.</li>
                <li>우주 탐사를 위해 개발한 첨단 기술과 지식이 다양한 산업에 응용되어 <b>일상생활이 편리</b>해지고 삶의 질이 높아졌다.</li>
                <li>미래에 환경오염, 자원 부족 문제 해결에 도움, 인류가 살 수 있는 공간 탐색</li>
              </ul>
              <div class="table-wrap"><table class="t">
                <tr><th>우주 기술</th><th>일상생활 이용</th></tr>
                <tr><td>인공위성·우주선의 태양 전지</td><td>태양 전지</td></tr>
                <tr><td>인공위성 안테나의 형상 기억 합금</td><td>인공 관절</td></tr>
                <tr><td>먼 천체의 온도 측정 기술</td><td>적외선 온도계</td></tr>
                <tr><td>우주 비행사 충격 보호</td><td>메모리 폼</td></tr>
              </table></div>
              <p>퍼서비어런스(2021년 화성 착륙): 생명체 거주 가능성·환경 조사, 화성 바람 소리 녹음, 토양 채취, 화성 대기로 산소 생성 성공.</p>`,
          },
        ],
      },
    ],
    labs: [
      { title: "연주 시차 ↔ 거리 시뮬레이터", desc: "별까지의 거리를 바꾸며 연주 시차가 어떻게 달라지는지 확인해 보세요.", mount: labParallax },
      { title: "등급 계산기", desc: "등급 차이에 따른 밝기 배수, 그리고 겉보기 등급과 절대 등급으로 별이 10 pc보다 가까운지 먼지를 판단해 보세요.", mount: labMagnitude },
      { title: "별의 색과 표면 온도", desc: "표면 온도를 바꾸며 별의 색이 어떻게 변하는지 관찰해 보세요.", mount: labColor },
      { title: "풍선 모형으로 보는 우주 팽창", desc: "풍선을 부풀리고, 관측자 은하를 바꿔 가며 거리 변화를 비교해 보세요.", mount: labExpand },
    ],
    flash: [
      ["시차", "관측자 위치가 달라질 때 먼 배경에 대해 가까운 물체의 위치가 다르게 보이는 <b>각도</b>"],
      ["연주 시차", "6개월 간격으로 관측한 별의 시차의 <b>1/2</b>"],
      ["연주 시차와 거리", "거리가 가까울수록 크고, 멀수록 작다 (반비례)"],
      ["1 pc(파섹)", "연주 시차가 <b>1″</b>인 별까지의 거리 ≈ 3.26 광년"],
      ["1° = ?″", "1° = 60′ = <b>3600″</b>"],
      ["거리와 밝기", "밝기 ∝ 1/거리² (거리 2배 → 1/4배)"],
      ["1등급 차이", "약 <b>2.5배</b> 밝기 차이"],
      ["1등급과 6등급", "1등급이 6등급보다 <b>100배</b> 밝다"],
      ["겉보기 등급", "우리 눈에 보이는 밝기를 등급으로 나타낸 것"],
      ["절대 등급", "별이 <b>10 pc</b>에 있다고 가정했을 때의 밝기 등급 → 실제 밝기 비교"],
      ["겉보기 등급 &gt; 절대 등급", "10 pc보다 <b>멀리</b> 있는 별"],
      ["별의 색과 표면 온도", "적 &lt; 주황 &lt; 황 &lt; 황백 &lt; 백 &lt; 청백 &lt; 청 (오른쪽일수록 고온)"],
      ["리겔 vs 베텔게우스", "리겔(청백색)이 베텔게우스(적색)보다 표면 온도가 높다"],
      ["우리은하", "태양계가 속한 은하, 별 약 2000억 개"],
      ["우리은하의 크기", "지름 약 30000 pc, 태양계는 중심에서 약 8500 pc (나선팔)"],
      ["우리은하 모양", "위: 막대 구조 + 나선팔 / 옆: 중심부가 볼록한 원반"],
      ["성간 물질", "별과 별 사이 공간의 가스와 티끌"],
      ["방출 성운", "별빛에 가열되어 스스로 빛을 냄 (주로 붉은색)"],
      ["반사 성운", "주변 별빛을 반사 (주로 푸른색)"],
      ["암흑 성운", "뒤쪽 별빛을 가로막아 어둡게 보임"],
      ["산개 성단", "수십~수만 개, 듬성듬성, 파란 별 多, 나선팔"],
      ["구상 성단", "수만~수십만 개, 공 모양 빽빽, 붉은 별, 중심부·구형 공간"],
      ["외부 은하", "우리은하 밖에 있는 은하"],
      ["우주 팽창", "우주 공간이 팽창 → 은하들이 서로 멀어짐, <b>중심이 없다</b> (허블)"],
      ["우주 기술 스핀오프", "태양 전지, 인공 관절(형상 기억 합금), 적외선 온도계, 메모리 폼"],
    ],
    ox: [
      ["시차는 관측자와 물체 사이의 거리가 가까울수록 크다.", true, "가까울수록 시차가 크고 멀수록 작다."],
      ["연주 시차는 6개월 간격으로 관측한 별의 시차와 같다.", false, "6개월 간격 시차의 1/2이 연주 시차이다."],
      ["어떤 별이 지구에서 멀어지면 연주 시차는 커진다.", false, "거리가 멀어지면 연주 시차는 작아진다."],
      ["연주 시차가 1″인 별까지의 거리는 1 pc이다.", true, "1 pc의 정의이다."],
      ["별에서 거리가 멀어질수록 같은 면적이 받는 별빛의 양은 증가한다.", false, "넓은 면적으로 퍼지므로 감소한다(거리의 제곱에 반비례)."],
      ["겉보기 등급이 작을수록 우리 눈에 밝게 보인다.", true, "등급의 숫자가 작을수록 밝다."],
      ["별의 실제 밝기는 겉보기 등급으로 비교한다.", false, "실제 밝기는 10 pc 기준인 절대 등급으로 비교한다."],
      ["10 pc 거리에 있는 별은 겉보기 등급과 절대 등급이 같다.", true, "절대 등급의 기준 거리가 10 pc이기 때문."],
      ["파란색을 띠는 별은 붉은색을 띠는 별보다 표면 온도가 높다.", true, "표면 온도가 높을수록 파란색을 띤다."],
      ["태양계는 우리은하의 중심부에 위치한다.", false, "중심에서 약 8500 pc 떨어진 나선팔에 위치한다."],
      ["우리은하를 옆에서 보면 중심부가 볼록한 원반 모양이다.", true, "위에서 보면 막대 구조와 나선팔이 보인다."],
      ["구상 성단은 주로 우리은하의 나선팔에 분포한다.", false, "나선팔에는 성운과 산개 성단이, 구상 성단은 중심부와 구형 공간에 분포."],
      ["반사 성운은 스스로 빛을 낸다.", false, "스스로 빛을 내는 것은 방출 성운, 반사 성운은 별빛을 반사한다."],
      ["팽창하는 우주의 중심은 우리은하이다.", false, "우주는 균일하게 팽창하며 중심이 없다."],
      ["풍선 모형에서 붙임딱지는 은하, 풍선 표면은 우주 공간에 해당한다.", true, "풍선이 커지면 붙임딱지 사이 거리가 멀어진다."],
      ["적외선 온도계는 우주 탐사 기술이 일상생활에 이용된 사례이다.", true, "먼 천체의 온도를 측정하는 기술을 응용했다."],
    ],
    mcq: [
      { q: "별의 연주 시차에 대한 설명으로 옳지 않은 것은?", c: ["별의 시차의 절반에 해당하는 값이다.", "별의 위치를 6개월 간격으로 관측한 값이다.", "연주 시차가 1″인 별까지의 거리를 1 pc이라고 한다.", "별까지의 거리가 가까울수록 연주 시차가 크다.", "지구가 태양 주위를 공전하기 때문에 나타난다."], a: 1, e: "6개월 간격으로 관측한 시차의 '1/2'이 연주 시차이다.", lv: 2, tag: "연주 시차" },
      { q: "6개월 간격으로 관측했더니 별 A가 기준 별 B의 왼쪽 0.06″ 위치에서 오른쪽 0.04″ 위치로 이동했다. 별 A의 연주 시차는? (B는 위치 변화 없음)", c: ["0.02″", "0.05″", "0.1″", "0.2″", "0.5″"], a: 1, e: "시차 = 0.06 + 0.04 = 0.1″, 연주 시차 = 0.1 ÷ 2 = 0.05″", lv: 3, tag: "연주 시차 계산" },
      { q: "연주 시차가 1″인 별 (가)와 거리가 0.5 pc인 별 (나) 중 지구에서 더 가까운 별과 그 별의 연주 시차는?", c: ["(가), 1″", "(가), 0.5″", "(나), 2″", "(나), 0.5″", "같은 거리"], a: 2, e: "(가)는 1 pc, (나)는 0.5 pc. 연주 시차 = 1 ÷ 0.5 = 2″", lv: 2, tag: "연주 시차" },
      { q: "같은 별을 거리 r에서 볼 때의 밝기는 거리 3r에서 볼 때의 몇 배인가?", c: ["2배", "3배", "4배", "9배", "16배"], a: 3, e: "밝기 ∝ 1/거리². 거리비 1:3 → 밝기비 9:1", lv: 2, tag: "거리와 밝기" },
      { q: "2등급인 별은 7등급인 별보다 약 몇 배 밝은가?", c: ["2.5배", "5배", "10배", "50배", "100배"], a: 4, e: "5등급 차이 = 약 100배", lv: 2, tag: "등급" },
      { q: "별의 밝기와 등급에 대해 옳은 것을 모두 고르면?\n<br>ㄱ. 1등급은 6등급보다 100배 밝다. ㄴ. 별의 실제 밝기는 겉보기 등급으로 비교할 수 있다. ㄷ. 10 pc의 거리에 있는 별은 겉보기 등급과 절대 등급이 같다.", c: ["ㄱ", "ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄱ, ㄴ, ㄷ"], a: 2, e: "ㄴ: 실제 밝기는 절대 등급으로 비교한다.", lv: 2, tag: "등급" },
      { q: "별 A(겉보기 2, 절대 −2), B(겉보기 1, 절대 3), C(겉보기 −2, 절대 1)에 대한 설명으로 옳은 것은?", c: ["맨눈으로 볼 때 A가 B보다 밝다.", "지구에서 가장 멀리 있는 별은 A이다.", "실제 밝기는 B가 C보다 밝다.", "C는 10 pc보다 멀리 있다.", "B는 10 pc에 있다."], a: 1, e: "A만 겉보기 > 절대 → 10 pc보다 멂. 겉보기로는 B(1)가 A(2)보다 밝고, 절대 등급은 C(1)가 B(3)보다 밝다.", lv: 3, tag: "등급 해석" },
      { q: "리겔(겉보기 0.13, 절대 −7.8), 북극성(2.1, −3.7), 시리우스(−1.5, 1.4) 중 실제로 가장 밝은 별은?", c: ["리겔", "북극성", "시리우스", "모두 같다", "알 수 없다"], a: 0, e: "실제 밝기 = 절대 등급이 가장 작은 리겔. (가장 밝게 보이는 별은 시리우스)", lv: 2, tag: "등급" },
      { q: "붉은빛 별 (가), 청백색 별 (나), 노란빛 별 (다)를 표면 온도가 높은 순서로 나열한 것은?", c: ["(가)>(나)>(다)", "(가)>(다)>(나)", "(나)>(가)>(다)", "(나)>(다)>(가)", "(다)>(나)>(가)"], a: 3, e: "청백색 > 황색 > 적색", lv: 1, tag: "색과 온도" },
      { q: "우리은하에 대한 설명으로 옳지 않은 것은?", c: ["태양계가 속한 은하이다.", "수많은 별로 이루어진 천체 집단이다.", "별들이 전체적으로 매우 고르게 분포한다.", "성운과 성단이 구성원으로 있다.", "은하수는 지구에서 본 우리은하의 일부이다."], a: 2, e: "별들은 납작한 원반 모양으로 분포한다.", lv: 1, tag: "우리은하" },
      { q: "우리은하의 크기와 태양계의 위치로 옳은 것은?", c: ["지름 약 10000 pc, 중심부", "지름 약 30000 pc, 중심부", "지름 약 30000 pc, 중심에서 약 8500 pc 나선팔", "지름 약 8500 pc, 나선팔 끝", "지름 약 100000 pc, 중심에서 약 30000 pc"], a: 2, e: "지름 약 30000 pc, 태양계는 중심에서 약 8500 pc 떨어진 나선팔.", lv: 1, tag: "우리은하" },
      { q: "구상 성단 (가)와 산개 성단 (나)를 비교할 때 (가)가 (나)보다 큰 값을 갖는 것은?\n<br>ㄱ. 별의 평균 표면 온도 ㄴ. 성단을 구성하는 별의 수 ㄷ. 나선팔에 분포하는 성단의 수", c: ["ㄱ", "ㄴ", "ㄷ", "ㄱ, ㄴ", "ㄴ, ㄷ"], a: 1, e: "구상 성단: 붉은 별(저온), 별의 수 많음, 주로 중심부·구형 공간에 분포.", lv: 3, tag: "성단" },
      { q: "별이 빽빽한 하늘에서 일부 영역만 별이 거의 보이지 않았다. 이 영역에 있는 천체는?", c: ["방출 성운", "반사 성운", "암흑 성운", "산개 성단", "구상 성단"], a: 2, e: "암흑 성운은 뒤쪽 별빛을 가로막아 어둡게 보인다.", lv: 1, tag: "성운" },
      { q: "풍선 모형 실험에 대한 설명으로 옳은 것은?", c: ["풍선은 은하를 나타낸다.", "붙임딱지는 별을 나타낸다.", "풍선 내부는 우주 팽창의 중심이다.", "풍선이 팽창하면 붙임딱지 크기가 커진다.", "풍선이 팽창할 때 붙임딱지 사이의 간격이 멀어진다."], a: 4, e: "풍선 표면 = 우주 공간, 붙임딱지 = 은하. 은하 사이 거리가 멀어진다.", lv: 1, tag: "우주 팽창" },
      { q: "우주 탐사의 목적과 의의로 옳은 것을 모두 고르면?\n<br>ㄱ. 과학기술 발전에 도움을 준다. ㄴ. 우주에 대한 호기심을 해결한다. ㄷ. 실생활에 유용하게 활용할 수 없다.", c: ["ㄱ", "ㄴ", "ㄱ, ㄴ", "ㄴ, ㄷ", "ㄱ, ㄴ, ㄷ"], a: 2, e: "우주 기술은 태양 전지, 인공 관절 등 실생활에 활용된다.", lv: 1, tag: "우주 탐사" },
      { q: "지구에서 약 1250 pc 떨어진 M8 성운(궁수자리, 은하 중심 방향)의 위치로 가장 알맞은 곳은?", c: ["은하 중심부", "나선팔", "원반을 둘러싼 구형 공간", "외부 은하", "태양계 내부"], a: 1, e: "은하 중심까지 약 8500 pc인데 1250 pc로 훨씬 가깝다. 성운은 주로 나선팔에 분포.", lv: 3, tag: "적용" },
    ],
    essay: [
      { q: "어떤 별이 지구에서 멀어지고 있다면 이 별의 연주 시차는 어떻게 변할지 그 까닭과 함께 설명하시오.", lv: 1, pts: 6, tag: "교과서 스스로 확인하기",
        kw: [["작아", "감소"], ["거리"], ["멀수록", "멀어질수록", "반비례"]],
        model: "연주 시차는 별까지의 거리가 멀수록 작아지므로(거리에 반비례), 별이 멀어지면 연주 시차는 점점 작아진다.",
        rubric: [["6점", "작아진다 + 거리와 연주 시차의 반비례 관계를 서술"], ["3점", "작아진다만 서술"]] },
      { q: "연주 시차를 측정하여 별까지의 거리를 구하는 방법은 비교적 가까운 별에만 이용할 수 있다. 그 까닭을 설명하시오.", lv: 2, pts: 6, tag: "창작 문항",
        kw: [["멀리", "먼 별"], ["연주 시차가", "연주시차"], ["작", "측정하기 어렵", "측정이 어렵"]],
        model: "멀리 있는 별일수록 연주 시차가 매우 작아져 측정하기 어렵기 때문이다.",
        rubric: [["6점", "먼 별은 연주 시차가 너무 작아 측정이 어렵다는 내용"], ["3점", "'측정이 어렵다'만 서술"]] },
      { q: "북극성(겉보기 등급 2.1, 절대 등급 −3.7)은 시리우스(겉보기 등급 −1.5, 절대 등급 1.4)보다 실제로 밝지만, 밤하늘에서는 시리우스가 더 밝게 보인다. 그 까닭을 별까지의 거리와 관련지어 설명하시오.", lv: 2, pts: 10, tag: "분석해 보기",
        kw: [["절대 등급"], ["겉보기 등급"], ["시리우스"], ["가까"], ["10 pc", "10pc"]],
        model: "실제 밝기를 나타내는 절대 등급은 북극성이 더 작아 북극성이 실제로 더 밝다. 하지만 시리우스는 겉보기 등급이 절대 등급보다 작아 10 pc보다 가까이 있고, 북극성은 겉보기 등급이 절대 등급보다 커 10 pc보다 멀리 있다. 즉, 시리우스가 북극성보다 지구에 훨씬 가까이 있기 때문에 더 밝게 보인다.",
        rubric: [["10점", "절대·겉보기 등급 비교 + 시리우스가 더 가깝다는 근거(10 pc 기준)까지 서술"], ["6점", "시리우스가 더 가깝다는 결론만 서술"], ["3점", "등급 비교만 서술"]],
        tip: "등급은 '숫자가 작을수록 밝다'를 반드시 반영해서 쓰기!" },
      { q: "겉보기 등급과 절대 등급이 같은 별이 지구로부터 멀어진다면, 이 별의 (겉보기 등급 − 절대 등급) 값은 어떻게 변하는지 설명하시오.", lv: 3, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["절대 등급은 변하지", "절대 등급은 일정", "절대 등급은 그대로"], ["겉보기 등급", "어두워"], ["커"]],
        model: "처음에는 10 pc에 있는 별이다. 별이 멀어져도 실제 밝기인 절대 등급은 변하지 않지만, 어둡게 보이므로 겉보기 등급은 커진다. 따라서 (겉보기 등급 − 절대 등급) 값은 점점 커진다.",
        rubric: [["8점", "절대 등급 불변 + 겉보기 등급 증가 + 차이 증가를 모두 서술"], ["4점", "차이가 커진다는 결론만 서술"]] },
      { q: "별 A(100 pc, 청색), B(7.7 pc, 적색), C(2.6 pc, 청백색), D(1.3 pc, 주황색)가 있다. (1) 태양(황색)보다 표면 온도가 낮은 별을 모두 쓰고 까닭을 설명하고, (2) 겉보기 등급이 절대 등급보다 큰 별을 고르고 까닭을 설명하시오.", lv: 3, pts: 10, tag: "과학 역량",
        kw: [["B"], ["D"], ["적색", "주황색"], ["A"], ["10 pc보다 멀", "10pc보다 멀", "10 pc보다 먼"]],
        model: "(1) B, D. 별은 표면 온도가 낮을수록 붉은색을 띠며, 적색과 주황색은 황색보다 표면 온도가 낮은 별의 색이기 때문이다. (2) A. 겉보기 등급이 절대 등급보다 큰 별은 10 pc보다 멀리 있는 별인데, A만 100 pc으로 10 pc보다 멀리 있기 때문이다.",
        rubric: [["10점", "(1) B·D와 색-온도 관계, (2) A와 10 pc 기준을 모두 서술"], ["5점", "(1), (2) 중 하나만 정확"]] },
      { q: "옛날 대장간에서는 온도계 없이 쇳덩이를 적절한 온도까지 달궈 철 제품을 만들었다. 대장장이들이 쇳덩이의 온도를 어떻게 추정했을지 색과 관련지어 설명하시오.", lv: 1, pts: 6, tag: "교과서 스스로 확인하기",
        kw: [["색"], ["온도가 높", "온도가 올라"], ["붉은색", "빨간색"], ["노란색", "흰색", "하얀색"]],
        model: "물체는 온도에 따라 방출하는 빛의 색이 달라진다. 쇳덩이는 온도가 낮을 때 붉은색을 띠다가 온도가 높아질수록 노란색, 흰색으로 변하므로 쇳덩이의 색을 보고 온도를 추정했을 것이다.",
        rubric: [["6점", "온도에 따른 색 변화 방향(붉은색→노란색·흰색)을 서술"], ["3점", "색으로 추정했다는 것만 서술"]] },
      { q: "북반구에서 여름철에 보이는 은하수가 겨울철보다 더 넓고 뚜렷하게 보이는 까닭을 우리은하의 구조와 태양계의 위치와 관련지어 설명하시오.", lv: 2, pts: 8, tag: "창작 문항",
        kw: [["원반"], ["나선팔", "8500"], ["은하 중심", "중심부"], ["여름"], ["별이 많", "별들이 많", "많은 별"]],
        model: "우리은하는 중심부가 볼록한 원반 모양이고 태양계는 중심에서 약 8500 pc 떨어진 나선팔에 있다. 여름철 밤에는 별이 많이 모여 있는 은하 중심부 방향을 바라보므로 겨울철보다 은하수가 더 넓고 뚜렷하게 보인다.",
        rubric: [["8점", "원반 구조·태양계 위치 + 여름철에 은하 중심 방향을 본다는 내용"], ["4점", "여름철에 은하 중심 방향을 본다는 것만 서술"]] },
      { q: "태양계가 우리은하 중심부에 위치해 있다면 지구에서 은하수는 어떻게 보일지 설명하시오.", lv: 3, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["띠"], ["모든 방향", "어느 방향", "한 바퀴", "고르게", "비슷"], ["원반"]],
        model: "우리은하는 원반 모양이므로 중심부에서 보더라도 은하수는 하늘을 한 바퀴 두르는 띠 모양으로 보일 것이다. 다만 원반의 중심에 있으므로 어느 방향을 보아도 띠의 폭과 밝기가 비슷하게(고르게) 보일 것이다.",
        rubric: [["8점", "띠 모양 + 방향에 따라 차이가 없이 고르게 보임을 서술"], ["4점", "띠 모양만 서술"]] },
      { q: "산개 성단과 구상 성단의 차이점을 (1) 별의 수와 모여 있는 모양, (2) 별의 색, (3) 우리은하에서의 분포 측면에서 비교하여 서술하시오.", lv: 2, pts: 10, tag: "개념 비교",
        kw: [["듬성듬성"], ["공 모양", "빽빽"], ["파란"], ["붉은"], ["나선팔"], ["중심부", "구형"]],
        model: "(1) 산개 성단은 수십~수만 개의 별이 비교적 듬성듬성 모여 있고, 구상 성단은 수만~수십만 개의 별이 공 모양으로 빽빽하게 모여 있다. (2) 산개 성단은 파란색 별이 상대적으로 많고, 구상 성단은 대부분 붉은색 별로 이루어져 있다. (3) 산개 성단은 주로 나선팔에, 구상 성단은 주로 은하 중심부나 은하 원반을 둘러싼 구형의 공간에 분포한다.",
        rubric: [["10점", "세 가지 측면을 두 성단 모두에 대해 정확히 비교"], ["6점", "두 가지 측면만 비교"], ["3점", "한 가지 측면만 비교"]] },
      { q: "남십자자리 부근 사진에서 별이 많은 하늘 가운데 별이 거의 보이지 않는 어두운 영역이 있다. 이 영역에 있는 성운의 종류를 쓰고, 그렇게 보이는 까닭을 설명하시오.", lv: 2, pts: 8, tag: "과학 역량",
        kw: [["암흑 성운"], ["성간 물질"], ["가로막", "가려", "막아"], ["뒤쪽", "뒤에서"]],
        model: "암흑 성운이다. 성간 물질이 많이 모여 뒤쪽에서 오는 별빛을 가로막기 때문에 그 부분만 별이 없는 것처럼 어둡게 보인다.",
        rubric: [["8점", "암흑 성운 + 성간 물질이 뒤쪽 별빛을 가로막는다는 까닭"], ["4점", "암흑 성운만 씀"]] },
      { q: "붉은색의 방출 성운과 파란색의 반사 성운이 있다. 별의 색과 표면 온도의 관계를 그대로 적용해 '반사 성운이 방출 성운보다 온도가 높다'고 판단하면 안 되는 까닭을 설명하시오.", lv: 3, pts: 10, tag: "과학 글쓰기",
        kw: [["방출 성운"], ["스스로 빛"], ["반사 성운"], ["반사"], ["가열"]],
        model: "별의 색과 표면 온도의 관계는 스스로 빛을 내는 천체에 적용된다. 방출 성운은 주변 별빛에 의해 가열되어 스스로 빛을 내지만, 반사 성운은 스스로 빛을 내지 않고 주변의 별빛을 반사하여 밝게 보일 뿐이다. 따라서 반사 성운이 파랗게 보인다고 온도가 높다고 할 수 없으며, 오히려 가열되어 스스로 빛을 내는 방출 성운의 온도가 더 높다고 볼 수 있다.",
        rubric: [["10점", "방출(가열·스스로 빛)과 반사(별빛 반사)의 차이로 색-온도 관계를 적용할 수 없음을 서술"], ["5점", "반사 성운은 스스로 빛을 내지 않는다는 것만 서술"]],
        hint: "두 성운이 각각 '어떻게' 빛나는지 생각해 보세요." },
      { q: "외부 은하들이 우리은하로부터 멀어지고 있다는 관측 사실로부터 '우리은하가 우주의 중심'이라고 결론 내릴 수 없는 까닭을 풍선 모형을 이용하여 설명하시오.", lv: 3, pts: 10, tag: "창작 문항",
        kw: [["풍선 표면", "풍선"], ["은하", "붙임딱지"], ["우주 공간", "공간"], ["팽창"], ["어느", "모든"], ["중심이 없"]],
        model: "풍선에 붙임딱지를 붙이고 부풀리면 어느 붙임딱지에서 보아도 다른 붙임딱지가 모두 멀어진다. 풍선 표면은 우주 공간, 붙임딱지는 은하에 해당하므로 우주 공간이 균일하게 팽창하면 우주의 어느 은하에서 관측하더라도 다른 은하들이 멀어지는 것으로 관측된다. 따라서 팽창하는 우주에는 중심이 없으며, 우리은하가 중심이라고 할 수 없다.",
        rubric: [["10점", "모형 대응(표면=공간, 붙임딱지=은하) + 어디서나 멀어짐 + 중심 없음을 서술"], ["6점", "어디서나 멀어짐 + 중심 없음만 서술"], ["3점", "중심이 없다는 결론만 서술"]] },
      { q: "우주 탐사보다 사회 문제 해결이 더 급하므로 우주 탐사 예산을 줄이자는 의견이 있다. 우주 탐사의 의의와 실생활에 적용된 사례를 근거로 들어 자신의 주장을 서술하시오.", lv: 2, pts: 10, tag: "의사 결정 (열린 답)",
        kw: [["호기심", "이해"], ["태양 전지", "인공 관절", "적외선 온도계", "메모리 폼"], ["생활", "산업"], ["자원", "환경"]],
        model: "(예시: 반대) 우주 탐사는 우주에 대한 이해를 넓히고 호기심을 해결할 뿐 아니라, 우주 탐사를 위해 개발한 기술이 태양 전지, 인공 관절, 적외선 온도계, 메모리 폼처럼 산업과 일상생활에 응용되어 삶의 질을 높였다. 또 미래에는 자원 부족, 환경오염 문제 해결에도 도움이 될 수 있으므로 예산을 줄이는 것은 바람직하지 않다.",
        rubric: [["10점", "입장이 분명하고 의의와 구체적 사례를 2가지 이상 근거로 제시"], ["6점", "입장 + 근거 1가지"], ["3점", "입장만 제시"]],
        tip: "찬성 입장도 가능해요. 다만 반드시 교과서 내용(의의·사례)을 근거로 활용해야 해요." },
    ],
  };
})();
