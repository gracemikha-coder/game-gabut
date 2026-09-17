import { BiomeLevel, GddChapter, QuestItem, WeaponDetail } from '../types';

export const WEAPONS_DATA: WeaponDetail[] = [
  {
    id: 'quill-blade',
    name: 'Runic Quill-Blade',
    type: 'Melee / Precision',
    playstyle: 'Agile close-quarters combat, swift 3-hit slashing combo, cutting tangled parchment brambles and rope bridges.',
    mobilityTag: 'Lightweight & Dash Slash',
    puzzleUtility: 'Cuts physical barriers, triggers mechanical tripwires, slices hanging weight pulleys.',
    rationale: 'Memberikan rasa kontrol langsung dan visceral bagi pemain action-adventure konvensional, sekaligus berfungsi sebagai alat pemotong lingkungan.',
    baseDamageDesc: '12 dmg per slash (3x combo) | Cepat (0.2s cooldown)'
  },
  {
    id: 'lantern-staff',
    name: 'Astral Lantern Staff',
    type: 'Mid-Range / Illuminator',
    playstyle: 'Radiant sweep attacks, reveals invisible platforms and hidden ink glyphs in shadowy corners.',
    mobilityTag: 'Defensive Barrier & Knockback',
    puzzleUtility: 'Menyinari kristal prisma, membakar jaring laba-laba tinta purba, mengaktifkan sensor solar.',
    rationale: 'Menjawab kebutuhan pemain metodis yang senang mengecek setiap sudut rahasia. Mengurangi kecemasan di area gelap tanpa membuat game terlalu mudah.',
    baseDamageDesc: '14 dmg per pulse | Area of Effect (0.35s cooldown)'
  },
  {
    id: 'spell-ledger',
    name: "Scribe's Pocket Ledger",
    type: 'Ranged / Glyph Magic',
    playstyle: 'Shoots homing ink-sigils from a safe distance; automatically retrieves floating page scraps over bottomless pits.',
    mobilityTag: 'Ranged Hover / Float Assist',
    puzzleUtility: 'Menekan tombol jarak jauh, membaca prasasti kuno dari kejauhan tanpa menyentuh jebakan.',
    rationale: 'Aksesibilitas tinggi untuk pemain yang kurang nyaman dengan pertarungan jarak dekat, dengan utilitas puzzle penarik item jarak jauh.',
    baseDamageDesc: '10 dmg per glyph (Homing 2 targets) | Stabil (0.3s cooldown)'
  },
  {
    id: 'hook-chain',
    name: 'Brass Hook-Chain',
    type: 'Utility-Combat Hybrid',
    playstyle: 'Grapples onto enemies to pull them into hazards or pulls player toward wooden anchors across wide chasms.',
    mobilityTag: 'Vertical Grapple & Tether',
    puzzleUtility: 'Menarik tuas berkarat, menyeberangi jurang tanpa lantai, meruntuhkan pilar rapuh.',
    rationale: 'Mendorong ekspresi ruang vertikal dan physics-based interaction. Pemain kreatif bisa menyelesaikan rintangan dengan cara alternatif.',
    baseDamageDesc: '16 dmg single-target latch | Menengah (0.45s cooldown)'
  }
];

