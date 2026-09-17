import React from 'react';
import { Calendar, Users, Target, Clock, ShieldAlert, Award, Compass, DollarSign, CheckCircle } from 'lucide-react';

export const ProductionRoadmap: React.FC = () => {
  const milestones = [
    {
      phase: 'Fase 1: Pre-Production & Graybox',
      duration: 'Bulan 1 - 2 (8 Minggu)',
      focus: 'Pondasi Gerakan Karakter & Core Loop',
      deliverables: [
        'Game Design Document (GDD) Final & Art Bible palet warna',
        'Graybox prototipe platforming (coyote time, jump buffer, dash feel di Unity/Godot)',
        'Prototipe interaksi 1 teka-teki buku naskah & greybox Level 1',
      ],
      budgetShare: '12%',
      status: 'Selesai / Terkonseptualisasi',
    },
    {
      phase: 'Fase 2: The Vertical Slice (Playable Demo)',
      duration: 'Bulan 3 - 4 (8 Minggu)',
      focus: 'The Library Hub + Level 1 Scriptorium 100% Selesai',
      deliverables: [
        'Tileset visual final, tata cahaya 2D, animasi musuh & mini-boss Owl',
        'Komposisi trek musik pertama & sound effect foley perkamen',
        'Blind playtesting pertama ke 30 pemain luar untuk validasi game-feel',
      ],
      budgetShare: '18%',
      status: 'Kritis untuk Pitching Publisher / Kickstarter',
    },
    {
      phase: 'Fase 3: Core Production Phase 1',
      duration: 'Bulan 5 - 9 (20 Minggu)',
      focus: 'Level 2 Canal & Level 3 Caverns + 4 Senjata Penuh',
      deliverables: [
        'Implementasi ke-4 senjata awal & sistem Inscription Slot',
        'Mekanik air pasang surut, laser prisma, dan 2 boss encounters',
        'Sistem dialog NPC dinamis dan ekspansi The Library Hub',
      ],
      budgetShare: '30%',
      status: 'Eksekusi Aset Intensif',
    },
    {
      phase: 'Fase 4: Core Production Phase 2',
      duration: 'Bulan 10 - 12 (12 Minggu)',
      focus: 'Level 4 Observatory & Level 5 The Void + Climax',
      deliverables: [
        'Mekanik gravitasi terbalik, 5 boss fights tuntas',
        'Integrasi 3 Cabang Ending & The Author’s Study Secret Epilogue',
        'Sistem Assist Mode lengkap dan lokalisasi multi-bahasa awal',
      ],
      budgetShare: '22%',
      status: 'Integrasi Cerita Penuh',
    },
    {
      phase: 'Fase 5: Alpha, Steam Deck Polish & Beta QA',
      duration: 'Bulan 13 - 16 (16 Minggu)',
      focus: 'Balancing, Optimasi 60 FPS, Steam Next Fest & Launch',
      deliverables: [
        'Uji kompatibilitas Steam Deck (solid 60 FPS pada 1280x800, konsumsi daya <7W)',
        'Peluncuran Demo Publik di Steam Next Fest',
        'Bug fixing intensif, marketing trailer gameplay, dan rilis komersial resmi',
      ],
      budgetShare: '18%',
      status: 'Peluncuran Pasar Global',
    },
  ];

  return (
    <div className="bg-stone-900/90 border border-stone-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
            Indie Production Engineering
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            Roadmap Produksi 14-16 Bulan (Tim 3 Orang)
          </h2>
          <p className="text-xs text-stone-400 mt-0.5 font-body">
            Strategi produksi realistis berdisiplin tinggi untuk menghindari development hell tanpa mengurangi standar kualitas rilis.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-300 text-xs font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Total Durasi: 64 Minggu (~15 Bulan)</span>
        </div>
      </div>

      {/* Team Composition Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-cinzel">
            <Users className="w-4 h-4 text-amber-400" />
            1. Lead Designer & Pixel Artist
          </div>
          <p className="text-xs text-stone-400 font-body leading-relaxed">
            Bertanggung jawab atas art direction, tileset 16x16, sprite karakter modular 20x28, animasi, level layout, dan UI aesthetic.
          </p>
        </div>

        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 font-cinzel">
            <Target className="w-4 h-4 text-cyan-400" />
            2. Lead Gameplay & Physics Dev
          </div>
          <p className="text-xs text-stone-400 font-body leading-relaxed">
            Menangani movement feel, physics puzzle (cermin, gravitasi, air), AI musuh, shader pixel rendering, save/load, dan optimasi Steam Deck.
          </p>
        </div>

        <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 font-cinzel">
            <Award className="w-4 h-4 text-purple-400" />
            3. Composer, Sound & Writer
          </div>
          <p className="text-xs text-stone-400 font-body leading-relaxed">
            Menulis seluruh dialog naratif, naskah lore The Quest Ledger, aransemen chiptune-akustik, foley perkamen, dan sound effect dopamin.
          </p>
        </div>
      </div>

      {/* Milestone Phases Timeline */}
      <div className="space-y-4 pt-2">
        <h3 className="font-cinzel text-base font-bold text-amber-200">
          5 Tahapan Milestone Menuju Rilis
        </h3>

        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 bg-stone-950 rounded-xl border border-stone-800 hover:border-stone-700 transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-xs font-bold text-amber-300 font-cinzel">{m.phase}</span>
                  <div className="text-[11px] text-stone-400 font-body">{m.focus}</div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 bg-stone-900 text-stone-300 rounded border border-stone-700">
                    {m.duration}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">
                    Alokasi: {m.budgetShare}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {m.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="text-xs text-stone-300 flex items-start gap-2 font-body"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-mono">Milestone Target:</span>
                <span className="text-amber-400 font-medium">{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Scope Discipline Manifesto */}
      <div className="p-5 bg-gradient-to-r from-amber-950/40 to-stone-900 border-2 border-amber-600/40 rounded-xl space-y-2">
        <h4 className="font-cinzel text-sm font-bold text-amber-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          Manifesto "Scope Discipline" Sang Creative Director:
        </h4>
        <p className="text-xs text-stone-200 font-body leading-relaxed">
          "Dalam industri game indie, pembunuh nomor satu bukanlah ide yang buruk, melainkan **Feature Creep** (menambah fitur tanpa akhir karena tergiur game lain). Lima biome yang dirancang dengan teliti, memiliki variasi visual mencengangkan, puzzle cerdas, dan kontrol sehalus sutra jauh lebih bernilai daripada 20 level kosong yang repetitif. Eksekusi 5 biome ini dengan cinta, dan game ini akan menjadi karya legendaris!"
        </p>
      </div>
    </div>
  );
};
