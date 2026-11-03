// Saves progress in the browser (localStorage). Also holds ranks and achievements.
const Store = {
  key: "tung-v2", d: null,
  load() {
    try { this.d = JSON.parse(localStorage.getItem(this.key)); } catch (e) { this.d = null; }
    const base = { xp: 0, done: {}, ach: {}, correct: 0, bonks: 0, best: 0, typed: 0, perfect: 0, boss: 0, learned: {}, name: "", eq: { hat: "none", bat: "wood", theme: "classic" }, coins: 0, pu: { fifty: 2, time: 2, hint: 2 }, missed: [], hc: 0, rev: 0 };
    this.d = Object.assign(base, this.d || {});
    return this.d;
  },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.d)); } catch (e) { /* storage blocked: ignore */ } },
  // Backup codes: the whole save, encoded as text. Works across devices with no server.
  exportCode() { return "TUNG1:" + btoa(unescape(encodeURIComponent(JSON.stringify(this.d)))); },
  importCode(code) {
    try {
      if (!code.startsWith("TUNG1:")) return null;
      const o = JSON.parse(decodeURIComponent(escape(atob(code.slice(6)))));
      if (typeof o.xp !== "number" || typeof o.done !== "object") return null;
      this.d = Object.assign({ xp: 0, done: {}, ach: {}, correct: 0, bonks: 0, best: 0, typed: 0, perfect: 0, boss: 0, learned: {}, name: "", eq: { hat: "none", bat: "wood", theme: "classic" }, coins: 0, pu: { fifty: 2, time: 2, hint: 2 }, missed: [], hc: 0, rev: 0 }, o);
      this.save();
      return this.d;
    } catch (e) { return null; }
  },
  reset() { try { localStorage.removeItem(this.key); } catch (e) {} this.d = null; return this.load(); }
};
const RANKS = [[0, "🥉 Fresh Splinter"], [100, "🥈 Junior Stick"], [300, "🥇 Senior Log"], [700, "🏆 Grand Wood Master"], [1500, "👑 Sahur Legend"]];
const rankOf = xp => [...RANKS].reverse().find(r => xp >= r[0]);
const nextRank = xp => RANKS.find(r => r[0] > xp);
// [id, icon, name, description, test(progress)]
const ACH = [
  ["first", "🌱", "First Splinter", "Get a correct answer", d => d.correct >= 1],
  ["bonk", "🏏", "Bonked!", "Get bonked for the first time", d => d.bonks >= 1],
  ["s5", "🔥", "On Fire", "5 correct in a row", d => d.best >= 5],
  ["s10", "⚡", "Unstoppable", "10 correct in a row", d => d.best >= 10],
  ["type", "⌨️", "Keyboard Warrior", "Solve 5 typing challenges", d => d.typed >= 5],
  ["perfect", "💯", "Flawless", "Clear a level with no mistakes", d => d.perfect >= 1],
  ["boss", "👹", "Boss Slayer", "Defeat a boss", d => d.boss >= 1],
  ["full", "🎓", "Full Stack Student", "Clear Hard in all 6 modules", d => Object.keys(MODS).every(m => d.done[m + "-hard"])],
  ["iron", "☠️", "Ironwood", "Clear a level in Hardcore mode", d => d.hc >= 1],
  ["rev", "😈", "Revenge Served", "Answer 5 Revenge questions correctly", d => d.rev >= 5],
  ["book", "📚", "Bookworm", "Finish 10 lessons in Tung's Classroom", d => Object.keys(d.learned).length >= 10],
  ["xp", "🪵", "Rank Climber", "Earn 300 XP", d => d.xp >= 300]
];

// Wardrobe: [id, label, unlock test, how to unlock]
const COSM = {
  hat: [["none","🚫 None",()=>true,""],["shades","😎 Shades",d=>d.xp>=100,"Reach Junior Stick (100 XP)"],["cowboy","🤠 Cowboy",d=>d.ach.s5,"Achievement: On Fire"],["crown","👑 Crown",d=>d.ach.boss,"Achievement: Boss Slayer"]],
  bat: [["wood","🪵 Wood",()=>true,""],["gold","🥇 Gold",d=>d.xp>=300,"Reach Senior Log (300 XP)"],["fire","🔥 Fire",d=>d.ach.perfect,"Achievement: Flawless"],["ice","🧊 Ice",d=>d.ach.type,"Achievement: Keyboard Warrior"]],
  theme: [["classic","🪵 Classic",()=>true,""],["night","🌙 Night",d=>d.xp>=100,"Reach Junior Stick (100 XP)"],["sakura","🌸 Sakura",d=>d.ach.book,"Achievement: Bookworm"],["forest","🌲 Forest",d=>d.ach.s10,"Achievement: Unstoppable"]]
};
