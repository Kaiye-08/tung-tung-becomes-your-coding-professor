// game.js: the brain. Uses BANK/MODS (modules.js), Store/ACH/RANKS (store.js), Sound (audio.js).
const $ = id => document.getElementById(id);
const screens = {};
["home", "map", "profile", "learn", "game", "results"].forEach(n => (screens[n] = $(n)));
let D = Store.load();
let R = null, timerId = null, streak = 0, wrongRow = 0, HC = false;

const LINES = {
  right: ["CORRECT! Tung is proud!", "YES! You have the wood!", "Excellent, my student!", "Tung Tung Tung approves!", "Beautiful. Even the bat is smiling.", "Sahur-approved answer!"],
  wrong: ["WRONG! Prepare for the bat!", "Bonk time!", "Not quite. BONK!", "Tung warned you...", "The bat has spoken!", "Ouch. That one hurt me too."],
  sad: ["I am not angry... just disappointed.", "Tung expected more from you...", "*sigh* Study, my student. Study.", "Even the wood is crying."],
  timeout: ["TOO SLOW! The bat does not wait!", "Time's up! BONK!"],
  boss: ["BOSS BATTLE! Tung does not hold back!", "You dare face the Sahur?!", "Fear the bat, student!", "TUNG TUNG TUNG TUNG!"],
  streak: { 3: "HAT TRICK! Three in a row!", 5: "FIVE! Tung is on FIRE!", 10: "TEN! LEGENDARY! TUNG TUNG TUNG SAHUR!" },
  banner: { 3: "🔥 3 IN A ROW!", 5: "🔥🔥 5 STREAK!", 10: "👑 LEGEND x10!" }
};
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => s.replace(/\s+/g, "").replace(/'/g, '"'); // ignore spaces; treat ' and " the same

function mountCharacter() {
  const tpl = $("tung-template");
  $("home-art").appendChild(tpl.content.cloneNode(true));
  $("home-art").querySelector("svg").removeAttribute("id");
  $("game-art").appendChild(tpl.content.cloneNode(true));
  $("learn-art").appendChild(tpl.content.cloneNode(true));
  $("learn-art").querySelector("svg").removeAttribute("id");
}
function show(name) {
  stopTimer();
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  if (name !== "game") $("stage").classList.remove("boss", "rage", "defeated");
}
function say(text, mood, boss) {
  $("bubble-text").textContent = text;
  $("tung").setAttribute("class", "tung " + mood);
  boss ? Sound.speak(text, 0.4, 1.2) : Sound.speak(text);
}
function play(el, cls, ms) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); }
function banner(text) { const b = $("banner"); b.textContent = text; play(b, "go", 1500); }
function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; $("toast-box").appendChild(t); setTimeout(() => t.remove(), 2600); }
function confetti() {
  for (let i = 0; i < 14; i++) {
    const c = document.createElement("span");
    c.className = "conf"; c.textContent = ["🎉", "⭐", "✨", "🪵"][i % 4];
    c.style.left = Math.random() * 90 + "%"; c.style.animationDelay = Math.random() * 0.4 + "s";
    $("stage").appendChild(c); setTimeout(() => c.remove(), 2000);
  }
}
function checkAch() {
  let k = 0;
  ACH.forEach(([id, ic, n, , fn]) => {
    if (!D.ach[id] && fn(D)) { D.ach[id] = 1; Sound.play("ach"); setTimeout(() => toast(`${ic} Achievement: ${n}`), k++ * 2700); }
  });
  Store.save();
}