export const BIOMES_DATA: BiomeLevel[] = [
  {
    id: 1,
    name: 'The Whispering Scriptorium',
    subtitle: 'Tutorial & The Forgotten Archive Wings',
    biomeType: 'Ancient Library & Dusty Sanctum',
    duration: '15 - 20 Menit',
    difficultyRating: 1,
    colorPalette: [
      { hex: '#2A1F1D', name: 'Dark Mahogany', role: 'Borders & Structural Wood' },
      { hex: '#7D5A38', name: 'Warm Oak', role: 'Main Shelves & Furniture' },
      { hex: '#D4A373', name: 'Aged Parchment', role: 'Walkable Surfaces & Flooring' },
      { hex: '#FAEDCD', name: 'Warm Candlelight', role: 'Ambient Illumination & Highlights' },
      { hex: '#E76F51', name: 'Muted Coral Red', role: 'Interactive Objects & Velvet Curtains' }
    ],
    colorPsychology: 'Kombinasi cokelat kayu hangat dan cahaya lilin keemasan memicu rasa nyaman (cozy), aman, dan misteri intelektual khas perpustakaan tua, menurunkan kecemasan pemain pemula.',
    atmosphere: 'Deretan rak buku bertingkat tinggi dengan debu partikel berkilau, angin sepoi-sepoi yang membalik halaman buku otomatis, serta lilin yang tak pernah padam.',
    newEnemies: [
      { name: 'Dust Mite Sprite', behavior: 'Melayang lambat, berhenti sejenak sebelum melompat kecil ke arah pemain.', weakness: 'Satu tebasan atau serangan proyektil sederhana.' },
      { name: 'Parchment Origami Bat', behavior: 'Mengintai di langit-langit rak buku, menukik turun saat pemain lewat.', weakness: 'Tangkisan atau langkah mundur menghindar.' }
    ],
    environmentalHazards: ['Lantai kayu lapuk yang runtuh setelah 1.5 detik dipijak', 'Tumpukan buku tinggi yang bisa digulingkan untuk membuka jalan'],
    puzzleComplexity: 'Level 1: Menekan switch lantai dengan balok buku, membaca catatan sederhana di dinding untuk urutan tuas 1-2-3.',
    pageHidingTechniques: [
      'Halaman 1: Di ujung koridor utama (wajib, mengajarkan indikator visual halaman)',
      'Halaman 2: Di atas rak tinggi yang membutuhkan lompat dari tangga buku geser',
      'Halaman 3: Di balik rak buku rahasia yang tergeser jika pemain menarik buku merah',
      'Halaman 4: Dijaga oleh mini-boss burung hantu kertas',
      'Halaman 5: Di ruang ventilasi loteng yang diakses lewat lubang ventilasi'
    ],
    boss: {
      name: 'The Paper Hoarder Owl',
      title: 'Guardian of the Forgotten Lexicon',
      phases: [
        'Fase 1: Mengepakkan sayap menciptakan hembusan angin yang mendorong pemain ke belakang sambil menjatuhkan bulu kertas tajam.',
        'Fase 2: Menukik ke tanah dan menyerap lembaran kertas menjadi tameng pelindung sementara pemain harus memukul titik punggungnya.'
      ],
      telegraphedMechanic: 'Mata burung hantu menyala oranye terang 1 detik sebelum menukik lurus.'
    },
    skillTaught: {
      name: 'Ledger Float (Gliding)',
      description: 'Membuka buku misi di udara untuk meluncur perlahan menyeberangi jurang lebar dan menangkap hembusan angin panas.',
      gatingNext: 'Dibutuhkan untuk melintasi kanal air deras di Level 2.'
    }
  },
  {
    id: 2,
    name: 'Clockwork Sunken Canal',
    subtitle: 'Hydraulic Mechanisms & Steam Aqueducts',
    biomeType: 'Subterranean Industrial Ruins',
    duration: '30 - 40 Menit',
    difficultyRating: 2,
    colorPalette: [
      { hex: '#1D2D44', name: 'Deep Aqueduct Navy', role: 'Deep Water & Background Silhouette' },
      { hex: '#3E5C76', name: 'Corroded Slate', role: 'Damp Stone Tiles & Walls' },
      { hex: '#748CAB', name: 'Misty Blue Gray', role: 'Water Mist & Ambient Steam' },
      { hex: '#D4AF37', name: 'Oxidized Brass', role: 'Gears, Pipes & Pressure Valves' },
      { hex: '#00B4D8', name: 'Hydro Luminescence', role: 'Purified Water Jets & Runes' }
    ],
    colorPsychology: 'Biru kelasi dingin berpadu dengan aksen kuningan berkarat menciptakan kontras antara kelembapan mesin tua dan ketegangan mekanis yang berdetak teratur.',
    atmosphere: 'Suara gemericik air deras, pipa uap yang mendesis dengan ritme berkala, roda gigi raksasa yang berputar lambat di dinding latar.',
    newEnemies: [
      { name: 'Steam-Powered Clank', behavior: 'Berpatroli kaku dengan tameng besi di depan, hanya rentan dari belakang saat mendinginkan uap.', weakness: 'Memancing serangan membentur dinding.' },
      { name: 'Hydro-Leaper Frogbot', behavior: 'Menyelam ke dalam air kanal dan melompat keluar menyemburkan gelembung uap bertekanan.', weakness: 'Serangan tepat saat mendarat.' }
    ],
    environmentalHazards: ['Semburan uap panas berirama (timing hazard)', 'Ketinggian air kanal yang pasang-surut saat tuas air ditarik'],
    puzzleComplexity: 'Level 2: Mengalirkan tekanan air dengan memutar 3 katup pipa untuk menggerakkan platform kincir air putar.',
    pageHidingTechniques: [
      'Halaman 1: Di dalam ruang kurungan bawah air yang airnya harus dikuras terlebih dahulu',
      'Halaman 2: Di atas platform kincir yang hanya bisa dicapai dengan Ledger Float di atas arus angin uap',
      'Halaman 3: Di balik air terjun buatan yang menyembunyikan ceruk rahasia',
      'Halaman 4: Diberikan oleh NPC penyelam mekanik setelah memperbaikkan pompanya',
      'Halaman 5: Di labirin pipa waktu (time-trial switch pintu selama 15 detik)'
    ],
    boss: {
      name: 'Mechanist Thalor',
      title: 'Automaton Chief Engineer',
      phases: [
        'Fase 1: Berada di catwalk atas sambil mengendalikan 2 tangan hidrolik yang memukul lantai secara bergantian.',
        'Fase 2: Arena tergenang air setinggi lutut, Thalor menembakkan gelombang kejut listrik yang mengharuskan pemain berdiri di atas roda gigi apung.'
      ],
      telegraphedMechanic: 'Uap tebal keluar dari cerobong kepala Thalor sesaat sebelum lengan hidrolik menghantam tanah.'
    },
    skillTaught: {
      name: 'Magnetic Ink Tether',
      description: 'Menembakkan benang tinta magnetik untuk menarik diri ke cincin logam atau menarik benda logam berat.',
      gatingNext: 'Membuka akses menyeberangi pilar kristal mengambang di Level 3.'
    }
  },
  {
    id: 3,
    name: 'Prismatic Crystal Caverns',
    subtitle: 'The Luminescent Mines of Resonant Echoes',
    biomeType: 'Subterranean Crystal Geode',
    duration: '40 - 50 Menit',
    difficultyRating: 3,
    colorPalette: [
      { hex: '#18020C', name: 'Void Obsidian', role: 'Cave Depths & Unlit Chasms' },
      { hex: '#6B2D5C', name: 'Deep Amethyst', role: 'Crystal Rock Walls' },
      { hex: '#9C4F96', name: 'Vibrant Violet', role: 'Glowing Crystal Formations' },
      { hex: '#F39237', name: 'Amber Calcite', role: 'Refracted Light Beams' },
      { hex: '#00F5D4', name: 'Neon Aquamarine', role: 'Echo Platforms & Energy Nodes' }
    ],
    colorPsychology: 'Ungu mistis berpadu cyan neon dan kuning ambar membangkitkan rasa ketakjuban (wonder) sekaligus isolasi magis di kedalaman bumi yang tak tersentuh waktu.',
    atmosphere: 'Gua megah bergaung dengan nada harmonis lembut saat kristal tersentuh partikel cahaya; jembatan kaca kristal yang tembus pandang.',
    newEnemies: [
      { name: 'Crystal Weaver Spider', behavior: 'Menembakkan jaring kristal yang memperlambat gerakan pemain 50% jika tersentuh.', weakness: 'Memantulkan sinar laser ke arahnya.' },
      { name: 'Refraction Scarab', behavior: 'Memiliki cangkang yang memantulkan serangan proyektil biasa ke arah acak.', weakness: 'Serangan jarak dekat dari sisi samping.' }
    ],
    environmentalHazards: ['Lantai kristal resonansi yang hancur jika pemain mendarat terlalu keras tanpa float', 'Laser prisma yang memotong koridor sempit'],
    puzzleComplexity: 'Level 3: Memutar cermin prisma di sudut 45 derajat untuk mengarahkan sinar cahaya ambar ke bunga kristal penerima pintu.',
    pageHidingTechniques: [
      'Halaman 1: Terjebak di dalam kristal es-amethyst besar yang harus dilelehkan dengan fokus sinar 3 prisma',
      'Halaman 2: Di pulau kristal mengambang yang hanya muncul ketika frekuensi lonceng kristal berbunyi',
      'Halaman 3: Di jurang gelap gulita yang harus disinari dengan Astral Staff / lentera',
      'Halaman 4: Di balik dinding sonik yang pecah setelah pemain mengalahkan monster terompet kristal',
      'Halaman 5: Tantangan platforming presisi menggunakan Magnetic Tether beruntun di udara'
    ],
    boss: {
      name: 'The Crystalline Echo',
      title: 'Resonant Phantom of the Deep',
      phases: [
        'Fase 1: Berwujud cermin raksasa yang menduplikasi siluet avatar pemain dan meniru serangan pemain dengan jeda 1 detik.',
        'Fase 2: Memecah diri menjadi 4 kristal melayang; pemain harus mencari kristal asli yang membiaskan cahaya berbeda.'
      ],
      telegraphedMechanic: 'Suara dengungan sonik bernada tinggi (pitch naik) sebelum menduplikasi gelombang kejut prisma.'
    },
    skillTaught: {
      name: 'Prism Blink (Spectral Dash)',
      description: 'Melakukan teleportasi singkat sejauh 3 tile melewati jeruji besi tipis, laser jebakan, dan tubuh musuh.',
      gatingNext: 'Diperlukan untuk menembus penghalang waktu di Level 4.'
    }
  },
  {
    id: 4,
    name: 'Phantom Observatory',
    subtitle: 'The Celestial Spires Above the Clouds',
    biomeType: 'Gothic Astrological Citadel',
    duration: '50 - 60 Menit',
    difficultyRating: 4,
    colorPalette: [
      { hex: '#0B091A', name: 'Cosmic Midnight', role: 'Infinite Sky & Space Voids' },
      { hex: '#201A45', name: 'Deep Astral Indigo', role: 'Observatory Towers & Marble' },
      { hex: '#583D72', name: 'Twilight Purple', role: 'Spectral Rifts & Shifting Phases' },
      { hex: '#FFE74C', name: 'Starlight Gold', role: 'Constellation Runes & Brass Armillaries' },
      { hex: '#FF5964', name: 'Supernova Crimson', role: 'Temporal Danger Zones' }
    ],
    colorPsychology: 'Indigo kosmik dipadu emas bintang dan merah supernova menghadirkan sensasi keagungan eksistensial dan bahaya vertikal yang mendebarkan di atas ketinggian atmosfer.',
    atmosphere: 'Menara marmer putih terapung di atas lautan awan malam hari, bola langit armillary berputar di kubah kaca, hujan meteorit kecil di latar belakang.',
    newEnemies: [
      { name: 'Starlight Wraith', behavior: 'Berfase antara alam fisik dan bayangan; hanya bisa diserang sesaat setelah menyerang pemain.', weakness: 'Prism Blink tepat ke arahnya saat muncul.' },
      { name: 'Chrono-Scorpion', behavior: 'Mampu memperlambat waktu lokal di sekitar pemain jika ekor pendulum jamnya berhasil menyengat tanah.', weakness: 'Menghindari zona lingkaran waktu lambat.' }
    ],
    environmentalHazards: ['Zona gravitasi terbalik (lantai menjadi langit-langit)', 'Ubin konstelasi yang menghilang bergantian sesuai ritme metronom langit'],
    puzzleComplexity: 'Level 4: Memutar peta bintang pada astrolabe raksasa untuk mencocokkan konstelasi zodiak kuno pintu gerbang.',
    pageHidingTechniques: [
      'Halaman 1: Mengambang di zona gravitasi nol di luar kubah observatorium',
      'Halaman 2: Tersembunyi di dalam bayangan teleskop raksasa yang harus disejajarkan dengan bulan sabit',
      'Halaman 3: Di ruang paradoks waktu yang mengharuskan pemain menyelesaikan puzzle bersama bayangan masa lalunya',
      'Halaman 4: Di puncak menara tertinggi yang dijaga oleh mini-boss Gargoyle Bintang',
      'Halaman 5: Di balik dinding rasi bintang rahasia yang terungkap dengan memantulkan cahaya bintang'
    ],
    boss: {
      name: 'Astral Warden Vael',
      title: 'Keeper of the Horizon Gate',
      phases: [
        'Fase 1: Melayang dengan pedang komet, memanggil hujan bintang jatuh berirama dan membalik gravitasi secara tiba-tiba.',
        'Fase 2: Membelah arena menjadi 2 orbit ruang, menuntut pemain melakukan Prism Blink bolak-balik antara platform gravitasi normal dan terbalik.'
      ],
      telegraphedMechanic: 'Cincin orbit di punggung Warden berputar kencang dan berdentang lonceng 3 kali sebelum gravitasi dibalik.'
    },
    skillTaught: {
      name: 'Chrono-Inversion (Gravity Flux)',
      description: 'Mampu membalik gravitasi pribadi selama 3 detik untuk berjalan di langit-langit atau mencapai ketinggian ekstrim.',
      gatingNext: 'Diperlukan untuk menavigasi struktur hancur tanpa gravitasi di Level 5.'
    }
  },
  {
    id: 5,
    name: 'The Abyssal Void of Forgotten Words',
    subtitle: 'The Epic Climax at the Edge of Erasure',
    biomeType: 'Fractured Surreal Netherworld',
    duration: '60 - 75 Menit',
    difficultyRating: 5,
    colorPalette: [
      { hex: '#050505', name: 'Absorptive Obsidian', role: 'The Void & Erased Realities' },
      { hex: '#1F1B24', name: 'Monochrome Ash', role: 'Ruined City Fragments & Collapsing Tiles' },
      { hex: '#8B0000', name: 'Blood Crimson Ink', role: 'Corrupted Texts & Danger Nodes' },
      { hex: '#E0E1DD', name: 'Faded Parchment White', role: 'Floating Letterforms & Safe Haven Runes' },
      { hex: '#FFD700', name: 'Primal Creation Gold', role: 'Core Ledger Pages & Sovereign Glyphs' }
    ],
    colorPsychology: 'Monokromatik hitam-abu pekat dengan ledakan kontras merah tinta terkorupsi dan emas murni menciptakan atmosfer akhir dunia (apocalyptic solemnity), menegaskan taruhan tertinggi bagi pemain.',
    atmosphere: 'Fragmen reruntuhan dari keempat level sebelumnya melayang terpecah di ruang angkasa tanpa batas; huruf-huruf alfabet kuno mengalir seperti sungai tinta di langit hampa.',
    newEnemies: [
      { name: 'Void Scribe Doppelganger', behavior: 'Meniru tampilan avatar pemain dengan jubah hitam tinta, menggunakan kombinasi ke-4 senjata.', weakness: 'Memancingnya menggunakan skill cooldown tinggi lalu counter.' },
      { name: 'Eraser Behemoth', behavior: 'Raksasa bertinta yang menghapus ubin tempat berpijak jika serangannya menyentuh lantai.', weakness: 'Membuatnya menghantam pilar rapuh penopang dirinya.' }
    ],
    environmentalHazards: ['Ubin lantai yang memudar menjadi ketiadaan jika diinjak lebih dari 1 detik', 'Badai tinta hitam yang membutakan layar sesaat'],
    puzzleComplexity: 'Level 5 (Mastery Synthesis): Menggabungkan Float + Tether + Prism Blink + Gravity Flux dalam satu rangkaian manuver 4 langkah tanpa menyentuh lantai hampa.',
    pageHidingTechniques: [
      'Halaman 1: Di atas pecahan menara observatorium yang runtuh di tengah badai gravitasi',
      'Halaman 2: Tersembunyi di dalam bait puisi kuno di mana pemain harus menginjak ubin huruf sesuai ejaan kata "ORIGIN"',
      'Halaman 3: Di balik teka-teki memori seluruh NPC yang ditemui di hub',
      'Halaman 4: Dijaga oleh perwujudan tinta dari senjata yang tidak dipilih pemain di awal',
      'Halaman 5: Di pusat pusaran hampa yang hanya bisa dicapai dengan eksekusi sempurna keempat traversal ability'
    ],
    boss: {
      name: 'The Unwritten Sovereign',
      title: 'Architect of the Blank Horizon',
      phases: [
        'Fase 1: Berwujud raksasa tinta bertopeng porselen retak, menuliskan mantra rune di langit yang jatuh seperti proyektil kaligrafi cepat.',
        'Fase 2: Arena terpecah menjadi 3 pulau melayang dengan orientasi gravitasi berbeda; pemain harus menggunakan Tether dan Blink untuk berpindah menghindari tebasan kuas raksasa.',
        'Fase 3: Mode "The Last Draft": Boss mencoba menutup The Quest Ledger secara paksa. Pemain harus memanjat tubuhnya menggunakan seluruh skill untuk menancapkan halaman terakhir ke jantungnya.'
      ],
      telegraphedMechanic: 'Kuas raksasa boss mencelupkan tinta merah tebal ke udara, meninggalkan garis kuas tebal 1.2 detik sebelum meledak menjadi duri tinta.'
    },
    skillTaught: {
      name: 'Omni-Scribe Inscription (The Final Word)',
      description: 'Kemampuan menulis ulang realitas lokal: menghentikan waktu musuh selama 4 detik atau memunculkan jembatan emas di atas jurang manapun.',
      gatingNext: 'Membuka True Ending dan Epilogue Sandbox Library.'
    }
  }
];

