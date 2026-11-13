/* VI. 동물과 에너지 (교과서 198~239쪽) */
(function () {
  const U = (window.UNITS = window.UNITS || {});

  const svgDigest = `<svg viewBox="0 0 600 270" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><marker id="d6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    ${[["입", 40, "침"], ["위", 110, "위액(펩신+염산)"], ["작은창자", 180, "이자액 · 쓸개즙"]].map(([n, y, s]) => `<rect x="10" y="${y}" width="110" height="60" rx="10" fill="#fff0e6" stroke="#e8590c"/><text x="65" y="${y + 27}" text-anchor="middle" font-weight="800" fill="#d9480f">${n}</text><text x="65" y="${y + 46}" text-anchor="middle" fill="#d9480f" font-size="11">${s}</text>`).join("")}
    ${[["녹말", 210, "#2f9e44"], ["단백질", 360, "#d6336c"], ["지방", 510, "#f08c00"]].map(([n, x, c]) => `<rect x="${x - 60}" y="5" width="120" height="28" rx="8" fill="${c}"/><text x="${x}" y="24" text-anchor="middle" fill="#fff" font-weight="800">${n}</text><line x1="${x}" y1="33" x2="${x}" y2="250" stroke="${c}" stroke-width="3" stroke-opacity=".35"/>`).join("")}
    <text x="210" y="65" text-anchor="middle" fill="#2b8a3e" font-weight="700">아밀레이스 ✂</text><text x="210" y="85" text-anchor="middle" fill="#2b8a3e">→ 엿당</text>
    <text x="360" y="135" text-anchor="middle" fill="#c2255c" font-weight="700">펩신 ✂ (염산 도움)</text>
    <text x="210" y="205" text-anchor="middle" fill="#2b8a3e" font-weight="700">아밀레이스 등</text>
    <text x="360" y="205" text-anchor="middle" fill="#c2255c" font-weight="700">트립신 등</text>
    <text x="510" y="190" text-anchor="middle" fill="#e67700">쓸개즙(효소 없음, 도움)</text>
    <text x="510" y="210" text-anchor="middle" fill="#e67700" font-weight="700">라이페이스 ✂</text>
    ${[["포도당", 210, "#2f9e44"], ["아미노산", 360, "#d6336c"], ["지방산 + 모노글리세라이드", 510, "#f08c00"]].map(([n, x, c]) => `<rect x="${x - 70}" y="232" width="140" height="30" rx="8" fill="none" stroke="${c}" stroke-width="2"/><text x="${x}" y="252" text-anchor="middle" fill="${c}" font-weight="800" font-size="${n.length > 6 ? 11 : 13}">${n}</text>`).join("")}
  </svg>`;

  const svgVillus = `<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <rect x="10" y="140" width="580" height="40" fill="#ffc9c9"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<path d="M${30 + i * 62},140 C${30 + i * 62},50 ${70 + i * 62},50 ${70 + i * 62},140" fill="#ffa8a8" stroke="#e03131"/>`).join("")}
    <g transform="translate(400,0)">
      <path d="M40,175 C40,30 150,30 150,175" fill="#ffe3e3" stroke="#e03131" stroke-width="2"/>
      <path d="M60,175 C60,60 130,60 130,175" fill="none" stroke="#e03131" stroke-width="3" stroke-dasharray="6 3"/>
      <path d="M95,175 L95,70" stroke="#fab005" stroke-width="7"/>
    </g>
    <text x="20" y="25" fill="currentColor" font-weight="800">작은창자 안쪽 벽: 주름 + 융털 → 표면적 ↑</text>
    <text x="470" y="25" fill="#e03131" font-weight="700">모세혈관</text><text x="470" y="45" fill="#e67700" font-weight="700">암죽관</text>
    <text x="20" y="45" fill="currentColor" opacity=".75">→ 작은 영양소가 융털로 흡수 → 심장을 거쳐 온몸 조직세포로</text>
  </svg>`;

  const svgCirc = `<svg viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><marker id="c6r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#e03131"/></marker><marker id="c6b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1c7ed6"/></marker></defs>
    <rect x="5" y="5" width="590" height="100" rx="14" fill="#e7f5ff"/><text x="20" y="28" fill="#1864ab" font-weight="800">허파순환</text>
    <rect x="5" y="225" width="590" height="100" rx="14" fill="#fff4e6"/><text x="20" y="315" fill="#d9480f" font-weight="800">온몸순환</text>
    <rect x="220" y="40" width="160" height="50" rx="12" fill="#a5d8ff"/><text x="300" y="62" text-anchor="middle" fill="#1864ab" font-weight="800">허파의 모세혈관</text><text x="300" y="80" text-anchor="middle" fill="#1864ab" font-size="11">CO₂ 내보냄 · O₂ 받음</text>
    <rect x="220" y="240" width="160" height="50" rx="12" fill="#ffd8a8"/><text x="300" y="262" text-anchor="middle" fill="#d9480f" font-weight="800">온몸의 모세혈관</text><text x="300" y="280" text-anchor="middle" fill="#d9480f" font-size="11">O₂·영양소 공급 / CO₂·노폐물 받음</text>
    <g transform="translate(300,165)">
      <rect x="-90" y="-45" width="88" height="42" rx="8" fill="#a5b4fc"/><text x="-46" y="-19" text-anchor="middle" font-weight="800" fill="#1e1b4b">우심방</text>
      <rect x="2" y="-45" width="88" height="42" rx="8" fill="#ffa8a8"/><text x="46" y="-19" text-anchor="middle" font-weight="800" fill="#5c0011">좌심방</text>
      <rect x="-90" y="3" width="88" height="42" rx="8" fill="#748ffc"/><text x="-46" y="29" text-anchor="middle" font-weight="800" fill="#fff">우심실</text>
      <rect x="2" y="3" width="88" height="42" rx="8" fill="#ff6b6b"/><text x="46" y="29" text-anchor="middle" font-weight="800" fill="#fff">좌심실</text>
    </g>
    <path d="M210,190 C120,190 120,65 215,65" fill="none" stroke="#1c7ed6" stroke-width="4" marker-end="url(#c6b)"/><text x="80" y="125" fill="#1c7ed6" font-weight="700">폐동맥</text>
    <path d="M385,65 C480,65 480,140 395,140" fill="none" stroke="#e03131" stroke-width="4" marker-end="url(#c6r)"/><text x="480" y="105" fill="#e03131" font-weight="700">폐정맥</text>
    <path d="M395,190 C500,190 500,265 385,265" fill="none" stroke="#e03131" stroke-width="4" marker-end="url(#c6r)"/><text x="490" y="235" fill="#e03131" font-weight="700">대동맥</text>
    <path d="M215,265 C100,265 100,140 205,140" fill="none" stroke="#1c7ed6" stroke-width="4" marker-end="url(#c6b)"/><text x="60" y="210" fill="#1c7ed6" font-weight="700">대정맥</text>
  </svg>`;

  const svgNephron = `<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard, sans-serif" font-size="13">
    <defs><marker id="n6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
    <circle cx="90" cy="110" r="48" fill="#fff3bf" stroke="#f59f00" stroke-width="3"/>
    <circle cx="90" cy="110" r="26" fill="#ff8787"/><text x="90" y="115" text-anchor="middle" fill="#fff" font-weight="800">토리</text>
    <text x="90" y="178" text-anchor="middle" fill="#e67700" font-weight="700">보먼주머니</text>
    <path d="M138,110 L540,110" stroke="#f59f00" stroke-width="18" stroke-linecap="round" opacity=".55"/>
    <text x="330" y="115" text-anchor="middle" fill="#7c5300" font-weight="800">세뇨관</text>
    <path d="M150,60 L540,60" stroke="#ff8787" stroke-width="5"/><path d="M150,160 L540,160" stroke="#ff8787" stroke-width="5"/>
    <text x="545" y="64" fill="#e03131">모세혈관</text><text x="548" y="114" fill="#e67700" font-weight="700">→ 콩팥깔때기</text>
    <g color="#e67700"><line x1="90" y1="62" x2="90" y2="82" stroke="#e67700" stroke-width="3" marker-end="url(#n6)"/></g>
    <text x="20" y="40" fill="#e67700" font-weight="800">① 여과 (토리 → 보먼주머니)</text>
    <g color="#2f9e44"><line x1="250" y1="100" x2="250" y2="66" stroke="#2f9e44" stroke-width="3" marker-end="url(#n6)"/></g>
    <text x="215" y="30" fill="#2f9e44" font-weight="800">② 재흡수 (세뇨관 → 모세혈관)</text><text x="215" y="47" fill="#2f9e44" font-size="11">포도당·아미노산·대부분의 물·무기염류</text>
    <g color="#a5530a"><line x1="430" y1="155" x2="430" y2="122" stroke="#a5530a" stroke-width="3" marker-end="url(#n6)"/></g>
    <text x="380" y="190" fill="#a5530a" font-weight="800">③ 분비 (모세혈관 → 세뇨관)</text><text x="380" y="207" fill="#a5530a" font-size="11">혈액에 남아 있던 노폐물</text>
  </svg>`;

  /* ---------- labs ---------- */
  function labDigest(el) {
    const D = {
      녹말: [["입", "침 속 <b>아밀레이스</b>가 녹말을 <b>엿당</b>으로 분해"], ["위", "녹말은 위에서 소화되지 않아요"], ["작은창자", "이자액의 <b>아밀레이스</b>와 작은창자의 소화 작용으로 최종 <b>포도당</b>으로 분해"]],
      단백질: [["입", "입에서는 단백질이 소화되지 않아요"], ["위", "위액의 <b>펩신</b>이 <b>염산</b>의 도움을 받아 단백질 분해 (염산은 세균도 죽임)"], ["작은창자", "이자액의 <b>트립신</b> 등으로 최종 <b>아미노산</b>으로 분해"]],
      지방: [["입", "입에서는 지방이 소화되지 않아요"], ["위", "위에서도 지방은 소화되지 않아요"], ["작은창자", "<b>쓸개즙</b>(간에서 생성, 쓸개에 저장, 효소 없음)이 소화를 돕고 이자액의 <b>라이페이스</b>가 <b>지방산 + 모노글리세라이드</b>로 분해"]],
    };
    const col = { 녹말: "#2f9e44", 단백질: "#d6336c", 지방: "#f08c00" };
    el.innerHTML = `<div class="lab"><div class="lab-controls">
        <div class="seg" data-n>${Object.keys(D).map((k, i) => `<button class="${i ? "" : "active"}" data-k="${k}">${k}</button>`).join("")}</div>
        <label>음식물의 위치</label><div class="seg" data-s>${["입", "위", "작은창자"].map((s, i) => `<button class="${i ? "" : "active"}" data-i="${i}">${s}</button>`).join("")}</div>
        <div class="lab-out" data-out></div></div><div class="lab-svg" data-svg></div></div>`;
    let k = "녹말", s = 0;
    const draw = () => {
      el.querySelectorAll("[data-n] button").forEach((b) => b.classList.toggle("active", b.dataset.k === k));
      el.querySelectorAll("[data-s] button").forEach((b) => b.classList.toggle("active", +b.dataset.i === s));
      el.querySelector("[data-out]").innerHTML = `<b>${D[k][s][0]}</b><br>${D[k][s][1]}`;
      const sizes = { 녹말: [8, 3, 1], 단백질: [8, 4, 1], 지방: [6, 6, 1] }[k];
      const n = sizes[s];
      const pieces = Math.round(16 / n);
      let blocks = "";
      for (let i = 0; i < pieces; i++) {
        const x = 30 + (i % 8) * 42, y = 100 + Math.floor(i / 8) * 50;
        blocks += `<rect x="${x}" y="${y}" width="${Math.max(10, n * 4.5)}" height="20" rx="5" fill="${col[k]}" opacity=".85"/>`;
      }
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 220" font-family="Pretendard,sans-serif" font-size="13">
        <rect x="10" y="20" width="370" height="190" rx="16" fill="#fff0e6" stroke="#e8590c" stroke-opacity=".4"/>
        <text x="195" y="55" text-anchor="middle" font-weight="800" fill="#d9480f">${["입", "위", "작은창자"][s]}</text>
        ${s === 2 ? '<text x="195" y="78" text-anchor="middle" fill="#2b8a3e" font-size="12">세포막을 통과할 만큼 작아짐 → 융털로 흡수</text>' : ""}
        ${blocks}</svg>`;
    };
    el.querySelectorAll("[data-n] button").forEach((b) => (b.onclick = () => { k = b.dataset.k; s = 0; draw(); }));
    el.querySelectorAll("[data-s] button").forEach((b) => (b.onclick = () => { s = +b.dataset.i; draw(); }));
    draw();
  }

  function labCirc(el) {
    const paths = {
      온몸순환: ["좌심실", "대동맥", "온몸의 모세혈관", "대정맥", "우심방"],
      허파순환: ["우심실", "폐동맥", "허파의 모세혈관", "폐정맥", "좌심방"],
    };
    const all = ["좌심실", "우심실", "좌심방", "우심방", "대동맥", "대정맥", "폐동맥", "폐정맥", "온몸의 모세혈관", "허파의 모세혈관"];
    el.innerHTML = `<div class="lab-controls">
      <div class="seg" data-m><button class="active" data-k="온몸순환">온몸순환</button><button data-k="허파순환">허파순환</button></div>
      <p style="margin:12px 0 6px">혈액이 지나가는 순서대로 버튼을 눌러 보세요.</p>
      <div data-seq style="display:flex;gap:6px;flex-wrap:wrap;min-height:40px;align-items:center"></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px" data-btns></div>
      <div class="lab-out" data-out></div></div>`;
    let mode = "온몸순환", seq = [];
    const render = () => {
      el.querySelectorAll("[data-m] button").forEach((b) => b.classList.toggle("active", b.dataset.k === mode));
      el.querySelector("[data-seq]").innerHTML = seq.map((s, i) => `${i ? "→ " : ""}<span class="chip active">${s}</span>`).join(" ") || '<span style="color:var(--muted)">시작: ?</span>';
      el.querySelector("[data-btns]").innerHTML = all.map((a) => `<button class="btn btn-sm" data-a="${a}">${a}</button>`).join("") + '<button class="btn btn-sm" data-reset>↺ 다시</button>';
      el.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => {
        const want = paths[mode][seq.length];
        if (b.dataset.a === want) {
          seq.push(want);
          if (seq.length === 5) el.querySelector("[data-out]").innerHTML = `🎉 정답! <b>${paths[mode].join(" → ")}</b><br>${mode === "온몸순환" ? "조직세포에 산소·영양소를 주고 이산화 탄소·노폐물을 받아 와요." : "허파에서 이산화 탄소를 내보내고 산소를 받아 와요."}<br><span style="font-size:13px">혈액은 몸을 한 바퀴 도는 동안 심장을 두 번 거쳐요.</span>`;
          else el.querySelector("[data-out]").innerHTML = "좋아요! 다음은?";
        } else {
          el.querySelector("[data-out]").innerHTML = `❌ <b>${b.dataset.a}</b>이(가) 아니에요. ${seq.length === 0 ? (mode === "온몸순환" ? "온몸순환은 '좌'심실에서 시작!" : "허파순환은 '우'심실에서 시작!") : "심실 → 동맥 → 모세혈관 → 정맥 → 심방 순서를 떠올려 보세요."}`;
        }
        render();
      }));
      el.querySelector("[data-reset]").onclick = () => { seq = []; el.querySelector("[data-out]").innerHTML = ""; render(); };
    };
    el.querySelectorAll("[data-m] button").forEach((b) => (b.onclick = () => { mode = b.dataset.k; seq = []; el.querySelector("[data-out]").innerHTML = ""; render(); }));
    render();
  }

  function labBreath(el) {
    el.innerHTML = `<div class="lab"><div class="lab-controls">
      <div class="seg" data-b><button class="active" data-i="0">들숨</button><button data-i="1">날숨</button></div>
      <label><input type="checkbox" data-auto> 자동으로 숨쉬기</label>
      <div class="lab-out" data-out></div></div><div class="lab-svg" data-svg></div></div>`;
    let st = 0, timer = null;
    const T = [
      ["올라간다", "내려간다", "커진다", "커진다", "낮아진다", "몸 밖 → 허파"],
      ["내려간다", "올라간다", "작아진다", "작아진다", "높아진다", "허파 → 몸 밖"],
    ];
    const draw = () => {
      el.querySelectorAll("[data-b] button").forEach((b) => b.classList.toggle("active", +b.dataset.i === st));
      const t = T[st];
      el.querySelector("[data-out]").innerHTML = `<table class="t" style="margin:0"><tr><th>갈비뼈</th><td>${t[0]}</td></tr><tr><th>가로막</th><td>${t[1]}</td></tr><tr><th>흉강 부피</th><td>${t[2]}</td></tr><tr><th>허파 부피</th><td>${t[3]}</td></tr><tr><th>허파 내부 압력</th><td>${t[4]}</td></tr><tr><th>공기 이동</th><td><b>${t[5]}</b></td></tr></table>`;
      const inh = st === 0;
      const lungRx = inh ? 62 : 48, lungRy = inh ? 78 : 62, dia = inh ? 205 : 180, rib = inh ? -6 : 6;
      el.querySelector("[data-svg]").innerHTML = `<svg viewBox="0 0 390 260" font-family="Pretendard,sans-serif" font-size="13">
        <path d="M195,20 L195,70" stroke="#adb5bd" stroke-width="12" stroke-linecap="round"/>
        <path d="M195,70 L150,95 M195,70 L240,95" stroke="#adb5bd" stroke-width="8" stroke-linecap="round"/>
        <ellipse cx="130" cy="${dia - lungRy - 5}" rx="${lungRx}" ry="${lungRy}" fill="#ffc9c9" stroke="#e03131" style="transition:all .6s"/>
        <ellipse cx="260" cy="${dia - lungRy - 5}" rx="${lungRx}" ry="${lungRy}" fill="#ffc9c9" stroke="#e03131" style="transition:all .6s"/>
        ${[0, 1, 2, 3].map((i) => `<path d="M40,${70 + i * 32 + rib} Q195,${50 + i * 32 + rib * 2} 350,${70 + i * 32 + rib}" fill="none" stroke="#868e96" stroke-width="5" opacity=".7"/>`).join("")}
        <path d="M40,${dia} Q195,${dia - (inh ? 10 : 45)} 350,${dia}" fill="none" stroke="#e8590c" stroke-width="6"/>
        <text x="300" y="${dia + 22}" fill="#e8590c" font-weight="800">가로막 ${inh ? "↓" : "↑"}</text>
        <text x="20" y="40" fill="#868e96" font-weight="800">갈비뼈 ${inh ? "↑" : "↓"}</text>
        <text x="210" y="30" fill="${inh ? "#1c7ed6" : "#e8590c"}" font-weight="800">${inh ? "공기 들어옴 ↓" : "공기 나감 ↑"}</text></svg>`;
    };
    el.querySelectorAll("[data-b] button").forEach((b) => (b.onclick = () => { st = +b.dataset.i; draw(); }));
    el.querySelector("[data-auto]").onchange = (e) => {
      clearInterval(timer);
      if (e.target.checked) timer = setInterval(() => { if (!document.body.contains(el)) { clearInterval(timer); return; } st = 1 - st; draw(); }, 1800);
    };
    draw();
  }

  function labUrine(el) {
    const S = ["단백질", "혈구", "포도당", "아미노산", "물", "무기염류", "요소"];
    const where = [
      ["콩팥동맥 혈액", [1, 1, 1, 1, 1, 1, 1]],
      ["보먼주머니 여과액 (여과 후)", [0, 0, 1, 1, 1, 1, 1]],
      ["오줌 (재흡수·분비 후)", [0, 0, 0, 0, 0.3, 0.5, 1]],
    ];
    el.innerHTML = `<div class="lab-controls"><div class="seg" data-w>${where.map((w, i) => `<button class="${i ? "" : "active"}" data-i="${i}">${w[0]}</button>`).join("")}</div>
      <div data-grid style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin-top:14px"></div><div class="lab-out" data-out></div></div>`;
    const msg = [
      "혈액에는 크고 작은 물질이 모두 들어 있어요.",
      "<b>여과</b>: 토리 → 보먼주머니. 크기가 큰 <b>혈구와 단백질은 여과되지 않고</b> 혈액에 남아요.",
      "<b>재흡수</b>로 포도당·아미노산(전부), 대부분의 물, 무기염류 일부가 모세혈관으로 돌아가고, <b>분비</b>로 남은 노폐물이 세뇨관으로 더해져요. → 오줌의 주성분은 물과 <b>요소</b>!",
    ];
    const draw = (i) => {
      el.querySelectorAll("[data-w] button").forEach((b) => b.classList.toggle("active", +b.dataset.i === i));
      el.querySelector("[data-grid]").innerHTML = S.map((s, j) => {
        const v = where[i][1][j];
        return `<div class="card" style="padding:10px;text-align:center;box-shadow:none;opacity:${v ? 1 : 0.35}"><b>${s}</b><div style="font-size:13px;color:${v ? "var(--ok)" : "var(--bad)"}">${v === 1 ? "있음" : v ? "일부" : "없음"}</div></div>`;
      }).join("");
      el.querySelector("[data-out]").innerHTML = msg[i];
    };
    el.querySelectorAll("[data-w] button").forEach((b) => (b.onclick = () => draw(+b.dataset.i)));
    draw(0);
  }

  U["6"] = {
    id: "6", roman: "VI", title: "동물과 에너지", short: "동물과 에너지", cls: "u6", icon: "🫀",
    desc: "음식물 속 영양소가 소화·흡수되고, 순환계를 통해 운반되며, 호흡으로 들어온 산소와 함께 세포호흡에 쓰여 에너지를 얻는 과정, 그리고 노폐물의 배설까지 정리해요.",
    chapters: [
      {
        title: "소화와 순환",
        lessons: [
          {
            title: "영양소",
            goals: ["영양소의 종류와 기능을 설명할 수 있다.", "음식물에 들어 있는 영양소를 검출할 수 있다."],
            html: `
              <p>음식물 속에는 몸을 구성하거나 생명활동에 이용되는 물질인 <span class="kw">영양소</span>가 들어 있다. 한 가지라도 부족하면 건강한 생활을 할 수 없으므로 다양한 음식물을 먹어 <b>영양 섭취의 균형</b>을 이루어야 한다.</p>
              <div class="table-wrap"><table class="t">
                <tr><th>영양소</th><th>기능</th><th>많이 든 음식</th></tr>
                <tr><td><b>탄수화물</b></td><td>주로 에너지원 (포도당, 엿당, 설탕, 녹말 등)</td><td>밥, 국수, 빵, 감자, 고구마</td></tr>
                <tr><td><b>단백질</b></td><td>주로 몸을 구성, 생명활동 조절, 에너지원</td><td>살코기, 생선, 달걀, 두부, 콩</td></tr>
                <tr><td><b>지방</b></td><td>몸을 구성, 에너지원, 피부 아래 지방층은 체온 유지</td><td>땅콩, 깨, 버터, 참기름</td></tr>
                <tr><td>바이타민</td><td>적은 양으로 생명활동 조절</td><td>과일, 채소</td></tr>
                <tr><td>무기염류</td><td>뼈·이 등 몸을 구성, 생명활동 조절 (칼슘, 칼륨, 나트륨, 철, 마그네슘 등)</td><td>멸치, 다시마, 우유, 치즈, 버섯</td></tr>
                <tr><td>물</td><td>몸의 구성 성분 중 <b>가장 많음</b>, 물질 운반, 체온 조절</td><td>—</td></tr>
              </table></div>
              <div class="box box-key"><p><b>3대영양소</b> = 에너지원으로 이용되는 <b>탄수화물, 단백질, 지방</b>. 바이타민·무기염류·물은 에너지원이 아니다. 바이타민과 무기염류는 대부분 체내에서 합성할 수 없어 음식물로 섭취해야 한다.</p></div>
              <h4>영양소 검출 방법</h4>
              <div class="table-wrap"><table class="t">
                <tr><th>검출 대상</th><th>검출 용액</th><th>색깔 변화</th></tr>
                <tr><td>포도당(엿당 등 당분)</td><td>베네딕트 용액 + <b>가열</b></td><td><b style="color:#e8590c">황적색</b></td></tr>
                <tr><td>녹말</td><td>아이오딘-아이오딘화 칼륨 용액</td><td><b style="color:#3b2f8f">청람색</b></td></tr>
                <tr><td>단백질</td><td>뷰렛 용액</td><td><b style="color:#7048e8">보라색</b></td></tr>
                <tr><td>지방</td><td>수단 Ⅲ 용액</td><td><b style="color:#e03131">선홍색</b></td></tr>
              </table></div>
              <div class="box box-lab"><p><b>음식물 속 영양소 검출</b>: 24 홈판에 증류수·밥물·양파즙·달걀흰자액·식용유를 넣고 시약을 떨어뜨림. 베네딕트 반응은 시험관에 넣어 뜨거운 물(80~90 ℃)에서 5분 가열. 예상: 밥물-녹말, 양파즙-당분, 달걀흰자액-단백질, 식용유-지방, <b>증류수는 비교(대조)용</b>.<br>뷰렛 용액 = 5 % 수산화 나트륨 수용액 + 1 % 황산 구리 수용액 (사용 직전 혼합)</p></div>
              <div class="box box-warn"><p>베네딕트 용액만 <b>가열</b>이 필요! 뷰렛 = 단백질(보라), 수단 Ⅲ = 지방(선홍) 짝을 헷갈리지 않기.</p></div>`,
          },
          {
            title: "소화계의 구조와 기능",
            goals: ["소화계의 구조와 기능을 설명할 수 있다.", "소화 과정을 소화효소의 작용과 관련지어 추론할 수 있다."],
            html: `
              <p>영양소가 이용되려면 <b>세포 안으로 들어가야</b> 한다. 포도당·바이타민·무기염류는 작아서 세포막을 통과하지만, 녹말·단백질·지방은 커서 통과하지 못한다. 크기가 큰 영양소를 세포막을 통과할 수 있는 작은 영양소로 분해하는 과정이 <span class="kw">소화</span>이다.</p>
              <div class="box box-key"><p><span class="kw">소화계</span> = 입 → 식도 → 위 → 작은창자 → 큰창자 → 항문 (<b>소화관</b>) + 침샘, 간, 쓸개, 이자<br><span class="kw">소화효소</span>: 큰 영양소를 작은 영양소로 분해하는 것을 촉진. 각 소화효소는 <b>특정 영양소에만</b> 작용한다.</p></div>
              <div class="box box-lab"><p><b>침의 소화 작용</b>: (가) 녹말 용액 + 증류수, (나) 녹말 용액 + 침 용액을 <b>35~40 ℃</b>(체온과 비슷)에 10분 → 아이오딘 반응: (가) 청람색, (나) 변화 없음 / 베네딕트 반응: (가) 변화 없음, (나) 황적색 → 침이 <b>녹말을 엿당(당분)으로 분해</b>했다.</p></div>
              <figure class="dia">${svgDigest}<figcaption>그림 VI-4 영양소의 소화 과정</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>소화효소</th><th>소화액(분비 기관)</th><th>작용 장소</th><th>작용</th></tr>
                <tr><td>아밀레이스</td><td>침(침샘), 이자액(이자)</td><td>입, 작은창자</td><td>녹말 → 엿당</td></tr>
                <tr><td>펩신</td><td>위액(위) + <b>염산</b></td><td>위</td><td>단백질 분해</td></tr>
                <tr><td>트립신</td><td>이자액(이자)</td><td>작은창자</td><td>단백질 분해</td></tr>
                <tr><td>라이페이스</td><td>이자액(이자)</td><td>작은창자</td><td>지방 → 지방산 + 모노글리세라이드</td></tr>
              </table></div>
              <div class="box box-warn"><p><b>쓸개즙</b>은 간에서 만들어져 쓸개에 저장되며, <b>소화효소가 없지만</b> 지방의 소화를 돕는다. ("쓸개에서 라이페이스 분비" ✗) · <b>염산</b>: 펩신의 작용을 돕고 세균을 죽인다.</p></div>
              <p>최종 소화 산물: 녹말 → <b>포도당</b>, 단백질 → <b>아미노산</b>, 지방 → <b>지방산과 모노글리세라이드</b></p>
              <h4>영양소의 흡수</h4>
              <figure class="dia">${svgVillus}<figcaption>그림 VI-5 작은창자 안쪽의 구조와 융털 — 융털 속에는 모세혈관과 암죽관이 분포한다.</figcaption></figure>
              <ul>
                <li>작은창자 안쪽 벽의 <b>주름</b>과 <span class="kw">융털</span> → 영양소와 닿는 <b>표면적이 매우 넓어</b> 효율적으로 흡수</li>
                <li>흡수된 영양소는 <b>심장을 거쳐</b> 온몸의 조직세포로 운반</li>
                <li><b>큰창자</b>: 소화 작용은 거의 없고 주로 <b>물을 흡수</b> → 찌꺼기는 대변으로 항문을 통해 배출 (음식물 속 물은 대부분 작은창자에서 흡수)</li>
              </ul>
              <div class="box box-exam"><p>천연 소화제: <b>무</b>(아밀레이스 → 면 요리와 함께), 파인애플(단백질 분해), 바나나(탄수화물 분해), 아보카도(지방 분해)</p></div>`,
          },
          {
            title: "순환계의 구조와 기능",
            goals: ["순환계의 구조와 기능을 설명할 수 있다.", "혈액의 순환 경로를 종합하여 발표할 수 있다."],
            html: `
              <p>몸속에서 물질을 운반하는 기관계가 <span class="kw">순환계</span>이며, <b>심장, 혈관, 혈액</b>으로 이루어져 있다.</p>
              <h4>심장</h4>
              <ul>
                <li>주먹만 한 크기, 끊임없이 수축·이완하는 <b>박동</b>으로 혈액을 순환시킴</li>
                <li><b>심방</b>(2개): 혈액을 받아들이는 곳, <b>정맥</b>과 연결</li>
                <li><b>심실</b>(2개): 혈액을 내보내는 곳, <b>동맥</b>과 연결. 심방보다 근육이 <b>두껍고 탄력이 강함</b></li>
                <li><span class="kw">판막</span>: 심방-심실 사이, 심실-동맥 사이 → 혈액은 <b>심방 → 심실 → 동맥</b> 한 방향으로만 흐름</li>
              </ul>
              <h4>혈관</h4>
              <div class="table-wrap"><table class="t">
                <tr><th>구분</th><th>동맥</th><th>모세혈관</th><th>정맥</th></tr>
                <tr><td>혈액 흐름</td><td>심장에서 나가는 혈액</td><td>동맥과 정맥을 이음</td><td>심장으로 들어가는 혈액</td></tr>
                <tr><td>혈관벽</td><td>두껍고 탄력 강함 (높은 압력을 견딤)</td><td><b>매우 얇음</b> → 주변 세포와 <b>물질 교환</b></td><td>동맥보다 얇고 탄력 약함, <b>판막</b> 있음</td></tr>
              </table></div>
              <p>혈액 이동 방향: 동맥 → 모세혈관 → 정맥</p>
              <h4>혈액</h4>
              <p>혈액 = 액체 성분 <span class="kw">혈장</span>(대부분 물, 영양소·이산화 탄소·노폐물 운반) + 세포 성분 <span class="kw">혈구</span></p>
              <div class="table-wrap"><table class="t">
                <tr><th>혈구</th><th>특징</th><th>기능</th></tr>
                <tr><td>적혈구</td><td>수가 가장 많음, 핵 없음, 가운데가 오목한 원반 모양, <b>헤모글로빈</b>(붉은 색소)</td><td><b>산소 운반</b> 작용</td></tr>
                <tr><td>백혈구</td><td>크기가 가장 큼, 모양 일정하지 않음, <b>핵 있음</b></td><td>세균 제거 → <b>보호</b> 작용</td></tr>
                <tr><td>혈소판</td><td>크기가 가장 작음, 모양 일정하지 않음, 핵 없음</td><td><b>혈액응고</b> 작용</td></tr>
              </table></div>
              <h4>혈액 순환</h4>
              <figure class="dia">${svgCirc}<figcaption>그림 VI-9 혈액의 순환 경로 — 빨강: 산소를 많이 포함한 혈액, 파랑: 산소를 적게 포함한 혈액</figcaption></figure>
              <div class="box box-key"><p><b>온몸순환</b>: 좌심실 → 대동맥 → 온몸의 모세혈관 → 대정맥 → 우심방 (조직세포에 산소·영양소 공급, 이산화 탄소·노폐물 받음)<br><b>허파순환</b>: 우심실 → 폐동맥 → 허파의 모세혈관 → 폐정맥 → 좌심방 (이산화 탄소 내보내고 산소 받음)</p></div>
              <div class="box box-warn"><p><b>폐동맥</b>에는 산소가 적은 혈액, <b>폐정맥</b>에는 산소가 많은 혈액이 흐른다! (동맥/정맥은 산소량이 아니라 심장에서 나가는지/들어오는지로 구분) 혈액은 한 바퀴 도는 동안 심장을 <b>두 번</b> 거친다.</p></div>
              <div class="box box-exam"><p><b>자동 심장 충격기[AED]</b>: 심장박동이 불규칙하거나 너무 빨라 심장 마비가 왔을 때 외부에서 자동으로 전기 충격을 줘 정상 박동으로 돌아오게 함. 적절한 시간 내 사용하면 혈액 순환 중단에 의한 뇌 손상을 줄인다. (전원 → 패드 부착 → 환자 접촉 금지 → 전기 충격 → 즉시 심폐소생술)</p></div>`,
          },
        ],
      },
      {
        title: "호흡과 배설",
        lessons: [
          {
            title: "호흡계의 구조와 기능",
            goals: ["호흡계의 구조와 기능을 설명할 수 있다.", "호흡운동 모형을 만들어 호흡운동의 원리를 설명할 수 있다."],
            html: `
              <p>생물은 숨을 들이쉬고 내쉬는 <span class="kw">호흡운동</span>으로 산소를 받아들이고 이산화 탄소를 내보낸다. <span class="kw">호흡계</span> = <b>코, 숨관, 숨관가지, 허파</b></p>
              <ul>
                <li>숨관 → 두 개의 숨관가지 → 좌우 허파 → 더 많은 가지 → 끝부분은 <span class="kw">허파꽈리</span></li>
                <li>허파는 무수히 많은 허파꽈리로 이루어져 <b>표면적이 넓다</b> → 기체 교환에 효율적</li>
                <li>허파꽈리는 <b>모세혈관으로 둘러싸여</b> 있어 기체 교환이 일어난다.</li>
                <li>허파는 갈비뼈와 가로막으로 둘러싸인 <b>흉강</b>에 들어 있으며, <b>근육이 없어 스스로 움직이지 못한다.</b></li>
              </ul>
              <h4>호흡운동의 원리</h4>
              <div class="table-wrap"><table class="t">
                <tr><th>구분</th><th>갈비뼈</th><th>가로막</th><th>흉강·허파 부피</th><th>허파 내부 압력</th><th>공기 이동</th></tr>
                <tr><td><b>들숨</b></td><td>올라감</td><td>내려감</td><td>커짐</td><td>낮아짐</td><td>몸 밖 → 허파</td></tr>
                <tr><td><b>날숨</b></td><td>내려감</td><td>올라감</td><td>작아짐</td><td>높아짐</td><td>허파 → 몸 밖</td></tr>
              </table></div>
              <p>공기는 <b>압력이 높은 곳에서 낮은 곳으로</b> 이동한다. (중1 '기체의 성질': 부피↑ → 압력↓)</p>
              <div class="box box-lab"><p><b>호흡운동 모형</b>: 플라스틱 컵 = <b>갈비뼈(가슴)</b>, 빨대 = <b>숨관·숨관가지</b>, 작은 고무풍선 = <b>허파</b>, 고무 막 = <b>가로막</b>, 컵 속 공간 = <b>흉강</b>. 고무 막을 아래로 당기면 컵 속 부피↑ 압력↓ → 작은 풍선이 부푼다(들숨).</p></div>
              <h4>기체 교환</h4>
              <div class="table-wrap"><table class="t">
                <tr><th>장소</th><th>산소</th><th>이산화 탄소</th></tr>
                <tr><td>허파꽈리</td><td>허파꽈리 → 모세혈관</td><td>모세혈관 → 허파꽈리</td></tr>
                <tr><td>조직세포</td><td>모세혈관 → 조직세포</td><td>조직세포 → 모세혈관</td></tr>
              </table></div>
              <div class="box box-exam"><p>사람이 많은 공간에서 환기를 자주 해야 하는 까닭: 호흡으로 산소는 줄고 이산화 탄소는 늘어나기 때문. "풍선에 바람을 불면 갈비뼈가 올라간다"는 모형은 <b>원인과 결과가 반대</b> — 허파는 스스로 부풀지 못하고, 갈비뼈·가로막의 움직임이 먼저다.</p></div>`,
          },
          {
            title: "배설계의 구조와 기능",
            goals: ["배설계의 구조와 기능을 설명할 수 있다.", "노폐물이 배설되는 과정을 모식도로 표현할 수 있다."],
            html: `
              <p>세포가 영양소를 분해해 에너지를 얻을 때 <b>노폐물</b>이 생긴다. 특히 <b>단백질</b>이 분해될 때 생기는 <b>암모니아</b>는 독성이 강하므로 <b>간</b>에서 독성이 약한 <span class="kw">요소</span>로 바뀐 후 콩팥으로 운반되어 물과 함께 몸 밖으로 나간다.</p>
              <div class="box box-key"><p><span class="kw">배설</span>: 콩팥에서 오줌을 만들어 요소 같은 노폐물을 몸 밖으로 내보내는 과정<br><span class="kw">배설계</span> = <b>콩팥, 오줌관, 방광, 요도</b></p></div>
              <ul>
                <li><b>콩팥</b>: 허리의 등 쪽 좌우에 1개씩. 콩팥겉질, 콩팥속질, 콩팥깔때기로 구분</li>
                <li><span class="kw">콩팥단위</span>(오줌을 만드는 기본 단위) = <b>토리</b>(모세혈관이 실뭉치처럼 뭉친 부분) + <b>보먼주머니</b>(토리를 둘러싼 주머니) + <b>세뇨관</b>(가늘고 긴 관, 모세혈관이 둘러쌈)</li>
                <li>오줌 경로: 콩팥단위 → <b>콩팥깔때기 → 오줌관 → 방광(저장) → 요도</b> → 몸 밖</li>
              </ul>
              <h4>오줌이 만들어지는 과정</h4>
              <figure class="dia">${svgNephron}<figcaption>그림 VI-14 오줌이 만들어지는 과정 — 여과, 재흡수, 분비</figcaption></figure>
              <div class="table-wrap"><table class="t">
                <tr><th>과정</th><th>이동</th><th>물질</th></tr>
                <tr><td><b>여과</b></td><td>토리 → 보먼주머니</td><td>물, 포도당, 아미노산, 무기염류, 요소 등 <b>크기가 작은 물질</b> (혈구·단백질은 여과 ✗)</td></tr>
                <tr><td><b>재흡수</b></td><td>세뇨관 → 모세혈관</td><td>포도당, 아미노산, 대부분의 물, 무기염류 등 <b>몸에 필요한 물질</b></td></tr>
                <tr><td><b>분비</b></td><td>모세혈관 → 세뇨관</td><td>여과되지 않고 혈액에 남아 있던 <b>노폐물</b></td></tr>
              </table></div>
              <div class="box box-exam"><p>오줌에 <b>단백질</b>이 섞여 나온다 → 정상적으로는 여과되지 않으므로 <b>토리(여과)</b>에 이상.<br><b>당뇨병</b> 환자 오줌에서 포도당 검출 → 혈액 속 포도당이 너무 많아 여과된 포도당이 세뇨관에서 <b>모두 재흡수되지 못하고</b> 오줌으로 나옴.<br>건강한 사람은 콩팥정맥의 요소 농도가 콩팥동맥보다 <b>낮다</b>.</p></div>`,
          },
          {
            title: "소화, 순환, 호흡, 배설과 에너지",
            goals: ["동물이 세포호흡을 통해 에너지를 얻는 과정을 소화, 순환, 호흡, 배설과 관련지어 통합적으로 설명할 수 있다."],
            html: `
              <div class="box box-key"><p><span class="kw">세포호흡</span>: 세포에서 영양소가 산소와 반응하여 물과 이산화 탄소로 분해되면서 에너지를 얻는 과정 (주로 <b>마이토콘드리아</b>)</p></div>
              <div class="eq">영양소(포도당) + 산소 → 이산화 탄소 + 물 + 에너지</div>
              <div class="table-wrap"><table class="t">
                <tr><th>기관계</th><th>세포호흡을 위한 역할</th></tr>
                <tr><td>소화계</td><td>음식물 속 영양소를 소화·흡수</td></tr>
                <tr><td>호흡계</td><td>산소를 받아들이고 이산화 탄소를 내보냄</td></tr>
                <tr><td>순환계</td><td>영양소·산소를 조직세포로, 이산화 탄소·요소를 호흡계·배설계로 운반</td></tr>
                <tr><td>배설계</td><td>요소 등 노폐물을 오줌으로 내보냄</td></tr>
              </table></div>
              <p>세포호흡으로 얻은 에너지는 <b>체온 유지, 성장, 근육 운동, 정신 활동, 소리 내기</b> 등에 이용된다. 소화계·순환계·호흡계·배설계가 <b>협력하여 조화롭게 작용</b>할 때 세포는 에너지를 원활하게 얻는다.</p>
              <div class="box box-exam"><p>운동하면 <b>호흡 수·심장박동 수가 증가하고 체온이 올라간다</b> → 많은 에너지가 필요해 세포호흡이 활발해지므로 더 많은 산소와 영양소를 공급하고 이산화 탄소를 빨리 내보내야 하며, 세포호흡으로 발생한 에너지의 일부가 열로 방출되기 때문.</p></div>`,
          },
        ],
      },
    ],
    labs: [
      { title: "영양소 소화 따라가기", desc: "녹말·단백질·지방이 입 → 위 → 작은창자를 지나며 어떤 소화효소로 분해되는지 확인해 보세요.", mount: labDigest },
      { title: "혈액 순환 경로 맞히기", desc: "온몸순환과 허파순환의 경로를 순서대로 클릭해 완성해 보세요.", mount: labCirc },
      { title: "호흡운동 시뮬레이터", desc: "들숨과 날숨에서 갈비뼈, 가로막, 허파의 변화를 관찰해 보세요.", mount: labBreath },
      { title: "오줌 생성 과정 추적", desc: "콩팥동맥 → 여과액 → 오줌으로 가면서 각 물질이 어떻게 달라지는지 확인해 보세요.", mount: labUrine },
    ],
    flash: [
      ["3대영양소", "탄수화물, 단백질, 지방 (에너지원)"],
      ["몸의 구성 성분 중 가장 많은 영양소", "물"],
      ["베네딕트 용액", "당분(포도당·엿당) 검출, <b>가열</b> 후 황적색"],
      ["뷰렛 용액", "단백질 → <b>보라색</b>"],
      ["수단 Ⅲ 용액", "지방 → <b>선홍색</b>"],
      ["아이오딘-아이오딘화 칼륨 용액", "녹말 → <b>청람색</b>"],
      ["소화", "큰 영양소를 세포막을 통과할 수 있는 작은 영양소로 분해하는 과정"],
      ["아밀레이스", "침·이자액 / 입·작은창자에서 녹말 → 엿당"],
      ["펩신", "위액 / 염산의 도움으로 단백질 분해"],
      ["트립신", "이자액 / 작은창자에서 단백질 분해"],
      ["라이페이스", "이자액 / 지방 → 지방산 + 모노글리세라이드"],
      ["쓸개즙", "간에서 생성, 쓸개에 저장, <b>효소 없음</b>, 지방 소화를 도움"],
      ["융털", "작은창자 안쪽 표면적을 넓힘. 속에 모세혈관·암죽관"],
      ["큰창자", "소화 거의 없음, 주로 <b>물 흡수</b>"],
      ["심방 / 심실", "심방: 받아들임(정맥 연결) / 심실: 내보냄(동맥 연결), 근육 두꺼움"],
      ["판막", "혈액이 거꾸로 흐르는 것을 막음 (심장, 정맥)"],
      ["모세혈관", "벽이 매우 얇아 주변 세포와 물질 교환"],
      ["적혈구", "헤모글로빈, 핵 없음, 오목한 원반, 산소 운반"],
      ["백혈구", "가장 큼, 핵 있음, 세균 제거(보호 작용)"],
      ["혈소판", "가장 작음, 혈액응고 작용"],
      ["온몸순환", "좌심실 → 대동맥 → 온몸 모세혈관 → 대정맥 → 우심방"],
      ["허파순환", "우심실 → 폐동맥 → 허파 모세혈관 → 폐정맥 → 좌심방"],
      ["호흡계", "코, 숨관, 숨관가지, 허파(허파꽈리)"],
      ["들숨", "갈비뼈↑ 가로막↓ → 흉강 부피↑ → 허파 압력↓ → 공기 들어옴"],
      ["날숨", "갈비뼈↓ 가로막↑ → 흉강 부피↓ → 허파 압력↑ → 공기 나감"],
      ["허파꽈리에서 산소 이동", "허파꽈리 → 모세혈관"],
      ["요소", "단백질 분해 시 생긴 암모니아를 <b>간</b>에서 바꾼 독성이 약한 노폐물"],
      ["배설계", "콩팥, 오줌관, 방광, 요도"],
      ["콩팥단위", "토리 + 보먼주머니 + 세뇨관"],
      ["여과", "토리 → 보먼주머니 (혈구·단백질 ✗)"],
      ["재흡수", "세뇨관 → 모세혈관 (포도당, 아미노산, 물, 무기염류)"],
      ["분비", "모세혈관 → 세뇨관 (남은 노폐물)"],
      ["세포호흡", "영양소 + 산소 → 이산화 탄소 + 물 + 에너지 (마이토콘드리아)"],
    ],
    ox: [
      ["탄수화물, 단백질, 무기염류는 모두 에너지원으로 이용되는 영양소이다.", false, "무기염류는 에너지원이 아니다. 3대영양소는 탄수화물·단백질·지방."],
      ["바이타민은 우리 몸에서 에너지원으로 사용된다.", false, "바이타민은 적은 양으로 생명활동을 조절한다."],
      ["지방이 들어 있는 음식물은 뷰렛 용액과 반응하여 보라색으로 변한다.", false, "뷰렛-보라색은 단백질. 지방은 수단 Ⅲ 용액으로 선홍색."],
      ["베네딕트 용액으로 당분을 검출할 때는 가열해야 한다.", true, "가열하면 황적색으로 변한다."],
      ["라이페이스는 입과 작은창자에서 녹말을 엿당으로 분해한다.", false, "아밀레이스에 대한 설명이다."],
      ["쓸개즙에는 지방을 분해하는 소화효소가 들어 있다.", false, "쓸개즙에는 소화효소가 없고 지방 소화를 돕기만 한다."],
      ["최종적으로 소화된 영양소는 작은창자의 융털을 통해 흡수된다.", true, "융털 속 모세혈관·암죽관으로 흡수된다."],
      ["심방은 혈액을 받아들이고, 심실은 혈액을 내보낸다.", true, "심방-정맥, 심실-동맥과 연결."],
      ["정맥은 동맥보다 혈관벽이 두껍고 탄력이 강하다.", false, "동맥이 더 두껍고 탄력이 강하다. 정맥에는 판막이 있다."],
      ["폐정맥에는 산소를 많이 포함한 혈액이 흐른다.", true, "허파에서 산소를 받은 혈액이 좌심방으로 들어간다."],
      ["허파는 스스로 수축과 이완을 하여 호흡운동을 한다.", false, "허파는 근육이 없어 스스로 움직이지 못한다."],
      ["숨을 들이쉴 때 가로막은 아래로 내려간다.", true, "갈비뼈는 올라가고 가로막은 내려간다."],
      ["산소는 모세혈관에서 허파꽈리로 이동한다.", false, "산소는 허파꽈리 → 모세혈관, 이산화 탄소는 모세혈관 → 허파꽈리."],
      ["암모니아는 콩팥에서 요소로 바뀐다.", false, "암모니아는 간에서 요소로 바뀐다."],
      ["토리에서 보먼주머니로 여과될 때 단백질과 혈구는 여과되지 않는다.", true, "크기가 큰 물질은 혈액에 남는다."],
      ["포도당과 아미노산은 세뇨관에서 모세혈관으로 분비된다.", false, "재흡수된다. 분비는 모세혈관 → 세뇨관 방향."],
      ["세포호흡은 주로 마이토콘드리아에서 일어난다.", true, "영양소가 산소와 반응해 에너지를 얻는다."],
    ],
    mcq: [
      { q: "어떤 음식물의 검출 결과가 아이오딘-아이오딘화 칼륨 용액: 청람색, 뷰렛 용액: 변화 없음, 수단 Ⅲ 용액: 선홍색이었다. 들어 있는 영양소는?", c: ["녹말, 단백질", "녹말, 지방", "단백질, 지방", "포도당, 지방", "녹말, 단백질, 지방"], a: 1, e: "청람색 → 녹말, 선홍색 → 지방. 뷰렛 반응이 없으므로 단백질 없음.", lv: 1, tag: "영양소 검출" },
      { q: "녹말 용액에 (가) 증류수, (나) 침 용액을 넣고 35~40 ℃에 10분 둔 후의 결과로 옳은 것은?", c: ["(가)와 (나) 모두 아이오딘 반응에서 청람색", "(나)만 아이오딘 반응에서 청람색", "(가)만 베네딕트 반응에서 황적색", "(나)만 베네딕트 반응에서 황적색", "(가)와 (나) 모두 베네딕트 반응에서 황적색"], a: 3, e: "침의 아밀레이스가 녹말을 엿당으로 분해 → (나)는 녹말이 없어지고 당분이 생긴다.", lv: 2, tag: "침의 소화 작용" },
      { q: "영양소의 소화와 흡수에 대한 설명으로 옳지 않은 것은?", c: ["쓸개에서 라이페이스가 분비된다.", "입안에서 녹말은 엿당으로 분해된다.", "위에서 염산이 포함된 소화액이 분비된다.", "작은창자의 융털을 통해 영양소가 흡수된다.", "이자액에는 아밀레이스, 트립신과 같은 소화효소가 들어 있다."], a: 0, e: "라이페이스는 이자액에 있다. 쓸개즙에는 소화효소가 없다.", lv: 2, tag: "소화" },
      { q: "위에서 분비되는 염산의 역할로 옳은 것은?", c: ["녹말을 분해한다.", "지방을 작은 알갱이로 만든다.", "펩신의 작용을 돕고 세균을 죽인다.", "포도당을 흡수한다.", "트립신을 활성화한다."], a: 2, e: "염산은 펩신의 작용을 돕고 음식물 속 세균을 죽인다.", lv: 1, tag: "소화" },
      { q: "작은창자 안쪽 벽에 주름과 융털이 많을 때의 이점은?", c: ["소화효소를 많이 분비한다.", "표면적이 넓어 영양소를 효율적으로 흡수한다.", "음식물을 빨리 이동시킨다.", "물을 흡수하지 않게 한다.", "세균을 죽인다."], a: 1, e: "주름과 융털로 표면적이 매우 넓어진다.", lv: 1, tag: "흡수" },
      { q: "다음 중 심장에서 나온 혈액이 흐르는 혈관이 아닌 것은?", c: ["대동맥", "폐동맥", "온몸의 동맥", "대정맥", "허파로 가는 동맥"], a: 3, e: "대정맥은 심장(우심방)으로 들어가는 혈액이 흐르는 정맥이다.", lv: 1, tag: "순환계" },
      { q: "허파순환의 경로로 옳은 것은?", c: ["좌심실 → 대동맥 → 허파 → 대정맥 → 우심방", "우심실 → 폐동맥 → 허파의 모세혈관 → 폐정맥 → 좌심방", "우심방 → 폐정맥 → 허파 → 폐동맥 → 좌심실", "좌심실 → 폐동맥 → 허파 → 폐정맥 → 우심방", "우심실 → 폐정맥 → 허파 → 폐동맥 → 좌심방"], a: 1, e: "허파순환은 우심실에서 시작해 좌심방으로 돌아온다.", lv: 1, tag: "혈액 순환" },
      { q: "산소를 가장 많이 포함한 혈액이 흐르는 곳은?", c: ["대정맥", "우심방", "우심실", "폐동맥", "폐정맥"], a: 4, e: "폐정맥은 허파에서 산소를 받은 혈액이 좌심방으로 가는 혈관이다.", lv: 2, tag: "혈액 순환" },
      { q: "적혈구에 대한 설명으로 옳은 것은?", c: ["핵이 있다.", "크기가 가장 크다.", "헤모글로빈이 있어 산소를 운반한다.", "세균을 제거한다.", "혈액을 응고시킨다."], a: 2, e: "적혈구: 수가 가장 많고, 핵 없음, 헤모글로빈으로 산소 운반.", lv: 1, tag: "혈액" },
      { q: "숨을 들이쉴 때 일어나는 변화로 옳은 것은?", c: ["갈비뼈가 내려간다.", "가로막이 올라간다.", "흉강의 부피가 작아진다.", "허파 내부 압력이 낮아진다.", "허파 속 공기가 몸 밖으로 나간다."], a: 3, e: "들숨: 갈비뼈↑, 가로막↓, 흉강 부피↑, 허파 압력↓ → 공기 유입.", lv: 1, tag: "호흡운동" },
      { q: "호흡운동 모형에서 각 부분과 우리 몸을 잘못 짝 지은 것은?", c: ["플라스틱 컵 - 갈비뼈", "빨대 - 숨관과 숨관가지", "작은 고무풍선 - 허파", "고무 막 - 가로막", "컵 속 공간 - 허파꽈리"], a: 4, e: "컵 속 공간은 흉강에 해당한다.", lv: 2, tag: "호흡운동 모형" },
      { q: "콩팥단위에서 일어나는 과정과 물질의 연결로 옳은 것은?", c: ["여과 - 혈구", "여과 - 단백질", "재흡수 - 포도당", "분비 - 아미노산", "재흡수 - 요소(전부)"], a: 2, e: "포도당은 여과된 후 세뇨관에서 모세혈관으로 모두 재흡수된다.", lv: 2, tag: "배설" },
      { q: "건강한 사람의 오줌에서 검출되지 않는 물질로만 짝 지은 것은?", c: ["물, 요소", "요소, 무기염류", "포도당, 단백질", "물, 무기염류", "요소, 물, 무기염류"], a: 2, e: "단백질은 여과되지 않고, 포도당은 모두 재흡수된다.", lv: 2, tag: "배설" },
      { q: "암모니아가 요소로 바뀌는 기관은?", c: ["콩팥", "방광", "간", "이자", "쓸개"], a: 2, e: "단백질 분해 시 생긴 암모니아는 간에서 요소로 바뀐다.", lv: 1, tag: "배설" },
      { q: "세포호흡에 관여하는 기관계 (가)~(라)에서 (가)는 영양소를 흡수, (나)는 물질 운반, (다)는 오줌 배출, (라)는 산소 흡수·이산화 탄소 배출을 한다. 옳지 않은 것은?", c: ["(가)에는 간이 포함되며 암모니아가 요소로 바뀐다.", "(나)는 순환계이다.", "(다)에서 녹말은 포도당으로 분해된다.", "(라)에는 숨관과 숨관가지가 포함된다.", "(가)~(라)의 작용으로 조직세포가 세포호흡을 한다."], a: 2, e: "(다)는 배설계로 녹말을 분해하지 않는다. 녹말 분해는 소화계(가).", lv: 3, tag: "통합" },
      { q: "운동을 할 때 나타나는 몸의 변화와 그 까닭으로 옳은 것은?", c: ["호흡 수 감소 - 산소가 덜 필요하다.", "심장박동 수 감소 - 혈액이 천천히 흘러야 한다.", "호흡 수 증가 - 세포호흡에 필요한 산소를 많이 공급하기 위해", "체온 감소 - 에너지가 모두 운동에 쓰인다.", "오줌 양 증가 - 노폐물이 생기지 않는다."], a: 2, e: "세포호흡이 활발해져 산소·영양소 공급과 이산화 탄소 배출이 늘어난다.", lv: 2, tag: "통합" },
      { q: "(가) 혈관벽이 두껍고 탄력이 강함, (나) 벽이 얇고 판막이 있음, (다) 벽이 매우 얇아 물질 교환. (가)~(다)를 바르게 짝 지은 것은?", c: ["동맥, 정맥, 모세혈관", "정맥, 동맥, 모세혈관", "모세혈관, 정맥, 동맥", "동맥, 모세혈관, 정맥", "정맥, 모세혈관, 동맥"], a: 0, e: "동맥-두껍고 탄력, 정맥-판막, 모세혈관-물질 교환.", lv: 1, tag: "혈관" },
    ],
    essay: [
      { q: "학생 (가) \"바이타민은 우리 몸에서 에너지원으로 사용돼.\", (나) \"우리 몸의 구성 성분 중 가장 많은 양을 차지하는 영양소는 물이야.\", (다) \"지방이 들어 있는 음식물은 뷰렛 용액과 반응하여 보라색으로 변해.\" 옳지 않게 설명한 학생을 모두 고르고, 옳게 고쳐 쓰시오.", lv: 1, pts: 8, tag: "대단원 마무리",
        kw: [["바이타민"], ["생명활동을 조절", "조절"], ["수단", "수단 Ⅲ", "수단3"], ["선홍색"], ["단백질"]],
        model: "(가), (다). (가) 바이타민은 에너지원으로 사용되지 않고, 적은 양으로 생명활동을 조절한다. (다) 지방이 들어 있는 음식물은 수단 Ⅲ 용액과 반응하여 선홍색으로 변한다. (뷰렛 용액과 반응하여 보라색으로 변하는 것은 단백질이다.)",
        rubric: [["8점", "(가)·(다)를 고르고 둘 다 옳게 고쳐 씀"], ["4점", "한 명만 바르게 고쳐 씀"]] },
      { q: "녹말 용액이 든 시험관 (가)에는 증류수를, (나)에는 침 용액을 넣고 35~40 ℃ 물에 10분 동안 두었다. 이후 아이오딘-아이오딘화 칼륨 용액 반응과 베네딕트 반응 결과를 각각 예상하고, 이를 통해 알 수 있는 침의 소화 작용을 설명하시오.", lv: 2, pts: 10, tag: "탐구 서술",
        kw: [["청람색"], ["황적색"], ["아밀레이스", "침"], ["녹말"], ["엿당", "당분"]],
        model: "아이오딘-아이오딘화 칼륨 용액 반응에서 (가)는 청람색, (나)는 변화가 없고, 베네딕트 반응에서 (가)는 변화가 없고 (나)는 황적색으로 변한다. 이를 통해 침 속의 소화효소(아밀레이스)가 녹말을 엿당(당분)으로 분해한다는 것을 알 수 있다.",
        rubric: [["10점", "두 반응 결과를 모두 옳게 예상 + 침이 녹말을 엿당으로 분해함을 서술"], ["6점", "결과 중 일부만 맞고 결론은 맞음"], ["3점", "결론만 서술"]],
        tip: "35~40 ℃로 유지하는 까닭: 체온과 비슷한 온도에서 소화효소가 잘 작용하기 때문." },
      { q: "녹말, 단백질, 지방이 각각 최종 산물로 분해되기까지의 소화 과정을 소화 기관과 소화효소를 포함하여 설명하시오.", lv: 2, pts: 10, tag: "개념 정리",
        kw: [["아밀레이스"], ["펩신"], ["트립신"], ["라이페이스"], ["포도당"], ["아미노산"], ["지방산"]],
        model: "녹말은 입에서 침의 아밀레이스에 의해 엿당으로 분해되고, 작은창자에서 이자액의 아밀레이스 등에 의해 최종적으로 포도당으로 분해된다. 단백질은 위에서 펩신(염산의 도움)에 의해 분해되고, 작은창자에서 트립신 등에 의해 최종적으로 아미노산으로 분해된다. 지방은 작은창자에서 쓸개즙의 도움을 받아 라이페이스에 의해 지방산과 모노글리세라이드로 분해된다.",
        rubric: [["10점", "세 영양소의 장소·효소·최종 산물을 모두 정확히 서술"], ["6점", "두 영양소만 정확"], ["3점", "한 영양소만 정확"]] },
      { q: "작은창자 안쪽 벽의 주름과 융털이 영양소 흡수에 유리한 까닭을 설명하고, 우리 주변에서 이와 같이 표면적을 넓히는 구조의 예를 한 가지 쓰시오.", lv: 1, pts: 6, tag: "교과서 스스로 확인하기",
        kw: [["표면적"], ["넓"], ["흡수"]],
        model: "주름과 융털 때문에 영양소와 닿는 표면적이 매우 넓어져 영양소를 효율적으로 흡수할 수 있다. 예: 수건의 고리 모양 올, 라디에이터·방열판의 주름, 허파의 허파꽈리 등.",
        rubric: [["6점", "표면적이 넓어 흡수가 효율적 + 적절한 예 1가지"], ["3점", "까닭만 서술"]] },
      { q: "사람의 심장에서 좌심실과 우심실 사이 벽에 구멍이 생겨 혈액이 지나간다면 어떤 문제가 생길 수 있는지 설명하시오.", lv: 3, pts: 10, tag: "대단원 마무리",
        kw: [["좌심실"], ["우심실"], ["산소를 많이", "산소가 많은"], ["섞"], ["산소", "충분히 공급", "공급되지"]],
        model: "좌심실에는 허파에서 산소를 받아 온 산소가 많은 혈액이, 우심실에는 온몸을 돌고 온 산소가 적은 혈액이 있다. 두 심실 사이에 구멍이 생기면 두 혈액이 섞여 대동맥을 통해 온몸으로 나가는 혈액의 산소량이 줄어들므로 조직세포에 산소가 충분히 공급되지 못한다.",
        rubric: [["10점", "좌·우심실 혈액의 산소량 차이 + 혼합 + 조직세포 산소 공급 부족을 서술"], ["6점", "혈액이 섞인다 + 산소 공급 부족만 서술"], ["3점", "혈액이 섞인다만 서술"]] },
      { q: "어떤 사람의 동맥 안쪽에 지방 덩어리가 쌓여 통로가 점점 좁아지고 있다. 이 사람의 몸에 어떤 증상이 나타날 수 있는지 순환계의 기능과 관련지어 설명하시오.", lv: 2, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["혈액"], ["흐르", "흐름", "순환"], ["산소", "영양소"], ["공급"]],
        model: "동맥이 좁아지면 혈액이 잘 흐르지 못해 그 동맥이 혈액을 공급하는 조직세포에 산소와 영양소가 충분히 공급되지 못한다. 그 결과 세포호흡이 원활하지 않아 가슴 통증, 어지러움 등의 증상이 나타나거나 심하면 조직이 손상될 수 있다.",
        rubric: [["8점", "혈액 흐름 방해 → 산소·영양소 공급 부족 → 증상을 인과적으로 서술"], ["4점", "혈액이 잘 흐르지 못한다만 서술"]] },
      { q: "\"풍선에 바람을 불어 넣으면 풍선이 부풀면서 갈비뼈가 올라가고, 바람이 빠지면 갈비뼈가 내려간다.\"라는 호흡운동 모형으로는 실제 호흡운동의 원리를 정확히 설명할 수 없다. 그 까닭을 설명하시오.", lv: 3, pts: 10, tag: "대단원 마무리",
        kw: [["근육이 없", "스스로 움직이지"], ["갈비뼈"], ["가로막"], ["부피"], ["압력"]],
        model: "허파는 근육이 없어 스스로 부풀거나 줄어들지 못한다. 실제로는 갈비뼈와 가로막이 움직여 흉강의 부피가 변하고, 이에 따라 허파의 부피와 압력이 변하면서 공기가 드나든다. 이 모형은 허파(풍선)가 먼저 부풀어 갈비뼈를 움직이는 것으로 표현해 원인과 결과가 반대이며, 가로막의 움직임도 나타내지 못한다.",
        rubric: [["10점", "허파는 스스로 못 움직임 + 갈비뼈·가로막 → 부피·압력 변화가 원인임을 서술"], ["6점", "원인과 결과가 반대라는 것만 서술"], ["3점", "허파는 근육이 없다만 서술"]] },
      { q: "사람이 많이 모여 있는 공간에서는 환기를 자주 해야 한다. 그 까닭을 호흡과 관련지어 설명하시오.", lv: 1, pts: 6, tag: "교과서 스스로 확인하기",
        kw: [["호흡"], ["산소"], ["이산화 탄소"], ["감소", "줄", "부족"], ["증가", "많아", "늘"]],
        model: "사람은 호흡을 통해 산소를 받아들이고 이산화 탄소를 내보낸다. 사람이 많으면 공기 중 산소는 줄고 이산화 탄소는 많아지므로, 환기를 하여 신선한 공기(산소)를 공급해야 한다.",
        rubric: [["6점", "산소 감소 + 이산화 탄소 증가를 호흡과 연결하여 서술"], ["3점", "둘 중 하나만 서술"]] },
      { q: "오줌에 많은 양의 단백질이 섞여 있다면 오줌이 만들어지는 과정에서 어떤 문제가 있는지 쓰고 그 까닭을 설명하시오.", lv: 2, pts: 8, tag: "교과서 스스로 확인하기",
        kw: [["여과"], ["토리"], ["단백질"], ["크기가 커", "크기가 큰", "여과되지 않"]],
        model: "토리에서 보먼주머니로 물질이 이동하는 여과 과정에 이상이 있다. 단백질은 크기가 커서 정상적으로는 토리에서 여과되지 않고 혈액에 남아 있어야 하는데, 오줌에서 검출되었기 때문이다.",
        rubric: [["8점", "여과(토리) 이상 + 단백질은 정상적으로 여과되지 않는다는 까닭"], ["4점", "여과 이상만 서술"]] },
      { q: "당뇨병 환자의 혈액에는 건강한 사람보다 많은 양의 포도당이 있으며, 오줌에서도 포도당이 검출된다. 그 까닭을 오줌이 만들어지는 과정과 관련지어 설명하시오.", lv: 3, pts: 10, tag: "대단원 마무리",
        kw: [["여과"], ["재흡수"], ["세뇨관"], ["모두", "전부", "다"], ["포도당"]],
        model: "포도당은 크기가 작아 토리에서 보먼주머니로 여과된 후 세뇨관에서 모세혈관으로 모두 재흡수되어 정상적으로는 오줌에 없다. 그러나 당뇨병 환자는 혈액 속 포도당이 너무 많아 여과되는 포도당의 양이 많아지고, 세뇨관에서 이를 모두 재흡수하지 못해 남은 포도당이 오줌으로 나온다.",
        rubric: [["10점", "여과 → 재흡수의 정상 과정 + 너무 많아 모두 재흡수 못함을 서술"], ["5점", "재흡수되지 못한다만 서술"]] },
      { q: "점심에 먹은 닭고기(단백질)가 세포호흡에 이용되어 에너지를 얻기까지, 그리고 그 과정에서 생긴 노폐물이 배출되기까지 소화계, 순환계, 호흡계, 배설계가 작용하는 과정을 설명하시오.", lv: 3, pts: 12, tag: "통합 서술",
        kw: [["아미노산"], ["흡수", "융털"], ["순환계"], ["산소"], ["세포호흡"], ["이산화 탄소"], ["요소"], ["콩팥", "배설계", "오줌"]],
        model: "닭고기의 단백질은 소화계(위의 펩신, 작은창자의 트립신 등)에서 아미노산으로 분해되어 작은창자의 융털로 흡수된다. 호흡계(허파)에서는 산소를 받아들인다. 아미노산과 산소는 순환계(혈액)를 통해 조직세포로 운반되어 세포호흡에 쓰이고 에너지를 얻는다. 이때 생긴 이산화 탄소는 순환계를 통해 호흡계로 가서 몸 밖으로 나가고, 단백질이 분해될 때 생긴 암모니아는 간에서 요소로 바뀌어 배설계(콩팥)에서 오줌으로 배설된다.",
        rubric: [["12점", "4개 기관계의 역할을 순서대로 모두 정확히 서술"], ["8점", "3개 기관계만 정확"], ["4점", "2개 기관계만 정확"]],
        hint: "음식 → 소화 → 흡수 → 운반 → 세포호흡 → 노폐물(CO₂, 요소) 배출 순서로!" },
      { q: "축구를 열심히 하면 호흡 수와 심장박동 수, 체온이 어떻게 변하는지 쓰고, 그 까닭을 세포호흡과 관련지어 설명하시오.", lv: 2, pts: 10, tag: "과학 글쓰기",
        kw: [["호흡 수", "호흡수"], ["심장박동", "맥박"], ["체온"], ["증가", "빨라", "많아", "올라"], ["세포호흡"], ["에너지"], ["산소"]],
        model: "호흡 수와 심장박동 수가 증가하고 체온이 올라간다. 운동을 하면 근육 운동에 많은 에너지가 필요해 세포호흡이 활발해지므로, 세포호흡에 필요한 산소와 영양소를 더 많이 공급하고 생성된 이산화 탄소를 빨리 내보내기 위해 호흡 수와 심장박동 수가 증가한다. 또 세포호흡으로 발생한 에너지의 일부가 열로 방출되어 체온이 올라간다.",
        rubric: [["10점", "세 가지 변화 + 세포호흡 증가에 따른 산소 공급·CO₂ 배출 + 열 발생을 모두 서술"], ["6점", "변화는 맞고 까닭이 일부 누락"], ["3점", "변화만 서술"]] },
    ],
  };
})();