// ===== Map & profile =====
function renderMap() {
  $("map-rank").textContent = `${D.name ? D.name + " · " : ""}${rankOf(D.xp)[1]} · ${D.xp} XP`;
  $("revenge-btn").textContent = `😈 Tung's Revenge (${D.missed.length})`;
  const list = $("map-list"); list.innerHTML = "";
  Object.entries(MODS).forEach(([m, info]) => {
    const box = document.createElement("div"); box.className = "mod";
    box.innerHTML = `<h3>${info.icon} ${info.name}</h3>`;
    const nodes = document.createElement("div"); nodes.className = "nodes";
    ["easy", "medium", "hard", "boss"].forEach((lv, k) => {
      const prev = k ? ["easy", "medium", "hard"][k - 1] : null;
      const open = !prev || D.done[m + "-" + prev];
      const st = D.done[m + "-" + lv];
      const b = document.createElement("button");
      b.className = "node" + (lv === "boss" ? " boss" : ""); b.disabled = !open;
      b.innerHTML = `${lv === "boss" ? "👹 Boss" : lv[0].toUpperCase() + lv.slice(1)}<small>${open ? (st ? "★".repeat(st) + "☆".repeat(3 - st) : "Ready") : "🔒 Locked"}</small>`;
      b.onclick = () => { Sound.play("click"); startRun(m, lv); };
      nodes.appendChild(b);
    });
    box.appendChild(nodes); list.appendChild(box);
  });
  show("map");
}
function renderProfile() {
  const rk = rankOf(D.xp), nx = nextRank(D.xp);
  $("p-rank").textContent = (D.name ? D.name + ": " : "") + rk[1];
  $("p-xp-bar").style.width = (nx ? ((D.xp - rk[0]) / (nx[0] - rk[0])) * 100 : 100) + "%";
  $("p-xp").textContent = nx ? `${D.xp} XP · ${nx[0] - D.xp} XP to ${nx[1]}` : `${D.xp} XP · Max rank!`;
  $("p-ach").innerHTML = ACH.map(([id, ic, n, d]) => `<div class="ach ${D.ach[id] ? "" : "off"}"><span style="font-size:28px">${ic}</span><div><b>${n}</b><small>${d}</small></div></div>`).join("");
  renderWardrobe(); show("profile");
}

