/* 과학2 학습 사이트 엔진 — 미래엔 과학2 V·VI·VIII 단원 */
(function () {
  "use strict";
  const UNITS = (window.UNITS = window.UNITS || {});
  const ORDER = ["5", "6", "8"];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- storage ---------------- */
  const KEY = "sci2-study-v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  let S = load();
  ["done", "mcq", "ox", "essay", "wrong", "fc"].forEach((k) => { if (!S[k]) S[k] = k === "wrong" ? [] : {}; });
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = h('<div class="toast"></div>'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1600);
  }

  /* ---------------- theme ---------------- */
  function initTheme() {
    let theme = null;
    try { theme = localStorage.getItem("sci2-theme"); } catch (e) {}
    if (theme === "dark" || theme === "light") document.documentElement.dataset.theme = theme;
    else theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const btn = $("#themeBtn");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.onclick = () => {
        const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        btn.textContent = next === "dark" ? "☀️" : "🌙";
        try { localStorage.setItem("sci2-theme", next); } catch (e) {}
      };
    }
  }

  /* ---------------- progress helpers ---------------- */
  function lessonIds(u) {
    const ids = [];
    u.chapters.forEach((c, ci) => c.lessons.forEach((l, li) => ids.push(`${u.id}-${ci}-${li}`)));
    return ids;
  }
  function unitProgress(u) {
    const ids = lessonIds(u);
    const lessonsDone = ids.filter((i) => S.done[i]).length;
    const total = ids.length + u.mcq.length + u.ox.length + u.essay.length;
    const mcqDone = u.mcq.filter((_, i) => S.mcq[`${u.id}-${i}`] !== undefined).length;
    const oxDone = u.ox.filter((_, i) => S.ox[`${u.id}-${i}`] !== undefined).length;
    const essayDone = u.essay.filter((_, i) => S.essay[`${u.id}-${i}`] !== undefined).length;
    const mcqRight = u.mcq.filter((_, i) => S.mcq[`${u.id}-${i}`] === true).length;
    const done = lessonsDone + mcqDone + oxDone + essayDone;
    return { pct: total ? Math.round((done / total) * 100) : 0, lessonsDone, lessons: ids.length, mcqDone, mcqRight, oxDone, essayDone };
  }

  /* ---------------- shared chrome ---------------- */
  function renderNav(active) {
    const nav = $("#nav");
    if (!nav) return;
    nav.innerHTML = `<a href="#home" class="${!active ? "active" : ""}">홈</a>` +
      ORDER.filter((id) => UNITS[id]).map((id) => `<a href="#u${id}" class="${active === id ? "active" : ""}">${UNITS[id].roman}. ${UNITS[id].short}</a>`).join("") +
      `<a href="#exam" class="${active === "exam" ? "active" : ""}">서술형 모의고사</a>`;
  }

  /* ================= HOME ================= */
  function renderHome() {
    renderNav(null);
    const units = ORDER.map((id) => UNITS[id]).filter(Boolean);
    const totals = units.reduce((a, u) => {
      a.lessons += lessonIds(u).length; a.q += u.mcq.length + u.ox.length; a.essay += u.essay.length; return a;
    }, { lessons: 0, q: 0, essay: 0 });
    const app = $("#app");
    app.innerHTML = `
      <section class="hero"><div class="stars"></div>
        <div style="position:relative">
          <div style="font-size:14px;font-weight:700;opacity:.85">미래엔 중학교 과학 2 · 교과서 완벽 대비</div>
          <h1>식물과 에너지 · 동물과 에너지 · 별과 우주<br>개념부터 서술형까지 한 번에</h1>
          <p>교과서 흐름 그대로 정리한 개념 노트, 직접 조작하는 실험실, 플래시카드, 퀴즈, 그리고 채점 기준이 있는 서술형 대비 문제로 내신 상위권을 준비하세요.</p>
          <div class="hero-stats">
            <div class="hero-stat"><b>${totals.lessons}</b><span>개념 소단원</span></div>
            <div class="hero-stat"><b>${totals.q}</b><span>OX·객관식 문항</span></div>
            <div class="hero-stat"><b>${totals.essay}</b><span>서술형 문항</span></div>
            <div class="hero-stat"><b>${S.wrong.length}</b><span>오답 노트</span></div>
          </div>
        </div>
      </section>
      <h2 class="section-title">단원 선택 <small>진도율은 이 브라우저에 저장돼요</small></h2>
      <div class="grid grid-3">
        ${units.map((u) => { const p = unitProgress(u); return `
          <a class="card unit-card ${u.cls}" href="#u${u.id}">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="badge-roman">${u.roman}</div>
              <div><div style="font-size:13px;color:var(--muted);font-weight:700">${u.icon} 대단원 ${u.roman}</div><h3>${u.title}</h3></div>
            </div>
            <p style="margin:0;color:var(--muted);font-size:14.5px">${u.desc}</p>
            <ul>${u.chapters.map((c) => `<li>${c.title}</li>`).join("")}</ul>
            <div class="meter-label"><span>학습 진도</span><b>${p.pct}%</b></div>
            <div class="meter"><i style="width:${p.pct}%"></i></div>
          </a>`; }).join("")}
      </div>
      <h2 class="section-title">이렇게 공부하세요</h2>
      <div class="grid grid-3">
        <div class="card"><h3>① 개념 학습</h3><p style="margin:0;color:var(--muted)">교과서 소단원 순서대로 핵심 용어, 그림 해설, 탐구 결과를 정리했어요. 다 읽으면 <b>학습 완료</b>를 눌러 진도를 기록하세요.</p></div>
        <div class="card"><h3>② 확인 문제</h3><p style="margin:0;color:var(--muted)">플래시카드로 용어를 외우고, OX·객관식으로 바로 점검해요. 틀린 문제는 자동으로 <b>오답 노트</b>에 쌓여요.</p></div>
        <div class="card"><h3>③ 서술형 대비</h3><p style="margin:0;color:var(--muted)">답을 직접 쓰면 <b>핵심 키워드 자동 채점</b>과 모범 답안, 채점 기준표를 보여 줘요. 마지막엔 서술형 모의고사로 실전 연습!</p></div>
      </div>`;
  }

  /* ================= UNIT ================= */
  const TABS = [
    ["concept", "📘 개념 학습"],
    ["lab", "🧪 인터랙티브 실험실"],
    ["fc", "🃏 플래시카드"],
    ["ox", "⭕ OX 퀴즈"],
    ["mcq", "📝 객관식"],
    ["essay", "✍️ 서술형 대비"],
    ["wrong", "📒 오답 노트"],
  ];

  function renderUnit(id, initialTab) {
    const u = UNITS[id];
    if (!u) { $("#app").innerHTML = '<div class="empty">단원을 찾을 수 없어요. <a href="#home">홈으로</a></div>'; return; }
    document.body.classList.add(u.cls);
    renderNav(id);
    const app = $("#app");
    const p = unitProgress(u);
    app.innerHTML = `
      <section class="hero unit-hero"><div class="stars"></div>
        <div style="position:relative">
          <div class="roman">대단원 ${u.roman} ${u.icon}</div>
          <h1>${u.title}</h1>
          <p>${u.desc}</p>
          <div class="hero-stats">
            <div class="hero-stat"><b>${p.lessonsDone}/${p.lessons}</b><span>개념 완료</span></div>
            <div class="hero-stat"><b>${p.mcqRight}/${u.mcq.length}</b><span>객관식 정답</span></div>
            <div class="hero-stat"><b>${p.essayDone}/${u.essay.length}</b><span>서술형 작성</span></div>
            <div class="hero-stat"><b>${p.pct}%</b><span>전체 진도</span></div>
          </div>
        </div>
      </section>
      <div class="tabs" role="tablist">${TABS.map(([k, label]) => {
        let count = "";
        if (k === "fc") count = u.flash.length; if (k === "ox") count = u.ox.length; if (k === "mcq") count = u.mcq.length; if (k === "essay") count = u.essay.length;
        if (k === "wrong") count = S.wrong.filter((w) => w.u === id).length;
        if (k === "lab") count = (u.labs || []).length;
        return `<button class="tab" data-tab="${k}" role="tab">${label}${count !== "" ? `<span class="count">${count}</span>` : ""}</button>`;
      }).join("")}</div>
      <div id="pane"></div>`;
    const go = (k) => {
      $$(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === k));
      const pane = $("#pane");
      pane.innerHTML = "";
      ({ concept: paneConcept, lab: paneLab, fc: paneFlash, ox: paneOX, mcq: paneMCQ, essay: paneEssay, wrong: paneWrong })[k](u, pane);
      currentRoute = `u${id}-${k}`;
      if (location.hash.slice(1) !== currentRoute) location.hash = currentRoute;
    };
    $$(".tab").forEach((b) => (b.onclick = () => { go(b.dataset.tab); window.scrollTo({ top: $(".tabs").offsetTop - 70, behavior: "smooth" }); }));
    go(TABS.some((t) => t[0] === initialTab) ? initialTab : "concept");
  }

  /* ---------- concept ---------- */
  function paneConcept(u, pane) {
    let no = 0;
    const toc = u.chapters.map((c, ci) => `<h4>${ci + 1}. ${c.title}</h4>` + c.lessons.map((l, li) => `<a href="#L${ci}-${li}" data-lid="${u.id}-${ci}-${li}" class="${S.done[`${u.id}-${ci}-${li}`] ? "done" : ""}">${li + 1}. ${l.title}</a>`).join("")).join("");
    const body = u.chapters.map((c, ci) => `<div class="chapter-head">${ci + 1}. ${c.title}</div>` + c.lessons.map((l, li) => {
      no++;
      const lid = `${u.id}-${ci}-${li}`;
      return `<article class="card lesson" id="L${ci}-${li}">
        <div class="lesson-head"><div class="lesson-no">${li + 1}</div><h3>${l.title}</h3></div>
        ${l.goals ? `<div class="goals"><b>이 단원을 배우면</b><ul>${l.goals.map((g) => `<li>${g}</li>`).join("")}</ul></div>` : ""}
        ${l.html}
        <div class="lesson-foot"><button class="btn ${S.done[lid] ? "btn-ok" : "btn-primary"}" data-done="${lid}">${S.done[lid] ? "✓ 학습 완료" : "학습 완료 체크"}</button></div>
      </article>`;
    }).join("")).join("");
    pane.innerHTML = `<div class="concept-layout"><nav class="toc">${toc}</nav><div>${body}</div></div>`;
    $$("[data-done]", pane).forEach((b) => (b.onclick = () => {
      const k = b.dataset.done; S.done[k] = !S.done[k]; if (!S.done[k]) delete S.done[k]; save();
      b.className = `btn ${S.done[k] ? "btn-ok" : "btn-primary"}`; b.textContent = S.done[k] ? "✓ 학습 완료" : "학습 완료 체크";
      const a = $(`.toc a[data-lid="${k}"]`, pane); if (a) a.classList.toggle("done", !!S.done[k]);
      if (S.done[k]) toast("진도 저장 완료!");
    }));
    $$(".toc a", pane).forEach((a) => (a.onclick = (e) => { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); if (t) t.scrollIntoView({ behavior: "smooth" }); }));
  }

  /* ---------- lab ---------- */
  function paneLab(u, pane) {
    if (!u.labs || !u.labs.length) { pane.innerHTML = '<div class="empty">준비 중이에요.</div>'; return; }
    u.labs.forEach((lab) => {
      const card = h(`<section class="card" style="margin-bottom:18px"><h3>${lab.title}</h3><p style="color:var(--muted);margin:0 0 14px">${lab.desc}</p><div class="lab-mount"></div></section>`);
      pane.appendChild(card);
      lab.mount($(".lab-mount", card));
    });
  }

  /* ---------- flashcards ---------- */
  function paneFlash(u, pane) {
    let order = u.flash.map((_, i) => i);
    let i = 0;
    pane.innerHTML = `<div class="fc-stage">
      <div class="meter-label" style="width:min(560px,100%)"><span id="fcPos"></span><span id="fcKnown"></span></div>
      <div class="meter" style="width:min(560px,100%)"><i id="fcBar"></i></div>
      <div class="fc" id="fc" tabindex="0"><div class="fc-inner"><div class="fc-face fc-front"><small>용어 · 클릭해서 뒤집기</small><div id="fcF"></div></div><div class="fc-face fc-back"><small>뜻</small><div id="fcB"></div></div></div></div>
      <div class="fc-controls">
        <button class="btn" id="fcPrev">← 이전</button>
        <button class="btn" id="fcShuffle">🔀 섞기</button>
        <button class="btn" id="fcUnknown">다시 볼래요</button>
        <button class="btn btn-primary" id="fcKnow">알아요 ✓</button>
        <button class="btn" id="fcNext">다음 →</button>
      </div>
      <p style="font-size:13px;color:var(--muted)">키보드: Space 뒤집기 · ← → 이동</p></div>`;
    const fc = $("#fc", pane);
    const show = () => {
      const k = order[i]; const [f, b] = u.flash[k];
      fc.classList.remove("flipped");
      $("#fcF", pane).innerHTML = f; $("#fcB", pane).innerHTML = b;
      const known = u.flash.filter((_, j) => S.fc[`${u.id}-${j}`]).length;
      $("#fcPos", pane).textContent = `${i + 1} / ${order.length}`;
      $("#fcKnown", pane).textContent = `외운 카드 ${known}개`;
      $("#fcBar", pane).style.width = `${((i + 1) / order.length) * 100}%`;
    };
    fc.onclick = () => fc.classList.toggle("flipped");
    $("#fcPrev", pane).onclick = () => { i = (i - 1 + order.length) % order.length; show(); };
    $("#fcNext", pane).onclick = () => { i = (i + 1) % order.length; show(); };
    $("#fcShuffle", pane).onclick = () => { order.sort(() => Math.random() - 0.5); i = 0; show(); toast("카드를 섞었어요"); };
    $("#fcKnow", pane).onclick = () => { S.fc[`${u.id}-${order[i]}`] = 1; save(); i = (i + 1) % order.length; show(); };
    $("#fcUnknown", pane).onclick = () => { delete S.fc[`${u.id}-${order[i]}`]; save(); i = (i + 1) % order.length; show(); };
    const onKey = (e) => {
      if (!document.body.contains(fc)) { document.removeEventListener("keydown", onKey); return; }
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
      if (e.key === " ") { e.preventDefault(); fc.classList.toggle("flipped"); }
      if (e.key === "ArrowRight") $("#fcNext", pane).click();
      if (e.key === "ArrowLeft") $("#fcPrev", pane).click();
    };
    document.addEventListener("keydown", onKey);
    show();
  }

  function addWrong(u, type, idx) {
    if (!S.wrong.some((w) => w.u === u.id && w.t === type && w.i === idx)) S.wrong.push({ u: u.id, t: type, i: idx, at: Date.now() });
    save();
  }
  function removeWrong(uid, type, idx) {
    S.wrong = S.wrong.filter((w) => !(w.u === uid && w.t === type && w.i === idx)); save();
  }

  /* ---------- OX ---------- */
  function oxCard(u, idx, n) {
    const [q, a, e] = u.ox[idx];
    const card = h(`<div class="card q-card"><div class="q-text"><span class="qn">${n}.</span>${q}</div>
      <div class="ox-row"><button class="ox-btn" data-v="1">O</button><button class="ox-btn" data-v="0">X</button></div>
      <div class="explain"></div></div>`);
    $$(".ox-btn", card).forEach((b) => (b.onclick = () => {
      const v = b.dataset.v === "1"; const right = v === a;
      $$(".ox-btn", card).forEach((x) => { x.disabled = true; if ((x.dataset.v === "1") === a) x.classList.add("correct"); });
      if (!right) b.classList.add("wrong");
      S.ox[`${u.id}-${idx}`] = right; save();
      if (right) removeWrong(u.id, "ox", idx); else addWrong(u, "ox", idx);
      const ex = $(".explain", card);
      ex.innerHTML = `<b class="${right ? "res-ok" : "res-bad"}">${right ? "정답!" : "오답"}</b> 정답은 <b>${a ? "O" : "X"}</b> · ${e}`;
      ex.classList.add("show");
      card.dispatchEvent(new CustomEvent("answered", { bubbles: true, detail: right }));
    }));
    return card;
  }
  function paneOX(u, pane) {
    pane.innerHTML = `<div class="quiz-top"><b>OX 퀴즈</b><span class="chip" id="oxScore">0 / ${u.ox.length}</span><span class="spacer"></span><button class="btn btn-sm" id="oxReset">↺ 다시 풀기</button></div><div id="oxList"></div>`;
    let right = 0, answered = 0;
    const list = $("#oxList", pane);
    u.ox.forEach((_, i) => list.appendChild(oxCard(u, i, i + 1)));
    list.addEventListener("answered", (e) => { answered++; if (e.detail) right++; $("#oxScore", pane).textContent = `${right} / ${u.ox.length} 정답 (${answered}문항 풀이)`; });
    $("#oxReset", pane).onclick = () => paneOX(u, (pane.innerHTML = "", pane));
  }

  /* ---------- MCQ ---------- */
  const NUMS = ["①", "②", "③", "④", "⑤"];
  function mcqCard(u, idx, n) {
    const q = u.mcq[idx];
    const card = h(`<div class="card q-card"><div class="q-meta"><span class="tag lv${q.lv || 1}">${["", "기본", "중급", "고난도"][q.lv || 1]}</span>${q.tag ? `<span class="tag">${q.tag}</span>` : ""}</div>
      <div class="q-text"><span class="qn">${n}.</span>${q.q}</div>
      <div class="choices">${q.c.map((c, i) => `<button class="choice" data-i="${i}"><span class="n">${i + 1}</span><span>${c}</span></button>`).join("")}</div>
      <div class="explain"></div></div>`);
    $$(".choice", card).forEach((b) => (b.onclick = () => {
      const i = +b.dataset.i; const right = i === q.a;
      $$(".choice", card).forEach((x) => { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add("correct"); });
      if (!right) b.classList.add("wrong");
      S.mcq[`${u.id}-${idx}`] = right; save();
      if (right) removeWrong(u.id, "mcq", idx); else addWrong(u, "mcq", idx);
      const ex = $(".explain", card);
      ex.innerHTML = `<b class="${right ? "res-ok" : "res-bad"}">${right ? "정답!" : "오답"}</b> 정답 ${NUMS[q.a]} · ${q.e}`;
      ex.classList.add("show");
      card.dispatchEvent(new CustomEvent("answered", { bubbles: true, detail: right }));
    }));
    return card;
  }
  function paneMCQ(u, pane, filterLv) {
    const lv = filterLv || 0;
    const idxs = u.mcq.map((_, i) => i).filter((i) => !lv || (u.mcq[i].lv || 1) === lv);
    pane.innerHTML = `<div class="quiz-top"><b>객관식</b>
      ${[[0, "전체"], [1, "기본"], [2, "중급"], [3, "고난도"]].map(([v, l]) => `<button class="chip ${v === lv ? "active" : ""}" data-lv="${v}">${l}</button>`).join("")}
      <span class="spacer"></span><span class="chip" id="mScore">0 / ${idxs.length}</span></div><div id="mList"></div>`;
    $$("[data-lv]", pane).forEach((b) => (b.onclick = () => paneMCQ(u, pane, +b.dataset.lv)));
    const list = $("#mList", pane);
    idxs.forEach((i, n) => list.appendChild(mcqCard(u, i, n + 1)));
    let right = 0, answered = 0;
    list.addEventListener("answered", (e) => {
      answered++; if (e.detail) right++;
      $("#mScore", pane).textContent = `${right} / ${idxs.length} 정답`;
      if (answered === idxs.length) {
        const pct = Math.round((right / idxs.length) * 100);
        const panel = h(`<div class="card score-panel"><div class="score-big">${pct}점</div><p>${idxs.length}문항 중 ${right}문항 정답! ${pct >= 90 ? "완벽해요 🎉" : pct >= 70 ? "좋아요! 오답 노트로 마무리하세요." : "개념 학습을 한 번 더 보고 다시 도전해 봐요."}</p><button class="btn btn-primary">다시 풀기</button></div>`);
        $("button", panel).onclick = () => paneMCQ(u, pane, lv);
        list.appendChild(panel); panel.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ---------- essay ---------- */
  const norm = (s) => String(s).replace(/\s+/g, "").replace(/[.,·()~\-]/g, "").toLowerCase();
  function gradeEssay(q, text) {
    const t = norm(text);
    const hits = q.kw.map((group) => {
      const alts = Array.isArray(group) ? group : [group];
      return alts.some((a) => t.includes(norm(a)));
    });
    return hits;
  }
  function essayCard(u, idx, n, opts = {}) {
    const q = u.essay[idx];
    const key = `${u.id}-${idx}`;
    const prev = S.essay[key];
    const card = h(`<div class="card q-card essay-q">
      <div class="q-meta"><span class="tag lv${q.lv || 2}">${["", "기본", "중급", "고난도"][q.lv || 2]}</span>${q.tag ? `<span class="tag">${q.tag}</span>` : ""}<span class="tag">${q.pts || 10}점</span>${opts.unitLabel ? `<span class="tag">${opts.unitLabel}</span>` : ""}</div>
      <div class="q-text"><span class="qn">${n}.</span>${q.q}</div>
      ${q.fig ? `<figure class="dia">${q.fig}</figure>` : ""}
      ${q.cond ? `<div class="essay-cond"><b>조건</b> ${q.cond}</div>` : ""}
      <textarea class="answer" placeholder="답안을 문장으로 작성해 보세요. (핵심 용어를 정확히 쓰는 것이 중요해요)">${prev && prev.text ? esc(prev.text) : ""}</textarea>
      <div class="essay-actions">
        <button class="btn btn-primary" data-act="grade">채점하기</button>
        <button class="btn" data-act="hint">💡 힌트</button>
        <button class="btn" data-act="show">모범 답안 보기</button>
      </div>
      <div class="hint">💡 ${q.hint || "핵심 용어를 떠올려 보세요."}</div>
      <div class="essay-result"></div></div>`);
    const ta = $("textarea", card);
    const res = $(".essay-result", card);
    const showResult = (graded) => {
      const text = ta.value.trim();
      let html = "";
      if (graded) {
        const hits = gradeEssay(q, text);
        const got = hits.filter(Boolean).length;
        const pts = q.pts || 10;
        const score = Math.round((got / hits.length) * pts);
        S.essay[key] = { text, score, max: pts }; save();
        if (got < hits.length) addWrong(u, "essay", idx); else removeWrong(u.id, "essay", idx);
        html += `<div style="display:flex;align-items:baseline;gap:10px"><span class="score-big" style="font-size:34px">${score}</span><span style="color:var(--muted)">/ ${pts}점 (키워드 자동 채점)</span></div>
          <div class="kw-list">${q.kw.map((g, i) => `<span class="kw-pill ${hits[i] ? "hit" : "miss"}">${hits[i] ? "✓" : "✗"} ${(Array.isArray(g) ? g[0] : g)}</span>`).join("")}</div>
          <p style="font-size:13px;color:var(--muted);margin:2px 0 6px">※ 키워드 채점은 참고용이에요. 모범 답안·채점 기준과 비교해서 인과 관계가 맞게 쓰였는지 꼭 스스로 확인하세요.</p>`;
      }
      html += `<div class="model">${q.model}</div>`;
      if (q.rubric) html += `<table class="rubric">${q.rubric.map(([p, d]) => `<tr><td>${p}</td><td>${d}</td></tr>`).join("")}</table>`;
      if (q.tip) html += `<div class="box box-warn" style="margin-top:10px">${q.tip}</div>`;
      res.innerHTML = html; res.classList.add("show");
    };
    $("[data-act=grade]", card).onclick = () => { if (ta.value.trim().length < 5) { toast("답안을 먼저 작성해 주세요"); ta.focus(); return; } showResult(true); };
    $("[data-act=show]", card).onclick = () => showResult(false);
    $("[data-act=hint]", card).onclick = () => $(".hint", card).classList.toggle("show");
    if (prev && prev.text) showResult(true);
    return card;
  }
  function paneEssay(u, pane) {
    const total = u.essay.reduce((a, q) => a + (q.pts || 10), 0);
    const got = u.essay.reduce((a, q, i) => a + ((S.essay[`${u.id}-${i}`] || {}).score || 0), 0);
    pane.innerHTML = `<div class="card" style="margin-bottom:16px">
        <h3>✍️ 서술형 대비 전략</h3>
        <ul style="margin:6px 0 0;padding-left:20px;color:var(--muted);font-size:15px">
          <li><b>원인 → 과정 → 결과</b> 순서로 쓰기 ("~이므로 ~하다")</li>
          <li>교과서 <b>핵심 용어</b>를 정확하게 사용하기 (예: 연주 시차, 융털, 세포호흡)</li>
          <li>비교 문제는 <b>두 대상을 모두</b> 언급하고 공통점/차이점을 분명히</li>
          <li>그래프·자료 해석 문제는 <b>수치</b>를 근거로 들기</li>
        </ul>
        <div class="meter-label" style="margin-top:12px"><span>내 서술형 점수</span><b>${got} / ${total}점</b></div>
        <div class="meter"><i style="width:${total ? (got / total) * 100 : 0}%"></i></div>
      </div><div id="eList"></div>`;
    const list = $("#eList", pane);
    u.essay.forEach((_, i) => list.appendChild(essayCard(u, i, i + 1)));
  }

  /* ---------- wrong note ---------- */
  function paneWrong(u, pane) {
    const items = S.wrong.filter((w) => w.u === u.id);
    if (!items.length) { pane.innerHTML = '<div class="card empty">📒 아직 오답이 없어요. 퀴즈를 풀면 틀린 문제가 여기에 모여요.</div>'; return; }
    pane.innerHTML = `<div class="quiz-top"><b>오답 노트</b><span class="chip">${items.length}문항</span><span class="spacer"></span><button class="btn btn-sm" id="wClear">전체 비우기</button></div><div id="wList"></div>`;
    const list = $("#wList", pane);
    items.forEach((w, n) => {
      let card;
      if (w.t === "mcq") card = mcqCard(u, w.i, n + 1);
      else if (w.t === "ox") card = oxCard(u, w.i, n + 1);
      else card = essayCard(u, w.i, n + 1);
      list.appendChild(card);
    });
    const wc = $("#wClear", pane);
    wc.onclick = () => {
      if (!wc.dataset.armed) { wc.dataset.armed = "1"; wc.textContent = "한 번 더 누르면 모두 지워져요"; wc.classList.add("btn-primary"); setTimeout(() => { if (document.body.contains(wc)) { delete wc.dataset.armed; wc.textContent = "전체 비우기"; wc.classList.remove("btn-primary"); } }, 3000); return; }
      S.wrong = S.wrong.filter((w) => w.u !== u.id); save(); paneWrong(u, pane); toast("오답 노트를 비웠어요");
    };
  }

  /* ================= EXAM (essay mock test) ================= */
  function renderExam() {
    renderNav("exam");
    const app = $("#app");
    const pool = [];
    ORDER.forEach((id) => { const u = UNITS[id]; if (u) u.essay.forEach((_, i) => pool.push([id, i])); });
    const pick = (sel) => {
      let list = pool.filter(([id]) => sel === "all" || sel === id);
      list = list.sort(() => Math.random() - 0.5).slice(0, 6);
      return list;
    };
    const draw = (sel) => {
      const qs = pick(sel);
      app.innerHTML = `<section class="hero"><div class="stars"></div><div style="position:relative">
          <div style="font-size:14px;font-weight:700;opacity:.85">실전 연습</div>
          <h1>서술형 모의고사</h1>
          <p>무작위로 뽑힌 6문항을 실제 시험처럼 풀어 보세요. 타이머를 켜고, 다 쓴 뒤 한 문제씩 채점하세요.</p>
          <div class="hero-stats"><div class="hero-stat"><b id="timer">20:00</b><span>권장 시간</span></div><div class="hero-stat"><b>${qs.length}</b><span>문항</span></div></div>
        </div></section>
        <div class="quiz-top">
          ${[["all", "전 단원"], ...ORDER.filter((id) => UNITS[id]).map((id) => [id, `${UNITS[id].roman}. ${UNITS[id].short}`])].map(([v, l]) => `<button class="chip ${v === sel ? "active" : ""}" data-sel="${v}">${l}</button>`).join("")}
          <span class="spacer"></span><button class="btn btn-sm" id="startT">⏱ 타이머 시작</button><button class="btn btn-sm" id="redraw">🔀 새로 뽑기</button></div>
        <div id="xList"></div>`;
      const list = $("#xList");
      qs.forEach(([id, i], n) => { const u = UNITS[id]; const c = essayCard(u, i, n + 1, { unitLabel: `${u.roman}. ${u.short}` }); c.classList.add(u.cls); list.appendChild(c); });
      $$("[data-sel]").forEach((b) => (b.onclick = () => draw(b.dataset.sel)));
      $("#redraw").onclick = () => draw(sel);
      let left = 20 * 60, tm = null;
      $("#startT").onclick = () => {
        if (tm) return; toast("타이머 시작!");
        tm = setInterval(() => {
          if (!document.getElementById("timer")) { clearInterval(tm); return; }
          left--; const m = String(Math.floor(left / 60)).padStart(2, "0"), s = String(left % 60).padStart(2, "0");
          $("#timer").textContent = `${m}:${s}`;
          if (left <= 0) { clearInterval(tm); toast("시간 종료! 채점해 보세요"); }
        }, 1000);
      };
    };
    draw("all");
  }

  /* ---------------- boot ---------------- */
  /* hash routes: #home, #u5, #u5-lab, #exam (plain names so they survive in shared links) */
  let currentRoute = null;
  function route() {
    const h = location.hash.slice(1) || "home";
    if (h === currentRoute) return;
    currentRoute = h;
    document.body.classList.remove("u5", "u6", "u8");
    const m = h.match(/^u(\d)(?:-([a-z]+))?$/);
    if (m && UNITS[m[1]]) renderUnit(m[1], m[2] || "concept");
    else if (h === "exam") renderExam();
    else renderHome();
    window.scrollTo(0, 0);
  }
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    // 예전 주소(unit.html?u=5, exam.html) 호환
    const page = document.body.dataset.page;
    const q = new URLSearchParams(location.search).get("u");
    if (page === "unit" && !location.hash.startsWith("#u")) location.hash = `u${q || "5"}${location.hash ? "-" + location.hash.slice(1) : ""}`;
    if (page === "exam" && !location.hash) location.hash = "exam";
    window.addEventListener("hashchange", route);
    route();
    const bar = $(".progress-line");
    if (bar) window.addEventListener("scroll", () => { const d = document.documentElement; bar.style.width = `${(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)) * 100}%`; }, { passive: true });
  });
})();
