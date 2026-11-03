// Sound effects are synthesized with the Web Audio API, so no audio files are needed yet.
// Browsers only allow audio after a click, so the AudioContext is created lazily on first use.
const Sound = {
  muted: false,
  ctx: null,
  tone(freq, dur, type = "sine", vol = 0.15, delay = 0, endFreq) {
    if (this.muted) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const t = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(t); osc.stop(t + dur);
    } catch (e) { /* audio not available: ignore */ }
  },
  play(name) {
    if (name === "click") this.tone(440, 0.08, "triangle", 0.1);
    if (name === "correct") [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.18, "triangle", 0.18, i * 0.09));
    if (name === "fire") [392, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.12, "sawtooth", 0.1, i * 0.06));
    if (name === "ach") [660, 880].forEach((f, i) => this.tone(f, 0.2, "triangle", 0.15, i * 0.12));
    if (name === "wrong") { this.tone(180, 0.25, "square", 0.2, 0.5, 50); this.tone(90, 0.3, "sine", 0.3, 0.5, 40); }
  },
  // Optional spoken dialogue using the browser's built-in text-to-speech
  speak(text, pitch = 0.6, rate = 1.05) {
    if (this.muted || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.pitch = pitch; u.rate = rate;
    speechSynthesis.speak(u);
  },
  toggle() {
    this.muted = !this.muted;
    if (this.muted && "speechSynthesis" in window) speechSynthesis.cancel();
    return this.muted;
  }
};