// ===== A run = one level or boss fight =====
function startRun(mod, lvl, custom) {
  const boss = lvl === "boss", revenge = lvl === "revenge";
  const list = custom || (boss ? shuffle(BANK[mod].filter(q => q.lvl === "boss")) : shuffle(BANK[mod].filter(q => q.lvl === lvl)));
  R = { mod, lvl, boss, revenge, list, i: 0, score: 0, correct: 0, wrong: 0, best: 0, hp: 100, rage: false, won: false, dead: false, locked: false, cur: null, hintQ: false };
  show("game");
  $("stage").classList.remove("rage", "defeated");
  $("stage").classList.toggle("boss", boss);
  showQuestion();
}
function stopTimer() { clearTimeout(timerId); timerId = null; }
function startTimer(sec, full) {
  const bar = $("timer-bar"); full = full || sec;
  bar.style.transition = "none"; bar.style.width = (sec / full * 100) + "%"; void bar.offsetWidth;
  bar.style.transition = `width ${sec}s linear`; bar.style.width = "0";
  R.tEnd = Date.now() + sec * 1000;
  clearTimeout(timerId);
  timerId = setTimeout(() => { if (!R.locked) resolve(false, true); }, sec * 1000);
}
function updateHud() {
  $("score").textContent = R.score; $("streak").textContent = streak;
  $("q-count").textContent = `Q${R.i + 1}/${R.list.length}`;
  $("progress-bar").style.width = (R.i / R.list.length) * 100 + "%";
}
function showQuestion() {
  const q = R.list[R.i], k = q.kind;
  R.locked = false; R.cur = q; R.hintQ = false;
  $("q-type").textContent = (R.boss ? "👹 BOSS · " : R.revenge ? "😈 REVENGE · " : "") + (HC ? "☠️ " : "") + q.type;
  $("q-text").textContent = q.q;
  $("q-code").hidden = !q.code; $("q-code").textContent = q.code;
  $("feedback").hidden = true; $("hint").hidden = true;
  $("options").hidden = k !== "mcq"; $("typebox").hidden = k !== "type"; $("bughunt").hidden = k !== "bug"; $("orderbox").hidden = k !== "order";
  if (k === "mcq") {
    const box = $("options"); box.innerHTML = "";
    shuffle(q.options.map((t, j) => ({ t, ok: j === q.answer }))).forEach(o => {
      const b = document.createElement("button");
      b.className = "opt"; b.textContent = o.t; b.dataset.ok = o.ok ? "1" : "0";
      b.onclick = () => { if (!R.locked) resolve(o.ok, false, b); };
      box.appendChild(b);
    });
  }
  if (k === "type") { $("type-in").value = ""; $("type-in").disabled = false; $("type-btn").disabled = false; setTimeout(() => $("type-in").focus(), 50); }
  if (k === "bug") renderBug(q);
  if (k === "order") renderOrder(q);
  $("hpbar").hidden = !R.boss; if (R.boss) setHp();
  const timed = R.boss || q.speed;
  $("timer").hidden = !timed;
  updateHud();
  say(R.boss ? pick(LINES.boss) : q.intro, R.boss ? "angry" : "idle", R.boss);
  if (timed) startTimer(q.speed ? 20 : R.rage ? 20 : 30);
  renderPU();
}
function checkTyped() {
  if (R.locked) return;
  const v = norm($("type-in").value);
  if (!v) return;
  resolve(R.cur.accept.some(a => norm(a) === v));
}
function resolve(ok, timedOut, chosen) {
  stopTimer(); R.locked = true;
  const q = R.cur;
  document.querySelectorAll(".opt").forEach(b => { b.disabled = true; if (b.dataset.ok === "1") b.classList.add("right"); });
  if (q.kind === "bug") document.querySelectorAll("#bughunt .codeline")[q.answer].classList.add("right");
  $("type-in").disabled = true; $("type-btn").disabled = true; $("ord-check").disabled = true;
  if (ok) {
    streak++; wrongRow = 0; R.correct++; D.correct++; D.best = Math.max(D.best, streak); R.best = Math.max(R.best, streak);
    if (q.kind === "type") D.typed++;
    if (R.revenge) D.rev++;
    D.missed = D.missed.filter(x => x !== q.id);
    R.score += Math.round((10 + (streak - 1) * 2) * (R.hintQ ? 0.5 : 1));
    const hot = LINES.streak[streak];
    say(hot || pick(LINES.right), "happy", R.boss); Sound.play("correct"); confetti(); play($("stage"), "cheer", 1700);
    if (hot) { banner(LINES.banner[streak]); Sound.play("fire"); play($("stage"), "fire", 1700); }
    $("verdict").textContent = "✅ Correct!";
    if (R.boss) damageBoss();
  } else {
    streak = 0; wrongRow++; R.wrong++; D.bonks++;
    if (!D.missed.includes(q.id)) D.missed.push(q.id);
    if (D.missed.length > 50) D.missed.shift();
    if (HC) R.dead = true;
    if (chosen) chosen.classList.add("wrong");
    const line = timedOut ? pick(LINES.timeout) : wrongRow >= 2 ? pick(LINES.sad) : pick(LINES.wrong);
    say(line, wrongRow >= 2 ? "sad" : "angry", R.boss); Sound.play("wrong");
    play($("stage"), "bonk", 1500); play($("card"), "shake", 1000);
    $("verdict").textContent = (timedOut ? "⏰ Time's up! Bonk!" : "❌ Bonk! The right answer is highlighted.") + (HC ? " ☠️ Hardcore over." : "");
  }
  let extra = "";
  if (!ok && q.kind === "type") extra = `  Example answer: ${q.accept[0]}`;
  if (q.kind === "order") extra = `  Correct order: ${q.lines.map(l => l.trim()).join("  ⏎  ")}`;
  $("explain").textContent = q.explain + extra;
  $("next-btn").textContent = R.won ? "Claim victory →" : R.dead ? "See results →" : R.i === R.list.length - 1 ? "See results →" : "Next →";
  $("feedback").hidden = false;
  updateHud(); renderPU(); checkAch();
}
function nextQuestion() { Sound.play("click"); if (R.won || R.dead) return finishRun(); R.i++; R.i >= R.list.length ? finishRun() : showQuestion(); }

