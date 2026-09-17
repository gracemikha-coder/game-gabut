// Cute audio synthesizer using Web Audio API
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq: number, type: OscillatorType = 'sine', duration = 0.1, gainVal = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  playScan() {
    this.playTone(880, 'sine', 0.08, 0.15);
    setTimeout(() => this.playTone(1320, 'sine', 0.1, 0.12), 60);
  }

  playSuccess() {
    this.playTone(523, 'triangle', 0.1);
    setTimeout(() => this.playTone(659, 'triangle', 0.1), 100);
    setTimeout(() => this.playTone(784, 'triangle', 0.12), 200);
    setTimeout(() => this.playTone(1046, 'triangle', 0.25), 300);
  }

  playError() {
    this.playTone(200, 'sawtooth', 0.18, 0.15);
    setTimeout(() => this.playTone(160, 'sawtooth', 0.25, 0.15), 120);
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.08);
  }
}

export const sound = new SoundManager();
