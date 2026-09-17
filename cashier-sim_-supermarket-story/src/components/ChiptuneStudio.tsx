import React, { useState, useEffect } from 'react';
import {
  playClickSFX,
  playDangerStinger,
  playPageFoundSFX,
  playSpellUnlockedSFX,
  toggleLibraryAmbient,
  stopAmbient,
} from '../utils/audioSynth';
import { Volume2, VolumeX, Sparkles, Music, Play, Pause, Radio, Award } from 'lucide-react';

export const ChiptuneStudio: React.FC = () => {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [equalizerBars, setEqualizerBars] = useState<number[]>([40, 65, 30, 80, 50, 95, 45, 70]);

  useEffect(() => {
    let interval: number;
    if (isPlayingAmbient) {
      interval = window.setInterval(() => {
        setEqualizerBars(
          Array.from({ length: 8 }, () => Math.floor(Math.random() * 70) + 25)
        );
      }, 150);
    } else {
      setEqualizerBars([10, 10, 10, 10, 10, 10, 10, 10]);
    }
    return () => clearInterval(interval);
  }, [isPlayingAmbient]);

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  const handleToggleAmbient = () => {
    toggleLibraryAmbient((playing) => {
      setIsPlayingAmbient(playing);
    });
  };

  return (
    <div className="bg-stone-900/90 border border-stone-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
            Web Audio API Chiptune Engine
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-400" />
            Studio Sound Design & Filosofi Audio
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Dengarkan langsung rancangan audio retro 8-bit hybrid yang dirancang untuk memicu dopamin tanpa menimbulkan kelelahan telinga (*auditory fatigue*).
          </p>
        </div>

        {/* Ambient BGM Toggle Button */}
        <button
          onClick={handleToggleAmbient}
          className={`px-4 py-2.5 rounded-xl font-cinzel text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            isPlayingAmbient
              ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 ring-2 ring-emerald-400/50'
              : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
          }`}
        >
          {isPlayingAmbient ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlayingAmbient ? 'Hentikan Musik BGM' : 'Putar BGM Perpustakaan'}</span>
        </button>
      </div>

      {/* Audio Visualizer & Equalizer Simulation */}
      <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-700 flex items-center justify-center text-amber-300">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-200">
              Track 01: "Lullaby of the Whispering Scriptorium"
            </div>
            <div className="text-[11px] font-mono text-stone-400">
              Genre: Acoustic-Chiptune Hybrid (72 BPM, Triangle Wave + Harp Sparkles)
            </div>
          </div>
        </div>

        {/* Equalizer Bars */}
        <div className="flex items-end gap-1.5 h-10">
          {equalizerBars.map((height, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-amber-600 to-amber-300 rounded-t transition-all duration-150"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Soundboard of Key SFX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SFX 1 */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">SFX 01</div>
            <h3 className="text-xs font-bold text-stone-200 font-cinzel mt-0.5">
              Halaman Terbuka (Page Found)
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              Akor Pentatonik Mayor menaik (C5-E5-G5-C6-E6) dengan taburan frekuensi 2400Hz.
            </p>
          </div>
          <button
            onClick={() => playPageFoundSFX()}
            className="w-full py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-200 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tes Fanfare</span>
          </button>
        </div>

        {/* SFX 2 */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">SFX 02</div>
            <h3 className="text-xs font-bold text-stone-200 font-cinzel mt-0.5">
              Mantra Terbuka (Spell Unlocked)
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              Dentum bas hangat diikuti akor megah C-Major triumph harmoni.
            </p>
          </div>
          <button
            onClick={() => playSpellUnlockedSFX()}
            className="w-full py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-200 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tes Cadence</span>
          </button>
        </div>

        {/* SFX 3 */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">SFX 03</div>
            <h3 className="text-xs font-bold text-stone-200 font-cinzel mt-0.5">
              Boss Danger Pulse (Stinger)
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              Sawtooth wave menurun cepat (G3-F#3-F3-E3) memicu adrenalin waspada.
            </p>
          </div>
          <button
            onClick={() => playDangerStinger()}
            className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-200 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Tes Danger Stinger</span>
          </button>
        </div>

        {/* SFX 4 */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-[10px] font-mono text-stone-400 font-bold uppercase">SFX 04</div>
            <h3 className="text-xs font-bold text-stone-200 font-cinzel mt-0.5">
              UI Cursor & Dialog Blip
            </h3>
            <p className="text-[11px] text-stone-400 mt-1">
              Klik 880Hz square wave 0.05 detik yang renyah dan tidak bising.
            </p>
          </div>
          <button
            onClick={() => playClickSFX()}
            className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            <span>Tes Blip Kursor</span>
          </button>
        </div>
      </div>

      {/* Audio Rationale Deep-Dive */}
      <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-stone-300 space-y-2">
        <h4 className="font-cinzel font-bold text-amber-300">
          💡 Rationale Sound Design: "The Warm Nostalgia Formula"
        </h4>
        <p className="leading-relaxed font-body">
          Banyak game retro gagal karena membiarkan gelombang square wave berbunyi tanpa filter di frekuensi tinggi (&gt;4000Hz), yang membuat telinga lelah setelah bermain 30 menit. Di <em>The Quest Ledger</em>, kami menggunakan <strong>Low-Pass Filter pada 2800Hz</strong> dan memadukannya dengan instrumen akustik (cello &amp; nylon guitar) seperti di <em>Celeste</em> dan <em>Chicory</em>. Ini menjaga pesona pixel art masa kecil tetap terasa tanpa menyiksa pendengaran modern.
        </p>
      </div>
    </div>
  );
};