function finishRun() {
  const total = R.list.length, pct = R.correct / total;
  const passed = R.boss ? R.won : R.revenge ? pct >= 0.6 : (pct >= 0.6 && !R.dead);
  const stars = !passed ? 0 : R.boss ? Math.max(1, 3 - R.wrong) : pct === 1 ? 3 : pct >= 0.8 ? 2 : 1;
  const mult = HC && passed ? 1.5 : 1, gain = Math.round(R.score * mult);
  const before = rankOf(D.xp)[0];
  D.xp += gain; D.coins += gain;
  if (passed && !R.revenge) { const key = R.mod + "-" + R.lvl; D.done[key] = Math.max(D.done[key] || 0, stars); if (R.boss) D.boss++; if (HC) D.hc++; }
  if (R.correct === total && !R.revenge) D.perfect++;
  const after = rankOf(D.xp);
  checkAch();
  $("rank").textContent = passed ? `${"★".repeat(stars)}${"☆".repeat(3 - stars)} ${R.boss ? "Boss defeated!" : R.revenge ? "Revenge is sweet!" : "Level cleared!"}` : (R.dead ? "☠️ Hardcore run over" : "Not yet. Try again!");
  $("r-correct").textContent = `${R.correct}/${total}`; $("r-score").textContent = gain + (mult > 1 ? " (+50%)" : ""); $("r-best").textContent = R.best;
  const line = passed ? (R.boss ? "You... defeated me? TUNG TUNG TUNG... I'm proud." : R.revenge ? "Those mistakes are history!" : pct === 1 ? "PERFECT! TUNG TUNG TUNG SAHUR!" : "Well done. The next level awaits.")
    : (R.boss ? "The boss wins this time. Study and return!" : R.dead ? "One life. One mistake. Tung does not forgive." : "Study the explanations and try again. The bat is hungry.");
  $("r-line").textContent = line + `  🪙 +${gain} coins` + (after[0] > before ? `  🎉 Rank up: ${after[1]}` : "");
  if (after[0] > before) setTimeout(() => toast(`🎉 Rank up: ${after[1]}`), 600);
  show("results");
  Sound.play(passed ? "correct" : "wrong"); Sound.speak(line);
}

// ===== Wire up buttons =====
mountCharacter();
$("play-btn").onclick = () => { Sound.play("click"); renderMap(); };
$("profile-btn").onclick = renderProfile;
$("map-home").onclick = () => show("home");
$("map-profile").onclick = renderProfile;
$("profile-back").onclick = renderMap;
$("reset-btn").onclick = () => { if (confirm("Erase all progress?")) { D = Store.reset(); streak = 0; $("name-in").value = ""; $("save-code").value = ""; renderProfile(); } };
$("quit-btn").onclick = renderMap;
$("map-btn").onclick = renderMap;
$("replay-btn").onclick = () => { Sound.play("click"); R.revenge ? startRevenge() : startRun(R.mod, R.lvl); };
$("next-btn").onclick = nextQuestion;
$("type-btn").onclick = checkTyped;
$("type-in").addEventListener("keydown", e => { if (e.key === "Enter") checkTyped(); });
$("mute-btn").onclick = () => { $("mute-btn").textContent = Sound.toggle() ? "🔇" : "🔊"; };

// ===== Tung's Classroom (teaching section) =====
let LL = "py", LI = 0;
function renderLearn(lang) {
  if (lang) LL = lang;
  $("lesson").hidden = true; $("learn-list").hidden = false; $("learn-tabs").hidden = false;
  const tabs = $("learn-tabs"); tabs.innerHTML = "";
  Object.entries(MODS).forEach(([k, m]) => {
    const b = document.createElement("button");
    b.className = "chip" + (k === LL ? " on" : ""); b.textContent = m.icon + " " + m.name;
    b.onclick = () => { Sound.play("click"); renderLearn(k); };
    tabs.appendChild(b);
  });
  const list = $("learn-list"); list.innerHTML = "";
  LESSONS[LL].forEach((l, i) => {
    const b = document.createElement("button"); b.className = "lesson-card";
    b.innerHTML = `<span style="font-size:24px">${D.learned[LL + "-" + i] ? "✅" : "📖"}</span><b>${i + 1}. ${l[0]}</b>`;
    b.onclick = () => { Sound.play("click"); openLesson(i); };
    list.appendChild(b);
  });
  show("learn");
}
function openLesson(i) {
  LI = i; const l = LESSONS[LL][i];
  $("learn-list").hidden = true; $("learn-tabs").hidden = true; $("lesson").hidden = false;
  $("lesson-tag").textContent = `${MODS[LL].name} · Lesson ${i + 1}/${LESSONS[LL].length}`;
  $("lesson-title").textContent = l[0];
  $("lesson-body").innerHTML = "";
  l[1].split("\n").forEach(t => { const p = document.createElement("p"); p.textContent = t; $("lesson-body").appendChild(p); });
  $("lesson-code").textContent = l[2];
  $("lesson-tip").textContent = "Tung says: " + l[3];
  $("lesson-next").textContent = i === LESSONS[LL].length - 1 ? "Finish ✓" : "Next lesson →";
  window.scrollTo(0, 0);
}
function finishLesson() {
  Sound.play("click");
  const key = LL + "-" + LI;
  if (!D.learned[key]) { D.learned[key] = 1; D.xp += 5; toast("📖 Lesson complete! +5 XP"); Sound.play("correct"); checkAch(); }
  LI < LESSONS[LL].length - 1 ? openLesson(LI + 1) : renderLearn();
}
$("learn-btn").onclick = () => renderLearn();
$("map-learn").onclick = () => renderLearn();
$("learn-home").onclick = () => show("home");
$("learn-map").onclick = renderMap;
$("lesson-back").onclick = () => renderLearn();
$("lesson-next").onclick = finishLesson;
$("lesson-listen").onclick = () => Sound.speak(LESSONS[LL][LI][1].replace(/\n/g, " "));

