import React, { useState } from 'react';
import { INITIAL_QUESTS } from '../data/gddData';
import { playClickSFX, playPageFoundSFX, playSpellUnlockedSFX } from '../utils/audioSynth';
import { BookOpen, Sparkles, Scroll, Compass, Flame, Shield, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Feather } from 'lucide-react';

interface LedgerHubViewerProps {
  collectedPages: number;
  onAddPage: () => void;
  onResetPages: () => void;
}

export const LedgerHubViewer: React.FC<LedgerHubViewerProps> = ({
  collectedPages,
  onAddPage,
  onResetPages,
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'hub' | 'quests'>('book');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedHubStation, setSelectedHubStation] = useState<'orin' | 'hearth' | 'tapestry' | 'vault' | 'gateway'>('orin');

  const totalPages = 25;
  const progressPercent = Math.min(100, Math.round((collectedPages / totalPages) * 100));

  // Visual Evolution of the Ledger
  const getLedgerVisualStage = () => {
    if (collectedPages <= 5) {
      return {
        stage: 'Tahap 1: Faded & Fragile (0-5 Halaman)',
        desc: 'Sampul kulit tua berdebu, lembaran robek, aura abu-abu padam. Mimbar belum bersinar.',
        glowColor: 'from-amber-950/20 to-stone-900',
        borderColor: 'border-stone-700',
      };
    }
    if (collectedPages <= 15) {
      return {
        stage: 'Tahap 2: Gilded Resonance (6-15 Halaman)',
        desc: 'Jilidan sutra emas mulai merajut punggung buku, memancarkan partikel hangat dan wangi cedarwood.',
        glowColor: 'from-amber-600/20 to-amber-950/40',
        borderColor: 'border-amber-600/50',
      };
    }
    if (collectedPages < 25) {
      return {
        stage: 'Tahap 3: Astral Levitation (16-24 Halaman)',
        desc: 'Buku melayang 1 meter di atas mimbar, lembaran berputar sendiri menampilkan miniatur hologram biome.',
        glowColor: 'from-cyan-600/20 to-amber-500/30',
        borderColor: 'border-cyan-500/60',
      };
    }
    return {
      stage: 'Tahap 4: The Living Canon (100% - 25 Halaman)',
      desc: 'Pilar cahaya emas menembus atap kubah! Membuka gerbang rahasia menuju The Author’s Study.',
      glowColor: 'from-amber-400/30 via-yellow-500/20 to-stone-900',
      borderColor: 'border-amber-400',
    };
  };

  const ledgerStage = getLedgerVisualStage();

  const handlePageInsert = () => {
    if (collectedPages < totalPages) {
      onAddPage();
      playPageFoundSFX();
    } else {
      playSpellUnlockedSFX();
    }
  };

  const bookPages = [
    {
      pageNo: 'I - II',
      title: 'The Great Unbinding (Praduga Bencana)',
      biome: 'The Whispering Scriptorium',
      unlocked: collectedPages >= 1,
      snippet: 'Di tahun ke-204 Zaman Tinta, sang Arch-Scribe merobek halaman kepedihan. Namun yang lenyap bukanlah duka, melainkan napas realitas itu sendiri...',
      ability: 'Ledger Float: Meluncur di atas arus angin panas.',
    },
    {
      pageNo: 'III - IV',
      title: 'Tides of the Iron Aqueduct',
      biome: 'Clockwork Sunken Canal',
      unlocked: collectedPages >= 6,
      snippet: 'Air dan roda gigi berputar tanpa lelah di bawah tanah. Mesin-mesin yang kehilangan tuannya tetap memompa uap hingga peradaban terendam karat...',
      ability: 'Magnetic Tether: Mengaitkan benang tinta ke cincin kuningan.',
    },
    {
      pageNo: 'V - VI',
      title: 'Symphony of the Geode Heart',
      biome: 'Prismatic Crystal Caverns',
      unlocked: collectedPages >= 12,
      snippet: 'Batu kristal bukanlah benda mati; mereka adalah gema suara-suara doa yang memadat di bawah tekanan bumi...',
      ability: 'Prism Blink: Menembus jeruji laser tipis.',
    },
    {
      pageNo: 'VII - VIII',
      title: 'Orbits of the Unseen Zodiac',
      biome: 'Phantom Observatory',
      unlocked: collectedPages >= 18,
      snippet: 'Di atas awan, menara marmer berputar mengikuti konstelasi yang telah dihapus dari peta langit biasa...',
      ability: 'Chrono-Inversion: Berjalan di langit-langit selama 3 detik.',
    },
    {
      pageNo: 'IX - X',
      title: 'The Ink of the Living Author',
      biome: 'The Abyssal Void',
      unlocked: collectedPages >= 25,
      snippet: 'Kau tidak datang untuk sekadar membaca takdir; kau datang dengan pena di tanganmu untuk menuliskan lembaran esok hari...',
      ability: 'The Final Word: Menghentikan waktu atau memahat jembatan emas.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Controls: Sub-Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/80 border border-stone-700 p-3.5 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSFX();
              setActiveTab('book');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Quest Ledger (Interactive Tome)</span>
          </button>
          <button
            onClick={() => {
              playClickSFX();
              setActiveTab('hub');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hub'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>The Grand Archive (Hub Map)</span>
          </button>
          <button
            onClick={() => {
              playClickSFX();
              setActiveTab('quests');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'quests'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>Integrated Quest Log UI</span>
          </button>
        </div>

        {/* Quick Simulator Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePageInsert}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Pulihkan Halaman (+1 Page)</span>
          </button>
          <button
            onClick={() => {
              playClickSFX();
              onResetPages();
            }}
            className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-400 text-xs rounded-lg transition-colors cursor-pointer"
            title="Reset ke 1 halaman"
          >
            Reset
          </button>
        </div>
      </div>

      {/* TAB 1: THE QUEST LEDGER (Interactive Tome Simulation) */}
      {activeTab === 'book' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Book Presentation */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              className={`bg-gradient-to-b ${ledgerStage.glowColor} border-2 ${ledgerStage.borderColor} rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500`}
            >
              {/* Stage Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-cinzel font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  {ledgerStage.stage}
                </span>
                <span className="text-xs font-mono text-stone-300 px-2.5 py-0.5 bg-stone-900/80 rounded border border-stone-700">
                  {collectedPages} / {totalPages} Halaman Pulih ({progressPercent}%)
                </span>
              </div>

              {/* Real-time Progress Bar */}
              <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800 mb-6">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* The Physical Parchment Spread */}
              <div className="bg-[#1c1511] border-4 border-[#3b2a1d] rounded-xl p-6 shadow-inner relative min-h-[300px] flex flex-col justify-between">
                {/* Book Spine Shadow in Center */}
                <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-8 -ml-4 bg-gradient-to-r from-black/40 via-black/10 to-black/40 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between border-b border-amber-900/50 pb-2 mb-4 text-xs font-mono text-amber-500/80">
                    <span>BAB {bookPages[currentPageIndex].pageNo}</span>
                    <span>{bookPages[currentPageIndex].biome}</span>
                  </div>

                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 mb-3">
                    {bookPages[currentPageIndex].title}
                  </h3>

                  {bookPages[currentPageIndex].unlocked ? (
                    <div className="space-y-4">
                      <p className="text-stone-300 text-sm font-body leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                        "{bookPages[currentPageIndex].snippet}"
                      </p>
                      <div className="bg-amber-950/40 border border-amber-800/40 rounded-lg p-3">
                        <div className="text-[11px] font-mono text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          Mantra Terbuka (Unlocked Inscription):
                        </div>
                        <div className="text-xs text-stone-200">
                          {bookPages[currentPageIndex].ability}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 text-center space-y-2">
                      <div className="text-stone-600 text-xs font-mono uppercase tracking-widest">
                        [Halaman Masih Tercecer di Biome]
                      </div>
                      <p className="text-stone-500 text-xs max-w-sm mx-auto">
                        Kumpulkan lebih banyak lembaran naskah untuk membuka teks kuno dan kemampuan baru.
                      </p>
                    </div>
                  )}
                </div>

                {/* Page Flip Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-amber-900/40 mt-6">
                  <button
                    disabled={currentPageIndex === 0}
                    onClick={() => {
                      playClickSFX();
                      setCurrentPageIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Halaman Sebelumnya</span>
                  </button>
                  <span className="text-xs font-mono text-stone-400">
                    Lembar {currentPageIndex + 1} / {bookPages.length}
                  </span>
                  <button
                    disabled={currentPageIndex === bookPages.length - 1}
                    onClick={() => {
                      playClickSFX();
                      setCurrentPageIndex((prev) => Math.min(bookPages.length - 1, prev + 1));
                    }}
                    className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Halaman Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rationale & Progression Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-900/80 border border-stone-700 rounded-xl p-5">
              <h4 className="font-cinzel text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
                <Feather className="w-4 h-4 text-amber-400" />
                Mekanik Evolusi Visual The Quest Ledger
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                Buku ini berfungsi sebagai **Diegetic Progress Bar** — alih-alih angka persentase dingin di menu, pemain melihat buku di tengah aula perpustakaan tumbuh, bercahaya, dan memancarkan efek partikel yang semakin megah.
              </p>
              <div className="text-[11px] text-stone-400 bg-stone-950 p-3 rounded-lg border border-stone-800 space-y-1.5">
                <div className="text-amber-300 font-semibold">Stage Saat Ini:</div>
                <div className="text-stone-200">{ledgerStage.desc}</div>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-5">
              <h4 className="font-cinzel text-sm font-bold text-amber-300 mb-2">
                Trigger Animasi Menemukan Halaman
              </h4>
              <ul className="text-xs text-stone-300 space-y-2 list-disc pl-4 font-body">
                <li>
                  <strong className="text-amber-200">Audio Fanfare:</strong> Menggunakan progresi arpeggio C-E-G-C-E dengan echo vintage.
                </li>
                <li>
                  <strong className="text-amber-200">Slow-motion 0.5s:</strong> Dunia melambat sesaat saat avatar mengangkat lembaran kertas emas ke atas kepala.
                </li>
                <li>
                  <strong className="text-amber-200">Tinta Mengalir:</strong> Garis tinta berkilau otomatis menggambar ilustrasi miniatur di buku saat kembali ke Hub.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE GRAND ARCHIVE HUB MAP */}
      {activeTab === 'hub' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Hub Station Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              5 Stasiun Progresi di Perpustakaan
            </h3>

            {[
              {
                id: 'orin',
                name: "Master Orin's Desk",
                title: 'The Curator Sanctuary',
                desc: 'Pemberian misi, penerjemahan naskah kuno, teh hangat penenang.',
              },
              {
                id: 'hearth',
                name: 'The Binding Hearth',
                title: 'Crafting & Upgrade Meja Penjilidan',
                desc: 'Meningkatkan kantong tinta, menjahit slot rune, memperkuat senjata.',
              },
              {
                id: 'tapestry',
                name: 'The Relic Tapestry',
                title: 'Permadani Sejarah Dunia',
                desc: 'Kain dinding yang perlahan terajut memperlihatkan kronologi peradaban.',
              },
              {
                id: 'vault',
                name: "The Scribe's Archive",
                title: 'Bestiary & Audio Vault',
                desc: 'Catatan kelemahan monster dan pemutar rekaman musik chiptune.',
              },
              {
                id: 'gateway',
                name: 'The Gateway Archway',
                title: 'Pintu Gerbang Spasial 5 Biome',
                desc: 'Portal batu bundar menuju level petualangan yang tidak terkunci.',
              },
            ].map((station) => (
              <button
                key={station.id}
                onClick={() => {
                  playClickSFX();
                  setSelectedHubStation(station.id as typeof selectedHubStation);
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedHubStation === station.id
                    ? 'bg-amber-950/40 border-amber-400 ring-1 ring-amber-400/50'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-200">{station.name}</span>
                  <span className="text-[10px] font-mono text-stone-400">{station.title}</span>
                </div>
                <p className="text-xs text-stone-400">{station.desc}</p>
              </button>
            ))}
          </div>

          {/* Hub Station Detail Showcase */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-700 rounded-2xl p-6 space-y-4">
            {selectedHubStation === 'orin' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-800/40 border border-amber-600 flex items-center justify-center text-xl text-amber-200 font-pixel">
                    🦉
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-amber-200">
                      Master Orin the Chief Archivist
                    </h3>
                    <p className="text-xs text-stone-400">Pilar Emosional & Penjaga Perpustakaan</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Berusia 68 tahun dengan bulu burung hantu putih di pelipis. Orin adalah figur ayah yang menyambut pemain setiap kali kembali dari bahaya. Di mejanya, pemain menyerahkan fragmen naskah dan mendengarkan kisah sejarah masa lalu.
                </p>
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs text-amber-300 font-mono italic leading-relaxed">
                  "Kau mencium aroma hujan di luar sana, nak? Selama lilin di perpustakaan ini masih menyala, kisah kita belum berakhir. Istirahatlah sejenak, minumlah teh chamomile ini."
                </div>
              </div>
            )}

            {selectedHubStation === 'hearth' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-900/40 border border-red-600 flex items-center justify-center text-xl text-red-200 font-pixel">
                    🔥
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-red-200">
                      The Binding Hearth (Meja Penjilidan & Crafting)
                    </h3>
                    <p className="text-xs text-stone-400">Dikelola oleh Old Barnaby & Vesper</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Menggabungkan jarum jilid emas, kulit samak, dan tetesan tinta untuk meningkatkan perlengkapan avatar tanpa grind leveling konvensional.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-amber-400 font-semibold block">Ink Flask Expansion:</span>
                    Meningkatkan kapasitas dari 100 menjadi 250 tetes tinta.
                  </div>
                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                    <span className="text-amber-400 font-semibold block">Rune Inscription Slot:</span>
                    Membuka hingga 7 slot lencana kemampuan.
                  </div>
                </div>
              </div>
            )}

            {selectedHubStation === 'tapestry' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-600 flex items-center justify-center text-xl text-purple-200 font-pixel">
                    🧵
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-purple-200">
                      The Relic Tapestry (Permadani Sejarah)
                    </h3>
                    <p className="text-xs text-stone-400">Visualisasi Progres Cerita Dunia</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Permadani berukuran 10 meter yang awalnya robek dan berlubang. Setiap kali boss dikalahkan dan 5 halaman biome terkumpul, benang emas ajaib menenun adegan bersejarah yang menjelaskan mengapa bencana terjadi.
                </p>
              </div>
            )}

            {selectedHubStation === 'vault' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-600 flex items-center justify-center text-xl text-emerald-200 font-pixel">
                    📜
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-emerald-200">
                      The Scribe's Archive (Bestiary & Vault)
                    </h3>
                    <p className="text-xs text-stone-400">Ensiklopedia Interaktif Pemain</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Menyimpan profil anatomi 15 musuh unik, catatan kelemahan serangan, dan gramofon kuno untuk mendengarkan kembali trek chiptune yang telah ditemukan.
                </p>
              </div>
            )}

            {selectedHubStation === 'gateway' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-900/40 border border-blue-600 flex items-center justify-center text-xl text-blue-200 font-pixel">
                    🌀
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-blue-200">
                      The Gateway Archway (Portal Spasial)
                    </h3>
                    <p className="text-xs text-stone-400">Akses Menuju 5 Biome Dunia</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Cincin batu monolitik yang berputar dan membuka portal tinta cair menuju Whispering Scriptorium, Clockwork Canal, Crystal Caverns, Phantom Observatory, dan The Void.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: INTEGRATED QUEST LOG UI */}
      {activeTab === 'quests' && (
        <div className="space-y-4">
          <div className="bg-stone-900/80 border border-stone-700 rounded-xl p-5">
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-1 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-400" />
              Sistem Buku Misi Terintegrasi (Diegetic Quest Log)
            </h3>
            <p className="text-xs text-stone-400">
              Menekan [TAB] di dalam game langsung membuka buku naskah ini. Terbagi atas Misi Utama (Main), Misi Penduduk (Side), dan Rumor Rahasia (Secret Marginalia).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between hover:border-amber-700/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        quest.type === 'main'
                          ? 'bg-amber-900/30 text-amber-300 border-amber-700/50'
                          : quest.type === 'side'
                          ? 'bg-blue-900/30 text-blue-300 border-blue-700/50'
                          : 'bg-purple-900/30 text-purple-300 border-purple-700/50'
                      }`}
                    >
                      {quest.type} Quest
                    </span>
                    <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      +{quest.pageReward} Lembar
                    </span>
                  </div>

                  <h4 className="font-cinzel text-sm font-bold text-stone-100 mb-1">
                    {quest.title}
                  </h4>
                  <div className="text-[11px] text-stone-400 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    {quest.location}
                  </div>

                  <p className="text-xs text-stone-300 font-body mb-3 bg-stone-950 p-2.5 rounded border border-stone-800">
                    {quest.task}
                  </p>

                  <p className="text-[11px] text-amber-400/80 italic">
                    "{quest.loreSnippet}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Status Misi:</span>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      quest.status === 'completed'
                        ? 'text-emerald-400'
                        : quest.status === 'active'
                        ? 'text-amber-300'
                        : 'text-stone-500'
                    }`}
                  >
                    {quest.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {quest.status === 'completed'
                      ? 'Selesai (Completed)'
                      : quest.status === 'active'
                      ? 'Sedang Berjalan (Active)'
                      : 'Terkunci (Locked)'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