export const INITIAL_QUESTS: QuestItem[] = [
  {
    id: 'q1',
    title: 'The Awakening of Alexandria',
    type: 'main',
    location: 'The Library Hub',
    status: 'completed',
    pageReward: 1,
    loreSnippet: 'The Grand Ledger breathes anew. Its leather spine creaks with the weight of lost ages.',
    task: 'Bicara dengan Master Orin dan letakkan Fragmen Halaman pertama ke mimbar The Quest Ledger.'
  },
  {
    id: 'q2',
    title: 'Echoes of the Whispering Scriptorium',
    type: 'main',
    location: 'Level 1: Scriptorium',
    status: 'active',
    pageReward: 5,
    loreSnippet: 'The paper bats were once scholarly paper cranes folded by lonely apprentice scribes.',
    task: 'Kumpulkan ke-5 lembaran halaman yang tercecer di sayap arsip berdebu dan kalahkan Paper Hoarder Owl.'
  },
  {
    id: 'q3',
    title: 'Vesper’s Missing Calipers',
    type: 'side',
    location: 'Level 2: Clockwork Canal',
    status: 'active',
    pageReward: 1,
    loreSnippet: 'Precision tools forged in the subterranean foundry before the floodwaters rose.',
    task: 'Temukan jangka kuningan milik Vesper yang tenggelam di dekat kincir air turbin ketiga.'
  },
  {
    id: 'q4',
    title: 'The Silent Constellation',
    type: 'secret',
    location: 'Level 4: Phantom Observatory',
    status: 'locked',
    pageReward: 2,
    loreSnippet: 'An erased zodiac sign representing the forgotten patron saint of archivists.',
    task: 'Sejajarkan 4 teleskop di menara utara untuk menunjuk bintang mati tanpa nama.'
  }
];