// ===== Guest name + backup codes =====
$("name-in").value = D.name || "";
$("name-in").addEventListener("input", e => { D.name = e.target.value.trim().slice(0, 16); Store.save(); });
$("export-btn").onclick = () => {
  const c = Store.exportCode();
  $("save-code").value = c; $("save-code").select();
  try { navigator.clipboard.writeText(c).then(() => toast("📋 Backup code copied!")).catch(() => toast("Copy the code from the box")); }
  catch (e) { toast("Copy the code from the box"); }
};
$("import-btn").onclick = () => {
  const d = Store.importCode($("save-code").value.trim());
  if (!d) return toast("❌ That code doesn't look right");
  D = d; $("name-in").value = D.name || ""; toast("✅ Progress restored!"); renderProfile();
};

// ===== v5: boss phases, power-ups, new question types, revenge, wardrobe =====
function setHp() { $("hp-fill").style.width = R.hp + "%"; }
function damageBoss() {
  R.hp = Math.max(0, R.hp - 25); setHp();
  if (R.hp <= 0) {
    R.won = true; banner("💥 TUNG DEFEATED!");
    $("stage").classList.add("defeated"); $("tung").setAttribute("class", "tung sad");
    for (let i = 0; i < 3; i++) setTimeout(confetti, i * 400);
    Sound.play("fire"); Sound.speak("Impossible... you have defeated me!", 0.4, 1.0);
  } else if (R.hp <= 50 && !R.rage) {
    R.rage = true; $("stage").classList.add("rage"); banner("⚠️ PHASE 2!"); Sound.play("fire");
    say("NOW I AM ANGRY! Faster! Harder! Less time!", "angry", true);
  }
}
function renderBug(q) {
  const box = $("bughunt"); box.innerHTML = "";
  q.lines.forEach((ln, i) => {
    const b = document.createElement("button"); b.className = "codeline"; b.textContent = ln || " ";
    b.onclick = () => { if (!R.locked) resolve(i === q.answer, false, b); };
    box.appendChild(b);
  });
}
function renderOrder(q) { R.ord = []; R.pool = shuffle(q.lines.map((t, i) => ({ t, i }))); drawOrder(); }
function drawOrder() {
  const p = $("ord-pool"), a = $("ord-ans"); p.innerHTML = ""; a.innerHTML = "";
  const mk = (o, fn) => { const b = document.createElement("button"); b.className = "codeline"; b.textContent = o.t; b.onclick = () => { if (!R.locked) { fn(); drawOrder(); } }; return b; };
  R.pool.forEach(o => { if (!R.ord.includes(o)) p.appendChild(mk(o, () => R.ord.push(o))); });
  R.ord.forEach(o => a.appendChild(mk(o, () => R.ord.splice(R.ord.indexOf(o), 1))));
  $("ord-check").disabled = R.ord.length !== R.pool.length;
}
function renderPU() {
  const q = R.cur, off = HC || R.locked;
  $("pu-row").hidden = HC;
  const set = (id, label, k, ok) => { const b = $(id); b.textContent = `${label} ×${D.pu[k]}`; b.disabled = off || !D.pu[k] || !ok; };
  set("pu-fifty", "✂️ 50/50", "fifty", q.kind === "mcq");
  set("pu-time", "⏱ +10s", "time", !!timerId);
  set("pu-hint", "💡 Hint", "hint", !R.hintQ);
}
function usePU(k) {
  if (R.locked || HC || !D.pu[k]) return;
  const q = R.cur;
  if (k === "fifty") {
    if (q.kind !== "mcq") return;
    shuffle([...document.querySelectorAll(".opt")].filter(b => b.dataset.ok === "0")).slice(0, 2).forEach(b => { b.disabled = true; b.style.opacity = 0.3; });
  }
  if (k === "time") { if (!timerId) return; startTimer((R.tEnd - Date.now()) / 1000 + 10, 40); }
  if (k === "hint") {
    if (R.hintQ) return; R.hintQ = true;
    const h = q.kind === "type" ? "It starts with: " + q.accept[0].slice(0, 3) + "…" : q.explain.split(/(?<=[.!?])\s/)[0];
    $("hint").textContent = "💡 Tung whispers (half points): " + h; $("hint").hidden = false;
  }
  D.pu[k]--; Store.save(); renderPU(); Sound.play("click");
}
function startRevenge() {
  const list = [];
  Object.values(BANK).forEach(arr => arr.forEach(q => { if (D.missed.includes(q.id)) list.push(q); }));
  if (!list.length) return toast("🎉 No mistakes to avenge yet!");
  startRun("revenge", "revenge", shuffle(list).slice(0, 8));
}
function applyCosmetics() { document.body.className = ["hat", "bat", "theme"].map(k => k + "-" + D.eq[k]).join(" "); }
function renderWardrobe() {
  $("p-coins").textContent = `🪙 ${D.coins} coins · earned by finishing levels. Spend them on power-ups.`;
  const shop = $("p-shop"); shop.innerHTML = "";
  [["fifty", "✂️ 50/50", 30], ["time", "⏱ +10s", 30], ["hint", "💡 Hint", 20]].forEach(([k, l, c]) => {
    const b = document.createElement("button"); b.className = "chip"; b.textContent = `${l} ×${D.pu[k]} · buy ${c}🪙`;
    b.onclick = () => { if (D.coins < c) return toast("Not enough coins yet"); D.coins -= c; D.pu[k]++; Store.save(); Sound.play("click"); renderWardrobe(); };
    shop.appendChild(b);
  });
  const w = $("p-wardrobe"); w.innerHTML = "";
  Object.entries({ hat: "🎩 Hats", bat: "🏏 Bats", theme: "🎨 Themes" }).forEach(([cat, title]) => {
    const h = document.createElement("p"); h.className = "sub"; h.style.margin = "8px 0 2px"; h.style.textAlign = "left"; h.textContent = title; w.appendChild(h);
    const row = document.createElement("div"); row.className = "tabs"; row.style.justifyContent = "flex-start";
    COSM[cat].forEach(([id, label, test, req]) => {
      const open = test(D), b = document.createElement("button");
      b.className = "chip" + (D.eq[cat] === id ? " on" : ""); b.textContent = label + (open ? "" : " 🔒");
      b.onclick = () => { if (!open) return toast("🔒 " + req); D.eq[cat] = id; Store.save(); applyCosmetics(); renderWardrobe(); Sound.play("click"); };
      row.appendChild(b);
    });
    w.appendChild(row);
  });
}
function validateCosmetics() { Object.keys(COSM).forEach(cat => { const it = COSM[cat].find(x => x[0] === D.eq[cat]); if (!it || !it[2](D)) D.eq[cat] = COSM[cat][0][0]; }); }
validateCosmetics(); applyCosmetics();
$("hc").onchange = e => { HC = e.target.checked; toast(HC ? "☠️ Hardcore ON: one life, no power-ups" : "Hardcore off"); };
$("revenge-btn").onclick = startRevenge;
$("pu-fifty").onclick = () => usePU("fifty");
$("pu-time").onclick = () => usePU("time");
$("pu-hint").onclick = () => usePU("hint");
$("ord-check").onclick = () => { if (!R.locked) resolve(R.ord.every((o, k) => o.i === k)); };
