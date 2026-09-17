import React, { useState } from 'react';
import { BIOMES_DATA } from '../data/gddData';
import { playClickSFX, playDangerStinger, playSpellUnlockedSFX } from '../utils/audioSynth';
import { Layers, ShieldAlert, Sparkles, Clock, Skull, Zap, Copy, Check, Activity, Heart, Eye } from 'lucide-react';

export const LevelBiomeExplorer: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const currentLevel = BIOMES_DATA.find((b) => b.id === selectedLevelId) || BIOMES_DATA[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    playClickSFX();
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 5 Biome Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {BIOMES_DATA.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => {
              playClickSFX();
              setSelectedLevelId(lvl.id);
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedLevelId === lvl.id
                ? 'bg-amber-950/50 border-amber-400 ring-1 ring-amber-400/50 shadow-lg'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-amber-400">
                LEVEL 0{lvl.id}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {'★'.repeat(lvl.difficultyRating)}
              </span>
            </div>
            <div className="text-xs font-cinzel font-bold text-stone-100 truncate">
              {lvl.name}
            </div>
            <div className="text-[10px] text-stone-400 truncate mt-0.5">{lvl.duration}</div>

            {/* Accent colored line at bottom based on primary palette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: lvl.colorPalette[3]?.hex || '#d4af37' }}
            />
          </button>
        ))}
      </div>

      {/* Main Biome Inspector Card */}
      <div className="bg-stone-900/90 border border-stone-700 rounded-2xl p-6 space-y-6 shadow-2xl">
        {/* Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800/60">
                Level 0{currentLevel.id} · {currentLevel.biomeType}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-800 text-stone-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                Durasi: {currentLevel.duration}
              </span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
              {currentLevel.name}
            </h2>
            <p className="text-xs text-stone-400 font-body">{currentLevel.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => playDangerStinger()}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Skull className="w-3.5 h-3.5" />
              <span>Preview Boss Stinger SFX</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: COLOR PALETTE & PSYCHOLOGY */}
        <div className="space-y-3">
          <h3 className="font-cinzel text-sm font-bold text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Palet Warna Spesifik & Psikologi Desain (Hex Codes)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {currentLevel.colorPalette.map((cp) => (
              <div
                key={cp.hex}
                className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col justify-between group hover:border-stone-600 transition-colors"
              >
                <div
                  className="w-full h-14 rounded-lg mb-2 border border-black/40 shadow-inner relative flex items-center justify-center"
                  style={{ backgroundColor: cp.hex }}
                >
                  <button
                    onClick={() => handleCopyHex(cp.hex)}
                    className="opacity-0 group-hover:opacity-100 bg-stone-900/90 text-stone-100 p-1.5 rounded text-xs flex items-center gap-1 transition-opacity cursor-pointer shadow"
                  >
                    {copiedHex === cp.hex ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span className="text-[10px] font-mono">Salin</span>
                  </button>
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-200 truncate">{cp.name}</div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold">{cp.hex}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{cp.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed font-body">
            <span className="text-amber-400 font-semibold">Psikologi Warna Biome: </span>
            {currentLevel.colorPsychology}
          </div>
        </div>

        {/* SECTION 2: ENEMIES, HAZARDS & PUZZLE COMPLEXITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enemies Dossier */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-sm font-bold text-amber-200 flex items-center gap-2">
              <Skull className="w-4 h-4 text-rose-400" />
              Musuh Baru & Pola Serangan (AI Behaviors)
            </h3>
            <div className="space-y-2.5">
              {currentLevel.newEnemies.map((enemy, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 font-cinzel">
                      {enemy.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">Tier 0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-stone-300">{enemy.behavior}</p>
                  <div className="text-[11px] text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/40 mt-1">
                    <span className="font-semibold">Kelemahan Taktis: </span>
                    {enemy.weakness}
                  </div>
                </div>
              ))}
            </div>

            {/* Environmental Hazards */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Rintangan Lingkungan (Hazards)
              </h4>
              <ul className="text-xs text-stone-400 space-y-1 list-disc pl-4">
                {currentLevel.environmentalHazards.map((haz, i) => (
                  <li key={i}>{haz}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Puzzle & Boss Dossier */}
          <div className="space-y-4">
            {/* Puzzle Complexity */}
            <div className="space-y-2">
              <h3 className="font-cinzel text-sm font-bold text-amber-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Kompleksitas Puzzle & Mekanik Spasial
              </h3>
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed">
                {currentLevel.puzzleComplexity}
              </div>
            </div>

            {/* Boss Fight Breakdown */}
            <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-300 font-cinzel">
                    BOSS: {currentLevel.boss.name}
                  </div>
                  <div className="text-[10px] text-stone-400">{currentLevel.boss.title}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-900/40 text-rose-200 rounded border border-rose-700/60">
                  Arena Encounter
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                {currentLevel.boss.phases.map((ph, pIdx) => (
                  <div key={pIdx} className="bg-stone-950/60 p-2 rounded border border-stone-800">
                    {ph}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-900/40">
                <span className="font-semibold">Telegraphed Cue: </span>
                {currentLevel.boss.telegraphedMechanic}
              </div>
            </div>

            {/* Skill Gating */}
            <div className="p-3.5 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-cinzel">
                <Zap className="w-4 h-4 text-amber-400" />
                Skill Gating Reward: {currentLevel.skillTaught.name}
              </div>
              <p className="text-xs text-stone-300">{currentLevel.skillTaught.description}</p>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">
                ➔ Gerbang Level Berikutnya: {currentLevel.skillTaught.gatingNext}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: 5 WAYS PAGES ARE HIDDEN IN THIS BIOME */}
        <div className="pt-2 border-t border-stone-800 space-y-2.5">
          <h3 className="font-cinzel text-sm font-bold text-amber-200">
            Sebaran 5 Halaman Unik di Biome Ini (Mencegah Repetisi):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {currentLevel.pageHidingTechniques.map((tech, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-stone-950 rounded-lg border border-stone-800 text-xs text-stone-300 flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-amber-900/50 text-amber-300 text-[10px] font-mono flex items-center justify-center shrink-0 border border-amber-700/50">
                  {idx + 1}
                </span>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: THE SAWTOOTH DIFFICULTY CURVE VISUALIZER & BREATHERS */}
      <div className="bg-stone-900/80 border border-stone-700 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-cinzel text-base font-bold text-amber-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Kurva Kesulitan: "The Sawtooth Pacing Model"
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Grafik intensitas psikologis naik-turun dengan The Library Hub sebagai Breather Moment wajib setelah setiap boss.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900">
            Zero Cognitive Fatigue Principle
          </span>
        </div>

        {/* Visual Curve Representation */}
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              {
                lvl: 'Lvl 1 Scriptorium',
                peak: '60% Tensi',
                breather: 'Hub: Teh Hangat Orin',
                curve: 'h-16 bg-amber-600',
              },
              {
                lvl: 'Lvl 2 Canal',
                peak: '75% Tensi',
                breather: 'Hub: Upgrade Vesper',
                curve: 'h-24 bg-blue-600',
              },
              {
                lvl: 'Lvl 3 Caverns',
                peak: '85% Tensi',
                breather: 'Hub: Permadani Barnaby',
                curve: 'h-32 bg-purple-600',
              },
              {
                lvl: 'Lvl 4 Observatory',
                peak: '92% Tensi',
                breather: 'Hub: Dialog Terakhir',
                curve: 'h-40 bg-indigo-600',
              },
              {
                lvl: 'Lvl 5 Void Climax',
                peak: '100% Puncak',
                breather: 'The Author Study (Epilogue)',
                curve: 'h-48 bg-rose-600',
              },
            ].map((node, i) => (
              <div key={i} className="flex flex-col items-center justify-end">
                <span className="text-[10px] font-mono text-stone-400 mb-1">{node.peak}</span>
                <div className={`w-10 rounded-t-lg transition-all ${node.curve} shadow-lg`} />
                <div className="mt-2 text-[11px] font-bold text-stone-200">{node.lvl}</div>
                <div className="text-[10px] text-amber-400/80 mt-1 italic leading-tight">
                  ☕ {node.breather}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoint & Assist Mode Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
            <h4 className="text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Sistem Checkpoint & Zero-Friction Respawn
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-body">
              Menggunakan <strong>Bookmark Totems</strong> di setiap pintu sub-ruangan. Jika jatuh ke jurang, layar berkedip hitam 0.3 detik dan langsung hidup kembali tanpa reload screen!
            </p>
          </div>
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
            <h4 className="text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Inklusivitas & Assist Mode Penuh
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-body">
              Slider kecepatan permainan (70% - 100%), opsi melayang tanpa batas (*infinite gliding*), kekebalan mati (*story mode*), serta remapping penuh untuk kontrol satu tangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
