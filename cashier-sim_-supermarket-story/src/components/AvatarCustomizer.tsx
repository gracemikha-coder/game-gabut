import React, { useState, useEffect, useRef } from 'react';
import { AvatarConfig } from '../types';
import { WEAPONS_DATA } from '../data/gddData';
import { playClickSFX, playPageFoundSFX } from '../utils/audioSynth';
import { Sparkles, Dice5, User, Check, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface AvatarCustomizerProps {
  config: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

const SKIN_TONES = [
  { id: '#FCE0D2', name: 'Porcelain Fair' },
  { id: '#F3C5A8', name: 'Warm Peach' },
  { id: '#D49E72', name: 'Sun-kissed Honey' },
  { id: '#A36843', name: 'Warm Chestnut' },
  { id: '#6B4028', name: 'Deep Espresso' },
  { id: '#8D99AE', name: 'Astral Slate' },
];

const HAIR_STYLES = [
  { id: 'shaggy', name: 'Shaggy Explorer' },
  { id: 'ponytail', name: 'Mage Ponytail' },
  { id: 'bob', name: 'Classic Bob' },
  { id: 'spiky', name: 'Spiky Hero' },
  { id: 'curly', name: 'Curly Afro' },
  { id: 'bun', name: 'Scholar Bun' },
  { id: 'braid', name: 'Ranger Braid' },
  { id: 'hood', name: 'Mystic Hood' },
];

const HAIR_COLORS = [
  { id: '#2B2118', name: 'Sable Black' },
  { id: '#5C3A21', name: 'Chestnut Brown' },
  { id: '#C07D3E', name: 'Amber Ginger' },
  { id: '#E6C280', name: 'Golden Honey' },
  { id: '#EAE6DF', name: 'Silver Ash' },
  { id: '#A23B72', name: 'Amethyst Berry' },
  { id: '#2E86AB', name: 'Arcane Cerulean' },
  { id: '#4E937A', name: 'Forest Jade' },
];

const OUTFIT_STYLES = [
  { id: 'scribe', name: 'Scribe Robe' },
  { id: 'wanderer', name: 'Wanderer Tunic' },
  { id: 'coat', name: 'Apprentice Coat' },
  { id: 'knight', name: 'Knight Vestment' },
  { id: 'rogue', name: 'Shadow Cloak' },
  { id: 'astrologer', name: 'Astrologer Cape' },
];

const OUTFIT_COLORS = [
  { id: '#7F2626', name: 'Burgundy Crimson' },
  { id: '#1E3A8A', name: 'Midnight Navy' },
  { id: '#14532D', name: 'Emerald Scholar' },
  { id: '#78350F', name: 'Ancient Leather' },
  { id: '#4C1D95', name: 'Astral Indigo' },
  { id: '#1F2937', name: 'Charcoal Shadow' },
];

const ACCESSORIES = [
  { id: 'none', name: 'Tanpa Aksesori' },
  { id: 'quill-hat', name: 'Feather Quill Hat' },
  { id: 'goggles', name: 'Brass Tinker Goggles' },
  { id: 'scarf', name: 'Cozy Knitted Scarf' },
  { id: 'satchel', name: 'Antique Scribe Satchel' },
  { id: 'circlet', name: 'Arcane Star Circlet' },
];

const EXPRESSIONS: { id: AvatarConfig['expression']; label: string; desc: string }[] = [
  { id: 'determined', label: 'Determined', desc: 'Mata tajam & percaya diri' },
  { id: 'inquisitive', label: 'Inquisitive', desc: 'Alis terangkat penuh rasa ingin tahu' },
  { id: 'calm', label: 'Calm & Wise', desc: 'Tatapan tenang dan meditatif' },
  { id: 'smirk', label: 'Playful Smirk', desc: 'Senyum tipis penuh petualangan' },
  { id: 'gentle', label: 'Gentle Warm', desc: 'Sorot mata ramah dan penuh empati' },
];

export const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ config, onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [idleFrame, setIdleFrame] = useState(0);
  const [nameError, setNameError] = useState('');

  // Idle animation loop simulation: 4-frame breathing cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleFrame((prev) => (prev + 1) % 4);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Name validation
  const handleNameChange = (val: string) => {
    if (val.length > 14) return;
    const sanitized = val.replace(/[^a-zA-Z0-9 -]/g, '');
    if (sanitized.length < 2 && sanitized.length > 0) {
      setNameError('Nama minimal 2 karakter.');
    } else {
      setNameError('');
    }
    onChange({ ...config, name: sanitized });
  };

  const handleRandomize = () => {
    playClickSFX();
    const randSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id;
    const randHair = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)].id;
    const randHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id;
    const randOutfit = OUTFIT_STYLES[Math.floor(Math.random() * OUTFIT_STYLES.length)].id;
    const randOutfitColor = OUTFIT_COLORS[Math.floor(Math.random() * OUTFIT_COLORS.length)].id;
    const randAccessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)].id;
    const randWeapon = WEAPONS_DATA[Math.floor(Math.random() * WEAPONS_DATA.length)].id;
    const randExpr = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)].id;

    onChange({
      ...config,
      skinColor: randSkin,
      hairStyle: randHair,
      hairColor: randHairColor,
      outfit: randOutfit,
      outfitColor: randOutfitColor,
      accessory: randAccessory,
      weapon: randWeapon,
      expression: randExpr,
    });
  };

  // Draw 2D Pixel Character on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pixel dimensions (32 x 32 virtual grid, scaled to 256 x 256)
    const scale = 8;
    const p = (x: number, y: number, color: string, w = 1, h = 1) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
    };

    // Idle breathing offset
    const breathY = idleFrame === 1 || idleFrame === 2 ? -1 : 0;
    const cloakSway = idleFrame === 2 || idleFrame === 3 ? 1 : 0;
    const blink = idleFrame === 2; // blink on frame 2

    // Shadow on ground
    ctx.fillStyle = 'rgba(15, 10, 8, 0.4)';
    ctx.beginPath();
    ctx.ellipse(16 * scale, 28 * scale, 9 * scale, 2.5 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. Legs / Boots
    p(13, 24, '#241a15', 2, 4);
    p(17, 24, '#241a15', 2, 4);

    // 2. Cloak / Body
    const outfitC = config.outfitColor;
    const outfitDark = '#121216';
    p(12 + cloakSway, 17 + breathY, outfitC, 8, 8);
    p(11 + cloakSway, 19 + breathY, outfitDark, 1, 6);
    p(20 + cloakSway, 19 + breathY, outfitDark, 1, 6);

    // Belt / Clasp
    p(14, 21 + breathY, '#D4AF37', 4, 1);

    // 3. Head / Neck
    p(15, 15 + breathY, config.skinColor, 2, 2); // neck
    p(12, 9 + breathY, config.skinColor, 8, 7); // head base

    // Eyes according to expression
    if (blink) {
      p(14, 12 + breathY, '#1c1511', 2, 1);
      p(18, 12 + breathY, '#1c1511', 2, 1);
    } else {
      const eyeColor = '#1c1511';
      const eyeWhite = '#f4f4f5';
      p(14, 12 + breathY, eyeWhite, 2, 2);
      p(18, 12 + breathY, eyeWhite, 2, 2);
      if (config.expression === 'determined') {
        p(14, 12 + breathY, eyeColor, 2, 1);
        p(18, 12 + breathY, eyeColor, 2, 1);
        p(13, 10 + breathY, '#3b2316', 3, 1); // angled eyebrow
        p(18, 10 + breathY, '#3b2316', 3, 1);
      } else if (config.expression === 'smirk') {
        p(15, 13 + breathY, eyeColor, 1, 1);
        p(19, 13 + breathY, eyeColor, 1, 1);
        p(17, 14 + breathY, '#6b2d2d', 2, 1); // smirk mouth
      } else {
        p(15, 12 + breathY, eyeColor, 1, 2);
        p(19, 12 + breathY, eyeColor, 1, 2);
        p(15, 14 + breathY, '#a87563', 2, 1); // neutral mouth
      }
    }

    // 4. Hair Styles
    const hc = config.hairColor;
    if (config.hairStyle === 'shaggy') {
      p(11, 7 + breathY, hc, 10, 3);
      p(10, 8 + breathY, hc, 2, 5);
      p(20, 8 + breathY, hc, 2, 5);
      p(13, 10 + breathY, hc, 2, 2); // fringe
      p(17, 10 + breathY, hc, 2, 1);
    } else if (config.hairStyle === 'ponytail') {
      p(11, 7 + breathY, hc, 10, 3);
      p(9, 6 + breathY, hc, 3, 7); // ponytail bun hanging
      p(11, 10 + breathY, hc, 1, 4);
    } else if (config.hairStyle === 'spiky') {
      p(12, 6 + breathY, hc, 2, 3);
      p(15, 5 + breathY, hc, 2, 4);
      p(18, 6 + breathY, hc, 2, 3);
      p(11, 8 + breathY, hc, 10, 2);
    } else if (config.hairStyle === 'curly') {
      p(10, 6 + breathY, hc, 12, 4);
      p(9, 8 + breathY, hc, 3, 5);
      p(20, 8 + breathY, hc, 3, 5);
    } else if (config.hairStyle === 'bun') {
      p(11, 7 + breathY, hc, 10, 3);
      p(14, 4 + breathY, hc, 4, 3); // top scholar bun
      p(16, 5 + breathY, '#D4AF37', 1, 2); // hairpin
    } else if (config.hairStyle === 'braid') {
      p(11, 7 + breathY, hc, 10, 3);
      p(21, 10 + breathY, hc, 2, 8); // long braid
    } else if (config.hairStyle === 'hood') {
      p(10, 6 + breathY, config.outfitColor, 12, 4);
      p(9, 8 + breathY, config.outfitColor, 3, 9);
      p(20, 8 + breathY, config.outfitColor, 3, 9);
    } else {
      // classic bob
      p(11, 7 + breathY, hc, 10, 3);
      p(10, 9 + breathY, hc, 2, 6);
      p(20, 9 + breathY, hc, 2, 6);
    }

    // 5. Accessories
    if (config.accessory === 'quill-hat') {
      p(9, 6 + breathY, '#362419', 14, 2);
      p(12, 3 + breathY, '#362419', 8, 3);
      p(20, 2 + breathY, '#f97316', 2, 4); // orange quill feather
      p(21, 1 + breathY, '#fbbf24', 2, 2);
    } else if (config.accessory === 'goggles') {
      p(12, 9 + breathY, '#b45309', 8, 2);
      p(13, 9 + breathY, '#38bdf8', 2, 2); // blue glass
      p(17, 9 + breathY, '#38bdf8', 2, 2);
    } else if (config.accessory === 'scarf') {
      p(12, 16 + breathY, '#b91c1c', 8, 2);
      p(11 + cloakSway, 18 + breathY, '#b91c1c', 2, 5); // trailing scarf
    } else if (config.accessory === 'satchel') {
      p(13, 20 + breathY, '#92400e', 4, 3); // satchel strap
      p(12, 17 + breathY, '#78350f', 1, 6);
    } else if (config.accessory === 'circlet') {
      p(12, 8 + breathY, '#eab308', 8, 1);
      p(15, 7 + breathY, '#06b6d4', 2, 2); // glowing gem
    }

    // 6. Weapon in Hand
    if (config.weapon === 'quill-blade') {
      p(22, 14 + breathY, '#94a3b8', 1, 8); // blade
      p(21, 18 + breathY, '#f59e0b', 3, 1); // gold guard
      p(22, 19 + breathY, '#475569', 1, 3); // hilt
      p(22, 13 + breathY, '#38bdf8', 1, 2); // ink glow tip
    } else if (config.weapon === 'lantern-staff') {
      p(23, 11 + breathY, '#78350f', 1, 14); // wooden staff
      p(21, 9 + breathY, '#d97706', 4, 1); // brass lantern ring
      p(21, 10 + breathY, '#fde047', 4, 4); // warm light glow
      p(22, 11 + breathY, '#ffffff', 2, 2); // lantern core
    } else if (config.weapon === 'spell-ledger') {
      p(21, 16 + breathY, '#1e293b', 5, 6); // leather book
      p(22, 17 + breathY, '#fef08a', 3, 4); // golden pages
      p(23, 14 + breathY, '#a855f7', 1, 1); // floating rune spark
    } else if (config.weapon === 'hook-chain') {
      p(22, 15 + breathY, '#cbd5e1', 2, 2); // brass spool
      p(23, 17 + breathY, '#94a3b8', 1, 6); // chain links
      p(24, 22 + breathY, '#f59e0b', 2, 2); // hook barb
    }
  }, [config, idleFrame]);

  const activeWeapon = WEAPONS_DATA.find((w) => w.id === config.weapon) || WEAPONS_DATA[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Character Preview & Dialogue Simulator */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Canvas Card */}
        <div className="bg-stone-900/90 border-2 border-stone-700 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/70 border border-stone-800 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-stone-300">
              Idle Cycle: Frame {idleFrame + 1}/4
            </span>
          </div>

          <button
            onClick={handleRandomize}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs rounded-md transition-colors cursor-pointer"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>Inspirasi Acak</span>
          </button>

          {/* Pixel Canvas with ornate retro frame */}
          <div className="my-4 p-3 bg-stone-950 border-4 border-amber-900/60 rounded-lg shadow-inner relative group">
            <canvas
              ref={canvasRef}
              width={256}
              height={256}
              className="pixelated w-52 h-52 sm:w-60 sm:h-60 block"
            />
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-stone-600 bg-stone-950/80 px-1 rounded">
              32x32 Layered
            </div>
          </div>

          {/* Name & Title Banner */}
          <div className="text-center w-full mt-1">
            <h3 className="font-cinzel text-xl font-bold text-amber-200 tracking-wider">
              {config.name || 'Unnamed Scribe'}
            </h3>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              Apprentice Scribe of Alexandria Antiqua
            </p>
          </div>
        </div>

        {/* Dynamic NPC Dialogue Preview */}
        <div className="bg-stone-900/80 border border-stone-700 rounded-xl p-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-700 flex items-center justify-center text-xs text-amber-100 font-pixel">
              O
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-300">Master Orin (Chief Curator)</h4>
              <p className="text-[10px] text-stone-400">Preview Dialog NPC Dalam Game</p>
            </div>
          </div>
          <div className="p-3 bg-stone-950/90 border border-stone-800 rounded-lg font-mono text-xs text-stone-200 leading-relaxed">
            <span className="text-amber-400">"</span>
            Ah, selamat datang di Grand Archive,{' '}
            <span className="text-amber-300 font-bold underline decoration-amber-500/50">
              {config.name || 'Magang'}
            </span>
            ! Aku melihat kau telah memilih{' '}
            <span className="text-cyan-300 font-semibold">{activeWeapon.name}</span>. Ingat, setiap
            lembaran <span className="text-amber-300">The Quest Ledger</span> yang kau pulihkan akan
            mengembalikan sepotong memori dunia yang hampir musnah. Jangan biarkan lilin harapan kita padam!
            <span className="text-amber-400">"</span>
          </div>
        </div>

        {/* Weapon Playstyle Rationale Box */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Playstyle: {activeWeapon.type}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-900/40 text-amber-200 rounded border border-amber-700/50">
              {activeWeapon.mobilityTag}
            </span>
          </div>
          <p className="text-xs text-stone-300 mb-2 leading-relaxed">{activeWeapon.playstyle}</p>
          <div className="text-[11px] text-stone-400 bg-stone-900/60 p-2.5 rounded border border-stone-800">
            <span className="text-amber-400 font-medium">Utilitas Puzzle: </span>
            {activeWeapon.puzzleUtility}
          </div>
          <div className="mt-2 text-[10px] text-stone-500 italic">
            💡 Rationale Desain: {activeWeapon.rationale}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Customization Controls */}
      <div className="lg:col-span-7 bg-stone-900/80 border border-stone-700 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-amber-100 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            Konfigurasi Avatar & Identitas
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Rancang avatar Scribe menggunakan sistem modular layer 20x28 sprite yang dioptimalkan untuk tim indie kecil.
          </p>
        </div>

        {/* 1. Name Input */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Nama Karakter (2 - 14 Karakter)
          </label>
          <div className="relative">
            <input
              type="text"
              value={config.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Masukkan nama avatar..."
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
            />
            <span className="absolute right-3 top-2.5 text-[11px] font-mono text-stone-500">
              {config.name.length}/14
            </span>
          </div>
          {nameError && <p className="text-[11px] text-rose-400 mt-1">{nameError}</p>}
        </div>

        {/* 2. Skin Color */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-2">
            Warna Kulit (6 Palet Shader Swap)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {SKIN_TONES.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, skinColor: st.id });
                }}
                className={`w-9 h-9 rounded-lg border-2 transition-transform cursor-pointer relative ${
                  config.skinColor === st.id
                    ? 'border-amber-400 scale-110 shadow-lg'
                    : 'border-stone-700 hover:scale-105'
                }`}
                style={{ backgroundColor: st.id }}
                title={st.name}
              >
                {config.skinColor === st.id && (
                  <Check className="w-4 h-4 text-stone-900 absolute inset-0 m-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Hair Style & Color */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-stone-300">
            Model Rambut (8 Model Modular)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {HAIR_STYLES.map((hs) => (
              <button
                key={hs.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, hairStyle: hs.id });
                }}
                className={`px-3 py-2 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                  config.hairStyle === hs.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-semibold'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600'
                }`}
              >
                {hs.name}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-medium text-stone-400 pt-1">
            Warna Rambut (8 Palet Pigmen)
          </label>
          <div className="flex flex-wrap gap-2">
            {HAIR_COLORS.map((hc) => (
              <button
                key={hc.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, hairColor: hc.id });
                }}
                className={`w-8 h-8 rounded-md border-2 transition-transform cursor-pointer ${
                  config.hairColor === hc.id
                    ? 'border-amber-400 scale-110'
                    : 'border-stone-700 hover:scale-105'
                }`}
                style={{ backgroundColor: hc.id }}
                title={hc.name}
              />
            ))}
          </div>
        </div>

        {/* 4. Outfit & Color */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-stone-300">
            Model Jubah / Pakaian (6 Arketipe Scribe)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {OUTFIT_STYLES.map((os) => (
              <button
                key={os.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, outfit: os.id });
                }}
                className={`px-3 py-2 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                  config.outfit === os.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-semibold'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600'
                }`}
              >
                {os.name}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-medium text-stone-400 pt-1">
            Warna Jubah
          </label>
          <div className="flex flex-wrap gap-2">
            {OUTFIT_COLORS.map((oc) => (
              <button
                key={oc.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, outfitColor: oc.id });
                }}
                className={`w-8 h-8 rounded-md border-2 transition-transform cursor-pointer ${
                  config.outfitColor === oc.id
                    ? 'border-amber-400 scale-110'
                    : 'border-stone-700 hover:scale-105'
                }`}
                style={{ backgroundColor: oc.id }}
                title={oc.name}
              />
            ))}
          </div>
        </div>

        {/* 5. Accessories */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-2">
            Aksesori (Ciri Khas Visual)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ACCESSORIES.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, accessory: acc.id });
                }}
                className={`px-3 py-2 text-xs rounded-lg border text-left transition-all cursor-pointer ${
                  config.accessory === acc.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200 font-semibold'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600'
                }`}
              >
                {acc.name}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Starting Weapon */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-2">
            Senjata / Alat Awal (Mempengaruhi Gaya Main & Utilitas Lingkungan)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {WEAPONS_DATA.map((w) => (
              <button
                key={w.id}
                onClick={() => {
                  playPageFoundSFX();
                  onChange({ ...config, weapon: w.id });
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  config.weapon === w.id
                    ? 'bg-amber-950/40 border-amber-400 ring-1 ring-amber-400/50'
                    : 'bg-stone-950 border-stone-800 hover:border-stone-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-200">{w.name}</span>
                  <span className="text-[10px] font-mono text-stone-400">{w.type.split('/')[0]}</span>
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-2">{w.playstyle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 7. Facial Expressions */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-2">
            Ekspresi Wajah (Memberi Jiwa pada Pixel)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {EXPRESSIONS.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  playClickSFX();
                  onChange({ ...config, expression: exp.id });
                }}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  config.expression === exp.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600'
                }`}
              >
                <div className="text-xs font-semibold">{exp.label}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{exp.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