export const GDD_CHAPTERS: GddChapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: '1. Identitas & Visi Game',
    subtitle: 'Core Concept, Tone, Target Platform, & Visual Influences',
    summary: 'Fondasi visi kreatif, elevator pitch, atmosfer emosional, dan pembeda unik di pasar game indie.',
    content: `
### 1.1 Elevator Pitch (Premis Cerita)
> *"Ketika sebuah bencana magis kuno merobek dan menyebarkan lembaran dari **The Quest Ledger**—buku suci yang mencatat seluruh memori dan hukum realitas dunia—sejarah mulai memudar menjadi kehampaan. Sebagai Scribe Magang terakhir di Alexandria Antiqua, pemain harus menjelajahi reruntuhan dunia yang retak untuk mengumpulkan kembali halaman-halaman yang hilang sebelum eksistensi itu sendiri terhapus dari ingatan. Setiap halaman yang kau pulihkan bukan sekadar selembar kertas, melainkan sebuah potongan realitas, mantra hidup, dan takdir yang ditulis ulang."*

### 1.2 Tone & Mood: Warm Mystery berpadu Melancholic Cozy Fantasy
- **Sensasi Emosional:** Perpaduan antara rasa nyaman yang hangat (seperti meminum teh hangat di dekat perapian perpustakaan tua saat hujan badai di luar) dengan ketegangan melankolis atas peradaban yang perlahan terlupakan.
- **Pacing Atmosfer:** Menghindari nada horor depresif; sebaliknya, dunia terasa seperti dongeng klasik yang puitis dan penuh keajaiban (*Studio Ghibli meets ancient archive*).
- **Atmosfer Ruang:** Kontras antara The Library Hub yang super-cozy dan aman, dengan biome luar yang misterius, megah, dan sarat reruntuhan nostalgia.

### 1.3 Target Platform & Implikasi Teknis
- **Platform Utama:** PC (Steam & Steam Deck Certified) dan Nintendo Switch.
  - *Rationale PC/Deck:* Pemain indie adventure sangat loyal di Steam Deck. UI dan teks harus terbaca sempurna di layar 7 inci 1280x800 tanpa squinting (ukuran font minimum 14pt setara pixel).
  - *Kontrol:* Dukungan penuh Gamepad (analog stick + face buttons) dengan responsivitas 60fps tanpa kompromi input lag.
- **Porting Fase 2:** Mobile (iOS / Android) dengan kontrol sentuh adaptif (virtual D-pad mengambang + gesture swipe untuk dash/float).
- **Resolusi Rendering Internal:** Native **320x180** (rasio 16:9 pixel-perfect integer scale ke 720p [x4], 1080p [x6], 1440p [x8], dan 4K [x12]). Menjamin tidak ada shimmering atau efek pixel-bleed di monitor modern!

### 1.4 Referensi Visual & Gameplay (The DNA Matrix)
1. **Celeste (Maddy Makes Games):**
   - *Yang Dipelajari:* Game-feel, coyote time (jump buffer 5-frame), kontrol platforming super responsif yang terasa menyenangkan hanya dengan bergerak di ruang kosong.
   - *Yang Dibedakan:* *The Quest Ledger* bukan sekadar precision platformer brutal; game ini menitikberatkan pada puzzle spasial, eksplorasi non-linear, dan manipulasi buku.
2. **Tunic (Andrew Shouldice):**
   - *Yang Dipelajari:* "The Joy of Deciphering" — sensasi menemukan halaman manual fisik yang menjelaskan mekanik tersembunyi secara organik.
   - *Yang Dibedakan:* Sudut pandang side-scrolling 2D adventure dengan pergerakan platforming yang lebih cair dan sistem kustomisasi avatar ekspresif.
3. **Eastward (Pixpil):**
   - *Yang Dipelajari:* Tata cahaya 2D pixel modern (dynamic normal maps, volumetric lighting, particle dust) yang membuat seni pixel terlihat hidup dan bernyawa.
   - *Yang Dibedakan:* Struktur level yang lebih modular dan gameplay berfokus pada "ledger pages" daripada linear narrative RPG panjang.
4. **Chicory: A Colorful Tale (Greg Lobanov):**
   - *Yang Dipelajari:* Hubungan intim pemain dengan alat kreasi (tinta, kuas, buku) sebagai bahasa interaksi dunia.
    `,
    directorNotes: 'Kunci keberhasilan indie game di era sekarang bukan grafis fotorealistis, melainkan "Tactile Coziness" dan kepuasan mekanik mikro (micro-delight). Menemukan halaman harus memicu dopamine rush layaknya membuka kartu koleksi langka!',
    keyTakeaways: [
      'Elevator pitch ringkas berpusat pada pemulihan lembaran buku realitas',
      'Tone: Warm Mystery + Melancholic Cozy Fantasy (nyaman tapi bermakna)',
      'Resolusi dasar 320x180 dengan integer scaling bebas distorsi',
      'Kombinasi Celeste game-feel + Tunic discovery + Eastward lighting'
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: '2. Tahap Awal – Avatar Customization',
    subtitle: 'Expressive Pixel Avatar System & Asymmetrical Balance',
    summary: 'Rancangan kustomisasi karakter modular efisien untuk tim indie kecil dengan dampak playstyle yang adil.',
    content: `
### 2.1 Kategori Kustomisasi & Jumlah Varian Realistis (Indie Scope)
Sebagai tim indie kecil (2-4 orang), membuat ratusan animasi sprite dari nol adalah jebakan produksi (*production trap*). Solusinya adalah **Modular Paper-Doll Sprite System** berbasis layer terpisah:
- **Base Body Canvas:** 20 x 28 pixel canvas (proporsi chibi-semi-stylized, kepala cukup besar untuk ekspresi mata).
- **Kategori & Alokasi Varian:**
  1. *Warna Kulit (Skin Tone):* 6 Palet (Porcelain, Fair, Sun-kissed, Caramel, Deep Espresso, Slate/Astral).
  2. *Gaya Rambut (Hairstyles):* 8 Model (Shaggy Explorer, Mage Ponytail, Classic Bob, Spiky Hero, Curly Afro, Scholar Bun, Ranger Braid, Bald/Hooded) x 8 Warna Rambut.
  3. *Model Pakaian / Jubah (Outfit):* 6 Model (Scribe Robes, Wanderer Tunic, Apprentice Coat, Knightly Vestment, Rogue Cloak, Royal Astrologer Cape) x 6 Palet Warna.
  4. *Aksesori Kepala/Wajah:* 6 Pilihan (Feather Quill Hat, Brass Tinker Goggles, Cozy Wanderer Scarf, Antique Satchel, Arcane Circlet, None).
  5. *Senjata / Alat Awal:* 4 Pilihan Utama (Runic Quill-Blade, Astral Lantern Staff, Scribe's Spell Ledger, Brass Hook-Chain).
  6. *Ekspresi Wajah:* 5 Varian (Determined, Inquisitive, Calm, Smirking, Gentle).

> **Hitungan Produksi:** 8 rambut + 6 baju + 6 aksesoris = hanya 20 sub-sprite terpisah! Karena warna diganti via shader palette swapping runtime, variasi total mencapai ribuan kombinasi dengan beban kerja aset art di bawah 10 hari kerja.

### 2.2 Dampak Senjata Awal terhadap Playstyle (Tanpa DPS Creep)
Prinsip desain utama: **"Asymmetric Utility, Symmetric DPS"**. Semua senjata memiliki Damage Per Second dasar yang setara (~30 DPS dalam rotasi standar), namun mengubah **cara pemain berinteraksi dengan lingkungan dan musuh**:
- **Runic Quill-Blade (Melee Combo):**
  - *Gaya Main:* Cepat, lincah, berfokus pada timing dodge dan tebasan jarak dekat.
  - *Utilitas Puzzle:* Menebas semak berduri, memotong tali jembatan gantung, menangkis proyektil musuh.
- **Astral Lantern Staff (Area & Illumination):**
  - *Gaya Main:* Kontrol area (AoE), memukul dengan dorongan angin dan gelombang kejut cahaya.
  - *Utilitas Puzzle:* Menyinari ubin tersembunyi di ruangan gelap, mengaktifkan sensor mata solar purba.
- **Scribe’s Spell Ledger (Ranged & Homing):**
  - *Gaya Main:* Menembakkan glif tinta berburu musuh secara otomatis dari jarak aman.
  - *Utilitas Puzzle:* Menekan tombol saklar dari seberang jurang, menarik kertas melayang tanpa melompat ke jurang.
- **Brass Hook-Chain (Grapple & Momentum):**
  - *Gaya Main:* Menarik musuh kecil ke arah perangkap atau menarik diri ke arah musuh besar.
  - *Utilitas Puzzle:* Menempel ke gelang besi di langit-langit untuk berayun melintasi jurang lebar.

### 2.3 Sistem Penamaan Avatar & Validasi Dialog
- **Aturan Validasi:** 2 - 14 Karakter, huruf alfabet, angka, tanda petik, dan spasi. Filter kata kasar bawaan (anti-profanity local regex).
- **Integrasi Dialog Dinamis:**
  - Token \`{PLAYER_NAME}\` disisipkan ke sistem teks dengan audio blip chiptune khusus per NPC.
  - Gelar kehormatan adaptif berdasarkan senjata awal:
    - Memilih Quill-Blade: Master Orin memanggilmu *"Sword-Scribe {Name}"*.
    - Memilih Ledger: Master Orin memanggilmu *"Archivist {Name}"*.
    - Memilih Staff: Master Orin memanggilmu *"Illuminator {Name}"*.

### 2.4 Preview Animasi Idle di Layar Kustomisasi
- Avatar di layar kustomisasi tidak berupa gambar statis, melainkan **loop animasi idle 4-frame**:
  - Frame 1: Posisi tegak netral (dada naik sedikit).
  - Frame 2: Napas masuk (pundak terangkat 1 pixel, ujung jubah berkibar halus).
  - Frame 3: Puncak tarikan napas (kedipan mata acak setiap 3-5 detik).
  - Frame 4: Napas keluar (lutut menekuk 1 pixel, senjata bergetar sedikit).
- *Rationale Psikologis:* Memperlihatkan napas dan kedipan mata segera membangun ikatan empati ("parasocial attachment") antara pemain dan avatar sebelum perjalanan dimulai.
    `,
    directorNotes: 'Jangan biarkan pemain terjebak analisis lumpuh (analysis paralysis) di awal game. Pastikan ada tombol "Randomize / Inspirasi Acak" yang menghasilkan kombinasi estetis secara instan.',
    keyTakeaways: [
      'Gunakan sistem Paper-Doll Sprite modular untuk memangkas waktu produksi 80%',
      'Keseimbangan senjata: DPS setara, utilitas spasial berbeda',
      'Validasi nama 2-14 karakter dengan gelar dinamis di dialog',
      'Preview idle 4-frame memicu koneksi emosional instan'
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: '3. Tahap Pembuka – The Library Hub',
    subtitle: 'The Grand Archive of Alexandria Antiqua as the Beating Heart',
    summary: 'Atmosfer visual perpustakaan kuno, peran sentral hub progresi, NPC penjaga, dan The Quest Ledger interaktif.',
    content: `
### 3.1 Atmosfer Visual: The Grand Archive of Alexandria Antiqua
- **Pencahayaan & Warna:** Sinar matahari sore keemasan (*god rays*) yang menembus jendela kaca patri melingkar di kubah perpustakaan. Bayangan rak buku mahoni menjulang hingga 12 meter ke langit-langit.
- **Partikel Lingkungan:** Debu partikel bercahaya mengambang lembut di udara (*golden dust motes*), halaman-halaman buku yang beterbangan perlahan di latar belakang ditiup angin sepoi-sepoi.
- **Elemen Dekoratif:** Tangga geser beroda kuningan di dinding rak, tumpukan gulungan perkamen dengan stempel lilin merah, perapian batu besar yang menyala tenang dengan kayu arang berderak, dan bola dunia falak kuno (*armillary sphere*).
- **Area Tersembunyi Awal (Nooks):**
  - Di balik tangga geser di sisi kiri, ada lorong kecil menuju balkon rahasia berisi peti perunggu dengan *50 Ink Droplets* pertama.
  - Loteng ventilasi di atas perapian yang hanya bisa diakses dengan melompat dari lampu gantung kristal.

### 3.2 Fungsi Hub sebagai Pusat Progresi (Non-Combat Sanctuary)
Hub bukan sekadar ruang tunggu, melainkan "rumah kembali" pemain setelah menjelajahi biome berbahaya:
1. **Master Orin's Desk (The Curator Desk):** Tempat menyerahkan Halaman Utama, menerima arahan naratif, dan membuka fragmen sejarah masa lalu.
2. **The Binding Hearth (Meja Penjilidan & Crafting):** Tempat mengupgrade kapasitas kantong tinta (*Ink Flask*), menjahit saku jubah untuk menyimpan relic, dan memperkuat efek senjata.
3. **The Relic Tapestry (Papan Lore & Galeri):** Karpet permadani dinding raksasa yang awalnya kusam dan robek. Setiap halaman dan relic yang ditemukan merajut benang emas baru pada permadani, memperlihatkan ilustrasi sejarah dunia secara bertahap.
4. **The Scribe's Archive (Ruang Penyimpanan / Vault):** Lemari arsip untuk meninjau kembali monster bestiary, catatan surat yang ditemukan, dan mendengarkan kembali trek musik chiptune yang telah dibuka.
5. **The Gateway Archway (Pintu Gerbang Spasial):** Gerbang lingkaran batu yang menghubungkan perpustakaan dengan 5 Biome petualangan.

### 3.3 NPC Penjaga: Master Orin the Chief Archivist
- **Visual & Karakter:** Sosok lelaki tua bungkuk dengan kacamata berlensa ganda di satu mata, jubah biru tua bertepung kapur, dan bulu burung hantu putih di pelipisnya.
- **Kepribadian:** Ramah, eksentrik, sedikit pikun soal hal-hal sepele (seperti di mana ia meletakkan kacamata keduanya), namun memiliki ingatan fotografis tajam mengenai teks-teks kuno. Nada suaranya bijak dan menenangkan (*Uncle Iroh archetype*).
- **Peran Naratif:** Penghubung emosional utama pemain. Saat pemain gagal dalam sebuah misi atau kembali dengan luka, Orin menyambut dengan seduhan teh herba dan kalimat penenang: *"Kata-kata yang terhapus bukan berarti hilang selamanya, Nak. Mereka hanya menunggu seseorang yang cukup berani untuk menuliskannya kembali."*

### 3.4 The Quest Ledger: Objek Interaktif Pusat
- **Visual Buku:** Sebuah buku bersampul kulit naga purba setinggi 2 meter yang melayang di atas mimbar marmer di tengah aula. Dihiasi ukiran kuningan dan batu permata safir di sudut-sudutnya.
- **Kondisi Awal:** Saat pertama kali ditemui, buku ini tampak rapuh, berdebu, dan hampir seluruh 25 halaman intinya hilang, menyisakan robekan kertas kasar yang memancarkan aura abu-abu padam.
- **Trigger Animasi Halaman Pertama (Cutscene):**
  - Ketika pemain menaruh halaman pertama ke atas mimbar, buku terangkat 1 meter ke udara.
  - Tinta emas berkilau merembes keluar dari punggung buku, mengalir ke lantai batu seperti urat nadi bercahaya yang menyalakan obor-obor di seluruh perpustakaan.
  - Suara akor piano-chiptune berpadu harmonik lonceng kristal menggelegar lembut.
- **Evolusi Fisik Buku Sepanjang Game:**
  - *0-5 Halaman:* Buku tampak tua dan rapuh.
  - *6-15 Halaman:* Muncul jilidan benang sutra emas di punggung buku, memancarkan partikel cahaya hangat.
  - *16-24 Halaman:* Halaman-halaman buku mulai berputar otomatis di udara, menampilkan miniatur hologram 3D dari biome yang dipulihkan.
  - *25 Halaman (100%):* Buku memancarkan pilar cahaya surgawi dan membuka pintu rahasia di bawah mimbar menuju Ending Ruang Pencipta (*The Author's Study*).
- **Quest Log UI Terintegrasi:** Menekan tombol [TAB / Select] tidak membuka menu pause generic, melainkan membuka tampilan buku *The Quest Ledger* langsung di layar pemain dengan efek membalik halaman kertas realistis (*parchment page flip*).
    `,
    directorNotes: 'The Hub adalah jangkar emosi. Semakin kontras rasa aman di Hub dengan bahaya di level luar, semakin kuat kerinduan pemain untuk kembali dan beristirahat.',
    keyTakeaways: [
      'Visual warm lighting + floating dust motes menciptakan atmosfer cozy',
      'Hub berisi 5 stasiun progresi: Orin, Hearth Crafting, Tapestry, Vault, Gateway',
      'Master Orin sebagai figur ayah/mentor yang hangat dan suportif',
      'The Quest Ledger berevolusi secara fisik seiring bertambahnya halaman'
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: '4. Mekanik Misi Inti – Missing Pages',
    subtitle: 'Narrative Origin, Reward Loops, Anti-Frustration, & Completionist Economy',
    summary: 'Latar belakang Robeknya Realitas, 3-tier reward sistem, metode penyembunyian variatif, dan mekanisme petunjuk.',
    content: `
### 4.1 Latar Belakang Naratif: "The Great Unbinding"
Dunia The Quest Ledger tidak hancur oleh perang atau meteorit, melainkan oleh **"The Great Unbinding" (Bencana Penghapusan Naskah)**.
Dua ratus tahun yang lalu, seorang Arch-Scribe terobsesi untuk menghapus segala bentuk penderitaan, kesedihan, dan perang dari lembaran sejarah. Ia menggunakan pena terlarang (*The Stylus of Oblivion*) untuk merobek paksa bab-bab kelam dari The Quest Ledger.
Namun, realitas menolak ketidaksempurnaan ini: ketika kesedihan dihapus, kebahagiaan pun kehilangan maknanya. Dunia terfragmentasi menjadi 5 kepulauan terapung yang terjebak dalam lingkaran waktu membusuk (*stagnant temporal rifts*), dan halaman-halaman yang dirobek berubah menjadi entitas liar yang terpencar di penjuru dunia.

### 4.2 Sistem Hadiah Bertingkat (3-Tier Reward System)
Menemukan selembar halaman tidak boleh hanya memberikan angka persentase kosong. Setiap halaman memberikan kombinasi 3 lapis kepuasan:
1. **Tier 1: Lore Fragment & Visual Vignette (Naratif):**
   - Mengungkapkan 1 paragraf tulisan tangan puitis tentang masa lalu area tersebut dan ilustrasi sketsa monokrom yang hidup di halaman buku.
2. **Tier 2: Gameplay Ability / Rune Inscription (Mekanik):**
   - Halaman tertentu (biasanya halaman ke-2 dan ke-4 di setiap level) memberikan mantra aktif atau passive perk (misal: *Stamina Recovery +20%*, *Ledger Float*, *Magnetic Tether*).
3. **Tier 3: World Gateway & Hub Enrichment (Progresi):**
   - Mengumpulkan batas minimum halaman (3 dari 5 halaman per level) membuka segel gerbang menuju level berikutnya dan membuka dialog baru pada NPC di perpustakaan.

### 4.3 Variasi Metode Menyembunyikan Halaman (Mencegah Kejenuhan)
Agar pemain tidak merasa seperti buruh pencari item (*fetch-quest fatigue*), setiap level menyembunyikan 5 halamannya dengan arketipe berbeda:
- **Tipe A - The Obvious Milestone (Halaman 1):** Diletakkan di jalur utama di pertengahan level sebagai penanda checkpoint alami dan dorongan semangat.
- **Tipe B - The Environmental Puzzle (Halaman 2):** Terkunci di balik puzzle mekanik bertahap (contoh: mengarahkan cermin prisma atau menguras air kanal).
- **Tipe C - The Sentinel Encounter (Halaman 3):** Dijaga oleh mini-boss unik atau gelombang musuh eliter dalam ruang arena tertutup.
- **Tipe D - The NPC Gratitude (Halaman 4):** Hadiah dari pengelana atau roh yang tersesat setelah pemain menyelesaikan masalah emosional mereka (side-quest kecil).
- **Tipe E - The Traversal Mastery / Secret Nook (Halaman 5):** Disembunyikan di ruang rahasia di balik dinding retak atau menuntut rangkaian manuver platforming presisi tinggi.

### 4.4 Sistem Petunjuk Ramah (Anti-Frustration Mechanisms)
Rasa frustrasi adalah pembunuh utama game eksplorasi. Tiga lapis bantuan diimplementasikan tanpa merusak keseruan mencari (*spoilers*):
1. **The Lumen Moth Companion:** Seekor ngengat cahaya kecil yang tinggal di lentera pemain. Jika pemain berada di satu sub-ruangan selama lebih dari 90 detik tanpa progres, ngengat akan terbang perlahan menuju arah umum rahasia terdekat dan berkicau lembut. (Bisa dimatikan di opsi assist).
2. **Audio Acoustic Proximity:** Suara lonceng angin beresonansi halus (*1200Hz wind chime shimmer*) yang semakin nyaring saat pemain berada dalam radius 6 tile dari halaman tersembunyi.
3. **Purchasable Parchment Rubbings di Hub:** Pemain bisa menukar tinta dengan sketsa denah kasar dari Master Orin yang menandai siluet ruangan tempat halaman terakhir berada.

### 4.5 Alokasi Halaman & Desain Replayability (25 Halaman Inti + 10 Marginalia)
- **Total Halaman Inti:** 5 Biome x 5 Halaman = **25 Halaman Utama**.
  - *Casual Path:* Cukup 15 Halaman (3 per level) untuk mencapai boss akhir.
  - *Completionist Path (100%):* 25 Halaman Utama membuka True Final Boss dan True Ending.
- **10 Hidden Marginalia (Catatan Pinggir Rahasia):** Halaman ekstra berukuran kecil untuk speedrunner dan hardcore hunter yang membuka kosmetik avatar eksklusif (jubah berkilau, pena emas).
    `,
    directorNotes: 'Desain puzzle terbaik selalu memberi pemain momen "Aha!" bukan "Ugh, akhirnya selesai". Petunjuk audio halus jauh lebih elegan daripada tanda panah HUD besar yang merusak imersi visual pixel art.',
    keyTakeaways: [
      'Latar belakang The Great Unbinding: penghapusan memori kelam yang merusak realitas',
      'Setiap halaman memberi 3 lapis reward: Lore, Ability, dan World Gateway',
      '5 metode sembunyi per level: Main path, Puzzle, Mini-boss, NPC, Secret nook',
      'Lumen Moth + Audio 1200Hz shimmer mencegah frustrasi pemain'
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: '5. Desain Level & Eskalasi Kesulitan',
    subtitle: '5 Core Biomes, Pacing Curves, Fair Checkpoints, & Universal Accessibility',
    summary: 'Rancangan mendalam 5 biome dari tutorial hingga klimaks, kurva kesulitan bergigi gergaji, dan sistem aksesibilitas.',
    content: `
### 5.1 Rincian 5 Level Utama (Spesifikasi Komprehensif)

#### Level 1: The Whispering Scriptorium (Tutorial & Pengenalan)
- **Tema & Biome:** Perpustakaan kuno yang runtuh sebagian, jembatan rak buku kayu, lorong berdebu diterangi lilin.
- **Musuh Baru:** Dust Mite Sprite (melayang pasif, melatih tebasan dasar) & Parchment Origami Bat (menukik vertikal, melatih refleks mundur).
- **Rintangan:** Lantai rapuh yang patah setelah 1.5 detik; tumpukan gulungan perkamen yang menggelinding.
- **Skill Gating Diterapkan:** Mempelajari **Ledger Float (Gliding)** setelah mengalahkan *Paper Hoarder Owl*, yang langsung digunakan untuk meluncur melewati jurang raksasa di akhir level.
- **Durasi Rata-rata:** 15 - 20 Menit.

#### Level 2: Clockwork Sunken Canal (Progresi Awal - Air & Mesin)
- **Tema & Biome:** Terowongan kanal hidrolik bawah tanah dengan pipa kuningan berkarat, roda gigi raksasa, dan air pasang-surut.
- **Musuh Baru:** Steam-Powered Clank (musuh berperisai depan, harus diserang dari belakang) & Hydro-Leaper Frogbot (melompat dari air dengan tembakan uap).
- **Rintangan:** Katup uap panas bertekanan berirama; permukaan air yang naik saat tuas hidrolik ditarik.
- **Skill Gating Diterapkan:** Mempelajari **Magnetic Ink Tether** dari boss *Mechanist Thalor*, memungkinkan pemain berayun di gelang besi magnetik.
- **Durasi Rata-rata:** 30 - 40 Menit.

#### Level 3: Prismatic Crystal Caverns (Progresi Tengah - Cahaya & Resonansi)
- **Tema & Biome:** Geode bawah tanah ungu dan pirus menyala dengan kristal raksasa yang membiaskan sinar laser.
- **Musuh Baru:** Crystal Weaver Spider (jaring pelambat gerakan) & Refraction Scarab (memantulkan proyektil kembali ke pemain).
- **Rintangan:** Balok laser pemotong yang harus dipantulkan dengan cermin prisma 45 derajat; ubin kristal rapuh sonik.
- **Skill Gating Diterapkan:** Mengalahkan *The Crystalline Echo* menghadiahkan **Prism Blink (Spectral Dash)** untuk menembus jeruji laser tipis.
- **Durasi Rata-rata:** 40 - 50 Menit.

#### Level 4: Phantom Observatory (Progresi Akhir - Gravitasi & Waktu)
- **Tema & Biome:** Menara marmer melayang di atas awan malam kosmik dengan astrolabe raksasa dan lingkaran rasi bintang.
- **Musuh Baru:** Starlight Wraith (berpindah dimensi bayangan) & Chrono-Scorpion (menembakkan lingkaran waktu lambat).
- **Rintangan:** Pelat lantai konstelasi berkedip ritmis; anomali gravitasi terbalik di mana pemain berjalan di langit-langit.
- **Skill Gating Diterapkan:** Mempelajari **Chrono-Inversion (Gravity Flux)** setelah menundukkan *Astral Warden Vael*.
- **Durasi Rata-rata:** 50 - 60 Menit.

#### Level 5: The Abyssal Void of Forgotten Words (Klimaks - Hardcore Mastery)
- **Tema & Biome:** Dimensi hampa monokromatik di mana pecahan arsitektur dari 4 biome sebelumnya melayang di atas kehampaan hitam dan sungai tinta merah.
- **Musuh Baru:** Void Scribe Doppelganger (meniru senjata pemain) & Eraser Behemoth (menghancurkan pijakan lantai secara permanen).
- **Rintangan:** Runtuhnya pijakan waktu-nyata, badai angin tinta kebutaan, platform gravitasi yang berotasi terus menerus.
- **Puzzle & Boss:** Menyatukan Float + Tether + Blink + Gravity Flux dalam satu rantai kombinasi tanpa menyentuh lantai hampa untuk mengalahkan *The Unwritten Sovereign*.
- **Durasi Rata-rata:** 60 - 75 Menit.

### 5.2 Kurva Kesulitan: "The Sawtooth Pacing Model" (Bukan Garis Lurus Naik)
Secara psikologis, kurva kesulitan yang naik terus-menerus membuat pemain kelelahan (*cognitive fatigue*). *The Quest Ledger* menerapkan pola **Gigi Gergaji (Sawtooth with Breather Moments)**:
- Setiap level dimulai dengan ketegangan sedang (eksplorasi santai), naik ke ketegangan tinggi saat puzzle rumit dan boss fight, lalu **turun drastis ke titik nol saat kembali ke The Library Hub**.
- Di Hub, musik melambat, tidak ada ancaman mati, pemain berbincang santai dengan Master Orin, mengorganisir inventory, dan menikmati "Breather Moment" sebelum melangkah ke gerbang berikutnya.

### 5.3 Desain Checkpoint & Save System yang Adil
- **Bookmark Totems (Pilar Pembatas Buku):** Patung meja kecil dengan pita pembatas buku merah bercahaya. Berfungsi sebagai autosave instan setiap kali pemain lewat.
- **Zero-Friction Respawn:** Saat jatuh ke duri atau jurang, pemain tidak melihat layar "Game Over" berdurasi 10 detik. Layar hanya berkedip hitam selama **0.3 detik** dan pemain langsung muncul di ubin aman terakhir (*Celeste philosophy*). Menghilangkan rasa frustrasi menunggu loading.

### 5.4 Fitur Aksesibilitas Terintegrasi (Assist Mode)
Game yang menantang harus tetap inklusif bagi semua kalangan:
- **Game Speed Slider:** Dapat disesuaikan dari 70% hingga 100% untuk pemain dengan keterbatasan motorik.
- **Infinite Gliding / Hover Toggle:** Opsi melayang tanpa batas untuk mempermudah platforming jurang.
- **Invincibility Option (Story Mode):** Karakter tidak bisa mati oleh serangan musuh, membiarkan pemain menikmati narasi dan puzzle.
- **Full Controller & Keyboard Remapping:** Mendukung konfigurasi satu tangan (*single-handed controller layouts*).
    `,
    directorNotes: 'Tingkat kesulitan tinggi tidak boleh berasal dari kontrol yang licin atau kamera yang buruk. Jika pemain mati, mereka harus langsung sadar: "Itu kesalahanku, dan aku tahu cara memperbaikinya di percobaan berikutnya".',
    keyTakeaways: [
      '5 Biome unik dengan durasi total 3.5 - 4.5 jam kampanye inti',
      'Sawtooth pacing dengan The Library Hub sebagai Breather Moment wajib',
      'Respawn instan 0.3 detik tanpa layar loading menghapus rasa jengkel',
      'Assist Mode lengkap (speed slider, glide toggle, controller remapping)'
    ]
  },
  {
    id: 'ch6',
    number: 6,
    title: '6. Narasi & Dunia (Lore)',
    subtitle: 'Chrono-Scribes, Supporting Cast, Intertwined Quests, & Branching Endings',
    summary: 'Mitos purba ordo pencatat waktu, 3 NPC sentral, keterkaitan side-quest, dan 3 variasi ending berdasarkan koleksi halaman.',
    content: `
### 6.1 Sejarah Dunia: Ordo Chrono-Scribes & Tinta Penciptaan
Sebelum waktu memiliki nama, para **Primordial Scribes** memahat dunia menggunakan *The Ink of Light*. Mereka mendirikan **Alexandria Antiqua**, sebuah perpustakaan raksasa yang berada di luar batas ruang fisik untuk mengarsipkan setiap kelahiran bintang, kejayaan kerajaan, dan kisah cinta fana.
Namun, catatan mereka menyimpan paradoks: sejarah penuh dengan air mata. Saat sang Arch-Scribe ke-9 mencoba menyunting paksa bagian-bagian tragis, lembaran buku memberontak. Tinta yang terkutuk tumpah menjadi *The Void*, menenggelamkan peradaban dan mengubah para penjaga buku menjadi monster penjaga halaman yang tersiksa.

### 6.2 Karakter Pendukung (Supporting Cast)
1. **Vesper the Nomad Tinker (Rubah Antropomorfik Bersenjata Tang):**
   - *Kepribadian:* Sinis, praktis, berbicara cepat, namun diam-diam berhati emas.
   - *Motivasi:* Mengumpulkan kembali komponen jam kuno keluarganya yang tenggelam di Level 2.
   - *Peran Plot:* Menyediakan upgrade mechanical hook dan modifikasi senjata di Hub.
2. **Lyra the Swift Aviator (Burung Walet Pustakawan Muda):**
   - *Kepribadian:* Ceria, hiperaktif, selalu bersemangat menemukan rute jalan pintas baru.
   - *Motivasi:* Ingin menjadi orang pertama yang memetakan seluruh pecahan dunia yang melayang.
   - *Peran Plot:* Menjual sketsa peta ruangan rahasia dan memberikan tantangan *Time-Trial Scribe* opsional.
3. **Old Barnaby the Bookbinder (Kura-kura Raksasa Berjenggot Lumut):**
   - *Kepribadian:* Berbicara sangat lambat, bijaksana, mencintai aroma kertas tua dan kulit samak.
   - *Motivasi:* Menjaga keutuhan fisik jilidan buku agar tidak hancur oleh kelembapan hampa.
   - *Peran Plot:* Membuka slot rune tambahan pada avatar setiap kali pemain membawa benang emas jilid.

### 6.3 Integrasi Cerita Utama & Side-Quest yang Organik
- Side-quest di *The Quest Ledger* bukan sekadar "bunuh 10 kelelawar". Setiap side-quest adalah **rekonstruksi cerita mini** (*vignette narrative*).
- Contoh: Menemukan kacamata rusak di Level 3 bukan sekadar memungut sampah, melainkan mengungkap kisah cinta tragis antara dua ilmuwan kristal yang terpisah saat The Great Unbinding. Menyelesaikan quest ini membuat hantu kedua ilmuwan beristirahat dengan damai di taman perpustakaan.

### 6.4 Tiga Cabang Ending (Branching Endings)
1. **Ending A: "The Fractured Codex" (Pengumpulan Halaman <60% [0-14 Halaman]):**
   - Pemain mengalahkan boss akhir tetapi tidak memiliki cukup halaman untuk menstabilkan realitas.
   - *Konsekuensi:* Dunia terselamatkan dari kehampaan total, tetapi tetap terfragmentasi menjadi pulau-pulau terpisah. Orin menatap cakrawala dengan senyum melankolis: *"Kita menyelamatkan apa yang kita bisa, Nak... dan itu sudah cukup."*
2. **Ending B: "The Restored Canon" (Pengumpulan Halaman 60% - 99% [15-24 Halaman]):**
   - The Quest Ledger tertutup rapat dengan selamat. Kelima pulau kembali menyatu menjadi satu benua utuh.
   - *Konsekuensi:* Sejarah dipulihkan seperti sedia kala. Pemain diangkat menjadi *Master Scribe of Alexandria*, dan perpustakaan kembali ramai dikunjungi generasi baru para pembaca.
3. **Ending C: "The Living Author" (True Ending - 100% [25 Halaman Inti + 10 Marginalia]):**
   - Halaman terakhir yang dimasukkan bukan hanya memulihkan masa lalu, melainkan memberikan pemain *The Golden Quill of Creation*.
   - *Konsekuensi:* Terungkap bahwa avatar pemain bukanlah orang luar, melainkan manifestasi jiwa dari Arch-Scribe masa lalu yang bereinkarnasi untuk memaafkan dirinya sendiri. Pemain melangkah melewati buku dan memasuki "The Author's Study"—sebuah ruang meta-kreator di mana pemain dapat merancang bait bab baru untuk masa depan dunia yang bebas dari takdir yang terkunci.
    `,
    directorNotes: 'Ending 100% harus terasa sakral dan memuaskan. Mengungkap bahwa pemain sedang memaafkan masa lalu dirinya sendiri memberikan resolusi emosional mendalam bagi perjalanan melankolis ini.',
    keyTakeaways: [
      'Lore The Ink of Light vs The Void tumpahan tinta terlarang',
      '3 NPC kaya karakter: Vesper sang mekanik, Lyra sang kartografer, Barnaby si penjilid',
      'Side-quest bercerita tentang memulihkan memori personal para penghuni',
      '3 Ending dinamis: The Fractured Codex, The Restored Canon, dan The Living Author'
    ]
  },
  {
    id: 'ch7',
    number: 7,
    title: '7. Estetika Pixel Art & Audio',
    subtitle: 'Hex Palettes, 320x180 Architecture, Chiptune-Acoustic Fusion, & Animation Polish',
    summary: 'Spesifikasi teknis palet warna per level, resolusi tile 16x16 vs karakter, komposisi musik hybrid, dan prinsip animasi.',
    content: `
### 7.1 Rekomendasi Palet Warna & Psikologi Hex Per Biome
- **The Library Hub (Cozy Amber):**
  - \`#1C130E\` (Dark Mahogany), \`#4D311E\` (Old Walnut), \`#C8963E\` (Amber Candlelight), \`#F0DFC0\` (Aged Parchment), \`#933A2C\` (Burgundy Velvet).
  - *Psikologi:* Memberikan rasa aman, nostalgia, dan suhu hangat 2700K.
- **Level 1 Scriptorium (Dusty Ochre):**
  - \`#2A1F1D\`, \`#7D5A38\`, \`#D4A373\`, \`#FAEDCD\`, \`#E76F51\`.
  - *Psikologi:* Meredakan ketakutan awal; transisi lembut dari Hub menuju petualangan.
- **Level 2 Canal (Damp Brass):**
  - \`#1D2D44\`, \`#3E5C76\`, \`#748CAB\`, \`#D4AF37\`, \`#00B4D8\`.
  - *Psikologi:* Dingin, berlumut, kontras antara air yang menenggelamkan dan kuningan yang menyala.
- **Level 3 Cavern (Mystic Geode):**
  - \`#18020C\`, \`#6B2D5C\`, \`#9C4F96\`, \`#F39237\`, \`#00F5D4\`.
  - *Psikologi:* Magis, tak terduga, kontras warna komplementer ungu vs kuning memikat mata.
- **Level 4 Observatory (Cosmic Twilight):**
  - \`#0B091A\`, \`#201A45\`, \`#583D72\`, \`#FFE74C\`, \`#FF5964\`.
  - *Psikologi:* Keluasan semesta tak bertepi, ketegangan vertikal di ketinggian ekstrem.
- **Level 5 Void (Abyssal High-Contrast):**
  - \`#050505\`, \`#1F1B24\`, \`#8B0000\`, \`#E0E1DD\`, \`#FFD700\`.
  - *Psikologi:* Bahaya eksistensial mutlak, ketegangan puncak menjelang pemulihan dunia.

### 7.2 Resolusi Tile & Gaya Pixel Art (Teknikal & Trade-Off)
- **Base Canvas:** **320 x 180** pixel.
  - *Mengapa bukan 160x90 (Game Boy)?* Terlalu sempit untuk menampilkan keindahan arsitektur perpustakaan megah dan teks dialog.
  - *Mengapa bukan 640x360?* Jumlah pixel 4x lipat lebih banyak, akan membuat tim kecil kewalahan menganimasi sprite. 320x180 adalah sweet spot (*Celeste, Shovel Knight*).
- **Ukuran Grid Lingkungan (Tile Size):** **16 x 16** pixel.
  - Sangat cepat diproduksi untuk tileset lantai, dinding, dan dekorasi modular.
- **Ukuran Karakter (Sprite Size):** **20 x 28** pixel bounding box.
  - Sedikit lebih tinggi dari 16px tile untuk memberikan proporsi ekspresi mata, jubah berkibar, dan siluet senjata yang jelas saat beraksi.

### 7.3 Arah Musik & Sound Design: "Chiptune-Acoustic Hybrid"
Alih-alih chiptune 8-bit murni yang kadang menusuk telinga di frekuensi tinggi, aransemen menggunakan pendekatan **Hybrid Neo-Retro** (*referensi: Disasterpeace di FEZ / Lena Raine di Celeste*):
- **Perpustakaan:** Gelombang segitiga (*triangle wave*) Game Boy lembut berpadu rekaman petikan gitar akustik nilon dan cello hangat bertempo 72 BPM yang menenangkan.
- **Level Awal:** Melodi square wave ceria berpadu marimba dan seruling kayu (*playful exploration*).
- **Level Pertengahan:** Penambahan arpeggiator cepat, sync lead, dan ketukan drum perkusi lo-fi yang menaikkan tensi detak jantung.
- **Level Akhir:** Sintesis chiptune FM gelap yang berpadu dengan pad paduan suara dramatis (*choral pads*) dan bas synthesizer analog tebal.
- **Sound Effect Kunci (The Dopamine Formula):**
  - *Menemukan Halaman:* Akor menaik Pentatonik Mayor (C5 -> E5 -> G5 -> C6 -> E6) pada square-wave dengan echo 300ms dan taburan sparkle triangle 2400Hz. Suara ini diuji memberikan rasa pencapaian (*triumph*) instan!
  - *Membalik Halaman:* Suara desiran kertas perkamen renyah (*foley paper flutter*) dipadukan dengan denting kristal lembut.

### 7.4 Konsistensi Animasi Karakter & Musuh
- **Frame Rate Animasi:** 8 - 12 fps di dalam engine yang berjalan pada 60 fps fisik.
- **Animasi Inti Avatar:**
  - *Idle:* 4 frames (siklus napas).
  - *Run:* 6 frames (siklus langkah kaki dengan heel-strike jelas).
  - *Jump / Fall:* 3 frames (anticipation -> upward peak -> cape flutter descent).
  - *Attack:* 4 frames (1 frame anticipation, 1 frame impact smear frame, 2 frames recovery).
- **Smear Frames:** Menggunakan teknik pixel smear di mana tebasan pedang memanjang membentuk kurva buram setengah transparan untuk mensimulasikan kecepatan tanpa menambah frame berlebih.
    `,
    directorNotes: 'Musik bukan sekadar latar belakang, melainkan instrumen naratif kedua. Saat pemain berada di dekat halaman rahasia, track musik secara halus mematikan drum dan menyisakan arpeggio harpa tunggal.',
    keyTakeaways: [
      'Hex palet spesifik untuk Hub dan ke-5 Biome dengan psikologi warna terukur',
      'Canvas 320x180 dengan tileset 16x16 dan sprite karakter 20x28',
      'Musik Hybrid Chiptune + Akustik Cello/Marimba ala Celeste & FEZ',
      'SFX Halaman mengadopsi akor Pentatonik Mayor C-E-G-C-E dengan echo sparkle'
    ]
  },
  {
    id: 'ch8',
    number: 8,
    title: '8. Sistem Pendukung Tambahan',
    subtitle: 'Manuscript Inscriptions, Pocket Satchel, Replayability, & Indie Production Roadmap',
    summary: 'Progresi tanpa angka leveling membosankan, manajemen kantong tinta, New Game+, dan timeline produksi 14-16 bulan.',
    content: `
### 8.1 Sistem Progresi Karakter: "The Manuscript Inscription System"
Menghindari sistem *Level 1 -> Level 99* dan *Grinding Stat* numerik yang membosankan dan merusak pacing petualangan. Sebagai gantinya, game menggunakan sistem **Inscription Slots (Slot Prasasti Buku)**:
- Avatar memiliki miniatur buku saku dengan **3 hingga 7 Slot Glif** (dibuka seiring menemukan relic jilidan Barnaby).
- Pemain memasang glif yang ditemukan di dunia:
  - *Glif Sayap Angin:* Mempercepat laju Ledger Float sebesar 35%.
  - *Glif Tinta Magnet:* Menarik tetesan tinta dan koin dari jarak 4 tile.
  - *Glif Pena Berbisa:* Serangan senjata meninggalkan jejak tinta korosif pada musuh.
- *Rationale Desain:* Fleksibel dan modular layaknya sistem Badge di *Paper Mario* atau Charm di *Hollow Knight*. Pemain bisa mengganti build kapan saja di dekat Bookmark Totem tanpa terkena penalti stat.

### 8.2 Inventory & Item Management: "The Pocket Satchel"
- **Grid Ringkas:** 8 Slot Penyimpanan Aktif yang dapat diakses dengan Radial Menu instan [L1 / Q].
- **Mata Uang Tunggal - Ink Droplets (Tetesan Tinta):**
  - Berfungsi ganda: sebagai amunisi sihir tertentu DAN mata uang perdagangan dengan Vesper/Orin.
  - Mengharuskan pemain membuat keputusan taktis: *"Apakah aku menghabiskan tinta ini untuk menembak musuh dari jauh, atau menyimpannya untuk membeli upgrade peta di Hub?"*
- **Kolektibel Khusus:** Halaman Ledger langsung tersimpan di The Quest Ledger, tidak memakan slot satchel barang biasa.

### 8.3 Elemen Replayability & Nilai Main Ulang
1. **Scribe Speedrun Mode (Unlocks after 1st Completion):**
   - Menghilangkan cutscene dialog secara otomatis, menampilkan in-game timer terintegrasi (IGT) dengan split per biome, dan papan peringkat lokal/global.
2. **New Game+ ("The Pen of Obsidian"):**
   - Memulai kembali cerita dengan seluruh kemampuan traversal terbuka, tetapi musuh memiliki pola serangan baru dan tata letak puzzle dimodifikasi (*Master Quest style*).
3. **The Lost Marginalia Collection (10 Halaman Rahasia):**
   - Menghubungkan pemain dengan tantangan platforming ekstrim opsional di luar peta utama (*B-Sides style*).

### 8.4 Estimasi Scope & Timeline Produksi Realistis (Tim 3 Orang)
- **Komposisi Tim:**
  - 1 Lead Game Designer & Pixel Artist (Karakter, Tileset, UI)
  - 1 Lead Gameplay & Physics Programmer (Movement, Puzzle, Tooling)
  - 1 Sound Designer / Chiptune Composer & Narrative Writer (Audio, Dialog, Lore)
- **Total Durasi:** **14 - 16 Bulan** (Full-Time):
  - *Bulan 1 - 2 (Pre-Production):* Finalisasi GDD, prototipe gerakan dasar karakter di Unity/Godot, greyboxing Level 1.
  - *Bulan 3 - 4 (Vertical Slice):* Level 1 + The Library Hub selesai 100% dengan art dan audio final. Uji playtesting publik pertama.
  - *Bulan 5 - 9 (Production Phase 1):* Pengerjaan Level 2 dan 3, implementasi seluruh 4 senjata dan sistem Inscription.
  - *Bulan 10 - 12 (Production Phase 2):* Pengerjaan Level 4 dan 5, 5 boss fights, dan integrasi branching endings.
  - *Bulan 13 - 14 (Alpha & Polish):* Balancing tingkat kesulitan, implementasi assist mode, optimasi Steam Deck 60fps konstan.
  - *Bulan 15 - 16 (Beta, QA & Launch):* Bug fixing intensif, lokalisasi teks (Inggris & Indonesia), perilisan demo Steam Next Fest, dan peluncuran resmi.
    `,
    directorNotes: 'Kunci bertahan hidup tim indie adalah "Scope Discipline". Memotong fitur yang setengah matang lebih mulia daripada merilis game dengan 20 mekanik yang tidak ada yang dipoles sempurna.',
    keyTakeaways: [
      'Progresi modular Glif Inscription (seperti Charm Hollow Knight) menggantikan level grinding',
      'Mata uang Tetesan Tinta berdwifungsi sebagai uang dan amunisi sihir',
      'Replayability: Speedrun Mode resmi, New Game+ Pen of Obsidian, 10 Marginalia',
      'Timeline 14-16 bulan untuk tim beranggotakan 3 orang menuju rilis komersial'
    ]
  }
];
