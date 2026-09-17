// Web Audio API Retro Chiptune Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function play8BitTone(
  freq: number,
  type: OscillatorType = 'square',
  duration: number = 0.15,
  gainLevel: number = 0.08
) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if audio blocked
  }
}

// 1. Missing Page Discovered SFX: A radiant, uplifting ascending arpeggio with high sparkle
export function playPageFoundSFX() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      play8BitTone(freq, 'square', 0.18, 0.12);
      // add high sparkle triangle
      play8BitTone(freq * 1.5, 'triangle', 0.1, 0.05);
    }, idx * 65);
  });
}

// 2. Spell Unlocked SFX: Deep resonant pulse then majestic triumphant cadence
export function playSpellUnlockedSFX() {
  const bass = [261.63, 329.63, 392.0]; // C4, E4, G4
  bass.forEach((f, i) => {
    setTimeout(() => play8BitTone(f, 'triangle', 0.25, 0.15), i * 90);
  });
  setTimeout(() => {
    play8BitTone(523.25, 'square', 0.4, 0.15); // C5
    play8BitTone(659.25, 'square', 0.4, 0.12); // E5
    play8BitTone(1046.5, 'triangle', 0.5, 0.18); // C6
  }, 320);
}

// 3. UI Click / Blip SFX
export function playClickSFX() {
  play8BitTone(880, 'square', 0.05, 0.06);
}

// 4. Boss / Danger Stinger
export function playDangerStinger() {
  const chords = [196.0, 185.0, 174.61, 164.81]; // G3, F#3, F3, E3 descend
  chords.forEach((freq, idx) => {
    setTimeout(() => {
      play8BitTone(freq, 'sawtooth', 0.2, 0.12);
    }, idx * 110);
  });
}

// 5. Library Ambient Chime / Lullaby
let ambientLoopTimer: number | null = null;
let isPlayingAmbient = false;

export function toggleLibraryAmbient(onStateChange?: (playing: boolean) => void): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isPlayingAmbient) {
    if (ambientLoopTimer) {
      window.clearInterval(ambientLoopTimer);
      ambientLoopTimer = null;
    }
    isPlayingAmbient = false;
    onStateChange?.(false);
    return false;
  }

  isPlayingAmbient = true;
  onStateChange?.(true);

  // Gentle acoustic-like chiptune progression in A minor / C major
  const arpeggio = [
    440, 523.25, 659.25, 523.25, // A4, C5, E5, C5
    392, 493.88, 587.33, 493.88, // G4, B4, D5, B4
    349.23, 440, 523.25, 440,    // F4, A4, C5, A4
    329.63, 392, 493.88, 392     // E4, G4, B4, G4
  ];
  let noteIndex = 0;

  const playNext = () => {
    if (!isPlayingAmbient) return;
    const freq = arpeggio[noteIndex % arpeggio.length];
    play8BitTone(freq, 'triangle', 0.35, 0.05); // soft warm triangle wave
    // occasional subtle high sparkle
    if (noteIndex % 4 === 0) {
      setTimeout(() => play8BitTone(freq * 2, 'sine', 0.2, 0.02), 120);
    }
    noteIndex++;
  };

  playNext();
  ambientLoopTimer = window.setInterval(playNext, 380);
  return true;
}

export function stopAmbient() {
  if (ambientLoopTimer) {
    window.clearInterval(ambientLoopTimer);
    ambientLoopTimer = null;
  }
  isPlayingAmbient = false;
}
