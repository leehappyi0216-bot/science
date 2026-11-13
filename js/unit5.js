/* V. 식물과 에너지 (교과서 168~197쪽) */
(function () {
  const U = (window.UNITS = window.UNITS || {});

  const svgPhoto = `<svg viewBox="0 0 620 240" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="14">
    <defs><marker id="a5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    <ellipse cx="310" cy="130" rx="150" ry="85" fill="#c7efcf" stroke="#2f9e44" stroke-width="3"/>
    <text x="310" y="72" text-anchor="middle" font-weight="800" fill="#1b5e20">엽록체 (엽록소가 빛 흡수)</text>
    <text x="310" y="125" text-anchor="middle" font-weight="800" font-size="17" fill="#1b5e20">이산화 탄소 + 물 → 포도당 + 산소</text>
    <text x="310" y="160" text-anchor="middle" fill="#1b5e20">포도당 → 녹말(엽록체에 저장)</text>
    <g color="#f59f00"><circle cx="310" cy="18" r="13" fill="#ffd43b"/><line x1="310" y1="32" x2="310" y2="45" stroke="#f59f00" stroke-width="3" marker-end="url(#a5)"/></g>
    <text x="340" y="24" fill="#e67700" font-weight="700">빛에너지</text>
    <g color="#495057"><line x1="40" y1="95" x2="158" y2="110" stroke="#495057" stroke-width="3" marker-end="url(#a5)"/></g>
    <text x="20" y="85" fill="#495057" font-weight="700">이산화 탄소</text><text x="20" y="104" fill="#868e96" font-size="12">잎의 기공으로</text>
    <g color="#1c7ed6"><line x1="40" y1="190" x2="165" y2="160" stroke="#1c7ed6" stroke-width="3" marker-end="url(#a5)"/></g>
    <text x="20" y="210" fill="#1c7ed6" font-weight="700">물</text><text x="20" y="228" fill="#868e96" font-size="12">뿌리 → 물관</text>
    <g color="#0ca678"><line x1="462" y1="115" x2="585" y2="95" stroke="#0ca678" stroke-width="3" marker-end="url(#a5)"/></g>
    <text x="500" y="85" fill="#0ca678" font-weight="700">산소</text><text x="500" y="135" fill="#868e96" font-size="12">기공으로 나감</text>
  </svg>`;

  const svgFactors = `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    ${[["빛의 세기", "#f08c00", "M20,150 C50,60 80,45 170,42"], ["이산화 탄소의 농도", "#868e96", "M20,150 C55,70 90,50 170,46"], ["온도", "#2f9e44", "M20,148 C80,130 120,60 135,40 C145,30 152,90 165,150"]].map(([t, c, d], i) => `
      <g transform="translate(${i * 200},0)">
        <line x1="20" y1="20" x2="20" y2="150" stroke="currentColor" stroke-opacity=".5"/><line x1="20" y1="150" x2="180" y2="150" stroke="currentColor" stroke-opacity=".5"/>
        <path d="${d}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
        <text x="8" y="14" fill="currentColor" opacity=".7">광합성량</text>
        <text x="100" y="172" text-anchor="middle" fill="${c}" font-weight="800">${t} →</text>
      </g>`).join("")}
  </svg>`;

  const svgGas = `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="14">
    <defs><marker id="g5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    <rect x="5" y="5" width="285" height="190" rx="16" fill="#d0ebff"/><rect x="310" y="5" width="285" height="190" rx="16" fill="#364fc7"/>
    <circle cx="255" cy="35" r="16" fill="#ffd43b"/><circle cx="560" cy="35" r="13" fill="#fff9db"/><circle cx="553" cy="31" r="12" fill="#364fc7"/>
    <text x="30" y="34" font-weight="800" fill="#1864ab">낮 (빛이 강할 때)</text><text x="335" y="34" font-weight="800" fill="#fff">밤</text>
    <rect x="105" y="70" width="90" height="34" rx="8" fill="#2f9e44"/><text x="150" y="92" text-anchor="middle" fill="#fff" font-weight="700">광합성 ≫</text>
    <rect x="115" y="130" width="70" height="30" rx="8" fill="#e8590c"/><text x="150" y="150" text-anchor="middle" fill="#fff" font-weight="700">호흡</text>
    <g color="#e67700"><line x1="20" y1="87" x2="100" y2="87" stroke="#e67700" stroke-width="3" marker-end="url(#g5)"/></g><text x="20" y="78" fill="#e67700" font-size="12" font-weight="700">CO₂ 흡수</text>
    <g color="#1971c2"><line x1="200" y1="87" x2="280" y2="87" stroke="#1971c2" stroke-width="3" marker-end="url(#g5)"/></g><text x="215" y="78" fill="#1971c2" font-size="12" font-weight="700">O₂ 방출</text>
    <rect x="415" y="95" width="70" height="30" rx="8" fill="#e8590c"/><text x="450" y="115" text-anchor="middle" fill="#fff" font-weight="700">호흡만</text>
    <g color="#74c0fc"><line x1="325" y1="110" x2="410" y2="110" stroke="#74c0fc" stroke-width="3" marker-end="url(#g5)"/></g><text x="325" y="100" fill="#74c0fc" font-size="12" font-weight="700">O₂ 흡수</text>
    <g color="#ffc078"><line x1="490" y1="110" x2="580" y2="110" stroke="#ffc078" stroke-width="3" marker-end="url(#g5)"/></g><text x="505" y="100" fill="#ffc078" font-size="12" font-weight="700">CO₂ 방출</text>
    <text x="150" y="185" text-anchor="middle" fill="#1864ab" font-size="12">호흡으로 생긴 CO₂는 광합성에 다시 쓰임</text>
  </svg>`;

  const svgCycle = `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="14">
    <defs><marker id="c5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    <ellipse cx="150" cy="110" rx="80" ry="50" fill="#2f9e44"/><text x="150" y="106" text-anchor="middle" fill="#fff" font-weight="800">엽록체</text><text x="150" y="126" text-anchor="middle" fill="#fff">광합성</text>
    <ellipse cx="450" cy="110" rx="80" ry="50" fill="#e8590c"/><text x="450" y="106" text-anchor="middle" fill="#fff" font-weight="800">마이토콘드리아</text><text x="450" y="126" text-anchor="middle" fill="#fff">호흡</text>
    <g color="#d6336c"><path d="M200,70 Q300,10 400,70" fill="none" stroke="#d6336c" stroke-width="3" marker-end="url(#c5)"/></g>
    <text x="300" y="32" text-anchor="middle" fill="#d6336c" font-weight="800">포도당 + 산소</text>
    <g color="#37b24d"><path d="M400,150 Q300,210 200,150" fill="none" stroke="#37b24d" stroke-width="3" marker-end="url(#c5)"/></g>
    <text x="300" y="205" text-anchor="middle" fill="#37b24d" font-weight="800">이산화 탄소 + 물</text>
    <text x="30" y="30" fill="#e67700" font-weight="800">빛에너지 흡수 ↘</text>
    <text x="470" y="200" fill="#e67700" font-weight="800">→ 에너지 방출</text>
  </svg>`;

  const svgStore = `<svg viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><marker id="s5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    <rect x="20" y="20" width="150" height="190" rx="14" fill="#e9f7ec" stroke="#2f9e44"/>
    <text x="95" y="45" text-anchor="middle" font-weight="800" fill="#2b8a3e">① 생성 (잎)</text>
    <text x="95" y="80" text-anchor="middle" fill="#2b8a3e">광합성 → 포도당</text>
    <text x="95" y="105" text-anchor="middle" fill="#2b8a3e">↓</text>
    <text x="95" y="130" text-anchor="middle" fill="#2b8a3e" font-weight="700">녹말 (엽록체 저장)</text>
    <text x="95" y="150" text-anchor="middle" fill="#2b8a3e" font-size="11">물에 녹지 않음</text>
    <text x="95" y="180" text-anchor="middle" fill="#2b8a3e">↓ 주로 밤</text>
    <text x="95" y="200" text-anchor="middle" fill="#2b8a3e" font-weight="700">설탕으로 바뀜</text>
    <g color="#d6336c"><line x1="175" y1="115" x2="225" y2="115" stroke="#d6336c" stroke-width="3" marker-end="url(#s5)"/></g>
    <rect x="230" y="20" width="120" height="190" rx="14" fill="#fff0f6" stroke="#d6336c"/>
    <text x="290" y="45" text-anchor="middle" font-weight="800" fill="#c2255c">② 이동</text>
    <rect x="262" y="60" width="18" height="135" rx="6" fill="#74c0fc"/><text x="271" y="208" text-anchor="middle" font-size="11" fill="#1971c2">물관↑</text>
    <rect x="300" y="60" width="18" height="135" rx="6" fill="#f783ac"/><text x="309" y="208" text-anchor="middle" font-size="11" fill="#c2255c">체관</text>
    <text x="290" y="130" text-anchor="middle" fill="#c2255c" font-weight="700" transform="rotate(-90 335 130)">설탕 이동</text>
    <g color="#d6336c"><line x1="355" y1="115" x2="405" y2="115" stroke="#d6336c" stroke-width="3" marker-end="url(#s5)"/></g>
    <rect x="410" y="20" width="170" height="190" rx="14" fill="#fff4e6" stroke="#e8590c"/>
    <text x="495" y="45" text-anchor="middle" font-weight="800" fill="#d9480f">③ 이용 · 저장</text>
    <text x="425" y="75" fill="#d9480f">• 호흡 → 에너지</text>
    <text x="425" y="98" fill="#d9480f">• 몸 구성 성분(성장)</text>
    <text x="425" y="121" fill="#d9480f">• 동물의 먹이</text>
    <text x="425" y="150" fill="#d9480f" font-weight="700">• 남은 양분 저장:</text>
    <text x="425" y="172" fill="#d9480f">녹말·단백질·지방</text>
    <text x="425" y="194" fill="#d9480f">포도당·설탕 등</text>
  </svg>`;

  /* ---------- labs ---------- */
  function labFactors(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <div class="seg" data-x>${["빛의 세기", "이산화 탄소 농도", "온도"].map((t, i) => `<button data-i="${i}" class="${i === 0 ? "active" : ""}">가로축: ${t}</button>`).join("")}</div>
        <label>☀️ 빛의 세기 <span data-v="0"></span></label><input type="range" min="0" max="100" value="40" data-k="0">
        <label>🫧 이산화 탄소 농도 <span data-v="1"></span></label><input type="range" min="0" max="100" value="70" data-k="1">
        <label>🌡️ 온도 <span data-v="2"></span></label><input type="range" min="0" max="50" value="25" data-k="2">
        <div class="lab-out" data-out></div>
      </div>
      <div class="lab-svg" data-svg></div></div>`;
    let xi = 0;
    const fL = (v) => 1 - Math.exp(-v / 22);
    const fT = (t) => (t <= 35 ? Math.exp(-Math.pow((t - 35) / 16, 2)) : Math.max(0, 1 - Math.pow((t - 35) / 9, 2)));
    const rate = (v) => 100 * fL(v[0]) * fL(v[1]) * fT(v[2]);
    const vals = () => Array.from(el.querySelectorAll("[data-k]")).map((i) => +i.value);
    const draw = () => {
      const v = vals();
      el.querySelector('[data-v="0"]').textContent = `${v[0]}%`;
      el.querySelector('[data-v="1"]').textContent = `${v[1]}%`;
      el.querySelector('[data-v="2"]').textContent = `${v[2]} °C`;
      const max = xi === 2 ? 50 : 100;
      const pts = [];
      for (let x = 0; x <= max; x += max / 80) { const w = v.slice(); w[xi] = x; pts.push([x, rate(w)]); }
      const X = (x) => 40 + (x / max) * 330, Y = (y) => 200 - y * 1.7;
      const cur = rate(v);
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 240" font-family="Pretendard,sans-serif" font-size="12">
        <line x1="40" y1="20" x2="40" y2="200" stroke="currentColor" opacity=".4"/><line x1="40" y1="200" x2="375" y2="200" stroke="currentColor" opacity=".4"/>
        <text x="8" y="16" fill="currentColor" opacity=".7">광합성량</text><text x="375" y="225" text-anchor="end" fill="currentColor" opacity=".8">${["빛의 세기", "이산화 탄소 농도", "온도(°C)"][xi]} →</text>
        <polyline fill="none" stroke="var(--u5)" stroke-width="3.5" points="${pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>
        <line x1="${X(v[xi])}" y1="200" x2="${X(v[xi])}" y2="${Y(cur)}" stroke="var(--u5)" stroke-dasharray="4 4"/>
        <circle cx="${X(v[xi])}" cy="${Y(cur)}" r="7" fill="#fff" stroke="var(--u5)" stroke-width="3"/></svg>`;
      const lim = [fL(v[0]), fL(v[1]), fT(v[2])];
      const names = ["빛의 세기", "이산화 탄소 농도", "온도"];
      const m = lim.indexOf(Math.min(...lim));
      let msg = `광합성량 <b>${cur.toFixed(0)}</b> (최대 100)<br>`;
      if (v[2] > 38) msg += "⚠️ 온도가 너무 높아 광합성량이 <b>빠르게 감소</b>하고 있어요.";
      else if (Math.min(...lim) > 0.93) msg += "세 요인이 모두 충분해 광합성량이 거의 <b>일정(최대)</b>해요. 엽록체 수가 한정되어 있어 더 늘지 않아요.";
      else msg += `지금은 <b>${names[m]}</b>이(가) 가장 부족해요. 이 요인을 높이면 광합성량이 가장 크게 늘어요.`;
      el.querySelector("[data-out]").innerHTML = msg;
    };
    el.querySelectorAll("[data-k]").forEach((i) => (i.oninput = draw));
    el.querySelectorAll("[data-x] button").forEach((b) => (b.onclick = () => { xi = +b.dataset.i; el.querySelectorAll("[data-x] button").forEach((x) => x.classList.toggle("active", x === b)); draw(); }));
    draw();
  }

  function labDayNight(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <label>🕐 시각 <span data-t></span></label><input type="range" min="0" max="24" step="0.5" value="12" data-time>
        <div class="lab-out" data-out></div>
        <p style="font-size:13px;color:var(--muted)">호흡량은 낮과 밤 관계없이 일정하다고 가정했어요. 광합성량은 빛의 세기(시각)에 따라 달라져요.</p>
      </div>
      <div class="lab-svg" data-svg></div></div>`;
    const draw = () => {
      const t = +el.querySelector("[data-time]").value;
      const light = t > 6 && t < 19 ? Math.sin(((t - 6) / 13) * Math.PI) : 0;
      const P = Math.round(100 * light), R = 25;
      el.querySelector("[data-t]").textContent = `${Math.floor(t)}시${t % 1 ? " 30분" : ""}`;
      const net = P - R;
      let gas;
      if (P === 0) gas = "빛이 없어 <b>호흡만</b> 일어나요 → <b>산소 흡수, 이산화 탄소 방출</b>";
      else if (net > 3) gas = "광합성 &gt; 호흡 → 식물 밖으로는 <b>이산화 탄소 흡수, 산소 방출</b>";
      else if (net < -3) gas = "빛이 약해 광합성 &lt; 호흡 → <b>산소 흡수, 이산화 탄소 방출</b>";
      else gas = "광합성량 ≈ 호흡량 → 겉으로 보이는 기체 출입이 거의 없어요 (심화)";
      el.querySelector("[data-out]").innerHTML = `광합성 <b>${P}</b> · 호흡 <b>${R}</b><br>${gas}`;
      const night = P === 0;
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 230" font-family="Pretendard,sans-serif" font-size="13">
        <rect x="0" y="0" width="390" height="230" rx="12" fill="${night ? "#1c2551" : "#d0ebff"}"/>
        ${night ? '<circle cx="340" cy="40" r="16" fill="#fff9db"/><circle cx="333" cy="35" r="15" fill="#1c2551"/>' : `<circle cx="${40 + ((t - 6) / 13) * 310}" cy="${90 - light * 60}" r="18" fill="#ffd43b"/>`}
        <rect x="70" y="200" width="250" height="14" rx="6" fill="${night ? "#2f3b6b" : "#8ce99a"}"/>
        <text x="20" y="${night ? 30 : 30}" fill="${night ? "#dbe4ff" : "#1864ab"}" font-weight="800">${night ? "밤" : "낮"}</text>
        <g transform="translate(100,95)">
          <rect x="0" y="${95 - P * 0.9}" width="60" height="${P * 0.9}" rx="6" fill="#2f9e44"/><text x="30" y="112" text-anchor="middle" fill="${night ? "#dbe4ff" : "#2b8a3e"}" font-weight="700">광합성</text>
          <rect x="130" y="${95 - R * 0.9}" width="60" height="${R * 0.9}" rx="6" fill="#e8590c"/><text x="160" y="112" text-anchor="middle" fill="${night ? "#dbe4ff" : "#d9480f"}" font-weight="700">호흡</text>
        </g></svg>`;
    };
    el.querySelector("[data-time]").oninput = draw;
    draw();
  }

  function labStarch(el) {
    el.innerHTML = `<div class="lab">
      <div class="lab-controls">
        <p style="margin:0 0 8px">상추 모종 2개 중 하나에만 <b>어둠상자</b>를 씌우고 하루 동안 햇빛에 두었어요. 단계를 순서대로 진행해 보세요.</p>
        <div class="seg" data-steps>${["① 잎 따기", "② 에탄올 물중탕(탈색)", "③ 아이오딘-아이오딘화 칼륨 용액"].map((s, i) => `<button data-i="${i}">${s}</button>`).join("")}</div>
        <div class="lab-out" data-out>단계를 눌러 보세요.</div>
      </div>
      <div class="lab-svg" data-svg></div></div>`;
    const col = [["#2f9e44", "#2f9e44"], ["#e9f5c9", "#e9f5c9"], ["#3b2f8f", "#e9f5c9"]];
    const msg = [
      "햇빛을 받은 잎과 받지 않은 잎을 1 cm × 1 cm 크기로 잘라요.",
      "에탄올에 넣고 뜨거운 물(80~100 °C)에 중탕하면 <b>엽록소가 녹아 빠져나와</b> 잎이 탈색돼요. 색깔 변화를 잘 보기 위해서예요. (환기 필수!)",
      "햇빛을 받은 잎만 <b>청람색</b>! → 빛을 받은 잎에서 광합성으로 <b>녹말</b>이 만들어졌어요. 어둠상자 잎은 색 변화가 거의 없어요.",
    ];
    const draw = (s) => {
      el.querySelectorAll("[data-steps] button").forEach((b) => b.classList.toggle("active", +b.dataset.i === s));
      el.querySelector("[data-out]").innerHTML = msg[s];
      const c = col[s];
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 220" font-family="Pretendard,sans-serif" font-size="13">
        ${[0, 1].map((k) => `<g transform="translate(${k * 190 + 30},20)">
          <ellipse cx="65" cy="100" rx="70" ry="22" fill="#dee2e6" opacity=".6"/>
          <rect x="30" y="50" width="70" height="70" rx="10" fill="${c[k]}" stroke="#2b8a3e" stroke-width="2"/>
          <text x="65" y="165" text-anchor="middle" fill="currentColor" font-weight="700">${k === 0 ? "햇빛을 받은 잎" : "햇빛을 받지 않은 잎"}</text>
          <text x="65" y="185" text-anchor="middle" fill="currentColor" opacity=".7">${s === 2 ? (k === 0 ? "청람색 (녹말 O)" : "변화 거의 없음") : ""}</text></g>`).join("")}
      </svg>`;
    };
    el.querySelectorAll("[data-steps] button").forEach((b) => (b.onclick = () => draw(+b.dataset.i)));
    draw(0);
  }

  U["5"] = {
    id: "5", roman: "V", title: "식물과 에너지", short: "식물과 에너지", cls: "u5", icon: "🌱",
    desc: "식물은 빛에너지로 스스로 양분을 만들고(광합성), 그 양분을 분해해 에너지를 얻어요(호흡). 광합성산물이 어떻게 저장·이용되는지까지 정리해요.",
    chapters: [
      {
        title: "광합성",
        lessons: [
          {
            title: "식물의 광합성",
            goals: ["식물의 광합성 과정을 설명할 수 있다.", "식물의 광합성에 필요한 물질과 광합성산물을 설명할 수 있다."],
            html: `
              <p>모든 생물은 성장하고 살아가기 위해 <span class="kw">양분</span>이 필요하다. 동물은 다른 생물을 먹어 양분을 얻지만, 식물은 <b>빛에너지를 이용하여 스스로 양분을 만든다.</b></p>
              <div class="box box-key"><p><span class="kw">광합성</span>: 식물이 빛에너지를 이용하여 양분을 만드는 과정</p></div>
              <h4>광합성이 일어나는 곳 — 엽록체</h4>
              <ul>
                <li>광합성은 식물세포의 <span class="kw">엽록체</span>에서 일어난다. 상추·검정말의 잎세포를 현미경으로 보면 초록색 알갱이(엽록체)가 보인다.</li>
                <li>엽록체 안에는 초록색 색소인 <span class="kw">엽록소</span>가 있고, 엽록소는 광합성에 필요한 <b>빛에너지를 흡수</b>한다.</li>
              </ul>
              <h4>광합성에 필요한 물질과 광합성산물</h4>
              <div class="eq">이산화 탄소 + 물 <span style="white-space:nowrap">—(빛에너지)→</span> 포도당 + 산소</div>
              <figure class="dia">${svgPhoto}<figcaption>광합성 과정 — 엽록체에서 빛에너지를 이용해 이산화 탄소와 물로 포도당과 산소를 만든다.</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>물질</th><th>구분</th><th>이동 경로</th></tr>
                <tr><td>이산화 탄소</td><td>필요한 물질</td><td>주로 잎의 <b>기공</b>을 통해 들어옴</td></tr>
                <tr><td>물</td><td>필요한 물질</td><td><b>뿌리</b>에서 흡수 → <b>물관</b>을 통해 잎까지</td></tr>
                <tr><td>포도당</td><td>광합성산물(양분)</td><td>곧 <b>녹말</b>로 바뀌어 엽록체에 저장</td></tr>
                <tr><td>산소</td><td>광합성산물</td><td>잎의 <b>기공</b>을 통해 밖으로 나감</td></tr>
              </table></div>
              <p style="font-size:14px;color:var(--muted)">* 녹말: 많은 수의 포도당으로 이루어진 탄수화물</p>
              <div class="box box-lab">
                <p><b>광합성에 필요한 물질과 광합성산물 확인하기</b></p>
                <p>① 투명 용기에 상추 모종 + 이산화 탄소 센서·산소 센서 → 빛을 10분 비춤<br>→ <b>이산화 탄소 농도 감소, 산소 농도 증가</b> (광합성에 CO₂가 쓰이고 O₂가 생김)</p>
                <p>② 한 모종에만 어둠상자를 씌우고 하루 둔 뒤, 잎을 <b>에탄올에 넣고 물중탕(탈색)</b> → <b>아이오딘-아이오딘화 칼륨 용액</b> 떨어뜨림<br>→ 햇빛 받은 잎만 <b>청람색</b> (녹말 생성 = 광합성이 일어남)</p>
                <p style="font-size:14px;color:var(--muted)">탈색 이유: 엽록소가 에탄올에 녹아 빠져나와 색깔 변화를 잘 볼 수 있다. · ppm은 100만분의 1 (10000 ppm = 1 %)</p>
              </div>
              <div class="box box-exam"><p>처음 만들어지는 양분은 <b>포도당</b>(녹말·단백질 ✗). 이산화 탄소는 <b>잎의 기공</b>으로, 물은 <b>뿌리 → 물관</b>으로 들어온다. 숲이 도시보다 산소 농도가 높은 까닭 → 식물이 많아 광합성으로 산소가 많이 방출되기 때문.</p></div>`,
          },
          {
            title: "광합성에 영향을 미치는 환경요인",
            goals: ["식물의 광합성에 영향을 미치는 환경요인을 설명할 수 있다."],
            html: `
              <p>식물의 광합성은 <span class="kw">빛의 세기</span>, <span class="kw">이산화 탄소의 농도</span>, <span class="kw">온도</span>의 영향을 받는다. 세 요인이 모두 알맞게 유지될 때 광합성이 활발하여 식물이 잘 자란다.</p>
              <figure class="dia">${svgFactors}<figcaption>그림 V-3 광합성에 영향을 미치는 환경요인</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>요인</th><th>광합성량의 변화</th></tr>
                <tr><td>빛의 세기</td><td>셀수록 증가하다가 일정 세기 이상이면 더 이상 증가하지 않고 <b>일정</b>해진다.</td></tr>
                <tr><td>이산화 탄소의 농도</td><td>높을수록 증가하다가 일정 농도 이상이면 더 이상 증가하지 않고 <b>일정</b>해진다.</td></tr>
                <tr><td>온도</td><td>높을수록 증가하다가 일정 온도 이상이면 <b>빠르게 감소</b>한다.</td></tr>
              </table></div>
              <div class="box box-warn"><p>광합성량이 계속 증가하지 않는 까닭: 식물세포에 들어 있는 <b>엽록체의 수가 한정</b>되어 있기 때문. 온도 그래프만 모양이 다르다(최고점 후 급감)는 점도 자주 출제!</p></div>
              <div class="box box-lab">
                <p><b>탐구 설계 — 빛의 세기와 광합성의 관계</b></p>
                <ul>
                  <li>탐구 문제: 빛의 세기에 따라 광합성량이 달라질까?</li>
                  <li>가설: 빛의 세기가 셀수록 광합성량이 증가할 것이다. (가설 = 탐구 문제에 대한 잠정적인 결론, 실험으로 검증 가능해야 함)</li>
                  <li><b>다르게 할 조건</b>: 빛의 세기 (전등 개수 또는 전등과 상추 사이의 거리)</li>
                  <li><b>같게 할 조건</b>: 상추 모종의 종류·크기, 용기, 온도, 측정 시간 등</li>
                  <li><b>측정할 것</b>: 용기 안 이산화 탄소 농도 감소량 또는 산소 농도 증가량</li>
                </ul>
              </div>
              <p>기후 변화로 가뭄·폭우·한파가 잦아지면 일조량 부족, 냉해 등으로 농작물 생산량이 줄어든다. 우리는 식량·목재 등 많은 자원을 식물에서 얻으므로, 식물이 사는 환경이 급격히 변하지 않도록 노력해야 한다.</p>`,
          },
        ],
      },
      {
        title: "식물의 호흡과 에너지",
        lessons: [
          {
            title: "식물의 호흡과 광합성",
            goals: ["식물의 호흡과 광합성의 관계를 설명할 수 있다.", "식물의 호흡과 광합성 과정에서 출입하는 에너지와 물질의 변화를 분석할 수 있다."],
            html: `
              <p>모든 생물은 살아가기 위해 에너지가 필요하다. 식물세포는 광합성으로 만든 포도당과 산소를 사용하여 에너지를 얻고, 이때 이산화 탄소와 물이 생성된다.</p>
              <div class="box box-key"><p><span class="kw">호흡</span>: 세포에서 양분을 분해하여 에너지를 얻는 과정 (세포호흡, 주로 <b>마이토콘드리아</b>에서 일어남)</p></div>
              <div class="eq">양분(포도당) + 산소 → 이산화 탄소 + 물 + <b>에너지</b></div>
              <h4>낮과 밤의 기체 출입</h4>
              <ul>
                <li>광합성은 주로 빛이 있는 <b>낮</b>에, 호흡은 낮과 밤에 관계없이 <b>항상</b> 일어난다.</li>
                <li><b>빛이 강한 낮</b>: 호흡보다 광합성을 많이 하므로 → <b>이산화 탄소 흡수, 산소 방출</b></li>
                <li><b>밤</b>: 호흡만 하므로 → <b>산소 흡수, 이산화 탄소 방출</b></li>
              </ul>
              <figure class="dia">${svgGas}<figcaption>그림 V-4 식물의 기체 출입</figcaption></figure>
              <h4>광합성과 호흡의 관계</h4>
              <figure class="dia">${svgCycle}<figcaption>광합성에서 생성된 물질은 호흡에, 호흡에서 생성된 물질은 광합성에 이용된다.</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>구분</th><th>광합성</th><th>호흡</th></tr>
                <tr><td>장소</td><td>엽록체</td><td>마이토콘드리아</td></tr>
                <tr><td>시기</td><td>주로 낮(빛이 있을 때)</td><td>항상</td></tr>
                <tr><td>필요한 물질</td><td>이산화 탄소, 물</td><td>포도당, 산소</td></tr>
                <tr><td>생성되는 물질</td><td>포도당, 산소</td><td>이산화 탄소, 물</td></tr>
                <tr><td>에너지 출입</td><td>빛에너지 <b>흡수</b></td><td>에너지 <b>방출</b></td></tr>
                <tr><td>양분</td><td><b>합성</b></td><td><b>분해</b></td></tr>
              </table></div>
              <div class="box box-warn"><p>낮에 식물이 산소를 내보내는 것은 호흡을 안 해서가 아니라 <b>광합성량 &gt; 호흡량</b>이기 때문! 호흡은 밤에만 하는 것이 아니다.</p></div>`,
          },
          {
            title: "광합성산물의 저장과 이용",
            goals: ["광합성산물의 저장과 이용 과정을 설명할 수 있다.", "광합성산물의 저장과 이용 과정을 모형으로 표현할 수 있다."],
            html: `
              <h4>생성 → 이동 → 이용·저장</h4>
              <ol>
                <li>잎의 엽록체에서 만들어진 <b>포도당</b>은 물에 녹지 않는 <span class="kw">녹말</span>로 바뀌어 엽록체에 저장된다.</li>
                <li>녹말은 <b>주로 밤에</b> <span class="kw">설탕</span>으로 바뀌어 <span class="kw">체관</span>을 따라 꽃, 열매, 뿌리, 줄기 등으로 이동한다.</li>
                <li>이동한 양분은 ① <b>호흡</b>으로 에너지를 얻는 데, ② 몸을 구성하는 성분이 되어 <b>성장</b>하거나 꽃을 피우는 데 이용되고, ③ 나머지는 <b>녹말, 단백질, 지방</b> 등 여러 형태로 <b>저장</b>된다.</li>
              </ol>
              <figure class="dia">${svgStore}<figcaption>그림 V-5 광합성산물의 생성, 이용, 저장</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>식물</th><th>포도</th><th>사탕수수</th><th>고구마</th><th>콩</th><th>깨</th></tr>
                <tr><th>저장 부위</th><td>열매</td><td>줄기</td><td>뿌리</td><td>씨</td><td>씨</td></tr>
                <tr><th>저장 형태</th><td>포도당</td><td>설탕</td><td>녹말</td><td>단백질</td><td>지방</td></tr>
              </table></div>
              <div class="box box-key"><p>식물에 저장된 광합성산물은 <b>동물의 먹이</b>가 되어 사람을 비롯한 많은 동물에게 양분을 제공한다. → 광합성산물은 식물과 다른 많은 생물의 생명활동에 필요한 에너지를 제공하는 <span class="kw">에너지원</span>이다.</p></div>
              <div class="box box-exam"><p>사과 과수원의 <b>솎아주기</b>: 열매 수를 줄이면 남은 열매에 광합성산물이 더 많이 저장되어 크고 품질 좋은 열매를 얻는다. · <b>열대야</b>: 밤 온도가 높으면 호흡이 많아져 저장된 양분이 많이 분해(소모)되므로 수확량·당도가 낮아진다.</p></div>
              <div class="box box-lab"><p><b>스마트팜</b>: 정보통신기술[ICT]로 식물의 성장 환경을 원격·자동으로 관리. 조도 센서(빛), 온도 센서·자동 냉난방(온도), 이산화 탄소 공급 장치(CO₂) → 광합성의 세 환경요인을 관리하는 장치들이다.</p></div>`,
          },
        ],
      },
    ],
    labs: [
      { title: "광합성 환경요인 시뮬레이터", desc: "빛의 세기, 이산화 탄소 농도, 온도를 조절하며 광합성량 그래프가 어떻게 변하는지 확인해 보세요. 가로축 변수를 바꿔 교과서 그림 V-3을 직접 그려 볼 수 있어요.", mount: labFactors },
      { title: "하루 동안 식물의 기체 출입", desc: "시각을 바꾸며 광합성량과 호흡량을 비교하고, 식물이 어떤 기체를 흡수·방출하는지 확인해 보세요.", mount: labDayNight },
      { title: "가상 실험: 광합성산물(녹말) 확인", desc: "교과서 탐구를 단계별로 따라가며 결과를 예측해 보세요.", mount: labStarch },
    ],
    flash: [
      ["광합성", "식물이 <b>빛에너지</b>를 이용하여 양분을 만드는 과정"],
      ["엽록체", "광합성이 일어나는 식물세포 속 초록색 알갱이"],
      ["엽록소", "엽록체 속 초록색 색소. 광합성에 필요한 <b>빛에너지를 흡수</b>"],
      ["광합성 식", "이산화 탄소 + 물 —(빛에너지)→ 포도당 + 산소"],
      ["기공", "이산화 탄소가 들어오고 산소가 나가는 잎의 구멍"],
      ["물관", "뿌리에서 흡수한 <b>물</b>이 이동하는 통로"],
      ["체관", "광합성산물(<b>설탕</b>)이 이동하는 통로"],
      ["녹말", "많은 포도당으로 이루어진 탄수화물. 물에 녹지 않아 엽록체에 저장"],
      ["아이오딘-아이오딘화 칼륨 용액", "녹말과 반응하면 <b>청람색</b>"],
      ["에탄올 물중탕", "잎의 <b>엽록소를 녹여 탈색</b> → 색깔 변화를 잘 보기 위해"],
      ["광합성 환경요인 3가지", "빛의 세기, 이산화 탄소의 농도, 온도"],
      ["빛의 세기·CO₂ 농도 그래프", "증가하다가 일정 수준 이상에서 <b>일정</b> (엽록체 수 한정)"],
      ["온도 그래프", "증가하다가 일정 온도 이상에서 <b>빠르게 감소</b>"],
      ["호흡", "세포에서 양분을 <b>분해</b>하여 에너지를 얻는 과정 (세포호흡)"],
      ["마이토콘드리아", "호흡이 주로 일어나는 세포 소기관"],
      ["호흡 식", "포도당 + 산소 → 이산화 탄소 + 물 + 에너지"],
      ["낮(빛 강함)의 기체 출입", "광합성 &gt; 호흡 → CO₂ 흡수, O₂ 방출"],
      ["밤의 기체 출입", "호흡만 → O₂ 흡수, CO₂ 방출"],
      ["광합성산물 이동 형태", "녹말이 <b>주로 밤</b>에 <b>설탕</b>으로 바뀌어 체관으로 이동"],
      ["콩 · 깨의 저장 형태", "콩(씨) = 단백질, 깨(씨) = 지방"],
      ["고구마 · 사탕수수 · 포도", "고구마(뿌리) = 녹말, 사탕수수(줄기) = 설탕, 포도(열매) = 포도당"],
      ["ppm", "100만분의 1. 10000 ppm = 1 %"],
      ["스마트팜", "ICT로 식물 성장 환경을 원격·자동 관리하는 농업 방식"],
    ],
    ox: [
      ["식물은 광합성을 하여 양분을 스스로 만들 수 있다.", true, "식물은 빛에너지를 이용해 스스로 양분을 만든다."],
      ["광합성이 일어나 처음 만들어지는 양분은 단백질이다.", false, "처음 만들어지는 양분은 포도당이며, 곧 녹말로 바뀐다."],
      ["광합성에 필요한 물은 잎의 기공을 통해 들어온다.", false, "물은 뿌리에서 흡수되어 물관을 통해 잎까지 운반된다. 기공으로 들어오는 것은 이산화 탄소."],
      ["엽록소는 광합성에 필요한 빛에너지를 흡수한다.", true, "엽록체 속 초록색 색소인 엽록소가 빛에너지를 흡수한다."],
      ["이산화 탄소의 농도가 높을수록 광합성량은 계속 증가한다.", false, "일정 농도 이상이 되면 더 이상 증가하지 않고 일정해진다."],
      ["온도가 일정 이상 높아지면 광합성량이 빠르게 감소한다.", true, "온도 그래프는 최고점을 지난 뒤 급격히 감소한다."],
      ["광합성과 호흡은 모두 낮에만 일어난다.", false, "광합성은 주로 낮에, 호흡은 낮과 밤에 관계없이 항상 일어난다."],
      ["밤에 식물은 산소를 흡수하고 이산화 탄소를 방출한다.", true, "밤에는 호흡만 일어나기 때문이다."],
      ["낮에 식물이 산소를 방출하는 것은 낮에는 호흡을 하지 않기 때문이다.", false, "낮에도 호흡은 일어나지만 광합성량이 호흡량보다 많기 때문이다."],
      ["호흡은 에너지를 흡수하고, 광합성은 에너지를 방출한다.", false, "반대이다. 광합성은 빛에너지를 흡수, 호흡은 에너지를 방출한다."],
      ["광합성산물은 주로 밤에 설탕으로 바뀌어 체관을 통해 이동한다.", true, "엽록체의 녹말이 주로 밤에 설탕으로 바뀌어 체관으로 이동한다."],
      ["광합성산물은 뿌리와 줄기에 녹말의 형태로만 저장된다.", false, "녹말, 단백질, 지방, 포도당, 설탕 등 여러 형태로 저장된다."],
      ["햇빛을 받은 잎에 아이오딘-아이오딘화 칼륨 용액을 떨어뜨리면 청람색으로 변한다.", true, "광합성으로 만들어진 녹말이 있기 때문이다."],
      ["잎을 에탄올에 넣고 물중탕하는 것은 녹말을 녹여 내기 위해서이다.", false, "엽록소를 녹여 잎을 탈색하기 위해서이다."],
      ["식물에 저장된 광합성산물은 다른 동물의 에너지원이 되기도 한다.", true, "동물의 먹이가 되어 양분을 제공한다."],
    ],
    mcq: [
      { q: "광합성이 일어나는 세포 소기관은?", c: ["핵", "마이토콘드리아", "엽록체", "세포막", "액포"], a: 2, e: "광합성은 식물세포의 엽록체에서 일어난다. 마이토콘드리아는 호흡.", lv: 1, tag: "광합성" },
      { q: "광합성 과정에 대한 설명으로 옳지 않은 것은?", c: ["빛에너지가 필요하다.", "식물의 잎에서 주로 일어난다.", "엽록체에서 일어난다.", "이산화 탄소는 주로 뿌리를 통해 흡수된다.", "포도당과 산소가 만들어진다."], a: 3, e: "이산화 탄소는 주로 잎의 기공을 통해 들어온다.", lv: 1, tag: "광합성" },
      { q: "상추 모종이 든 투명 용기에 빛을 비추며 센서로 측정했다. 10분 동안 나타나는 변화로 옳은 것은?", c: ["CO₂ 증가, O₂ 증가", "CO₂ 증가, O₂ 감소", "CO₂ 감소, O₂ 증가", "CO₂ 감소, O₂ 감소", "변화 없음"], a: 2, e: "빛을 받으면 광합성이 호흡보다 활발하여 이산화 탄소는 줄고 산소는 늘어난다.", lv: 1, tag: "탐구" },
      { q: "잎을 에탄올에 넣고 물중탕하는 까닭은?", c: ["녹말을 만들기 위해", "엽록소를 녹여 탈색하기 위해", "기공을 열기 위해", "잎을 살균하기 위해", "포도당을 녹말로 바꾸기 위해"], a: 1, e: "엽록소를 빼내 탈색해야 아이오딘 반응의 색깔 변화가 잘 보인다.", lv: 1, tag: "탐구" },
      { q: "빛의 세기가 셀수록 광합성량이 증가하다가 일정해지는 까닭으로 가장 알맞은 것은?", c: ["빛이 너무 강하면 잎이 타기 때문", "엽록체의 수가 한정되어 있기 때문", "호흡이 멈추기 때문", "물관이 막히기 때문", "산소가 부족하기 때문"], a: 1, e: "교과서: 식물세포의 엽록체 수가 한정되어 있어 광합성량이 계속 증가하지 않는다.", lv: 2, tag: "환경요인" },
      { q: "빛과 이산화 탄소를 충분히 공급하는 온실에서 식물이 잘 자라지 못할 때 가장 먼저 점검해야 할 요인은?", c: ["산소 농도", "온도", "토양 색깔", "화분 모양", "질소 농도"], a: 1, e: "광합성의 세 환경요인 중 남은 요인은 온도. 너무 높거나 낮으면 광합성량이 감소한다.", lv: 2, tag: "환경요인" },
      { q: "온도와 광합성량의 관계를 알아보는 실험에서 '같게 해야 할 조건'만 고른 것은?\n<br>ㄱ. 온도 ㄴ. 빛의 세기 ㄷ. 이산화 탄소 농도", c: ["ㄱ", "ㄴ", "ㄱ, ㄴ", "ㄴ, ㄷ", "ㄱ, ㄴ, ㄷ"], a: 3, e: "다르게 할 조건은 온도(독립 변인)뿐, 빛의 세기와 CO₂ 농도는 같게 한다.", lv: 2, tag: "탐구 설계" },
      { q: "호흡과 광합성을 비교한 내용으로 옳지 않은 것은?", c: ["장소: 호흡-마이토콘드리아, 광합성-엽록체", "시기: 호흡-주로 낮, 광합성-항상", "에너지: 호흡-방출, 광합성-빛에너지 흡수", "양분: 호흡-분해, 광합성-합성", "생성 물질: 호흡-물·이산화 탄소, 광합성-포도당·산소"], a: 1, e: "호흡은 항상, 광합성은 주로 낮에 일어난다.", lv: 2, tag: "호흡과 광합성" },
      { q: "빛이 있는 환경이 아닐 때 식물에서 일어나는 일은?", c: ["광합성만 한다.", "호흡만 한다.", "광합성과 호흡을 모두 멈춘다.", "산소를 방출한다.", "이산화 탄소를 흡수한다."], a: 1, e: "빛이 없으면 광합성이 일어나지 않고 호흡만 일어나 O₂ 흡수, CO₂ 방출.", lv: 1, tag: "기체 출입" },
      { q: "광합성산물의 이동에 대한 설명으로 옳은 것은?", c: ["포도당 형태로 물관을 통해 이동한다.", "녹말 형태로 체관을 통해 이동한다.", "설탕 형태로 체관을 통해 이동한다.", "설탕 형태로 물관을 통해 이동한다.", "단백질 형태로 체관을 통해 이동한다."], a: 2, e: "녹말이 주로 밤에 설탕으로 바뀌어 체관을 따라 이동한다.", lv: 1, tag: "저장과 이용" },
      { q: "식물과 광합성산물의 저장 부위·형태를 잘못 짝 지은 것은?", c: ["포도 - 열매 - 포도당", "사탕수수 - 줄기 - 설탕", "고구마 - 뿌리 - 녹말", "콩 - 씨 - 지방", "깨 - 씨 - 지방"], a: 3, e: "콩은 씨에 단백질 형태로 저장한다.", lv: 2, tag: "저장과 이용" },
      { q: "광합성산물의 저장과 이용에 대한 설명으로 옳은 것을 모두 고르면?\n<br>ㄱ. 우리가 먹는 쌀에는 광합성산물이 저장되어 있다. ㄴ. 모든 식물은 녹말의 형태로만 저장한다. ㄷ. 광합성산물은 식물이 에너지를 얻거나 성장할 때 이용된다.", c: ["ㄱ", "ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄱ, ㄴ, ㄷ"], a: 2, e: "ㄴ: 녹말, 단백질, 지방 등 여러 형태로 저장된다.", lv: 2, tag: "저장과 이용" },
      { q: "순서도에서 '(㉠)이 있는 환경인가?' → 아니요 → 호흡만 한다 / 예 → '식물이 (㉡)보다 (㉢)을 많이 하는가?' → 예 → 산소 방출. ㉠~㉢으로 옳은 것은?", c: ["빛, 광합성, 호흡", "빛, 호흡, 광합성", "산소, 호흡, 광합성", "산소, 광합성, 호흡", "물, 호흡, 광합성"], a: 1, e: "빛이 있어야 광합성. 호흡보다 광합성을 많이 할 때 산소를 방출한다.", lv: 3, tag: "기체 출입" },
      { q: "상춧잎을 넣은 투명 용기를 (다) 빛을 비추고 10분, (라) 알루미늄박으로 감싸고 10분 측정했다. 이산화 탄소 농도 변화로 옳은 것은?", c: ["(다) 증가, (라) 증가", "(다) 증가, (라) 감소", "(다) 감소, (라) 증가", "(다) 감소, (라) 감소", "(다) 변화 없음, (라) 증가"], a: 2, e: "(다) 광합성>호흡 → CO₂ 흡수(감소). (라) 빛 차단 → 호흡만 → CO₂ 방출(증가).", lv: 3, tag: "탐구 해석" },
      { q: "인공위성으로 측정한 지구 광합성 사진에서 북반구가 진하게(광합성 활발) 나타난 사진의 측정 시기는?", c: ["1월", "3월", "7월", "10월", "12월"], a: 2, e: "7월은 북반구가 여름이라 빛이 강하고 온도가 알맞아 광합성이 활발하다.", lv: 3, tag: "자료 해석" },
      { q: "바다달팽이 엘리시아 비리디스가 먹이 없이도 햇빛만 있으면 오래 살 수 있는 까닭과 가장 관련 깊은 것은?", c: ["몸속 마이토콘드리아가 많다.", "몸속에 보관한 엽록체에서 광합성을 한다.", "피부로 포도당을 흡수한다.", "호흡을 하지 않는다.", "녹말을 분해하지 않는다."], a: 1, e: "먹은 생물의 엽록체를 보관해 빛에너지로 양분을 만든다.", lv: 2, tag: "적용" },
    ],
    essay: [
      { q: "숲은 도시보다 공기의 산소 농도가 높을까, 낮을까? 그렇게 생각한 까닭을 식물의 광합성과 관련지어 설명하시오.", lv: 1, pts: 6, tag: "교과서 스스로 확인하기",
        kw: [["높"], ["광합성"], ["산소"], ["식물이 많", "식물이 더 많", "나무가 많"]],
        model: "숲이 도시보다 산소 농도가 높다. 숲에는 식물이 많아 광합성이 활발하게 일어나 산소가 많이 만들어져 방출되기 때문이다.",
        rubric: [["6점", "'높다'와 함께 식물이 많아 광합성으로 산소가 많이 방출된다는 것을 모두 서술"], ["3점", "'높다'만 쓰거나 이유만 서술"]],
        hint: "광합성의 산물 중 기체는 무엇일까?" },
      { q: "햇빛을 받은 상춧잎과 어둠상자를 씌운 상춧잎을 에탄올에 넣고 물중탕한 후 아이오딘-아이오딘화 칼륨 용액을 떨어뜨렸다. (1) 각 잎의 결과를 쓰고, (2) 이 실험으로 알 수 있는 사실과 (3) 에탄올에 물중탕하는 까닭을 설명하시오.", lv: 2, pts: 10, tag: "탐구 서술",
        kw: [["청람색"], ["변화가 없", "변하지 않", "변화 없"], ["녹말"], ["광합성"], ["엽록소"], ["탈색"]],
        model: "(1) 햇빛을 받은 잎은 청람색으로 변하고, 햇빛을 받지 않은 잎은 색깔 변화가 거의 없다. (2) 빛을 받은 잎에서만 광합성이 일어나 녹말이 만들어졌다. (3) 잎의 엽록소를 녹여 탈색해야 색깔 변화를 잘 관찰할 수 있기 때문이다.",
        rubric: [["10점", "(1)~(3)을 모두 정확히 서술"], ["6점", "두 가지만 정확히 서술"], ["3점", "한 가지만 서술"]],
        tip: "에탄올 물중탕 시 발생하는 기체를 마시지 않도록 환기한다는 안전 수칙도 함께 기억!" },
      { q: "온도와 광합성의 관계를 탐구하는 실험을 설계하려고 한다. 다르게 해야 할 조건과 같게 해야 할 조건을 설명하시오.", lv: 2, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["다르게"], ["온도"], ["같게"], ["빛의 세기", "빛"], ["이산화 탄소"]],
        model: "다르게 해야 할 조건은 온도이고, 같게 해야 할 조건은 빛의 세기, 이산화 탄소의 농도(식물의 종류와 크기, 측정 시간 등)이다.",
        rubric: [["8점", "다르게 할 조건(온도)과 같게 할 조건(빛의 세기, CO₂ 농도)을 모두 서술"], ["4점", "둘 중 하나만 정확히 서술"]],
        hint: "변인 통제: 알아보려는 요인 하나만 바꾸고 나머지는 같게!" },
      { q: "빛과 이산화 탄소를 충분히 공급하는데도 온실의 식물이 잘 자라지 못하는 까닭을 광합성에 영향을 미치는 환경요인과 관련지어 설명하시오.", lv: 2, pts: 8, tag: "대단원 마무리",
        kw: [["온도"], ["광합성량", "광합성"], ["감소", "줄", "낮아"], ["알맞", "너무 높", "너무 낮", "적절"]],
        model: "광합성은 빛의 세기, 이산화 탄소의 농도뿐만 아니라 온도의 영향도 받는다. 온실의 온도가 알맞지 않아(너무 높거나 낮아) 광합성량이 감소했기 때문이다.",
        rubric: [["8점", "온도가 알맞지 않아 광합성량이 줄었다는 내용을 서술"], ["4점", "온도만 언급"]] },
      { q: "식물에서 광합성과 호흡의 관계를 (1) 물질의 변화와 (2) 에너지의 출입 측면에서 비교하여 설명하시오.", lv: 2, pts: 10, tag: "개념 비교",
        kw: [["광합성에서 생성", "광합성으로 만들어진", "광합성에서 만들어진", "광합성산물"], ["호흡에 이용", "호흡에 사용", "호흡에 쓰"], ["빛에너지"], ["흡수"], ["방출"], ["분해"]],
        model: "(1) 광합성은 이산화 탄소와 물로 포도당과 산소를 만들고, 호흡은 포도당과 산소를 이산화 탄소와 물로 분해한다. 즉 광합성에서 생성된 물질은 호흡에 이용되고, 호흡에서 생성된 물질은 광합성에 이용된다. (2) 광합성은 빛에너지를 흡수해 양분을 합성하고, 호흡은 양분을 분해하여 생명활동에 필요한 에너지를 방출한다.",
        rubric: [["10점", "물질의 순환 관계와 에너지 흡수/방출을 모두 정확히 서술"], ["5점", "둘 중 하나만 정확히 서술"]],
        hint: "광합성 식과 호흡 식을 나란히 써 보면 화살표 방향이 반대!" },
      { q: "상춧잎을 넣은 투명 용기에 (다) 빛을 비추면서 10분, (라) 용기 전체를 알루미늄박으로 감싼 후 10분 동안 이산화 탄소 농도를 측정하였다. (다)와 (라)에서 각각 이산화 탄소 농도는 어떻게 변하는지 쓰고, 그 까닭을 설명하시오.", lv: 3, pts: 10, tag: "과학 역량",
        kw: [["감소"], ["증가"], ["광합성"], ["호흡만", "호흡"], ["빛이 없", "빛을 차단", "빛이 차단", "빛이 들어가지"]],
        model: "(다)에서는 이산화 탄소 농도가 감소한다. 빛이 있어 광합성이 호흡보다 많이 일어나 이산화 탄소를 흡수하기 때문이다. (라)에서는 이산화 탄소 농도가 증가한다. 빛이 차단되어 광합성은 일어나지 않고 호흡만 일어나 이산화 탄소를 방출하기 때문이다.",
        rubric: [["10점", "(다) 감소·(라) 증가와 각각의 까닭(광합성>호흡 / 호흡만)을 모두 서술"], ["6점", "변화는 맞고 까닭이 하나만 맞음"], ["3점", "변화만 맞음"]],
        tip: "(다)에서 '호흡을 하지 않아서'라고 쓰면 감점! 호흡은 항상 일어난다." },
      { q: "강낭콩에서 싹이 터서 자라 열매를 맺기까지 필요한 에너지를 어떻게 얻는지 광합성과 호흡의 관계로 설명하시오.", lv: 2, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["광합성"], ["양분", "포도당"], ["호흡"], ["분해"], ["에너지"]],
        model: "강낭콩은 광합성으로 빛에너지를 흡수하여 양분(포도당)을 만들고, 호흡으로 이 양분을 산소를 이용해 분해하여 성장하고 열매를 맺는 데 필요한 에너지를 얻는다.",
        rubric: [["8점", "광합성으로 양분 생성 + 호흡으로 양분 분해해 에너지 획득을 모두 서술"], ["4점", "둘 중 하나만 서술"]] },
      { q: "사과 과수원에서는 열매가 다 자라기 전에 일부 열매를 떼어 내는 솎아주기를 한다. 그 까닭을 광합성산물의 저장과 관련지어 설명하시오.", lv: 2, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["광합성산물", "양분"], ["남은 열매", "남은 사과", "열매 하나"], ["저장"], ["크", "품질", "당도"]],
        model: "열매 수를 줄이면 잎에서 만들어져 체관을 통해 이동하는 광합성산물이 남은 열매에 더 많이 저장되므로 크고 품질 좋은(달고 큰) 열매를 얻을 수 있기 때문이다.",
        rubric: [["8점", "광합성산물이 남은 열매에 더 많이 저장된다 + 크고 좋은 열매를 모두 서술"], ["4점", "열매가 커진다는 결과만 서술"]] },
      { q: "'밤에 온도가 높으면(열대야) 식물이 호흡을 많이 하기 때문에 농작물의 수확량이 감소하고 과일의 당도가 낮아진다.' 이러한 현상이 나타나는 까닭을 광합성산물과 관련지어 설명하시오.", lv: 3, pts: 10, tag: "대단원 마무리",
        kw: [["호흡"], ["광합성산물", "양분"], ["분해"], ["소모", "많이 쓰", "많이 사용", "줄어"], ["저장"]],
        model: "밤에는 광합성은 일어나지 않고 호흡만 일어나는데, 온도가 높으면 호흡이 활발해져 낮에 광합성으로 만든 광합성산물(양분)이 많이 분해되어 소모된다. 그 결과 열매 등에 저장되는 양분이 줄어들어 수확량과 당도가 낮아진다.",
        rubric: [["10점", "호흡 증가 → 광합성산물 분해·소모 증가 → 저장량 감소의 인과를 모두 서술"], ["5점", "호흡으로 양분이 소모된다는 것만 서술"]] },
      { q: "어떤 학생이 \"콩에는 왜 단백질이 많이 들어 있을까?\"라고 물었다. 광합성산물의 생성·이동·저장 과정을 순서대로 포함하여 대답을 서술하시오.", lv: 3, pts: 10, tag: "창작 문항",
        kw: [["포도당"], ["녹말"], ["설탕"], ["체관"], ["씨"], ["단백질"]],
        model: "잎의 엽록체에서 광합성으로 만들어진 포도당은 녹말로 바뀌어 저장되었다가, 주로 밤에 설탕으로 바뀌어 체관을 따라 이동한다. 이동한 양분 중 호흡과 성장에 쓰이고 남은 양분이 콩의 씨에 단백질 형태로 바뀌어 저장되기 때문이다.",
        rubric: [["10점", "포도당→녹말→설탕(체관)→씨에 단백질로 저장을 모두 서술"], ["6점", "이동 형태(설탕·체관) 또는 저장 형태 중 하나 누락"], ["3점", "단백질로 저장된다는 결론만 서술"]] },
      { q: "인공위성으로 측정한 지구의 광합성 사진 (가)는 남반구가, (나)는 북반구가 진하게(광합성이 활발) 나타났다. 하나는 7월, 하나는 12월에 측정했다. (가)와 (나)의 측정 시기를 쓰고, 그 까닭을 설명하시오.", lv: 3, pts: 10, tag: "과학 글쓰기",
        kw: [["12월"], ["7월"], ["여름"], ["빛", "일조"], ["온도"]],
        model: "(가)는 12월, (나)는 7월이다. 7월에는 북반구가 여름이라 빛이 강하고 온도가 알맞아 북반구의 광합성이 활발하고, 12월에는 남반구가 여름이라 남반구의 광합성이 활발하기 때문이다.",
        rubric: [["10점", "시기를 바르게 쓰고 계절 차이와 환경요인(빛·온도)으로 까닭을 서술"], ["5점", "시기만 맞음"]],
        hint: "북반구와 남반구는 계절이 반대!" },
      { q: "스마트팜에 이산화 탄소 공급 장치, 무선 조도 센서, 자동 냉난방 장치를 설치하는 까닭을 광합성과 관련지어 설명하시오.", lv: 2, pts: 8, tag: "창작 문항",
        kw: [["빛의 세기", "빛"], ["이산화 탄소"], ["온도"], ["광합성"], ["활발", "증가", "알맞"]],
        model: "광합성은 빛의 세기, 이산화 탄소의 농도, 온도의 영향을 받는다. 조도 센서로 빛의 세기를, 이산화 탄소 공급 장치로 이산화 탄소 농도를, 냉난방 장치로 온도를 알맞게 유지하면 광합성이 활발하게 일어나 농작물이 잘 자라기 때문이다.",
        rubric: [["8점", "세 장치를 세 환경요인과 각각 연결하고 광합성 증가를 서술"], ["4점", "환경요인 일부만 연결"]] },
    ],
  };
})();
