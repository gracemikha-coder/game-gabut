export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cashier Sim: Supermarket Story</title>
  <!-- Google Fonts: Baloo 2 & Poppins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Three.js & OrbitControls from CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #fdf2f8;
      font-family: 'Poppins', sans-serif;
    }
    #game-container {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #111827;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      cursor: grab;
    }
    canvas:active {
      cursor: grabbing;
    }
    .screen {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      transition: opacity 0.3s ease;
      z-index: 10;
    }
    .hidden {
      display: none !important;
    }

    /* 1. MAIN MENU OVERLAY */
    #menu-screen {
      pointer-events: none;
      background: transparent;
      justify-content: flex-end;
      padding-bottom: 40px;
    }
    .menu-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: auto;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(8px);
      padding: 20px 36px;
      border-radius: 28px;
      border: 3px solid #fbcfe8;
      box-shadow: 0 16px 36px rgba(0,0,0,0.25);
      animation: floatBadge 4s ease-in-out infinite alternate;
    }
    @keyframes floatBadge {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-8px); }
    }
    .game-logo {
      font-family: 'Baloo 2', cursive;
      font-size: clamp(32px, 5.5vw, 56px);
      font-weight: 800;
      color: #be185d;
      text-shadow: 0 2px 0 #fbcfe8;
      line-height: 1.1;
      text-align: center;
    }
    .game-subtitle {
      font-size: clamp(12px, 1.8vw, 15px);
      font-weight: 600;
      color: #9d174d;
      margin: 4px 0 16px 0;
      background: #fdf2f8;
      padding: 4px 18px;
      border-radius: 999px;
      border: 1px solid #fbcfe8;
    }
    .btn-play {
      font-family: 'Baloo 2', cursive;
      background: linear-gradient(135deg, #f43f5e, #ec4899);
      color: #fff;
      border: 3.5px solid #fff;
      padding: 12px 46px;
      font-size: clamp(20px, 3vw, 26px);
      font-weight: 800;
      border-radius: 999px;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(236, 72, 153, 0.45);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-play:hover {
      transform: scale(1.06) translateY(-2px);
      box-shadow: 0 14px 28px rgba(236, 72, 153, 0.6);
      background: linear-gradient(135deg, #e11d48, #db2777);
    }
    .btn-play:active {
      transform: scale(0.96);
    }

    /* 2. GENDER SELECTION OVERLAY */
    #gender-screen {
      pointer-events: none;
    }
    .gender-header {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 10px 30px;
      border-radius: 999px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      border: 2px solid #fbcfe8;
      pointer-events: auto;
      z-index: 20;
    }
    .gender-header h2 {
      font-family: 'Baloo 2', cursive;
      color: #9d174d;
      font-size: clamp(20px, 3vw, 26px);
      font-weight: 800;
      line-height: 1.1;
    }
    .gender-header p {
      font-size: 12px;
      color: #701a75;
      font-weight: 500;
    }
    .orbit-hint {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: #db2777;
      background: #fdf2f8;
      padding: 2px 10px;
      border-radius: 999px;
      margin-top: 4px;
      font-weight: 600;
    }
    .gender-cards-row {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 28px;
      pointer-events: auto;
      z-index: 20;
    }
    .gender-card {
      background: rgba(255, 255, 255, 0.96);
      border: 3px solid #f472b6;
      border-radius: 20px;
      padding: 10px 22px;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(244, 114, 182, 0.25);
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      width: 170px;
    }
    .gender-card:hover {
      transform: translateY(-6px) scale(1.05);
      box-shadow: 0 16px 32px rgba(244, 114, 182, 0.45);
      border-color: #ec4899;
    }
    .gender-card.male-card {
      border-color: #38bdf8;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
    }
    .gender-card.male-card:hover {
      border-color: #0284c7;
      box-shadow: 0 16px 32px rgba(56, 189, 248, 0.45);
    }
    .gender-title {
      font-family: 'Baloo 2', cursive;
      font-size: 19px;
      font-weight: 800;
    }

    /* 3. DRESS UP SCREEN */
    #dressup-screen {
      pointer-events: none;
    }
    .dressup-drawer {
      position: absolute;
      right: 18px;
      top: 18px;
      bottom: 18px;
      width: 310px;
      max-width: 90vw;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      border: 2px solid #fbcfe8;
      box-shadow: -10px 20px 40px rgba(0,0,0,0.18);
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      pointer-events: auto;
      z-index: 20;
    }
    .drawer-title {
      font-family: 'Baloo 2', cursive;
      color: #be185d;
      font-size: 21px;
      font-weight: 800;
      text-align: center;
      border-bottom: 2px dashed #fbcfe8;
      padding-bottom: 4px;
    }
    .opt-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .opt-label {
      font-size: 11px;
      font-weight: 700;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .opt-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .btn-chip {
      background: #fdf2f8;
      border: 1.5px solid #f9a8d4;
      color: #9d174d;
      padding: 5px 11px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-chip:hover {
      background: #fce7f3;
      transform: translateY(-1px);
    }
    .btn-chip.active {
      background: #ec4899;
      color: #fff;
      border-color: #db2777;
      box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
    }
    .color-swatch {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: transform 0.15s;
    }
    .color-swatch:hover {
      transform: scale(1.15);
    }
    .color-swatch.active {
      transform: scale(1.2);
      outline: 2px solid #ec4899;
    }

    /* 4. GAMEPLAY OVERLAY */
    #gameplay-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 15;
    }
    .top-bar {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      pointer-events: auto;
    }
    .badge-pill {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(8px);
      border: 2px solid #fbcfe8;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      color: #831843;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .btn-reset-cam {
      background: rgba(255, 255, 255, 0.94);
      border: 2px solid #fbcfe8;
      color: #9d174d;
      padding: 6px 13px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      display: flex;
      align-items: center;
      gap: 4px;
      pointer-events: auto;
      transition: all 0.2s;
    }
    .btn-reset-cam:hover {
      background: #fdf2f8;
      border-color: #ec4899;
      transform: translateY(-1px);
    }

    /* POS Register Machine */
    .pos-box {
      position: absolute;
      bottom: 18px;
      right: 18px;
      width: 310px;
      max-width: 92vw;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 2px solid #fbcfe8;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
      padding: 14px;
      pointer-events: auto;
    }
    .pos-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .pos-title {
      font-size: 11px;
      font-weight: 800;
      color: #db2777;
      letter-spacing: 0.5px;
    }
    .pos-cust-tag {
      font-size: 11px;
      background: #fce7f3;
      color: #9d174d;
      padding: 2px 9px;
      border-radius: 999px;
      font-weight: 600;
    }
    .items-scroll {
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-height: 130px;
      overflow-y: auto;
      margin: 6px 0;
      padding-right: 4px;
    }
    .item-card {
      background: #fdf2f8;
      border: 1.5px solid #fbcfe8;
      border-radius: 12px;
      padding: 7px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .item-card:hover {
      background: #fce7f3;
      transform: translateX(3px);
    }
    .item-card.scanned {
      background: #dcfce7;
      border-color: #86efac;
      color: #166534;
      cursor: default;
    }
    .item-card.scanned .item-check {
      display: inline-block;
      color: #16a34a;
      font-weight: 800;
    }
    .pos-total-row {
      border-top: 2px dashed #fbcfe8;
      padding-top: 8px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
    }
    .pos-total-price {
      color: #db2777;
      font-size: 17px;
      font-family: 'Baloo 2', cursive;
    }
    .btn-pay {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      font-family: 'Baloo 2', cursive;
      font-size: 16px;
      font-weight: 800;
      width: 100%;
      padding: 9px;
      border-radius: 13px;
      border: none;
      cursor: pointer;
      margin-top: 8px;
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
      transition: all 0.2s;
    }
    .btn-pay:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-2px);
    }
    .btn-pay:active {
      transform: scale(0.97);
    }

    /* Modal Pembayaran & Kembalian */
    .modal-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      pointer-events: auto;
    }
    .pay-modal {
      background: #fff;
      border: 3.5px solid #f472b6;
      border-radius: 26px;
      padding: 22px;
      width: 350px;
      max-width: 90vw;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .choice-btn {
      background: #fdf2f8;
      border: 2px solid #f9a8d4;
      color: #9d174d;
      padding: 11px;
      border-radius: 13px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
      width: 100%;
    }
    .choice-btn:hover {
      background: #ec4899;
      color: #fff;
      border-color: #db2777;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(236, 72, 153, 0.3);
    }

    /* Floating Feedback Emoji */
    .float-fx {
      position: absolute;
      font-size: 40px;
      pointer-events: none;
      z-index: 60;
      animation: floatUp 1.3s ease-out forwards;
    }
    @keyframes floatUp {
      0% { opacity: 1; transform: translate(-50%, -50%) scale(0.7); }
      100% { opacity: 0; transform: translate(-50%, -150px) scale(1.3); }
    }

    /* 5. SUMMARY DAY SCREEN */
    #summary-screen {
      background: rgba(255, 241, 242, 0.96);
      backdrop-filter: blur(10px);
      padding: 20px;
    }
    .summary-card {
      background: #fff;
      border: 3px solid #f472b6;
      border-radius: 26px;
      padding: 26px 30px;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    }
    .summary-title {
      font-family: 'Baloo 2', cursive;
      font-size: 32px;
      font-weight: 800;
      color: #be185d;
      line-height: 1.1;
      margin-top: 6px;
    }
    .summary-stats {
      background: #fdf2f8;
      border-radius: 16px;
      padding: 14px 18px;
      margin: 16px 0;
      text-align: left;
      font-size: 12px;
      color: #831843;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <canvas id="c"></canvas>

    <!-- 1. MAIN MENU: 3D STOREFRONT BACKGROUND -->
    <div id="menu-screen" class="screen">
      <div class="menu-center">
        <div class="game-logo">CASHIER SIM<br><span style="font-size:0.62em; color:#db2777;">Supermarket Story</span></div>
        <div class="game-subtitle">🛒 Simulator Kasir 3D Chibi & Toko Swalayan</div>
        <button class="btn-play" onclick="goToGenderSelect()">
          <span>PLAY</span> ➔
        </button>
      </div>
    </div>

    <!-- 2. GENDER SELECTION: TWO 3D FULL-BODY MODELS -->
    <div id="gender-screen" class="screen hidden">
      <div class="gender-header">
        <h2>PILIH KARAKTER</h2>
        <p>Pilih kasir favoritmu untuk bertugas di supermarket!</p>
        <div class="orbit-hint">🔄 Drag mouse untuk putar 360° | Scroll untuk zoom</div>
      </div>

      <div class="gender-cards-row">
        <div class="gender-card" id="cardFemale" onmouseenter="onHoverGender('female', true)" onmouseleave="onHoverGender('female', false)" onclick="selectGender('female')">
          <div style="font-size:28px;">👧</div>
          <div class="gender-title" style="color:#db2777;">CEWEK</div>
          <div style="font-size:11px; color:#64748b;">Seragam rok manis & apron</div>
        </div>

        <div class="gender-card male-card" id="cardMale" onmouseenter="onHoverGender('male', true)" onmouseleave="onHoverGender('male', false)" onclick="selectGender('male')">
          <div style="font-size:28px;">👦</div>
          <div class="gender-title" style="color:#0284c7;">COWOK</div>
          <div style="font-size:11px; color:#64748b;">Kemeja keren & celana rapi</div>
        </div>
      </div>
    </div>

    <!-- 3. DRESS UP SCREEN -->
    <div id="dressup-screen" class="screen hidden">
      <div style="position:absolute; top:18px; left:18px; pointer-events:auto; z-index:20;">
        <button class="btn-reset-cam" onclick="resetCamera()">
          🎥 Reset Kamera
        </button>
      </div>

      <div class="dressup-drawer">
        <div class="drawer-title">DRESS UP KASIR</div>
        <div style="font-size:11px; color:#be185d; text-align:center; margin-top:-4px;">
          🔄 Drag karakter untuk putar 360°
        </div>

        <!-- Nama Kasir -->
        <div class="opt-group">
          <label class="opt-label">Nama Kasir:</label>
          <input id="nameInput" type="text" maxlength="10" value="Alya" oninput="updateCharName(this.value)" style="width:100%; padding:7px 11px; border-radius:10px; border:1.5px solid #f472b6; font-family:'Poppins'; font-weight:600; color:#831843; outline:none;" />
        </div>

        <!-- Warna Kulit -->
        <div class="opt-group">
          <div class="opt-label">Warna Kulit:</div>
          <div class="opt-row" id="skinSwatches"></div>
        </div>

        <!-- Gaya Rambut -->
        <div class="opt-group">
          <div class="opt-label">Model Rambut:</div>
          <div class="opt-row" id="hairStyleChips"></div>
        </div>

        <!-- Warna Rambut -->
        <div class="opt-group">
          <div class="opt-label">Warna Rambut:</div>
          <div class="opt-row" id="hairColorSwatches"></div>
        </div>

        <!-- Seragam -->
        <div class="opt-group">
          <div class="opt-label">Seragam Kasir:</div>
          <div class="opt-row" id="outfitChips"></div>
        </div>

        <!-- Aksesori -->
        <div class="opt-group">
          <div class="opt-label">Aksesori:</div>
          <div class="opt-row" id="accChips"></div>
        </div>

        <button class="btn-play" style="font-size:17px; padding:9px 20px; width:100%; margin-top:6px; justify-content:center;" onclick="startGameplay()">
          START ➔
        </button>
      </div>
    </div>

    <!-- 4. GAMEPLAY OVERLAY -->
    <div id="gameplay-overlay" class="hidden">
      <div class="top-bar">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="badge-pill">👤 <span id="hudName">Alya</span> (Kasir)</div>
          <div class="badge-pill">👥 Pelanggan: <span id="hudCustNum">1</span>/5</div>
          <div class="badge-pill">💰 Kas: <span id="hudEarnings" style="color:#059669;">Rp0</span></div>
        </div>

        <button class="btn-reset-cam" onclick="resetCamera()" title="Kembalikan sudut kamera">
          🎥 Reset Kamera
        </button>
      </div>

      <!-- POS Register Box -->
      <div class="pos-box">
        <div class="pos-header">
          <span class="pos-title">MESIN KASIR SUPERMARKET</span>
          <span id="custTag" class="pos-cust-tag">Pelanggan</span>
        </div>
        <div style="font-size:11px; color:#64748b;">Klik barang 3D di meja untuk scan:</div>
        <div class="items-scroll" id="itemsContainer"></div>

        <div class="pos-total-row">
          <span style="font-size:12px; color:#475569;">Total Belanja:</span>
          <span id="totalDisplay" class="pos-total-price">Rp0</span>
        </div>

        <button id="btnPay" class="btn-pay hidden" onclick="openPaymentModal()">
          BAYAR SEKARANG 💳
        </button>
      </div>
    </div>

    <!-- Payment & Change Modal -->
    <div id="pay-modal-overlay" class="modal-overlay hidden">
      <div class="pay-modal">
        <div style="font-size:32px; margin-bottom:2px;">💵</div>
        <h3 style="font-family:'Baloo 2'; color:#9d174d; font-size:22px;">PEMBAYARAN</h3>
        <p style="font-size:12px; color:#475569; margin:3px 0;">Total Belanja: <strong id="modalTotal" style="color:#db2777;">Rp0</strong></p>
        <p style="font-size:14px; color:#059669; font-weight:700;">Uang Pelanggan: <span id="modalPaid">Rp0</span></p>
        
        <p style="font-size:11px; color:#64748b; margin:12px 0 6px 0; font-weight:600;">Pilih Kembalian yang Tepat:</p>
        <div id="changeChoicesContainer" style="display:flex; flex-direction:column; gap:7px;"></div>
      </div>
    </div>

    <!-- 5. SUMMARY DAY -->
    <div id="summary-screen" class="screen hidden">
      <div class="summary-card">
        <div style="font-size:46px;">🎉</div>
        <h2 class="summary-title">HARI SELESAI!</h2>
        <p style="font-size:12px; color:#701a75; margin-top:2px;">
          Hebat sekali, <strong id="summaryCharName">Alya</strong>! Semua 5 pelanggan telah selesai dilayani.
        </p>

        <div class="summary-stats">
          <div class="stat-row">
            <span>Total Pendapatan Toko:</span>
            <strong id="sumEarnings" style="color:#059669; font-size:15px;">Rp0</strong>
          </div>
          <div class="stat-row">
            <span>Kembalian Benar:</span>
            <strong id="sumCorrect" style="color:#0284c7; font-size:14px;">5 / 5</strong>
          </div>
          <div class="stat-row">
            <span>Kembalian Keliru:</span>
            <strong id="sumWrong" style="color:#e11d48; font-size:14px;">0</strong>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:7px; margin-top:6px;">
          <button class="btn-play" style="font-size:16px; padding:10px; justify-content:center;" onclick="restartDay()">
            MAIN LAGI (HARI BARU)
          </button>
          <button class="btn-chip" style="font-size:12px; padding:8px;" onclick="goToDressUp()">
            GANTI BAJU
          </button>
          <button class="btn-chip" style="font-size:12px; padding:8px;" onclick="goToGenderSelect()">
            GANTI KARAKTER
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // ==========================================
    // 1. SOUND SYNTHESIZER (Web Audio API)
    // ==========================================
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let actx = null;
    function getAudioContext() {
      if (!actx) actx = new AudioCtx();
      if (actx.state === 'suspended') actx.resume();
      return actx;
    }

    const sound = {
      playScan() {
        try {
          const ctx = getAudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1850, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.09);
        } catch(e) {}
      },
      playSuccess() {
        try {
          const ctx = getAudioContext();
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.07);
            osc.stop(ctx.currentTime + i * 0.07 + 0.22);
          });
        } catch(e) {}
      },
      playError() {
        try {
          const ctx = getAudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(170, ctx.currentTime);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.22);
        } catch(e) {}
      },
      playClick() {
        try {
          const ctx = getAudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.18, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        } catch(e) {}
      },
      playDoor() {
        try {
          const ctx = getAudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch(e) {}
      }
    };

    // ==========================================
    // 2. DATA & CONFIGURATIONS
    // ==========================================
    const SKIN_TONES = ['#fed7aa', '#fcd34d', '#b45309'];
    const FEMALE_HAIR_COLORS = ['#1e293b', '#78350f', '#f472b6'];
    const MALE_HAIR_COLORS = ['#1e293b', '#78350f', '#eab308'];

    const FEMALE_OUTFITS = [
      { name: 'Pink Manis', primary: '#ec4899', secondary: '#ffffff' },
      { name: 'Biru Pastel', primary: '#38bdf8', secondary: '#ffffff' },
      { name: 'Kuning Ceria', primary: '#facc15', secondary: '#ffffff' }
    ];

    const MALE_OUTFITS = [
      { name: 'Biru Rapi', primary: '#0284c7', secondary: '#ffffff' },
      { name: 'Hijau Fresh', primary: '#10b981', secondary: '#ffffff' },
      { name: 'Abu Modern', primary: '#64748b', secondary: '#ffffff' }
    ];

    const ITEM_CATALOG = [
      { id: 'susu', name: 'Susu Kotak Fresh', price: 12000, color: '#60a5fa', shape: 'box' },
      { id: 'roti', name: 'Roti Tawar Gandum', price: 15000, color: '#f59e0b', shape: 'box' },
      { id: 'sabun', name: 'Sabun Mandi Wangi', price: 8000, color: '#34d399', shape: 'box' },
      { id: 'jus', name: 'Jus Jeruk Botol', price: 9000, color: '#fb923c', shape: 'cylinder' },
      { id: 'cokelat', name: 'Cokelat Susu Manis', price: 14000, color: '#78350f', shape: 'box' },
      { id: 'apel', name: 'Apel Segar Merah', price: 7000, color: '#ef4444', shape: 'sphere' },
      { id: 'keripik', name: 'Keripik Kentang', price: 11000, color: '#eab308', shape: 'cylinder' },
      { id: 'biskuit', name: 'Biskuit Renyah', price: 10000, color: '#d97706', shape: 'box' }
    ];

    let playerConfig = {
      gender: 'female',
      skinColor: SKIN_TONES[0],
      hairStyle: 0,
      hairColor: FEMALE_HAIR_COLORS[0],
      outfitColor: FEMALE_OUTFITS[0].primary,
      accessory: 0,
      name: 'Alya'
    };

    let gameState = {
      screen: 'menu',
      earnings: 0,
      customerIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      currentCustItems: [],
      scannedIds: [],
      currentCustName: 'Rina',
      customerPaid: 0,
      customerState: 'walking_in'
    };

    // ==========================================
    // 3. THREE.JS & ORBITCONTROLS SETUP
    // ==========================================
    const container = document.getElementById('game-container');
    const canvas = document.getElementById('c');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#38bdf8'); // sky blue

    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 120);
    camera.position.set(0, 4.2, 7.2);
    camera.lookAt(0, 1.2, 0);

    const OrbitControlsClass = THREE.OrbitControls || window.OrbitControls;
    const controls = new OrbitControlsClass(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't clip through floor
    controls.minDistance = 2.6;
    controls.maxDistance = 14.0;
    controls.target.set(0, 1.2, 0);
    controls.update();

    // Raycaster for item scanning
    const raycaster = new THREE.Raycaster();
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;

    renderer.domElement.addEventListener('pointerdown', (e) => {
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      isDragging = false;
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
      if (Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) > 5) {
        isDragging = true;
      }
    });

    renderer.domElement.addEventListener('pointerup', (e) => {
      if (isDragging) return;
      if (gameState.screen !== 'gameplay') return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(items3DGroup.children, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.id && obj.parent !== items3DGroup) {
          obj = obj.parent;
        }
        if (obj && obj.userData && obj.userData.id) {
          scanItem(obj.userData.id);
        }
      }
    });

    // LIGHTING: Warm cozy grocery atmosphere
    const ambLight = new THREE.AmbientLight(0xffedd5, 0.75);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 0.85);
    sunLight.position.set(8, 14, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Warm PointLights above counter & shelves
    const pointCounter = new THREE.PointLight(0xfde047, 0.9, 12);
    pointCounter.position.set(0, 3.8, 0);
    scene.add(pointCounter);

    const pointShelf = new THREE.PointLight(0xfef08a, 0.7, 14);
    pointShelf.position.set(0, 4.0, -4.5);
    scene.add(pointShelf);

    // ==========================================
    // 4. ENVIRONMENT: STOREFRONT & INTERIOR
    // ==========================================
    const storefrontGroup = new THREE.Group();
    scene.add(storefrontGroup);

    // Outdoor Ground & Street
    const groundMat = new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.8 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), groundMat);
    ground.rotation.x = -Math.PI / 2;
    storefrontGroup.add(ground);

    // Pavement
    const pavementMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.6 });
    const pavement = new THREE.Mesh(new THREE.BoxGeometry(22, 0.2, 10), pavementMat);
    pavement.position.set(0, 0.1, 1.5);
    storefrontGroup.add(pavement);

    // Storefront Building Facade
    const facadeMat = new THREE.MeshStandardMaterial({ color: '#fef08a', roughness: 0.5 }); // warm sunny yellow
    const facade = new THREE.Mesh(new THREE.BoxGeometry(18, 7.5, 3), facadeMat);
    facade.position.set(0, 3.75, -4);
    storefrontGroup.add(facade);

    // Striped Awning / Canopy (Red & White)
    const awningGroup = new THREE.Group();
    awningGroup.position.set(0, 4.6, -2.2);
    awningGroup.rotation.x = 0.25;
    const stripeColors = ['#ef4444', '#ffffff'];
    for (let i = -7; i <= 7; i++) {
      const stripeMat = new THREE.MeshStandardMaterial({ color: stripeColors[Math.abs(i) % 2], roughness: 0.5 });
      const sMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.15, 2.2), stripeMat);
      sMesh.position.set(i * 0.85, 0, 0);
      awningGroup.add(sMesh);
    }
    storefrontGroup.add(awningGroup);

    // Big Signboard "SUPERMARKET STORY"
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(9.6, 1.4, 0.35), new THREE.MeshStandardMaterial({ color: '#be185d', roughness: 0.4 }));
    signBoard.position.set(0, 6.2, -2.4);
    const signGold = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.12, 0.4), new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.3, metalness: 0.5 }));
    signGold.position.set(0, 5.6, -2.4);
    storefrontGroup.add(signBoard, signGold);

    // Potted Ornamental Trees in Front
    function createPottedTree(x, z) {
      const tg = new THREE.Group();
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.8, 16), new THREE.MeshStandardMaterial({ color: '#ea580c', roughness: 0.6 }));
      pot.position.y = 0.4;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.9, 12), new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.8 }));
      trunk.position.y = 1.0;
      const foliage1 = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 20), new THREE.MeshStandardMaterial({ color: '#16a34a', roughness: 0.5 }));
      foliage1.position.y = 1.7;
      const foliage2 = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.5 }));
      foliage2.position.set(0.1, 2.1, 0.05);
      tg.add(pot, trunk, foliage1, foliage2);
      tg.position.set(x, 0.2, z);
      return tg;
    }
    storefrontGroup.add(createPottedTree(-5.8, -1.2), createPottedTree(5.8, -1.2));

    // Clouds in Sky
    const cloudsGroup = new THREE.Group();
    for (let c = 0; c < 5; c++) {
      const cMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2 + Math.random() * 0.6, 16, 16), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
      cMesh.position.set(-15 + c * 8, 8 + Math.sin(c) * 2, -14);
      cMesh.scale.set(1.8, 0.8, 1);
      cloudsGroup.add(cMesh);
    }
    storefrontGroup.add(cloudsGroup);

    // SUPERMARKET INTERIOR GROUP (For Character Select, Dress Up & Gameplay)
    const interiorGroup = new THREE.Group();
    scene.add(interiorGroup);
    interiorGroup.visible = false;

    // Floor Tiles (Ceramic Wood Look with soft reflection)
    const intFloorMat = new THREE.MeshStandardMaterial({ color: '#fef3c7', roughness: 0.35, metalness: 0.05 });
    const intFloor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), intFloorMat);
    intFloor.rotation.x = -Math.PI / 2;
    intFloor.receiveShadow = true;
    interiorGroup.add(intFloor);

    // Grid Floor Line Grooves
    const grooveMat = new THREE.MeshBasicMaterial({ color: '#fde68a' });
    for (let i = -10; i <= 10; i += 2) {
      const lx = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 24), grooveMat);
      lx.rotation.x = -Math.PI / 2; lx.position.set(i, 0.01, 0);
      const lz = new THREE.Mesh(new THREE.PlaneGeometry(24, 0.04), grooveMat);
      lz.rotation.x = -Math.PI / 2; lz.position.set(0, 0.01, i);
      interiorGroup.add(lx, lz);
    }

    // Walls & Wood Panels
    const intWallMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.7 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 10), intWallMat);
    backWall.position.set(0, 5, -7.5);
    const wallPlank = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 0.2), new THREE.MeshStandardMaterial({ color: '#92400e', roughness: 0.5 }));
    wallPlank.position.set(0, 4.8, -7.4);
    interiorGroup.add(backWall, wallPlank);

    // Medium Wood Cashier Counter with molded panels
    const counterWoodMat = new THREE.MeshStandardMaterial({ color: '#9a3412', roughness: 0.5 });
    const counterBody = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.15, 1.7), counterWoodMat);
    counterBody.position.set(0, 0.575, 0);
    // Front wood panel detail
    const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.9, 0.1), new THREE.MeshStandardMaterial({ color: '#c2410c', roughness: 0.5 }));
    frontPanel.position.set(0, 0.575, 0.88);
    // Counter Top
    const counterTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 1.9), new THREE.MeshStandardMaterial({ color: '#fbcfe8', roughness: 0.3 }));
    counterTop.position.set(0, 1.15, 0);

    // Conveyor Belt
    const beltMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.7 });
    const belt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.04, 1.25), beltMat);
    belt.position.set(-0.8, 1.21, 0);

    // Detailed POS Register: Terminal Box + Emissive Screen + Mini Button Grid + Handheld Barcode Scanner
    const posBase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.6), new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.4 }));
    posBase.position.set(1.45, 1.37, 0.1);
    // Green glowing terminal screen
    const posScreen = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.08), new THREE.MeshStandardMaterial({ color: '#15803d', emissive: '#16a34a', emissiveIntensity: 0.6 }));
    posScreen.position.set(1.45, 1.72, 0.2);
    posScreen.rotation.x = -0.28;
    // Mini buttons array on register
    const btnMat = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.4 });
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.06), btnMat);
        b.position.set(1.3 + c * 0.1, 1.56, 0.02 + r * 0.1);
        interiorGroup.add(b);
      }
    }
    // Handheld Barcode Scanner on Stand
    const scannerStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.3, 12), new THREE.MeshStandardMaterial({ color: '#475569' }));
    scannerStand.position.set(0.85, 1.35, 0.2);
    const scannerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 12), new THREE.MeshStandardMaterial({ color: '#1e293b' }));
    scannerHead.rotation.z = Math.PI / 3;
    scannerHead.position.set(0.9, 1.5, 0.2);
    // Scanner red laser dot/line
    const laserTip = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshStandardMaterial({ color: '#ef4444', emissive: '#ef4444', emissiveIntensity: 0.9 }));
    laserTip.position.set(0.98, 1.54, 0.2);

    interiorGroup.add(counterBody, frontPanel, counterTop, belt, posBase, posScreen, scannerStand, scannerHead, laserTip);

    // Multi-Tier Shelves filled with Varied Colorful Goods
    const shelfWoodMat = new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.6 });
    [-4.8, 0, 4.8].forEach((sx, idx) => {
      const shelf = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.3, 4.2, 1.2), shelfWoodMat);
      body.position.set(0, 2.1, 0);
      shelf.add(body);

      // Hanging "SALE" or "PROMO" banner on shelf
      const bannerMat = new THREE.MeshStandardMaterial({ color: idx === 1 ? '#ef4444' : '#f59e0b', roughness: 0.4 });
      const banner = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.06), bannerMat);
      banner.position.set(0, 3.8, 0.65);
      shelf.add(banner);

      for (let h = 1; h <= 3; h++) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 1.3), new THREE.MeshStandardMaterial({ color: '#fef3c7', roughness: 0.4 }));
        plank.position.set(0, h, 0);
        shelf.add(plank);

        // Rich assortment of groceries
        for (let g = -1.25; g <= 1.25; g += 0.42) {
          const itemCol = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][(Math.abs(Math.floor(g * 10)) + h) % 6];
          const mat = new THREE.MeshStandardMaterial({ color: itemCol, roughness: 0.4 });
          const isBottle = (h + Math.floor(g * 10)) % 2 === 0;
          const good = isBottle 
            ? new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.38, 12), mat)
            : new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.28), mat);
          good.position.set(g, h + 0.2, 0.25);
          shelf.add(good);
        }
      }
      shelf.position.set(sx, 0, -6.5);
      interiorGroup.add(shelf);
    });

    // Drink Beverage Fridge with Glass Door & Cold Interior Backlight
    const fridgeGroup = new THREE.Group();
    const fridgeBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.4, 1.4), new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.3 }));
    fridgeBody.position.set(0, 2.2, 0);
    // Interior cold glow
    const fridgeLight = new THREE.PointLight(0x38bdf8, 0.8, 4);
    fridgeLight.position.set(0, 2.5, 0.3);
    // Glass front
    const glassMat = new THREE.MeshStandardMaterial({ color: '#93c5fd', roughness: 0.1, transparent: true, opacity: 0.35 });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.1, 0.08), glassMat);
    glass.position.set(0, 2.2, 0.7);
    // Colorful drinks inside fridge
    for (let fh = 1; fh <= 3; fh++) {
      for (let fg = -0.8; fg <= 0.8; fg += 0.35) {
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.32, 10), new THREE.MeshStandardMaterial({ color: ['#f43f5e', '#06b6d4', '#84cc16', '#a855f7'][Math.abs(Math.floor(fg * 10)) % 4], roughness: 0.3 }));
        can.position.set(fg, fh * 0.9 + 0.4, 0.3);
        fridgeGroup.add(can);
      }
    }
    fridgeGroup.add(fridgeBody, fridgeLight, glass);
    fridgeGroup.position.set(6.8, 0, -2.5);
    interiorGroup.add(fridgeGroup);

    // Automatic Sliding Doors at Entrance (Left Side)
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 2.6), new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.5 }));
    doorFrame.position.set(-6.2, 2.1, 1.6);
    interiorGroup.add(doorFrame);

    const doorGlassMat = new THREE.MeshStandardMaterial({ color: '#93c5fd', roughness: 0.15, transparent: true, opacity: 0.6 });
    const doorL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.8, 1.1), doorGlassMat);
    doorL.position.set(-6.2, 1.9, 1.05);
    const doorR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.8, 1.1), doorGlassMat);
    doorR.position.set(-6.2, 1.9, 2.15);
    interiorGroup.add(doorL, doorR);

    // 3D Items Group on Counter
    const items3DGroup = new THREE.Group();
    interiorGroup.add(items3DGroup);

    // ==========================================
    // 5. HIGH-QUALITY CHIBI CHARACTER BUILDER
    // (Layered Hair, Capsule Limbs, MeshStandardMaterial)
    // ==========================================
    const CapsuleGeomClass = THREE.CapsuleGeometry || function(r, l, s, h) {
      return new THREE.CylinderGeometry(r, r, l, s);
    };

    function createShoppingBasket() {
      const bGroup = new THREE.Group();
      const bMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.5 });
      const bBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.28, 0.38), bMat);
      bGroup.add(bBox);
      const bRim = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.42), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 }));
      bRim.position.y = 0.14;
      bGroup.add(bRim);
      const bHandle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 }));
      bHandle.rotation.z = Math.PI;
      bHandle.position.y = 0.22;
      bGroup.add(bHandle);
      // Mini groceries in basket
      const g1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.12), new THREE.MeshStandardMaterial({ color: '#60a5fa', roughness: 0.4 }));
      g1.position.set(-0.1, 0.12, 0.04);
      const g2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12), new THREE.MeshStandardMaterial({ color: '#fb923c', roughness: 0.4 }));
      g2.position.set(0.1, 0.12, -0.04);
      bGroup.add(g1, g2);
      return bGroup;
    }

    function buildChibiModel(cfg, options = {}) {
      const g = new THREE.Group();

      // MeshStandardMaterial with soft specular highlights (roughness 0.4-0.55)
      const skinMat = new THREE.MeshStandardMaterial({ color: cfg.skinColor, roughness: 0.55 });
      const hairMat = new THREE.MeshStandardMaterial({ color: cfg.hairColor, roughness: 0.45 });
      const outfitMat = new THREE.MeshStandardMaterial({ color: cfg.outfitColor, roughness: 0.5 });
      const whiteMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 });
      const darkMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.4 });

      // 1. CHIBI HEAD (High segments: 32x32, ~40% total body height)
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.66, 32, 32), skinMat);
      head.position.y = 1.56;
      head.castShadow = true;
      g.add(head);

      // 2. DETAILED CHIBI FACE
      // Large Cute Eyes: Black sphere + white highlight sparkle
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 18), darkMat);
      eyeL.position.set(-0.21, 1.58, 0.60);
      const eyeR = eyeL.clone(); eyeR.position.x = 0.21;
      
      // Sparkling highlight spheres
      const sparkL = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), whiteMat);
      sparkL.position.set(-0.19, 1.62, 0.66);
      const sparkR = sparkL.clone(); sparkR.position.x = 0.23;

      // Thin curved eyebrows
      const browMat = new THREE.MeshStandardMaterial({ color: cfg.hairColor, roughness: 0.6 });
      const browL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.025, 0.03), browMat);
      browL.position.set(-0.21, 1.71, 0.60);
      browL.rotation.z = 0.15;
      const browR = browL.clone();
      browR.position.x = 0.21;
      browR.rotation.z = -0.15;

      // Soft Pink Blush on Cheeks (CircleGeometry with opacity)
      const blushMat = new THREE.MeshStandardMaterial({ color: '#fb7185', transparent: true, opacity: 0.55, roughness: 0.7 });
      const blushL = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), blushMat);
      blushL.position.set(-0.35, 1.46, 0.54);
      blushL.rotation.y = -0.3;
      const blushR = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), blushMat);
      blushR.position.set(0.35, 1.46, 0.54);
      blushR.rotation.y = 0.3;

      // Cute smile mouth (torus arc)
      const mouthMat = new THREE.MeshStandardMaterial({ color: '#e11d48', roughness: 0.5 });
      const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 8, 16, Math.PI), mouthMat);
      mouth.position.set(0, 1.43, 0.62);
      mouth.rotation.x = Math.PI;
      g.add(eyeL, eyeR, sparkL, sparkR, browL, browR, blushL, blushR, mouth);

      // 3. LAYERED HAIR (Multi-part layering, NOT 1 big block)
      // Hair Back Layer
      const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.70, 28, 28, 0, Math.PI * 2, 0, Math.PI / 1.7), hairMat);
      hairBack.position.set(0, 1.62, -0.02);
      g.add(hairBack);

      // Layered Front Bangs (Individual strands curving on forehead)
      for (let b = -2; b <= 2; b++) {
        const bang = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.35, 14), hairMat);
        bang.position.set(b * 0.14, 2.02, 0.54);
        bang.rotation.x = 0.45;
        bang.rotation.z = -b * 0.12;
        g.add(bang);
      }

      // Gender Specific Layered Styles
      if (cfg.gender === 'female') {
        if (cfg.hairStyle === 0) { // Long Layered Waves
          for (let s = -1; s <= 1; s += 2) {
            const sideLock = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 1.05, 14), hairMat);
            sideLock.position.set(s * 0.54, 1.2, 0.05);
            sideLock.rotation.z = -s * 0.08;
            g.add(sideLock);
          }
          const backFlow = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.1, 0.28), hairMat);
          backFlow.position.set(0, 1.15, -0.48);
          g.add(backFlow);
        } else if (cfg.hairStyle === 1) { // Cute Ponytail
          const pTail = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.72, 16), hairMat);
          pTail.position.set(0, 1.88, -0.72);
          pTail.rotation.x = -Math.PI / 3;
          const bow = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), new THREE.MeshStandardMaterial({ color: '#f43f5e', roughness: 0.4 }));
          bow.position.set(0, 2.08, -0.58);
          g.add(pTail, bow);
        } else { // Layered Cute Bob
          const bobL = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), hairMat);
          bobL.position.set(-0.54, 1.38, -0.05);
          const bobR = bobL.clone(); bobR.position.x = 0.54;
          g.add(bobL, bobR);
        }

        // Female Outfit: Cashier Shirt + Sweet Apron & Skirt
        const torso = new THREE.Mesh(new CapsuleGeomClass(0.3, 0.45, 16, 16), outfitMat);
        torso.position.y = 0.92;
        // Apron front bib & strap
        const apron = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.06), whiteMat);
        apron.position.set(0, 0.95, 0.28);
        const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.54, 0.42, 20, 1, true), outfitMat);
        skirt.position.y = 0.56;

        // Smooth Legs (Capsule) & Matching Shoes
        const legL = new THREE.Mesh(new CapsuleGeomClass(0.09, 0.35, 12, 12), skinMat);
        legL.position.set(-0.16, 0.28, 0);
        const legR = legL.clone(); legR.position.x = 0.16;

        const shoeMat = new THREE.MeshStandardMaterial({ color: cfg.outfitColor, roughness: 0.4 });
        const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.11, 0.23), shoeMat);
        shoeL.position.set(-0.16, 0.06, 0.04);
        const shoeR = shoeL.clone(); shoeR.position.x = 0.16;

        g.add(torso, apron, skirt, legL, legR, shoeL, shoeR);
      } else {
        // Male Layered Hair Styles
        if (cfg.hairStyle === 1) { // Spiky Anime Layered
          for (let s = -2; s <= 2; s++) {
            const sp = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 10), hairMat);
            sp.position.set(s * 0.17, 2.26, 0.08);
            sp.rotation.z = -s * 0.22;
            g.add(sp);
          }
        } else if (cfg.hairStyle === 2) { // Slick Pompadour
          const slick = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.3, 0.68), hairMat);
          slick.position.set(0, 2.22, -0.04);
          g.add(slick);
        }

        // Male Outfit: Shirt + Cashier Vest + Trousers
        const torso = new THREE.Mesh(new CapsuleGeomClass(0.32, 0.48, 16, 16), outfitMat);
        torso.position.y = 0.94;
        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.46, 0.05), whiteMat);
        vest.position.set(0, 0.96, 0.3);

        const pantsMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.5 });
        const legL = new THREE.Mesh(new CapsuleGeomClass(0.11, 0.42, 12, 12), pantsMat);
        legL.position.set(-0.16, 0.35, 0);
        const legR = legL.clone(); legR.position.x = 0.16;

        const shoeMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.4 });
        const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.11, 0.25), shoeMat);
        shoeL.position.set(-0.16, 0.06, 0.04);
        const shoeR = shoeL.clone(); shoeR.position.x = 0.16;

        g.add(torso, vest, legL, legR, shoeL, shoeR);
      }

      // Smooth Arms (Capsule)
      const armL = new THREE.Mesh(new CapsuleGeomClass(0.08, 0.36, 12, 12), outfitMat);
      armL.position.set(-0.42, 0.92, 0.04);
      armL.rotation.z = 0.25;
      const armR = armL.clone();
      armR.position.x = 0.42;
      armR.rotation.z = -0.25;
      g.add(armL, armR);

      // Accessories
      if (cfg.gender === 'female') {
        if (cfg.accessory === 0) { // Bando Manis
          const bando = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.05, 10, 28, Math.PI), new THREE.MeshStandardMaterial({ color: '#ec4899', roughness: 0.4 }));
          bando.rotation.x = -Math.PI / 2.3;
          bando.position.set(0, 1.82, 0.1);
          g.add(bando);
        } else if (cfg.accessory === 1) { // Topi Kasir Visor
          const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.52, 0.16, 20), new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.4 }));
          hatBase.position.set(0, 2.26, 0);
          const visor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.32), new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.4 }));
          visor.position.set(0, 2.21, 0.36);
          visor.rotation.x = 0.2;
          g.add(hatBase, visor);
        } else if (cfg.accessory === 2) { // Anting Emas
          const earMat = new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.3, metalness: 0.6 });
          const earL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 10), earMat);
          earL.position.set(-0.68, 1.5, 0);
          const earR = earL.clone(); earR.position.x = 0.68;
          g.add(earL, earR);
        }
      } else {
        if (cfg.accessory === 0) { // Topi Kasir Visor
          const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.54, 0.16, 20), new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.4 }));
          hatBase.position.set(0, 2.26, 0);
          const visor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.32), new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.4 }));
          visor.position.set(0, 2.21, 0.36);
          visor.rotation.x = 0.2;
          g.add(hatBase, visor);
        } else if (cfg.accessory === 1) { // Kacamata Keren
          const glassMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3 });
          const rimL = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 16), glassMat);
          rimL.position.set(-0.21, 1.58, 0.61);
          const rimR = rimL.clone(); rimR.position.x = 0.21;
          const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.02), glassMat);
          bridge.position.set(0, 1.58, 0.61);
          g.add(rimL, rimR, bridge);
        }
      }

      if (options.hasBasket) {
        const basket = createShoppingBasket();
        basket.position.set(-0.45, 0.65, 0.25);
        g.add(basket);
      }

      return g;
    }

    // ==========================================
    // 6. SCENE CHARACTERS & GENDER PREVIEWS
    // ==========================================
    let cashierChibi = null;
    let customerChibi = null;

    const genderSelectGroup = new THREE.Group();
    scene.add(genderSelectGroup);
    genderSelectGroup.visible = false;

    let previewFemaleModel = null;
    let previewMaleModel = null;

    function initGenderPreviewModels() {
      if (previewFemaleModel) genderSelectGroup.remove(previewFemaleModel);
      if (previewMaleModel) genderSelectGroup.remove(previewMaleModel);

      previewFemaleModel = buildChibiModel({
        gender: 'female',
        skinColor: SKIN_TONES[0],
        hairStyle: 0,
        hairColor: FEMALE_HAIR_COLORS[0],
        outfitColor: FEMALE_OUTFITS[0].primary,
        accessory: 0
      });
      previewFemaleModel.position.set(-1.35, 0, 0);

      previewMaleModel = buildChibiModel({
        gender: 'male',
        skinColor: SKIN_TONES[0],
        hairStyle: 0,
        hairColor: MALE_HAIR_COLORS[0],
        outfitColor: MALE_OUTFITS[0].primary,
        accessory: 0
      });
      previewMaleModel.position.set(1.35, 0, 0);

      genderSelectGroup.add(previewFemaleModel, previewMaleModel);
    }
    initGenderPreviewModels();

    function updateCashierModel() {
      if (cashierChibi) interiorGroup.remove(cashierChibi);
      cashierChibi = buildChibiModel(playerConfig);

      if (gameState.screen === 'dressup') {
        cashierChibi.position.set(-0.85, 0, 0.8);
      } else {
        cashierChibi.position.set(0, 0, -1.1);
        cashierChibi.rotation.y = 0;
      }
      interiorGroup.add(cashierChibi);
    }

    // Customer Spawning Logic
    function spawnCustomer(idx) {
      if (customerChibi) interiorGroup.remove(customerChibi);

      const isGirl = Math.random() > 0.5;
      const names = isGirl ? ['Rina', 'Maya', 'Siti', 'Dewi', 'Tiara'] : ['Budi', 'Dimas', 'Eko', 'Rian', 'Fajar'];
      const custName = names[idx % names.length];
      gameState.currentCustName = custName;
      document.getElementById('custTag').textContent = custName;

      customerChibi = buildChibiModel({
        gender: isGirl ? 'female' : 'male',
        skinColor: SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)],
        hairStyle: Math.floor(Math.random() * 3),
        hairColor: isGirl ? FEMALE_HAIR_COLORS[Math.floor(Math.random() * 3)] : MALE_HAIR_COLORS[Math.floor(Math.random() * 3)],
        outfitColor: isGirl ? FEMALE_OUTFITS[Math.floor(Math.random() * 3)].primary : MALE_OUTFITS[Math.floor(Math.random() * 3)].primary,
        accessory: 0
      }, { hasBasket: true });

      customerChibi.position.set(-6.6, 0, 1.6);
      customerChibi.rotation.y = Math.PI / 2;
      interiorGroup.add(customerChibi);

      gameState.customerState = 'walking_in';
      sound.playDoor();

      // Customer items
      const itemCount = 2 + Math.floor(Math.random() * 3);
      const shuffled = [...ITEM_CATALOG].sort(() => 0.5 - Math.random());
      gameState.currentCustItems = shuffled.slice(0, itemCount);
      gameState.scannedIds = [];

      renderPosItems();
      buildItems3D();
    }

    function buildItems3D() {
      while (items3DGroup.children.length > 0) {
        items3DGroup.remove(items3DGroup.children[0]);
      }
      gameState.currentCustItems.forEach((item, idx) => {
        let geo;
        if (item.shape === 'cylinder') geo = new THREE.CylinderGeometry(0.14, 0.14, 0.45, 16);
        else if (item.shape === 'sphere') geo = new THREE.SphereGeometry(0.18, 16, 16);
        else geo = new THREE.BoxGeometry(0.3, 0.42, 0.28);

        const mat = new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.4 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(-1.6 + idx * 0.46, 1.38, 0);
        mesh.userData = { id: item.id };
        items3DGroup.add(mesh);
      });
    }

    function renderPosItems() {
      const container = document.getElementById('itemsContainer');
      container.innerHTML = '';
      let total = 0;

      gameState.currentCustItems.forEach(item => {
        const isScanned = gameState.scannedIds.includes(item.id);
        if (isScanned) total += item.price;

        const div = document.createElement('div');
        div.className = 'item-card' + (isScanned ? ' scanned' : '');
        div.onclick = () => scanItem(item.id);
        div.innerHTML = '<span>' + item.name + '</span>' +
          '<div style="display:flex; align-items:center; gap:6px;">' +
          '<span>Rp' + item.price.toLocaleString('id-ID') + '</span>' +
          '<span class="item-check" style="display:' + (isScanned ? 'inline' : 'none') + ';">✓</span>' +
          '</div>';
        container.appendChild(div);
      });

      document.getElementById('totalDisplay').textContent = 'Rp' + total.toLocaleString('id-ID');
      const allScanned = gameState.currentCustItems.length > 0 && gameState.scannedIds.length === gameState.currentCustItems.length;
      document.getElementById('btnPay').classList.toggle('hidden', !allScanned);
    }

    function scanItem(itemId) {
      if (gameState.scannedIds.includes(itemId)) return;
      gameState.scannedIds.push(itemId);
      sound.playScan();

      const mesh = items3DGroup.children.find(m => m.userData && m.userData.id === itemId);
      if (mesh) {
        mesh.position.z += 0.32;
        mesh.material = new THREE.MeshStandardMaterial({ color: '#4ade80', roughness: 0.3, emissive: '#22c55e', emissiveIntensity: 0.4 });
      }

      renderPosItems();
    }

    // ==========================================
    // 7. PAYMENT & CHANGE LOGIC
    // ==========================================
    function openPaymentModal() {
      sound.playClick();
      const total = gameState.currentCustItems.reduce((acc, it) => acc + it.price, 0);
      
      let paid = Math.ceil(total / 10000) * 10000;
      if (paid === total) paid += 10000;
      if (paid - total > 30000) paid = total + 5000;
      gameState.customerPaid = paid;

      const exactChange = paid - total;

      document.getElementById('modalTotal').textContent = 'Rp' + total.toLocaleString('id-ID');
      document.getElementById('modalPaid').textContent = 'Rp' + paid.toLocaleString('id-ID');

      const wrong1 = Math.max(1000, exactChange + (Math.random() > 0.5 ? 5000 : -3000));
      const wrong2 = Math.max(2000, exactChange + (Math.random() > 0.5 ? 2000 : 8000));
      const choices = [exactChange, wrong1, wrong2].sort(() => 0.5 - Math.random());

      const container = document.getElementById('changeChoicesContainer');
      container.innerHTML = '';
      choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = 'Kembalian: Rp' + ch.toLocaleString('id-ID');
        btn.onclick = () => submitChange(ch === exactChange);
        container.appendChild(btn);
      });

      document.getElementById('pay-modal-overlay').classList.remove('hidden');
    }

    function showFloatingEmoji(emoji) {
      const fx = document.createElement('div');
      fx.className = 'float-fx';
      fx.textContent = emoji;
      fx.style.left = '50%';
      fx.style.top = '45%';
      document.body.appendChild(fx);
      setTimeout(() => fx.remove(), 1300);
    }

    function submitChange(isCorrect) {
      document.getElementById('pay-modal-overlay').classList.add('hidden');

      if (isCorrect) {
        sound.playSuccess();
        showFloatingEmoji('💖');
        const total = gameState.currentCustItems.reduce((acc, it) => acc + it.price, 0);
        gameState.earnings += total;
        gameState.correctCount++;
        document.getElementById('hudEarnings').textContent = 'Rp' + gameState.earnings.toLocaleString('id-ID');
        // Customer joy jump
        if (customerChibi) customerChibi.position.y += 0.35;
      } else {
        sound.playError();
        showFloatingEmoji('💦');
        gameState.wrongCount++;
      }

      gameState.customerState = 'walking_out';
      sound.playDoor();

      setTimeout(() => {
        gameState.customerIndex++;
        if (gameState.customerIndex >= 5) {
          finishDay();
        } else {
          document.getElementById('hudCustNum').textContent = gameState.customerIndex + 1;
          spawnCustomer(gameState.customerIndex);
        }
      }, 1600);
    }

    function finishDay() {
      gameState.screen = 'summary';
      document.getElementById('gameplay-overlay').classList.add('hidden');
      document.getElementById('summary-screen').classList.remove('hidden');

      document.getElementById('summaryCharName').textContent = playerConfig.name;
      document.getElementById('sumEarnings').textContent = 'Rp' + gameState.earnings.toLocaleString('id-ID');
      document.getElementById('sumCorrect').textContent = gameState.correctCount + ' / 5';
      document.getElementById('sumWrong').textContent = gameState.wrongCount;
    }

    function restartDay() {
      sound.playClick();
      gameState.earnings = 0;
      gameState.customerIndex = 0;
      gameState.correctCount = 0;
      gameState.wrongCount = 0;
      document.getElementById('hudEarnings').textContent = 'Rp0';
      document.getElementById('hudCustNum').textContent = '1';
      document.getElementById('summary-screen').classList.add('hidden');
      startGameplay();
    }

    // ==========================================
    // 8. SCREEN FLOW & CAMERA RESET
    // ==========================================
    function resetCamera() {
      sound.playClick();
      if (gameState.screen === 'menu') {
        camera.position.set(0, 4.2, 10.5);
        controls.target.set(0, 3.2, -2.5);
      } else if (gameState.screen === 'gender') {
        camera.position.set(0, 2.1, 5.2);
        controls.target.set(0, 1.15, 0);
      } else if (gameState.screen === 'dressup') {
        camera.position.set(-0.35, 1.9, 4.8);
        controls.target.set(-0.35, 1.15, 0);
      } else {
        camera.position.set(0, 4.2, 7.2);
        controls.target.set(0, 1.2, 0);
      }
      controls.update();
    }

    function setScreen(newScreen) {
      gameState.screen = newScreen;
      document.getElementById('menu-screen').classList.toggle('hidden', newScreen !== 'menu');
      document.getElementById('gender-screen').classList.toggle('hidden', newScreen !== 'gender');
      document.getElementById('dressup-screen').classList.toggle('hidden', newScreen !== 'dressup');
      document.getElementById('gameplay-overlay').classList.toggle('hidden', newScreen !== 'gameplay');
      document.getElementById('summary-screen').classList.toggle('hidden', newScreen !== 'summary');

      if (newScreen === 'menu') {
        storefrontGroup.visible = true;
        interiorGroup.visible = false;
        genderSelectGroup.visible = false;
        scene.background = new THREE.Color('#38bdf8');
        camera.position.set(0, 4.2, 10.5);
        controls.target.set(0, 3.2, -2.5);
      } else if (newScreen === 'gender') {
        storefrontGroup.visible = false;
        interiorGroup.visible = true;
        genderSelectGroup.visible = true;
        scene.background = new THREE.Color('#fff1f2');
        if (cashierChibi) cashierChibi.visible = false;
        camera.position.set(0, 2.1, 5.2);
        controls.target.set(0, 1.15, 0);
      } else if (newScreen === 'dressup') {
        storefrontGroup.visible = false;
        interiorGroup.visible = true;
        genderSelectGroup.visible = false;
        scene.background = new THREE.Color('#fff1f2');
        updateCashierModel();
        if (cashierChibi) cashierChibi.visible = true;
        camera.position.set(-0.35, 1.9, 4.8);
        controls.target.set(-0.35, 1.15, 0);
        buildDressUpUI();
      } else if (newScreen === 'gameplay') {
        storefrontGroup.visible = false;
        interiorGroup.visible = true;
        genderSelectGroup.visible = false;
        scene.background = new THREE.Color('#fff1f2');
        updateCashierModel();
        if (cashierChibi) cashierChibi.visible = true;
        camera.position.set(0, 4.2, 7.2);
        controls.target.set(0, 1.2, 0);
        document.getElementById('hudName').textContent = playerConfig.name;
        spawnCustomer(0);
      }
      controls.update();
    }

    function goToGenderSelect() {
      sound.playClick();
      setScreen('gender');
    }

    function onHoverGender(gender, isHover) {
      const target = gender === 'female' ? previewFemaleModel : previewMaleModel;
      if (target) {
        target.scale.setScalar(isHover ? 1.12 : 1.0);
      }
    }

    function selectGender(gender) {
      sound.playClick();
      playerConfig.gender = gender;
      playerConfig.hairColor = gender === 'female' ? FEMALE_HAIR_COLORS[0] : MALE_HAIR_COLORS[0];
      playerConfig.outfitColor = gender === 'female' ? FEMALE_OUTFITS[0].primary : MALE_OUTFITS[0].primary;
      playerConfig.hairStyle = 0;
      playerConfig.accessory = 0;
      playerConfig.name = gender === 'female' ? 'Alya' : 'Rian';
      document.getElementById('nameInput').value = playerConfig.name;
      setScreen('dressup');
    }

    function goToDressUp() {
      sound.playClick();
      setScreen('dressup');
    }

    function startGameplay() {
      sound.playClick();
      setScreen('gameplay');
    }

    function updateCharName(val) {
      playerConfig.name = val || (playerConfig.gender === 'female' ? 'Alya' : 'Rian');
    }

    // ==========================================
    // 9. DRESS UP DRAWER UI GENERATOR
    // ==========================================
    function buildDressUpUI() {
      // 1. Skin swatches
      const skinBox = document.getElementById('skinSwatches');
      skinBox.innerHTML = '';
      SKIN_TONES.forEach(tone => {
        const sw = document.createElement('span');
        sw.className = 'color-swatch' + (playerConfig.skinColor === tone ? ' active' : '');
        sw.style.backgroundColor = tone;
        sw.onclick = () => {
          playerConfig.skinColor = tone;
          updateCashierModel();
          buildDressUpUI();
        };
        skinBox.appendChild(sw);
      });

      // 2. Hair styles
      const hairStyles = playerConfig.gender === 'female' ? ['Panjang Bergelombang', 'Cute Ponytail', 'Layered Bob'] : ['Pendek Rapi', 'Spiky Anime', 'Klimis'];
      const hairStyleBox = document.getElementById('hairStyleChips');
      hairStyleBox.innerHTML = '';
      hairStyles.forEach((name, idx) => {
        const chip = document.createElement('button');
        chip.className = 'btn-chip' + (playerConfig.hairStyle === idx ? ' active' : '');
        chip.textContent = name;
        chip.onclick = () => {
          playerConfig.hairStyle = idx;
          updateCashierModel();
          buildDressUpUI();
        };
        hairStyleBox.appendChild(chip);
      });

      // 3. Hair colors
      const hairColors = playerConfig.gender === 'female' ? FEMALE_HAIR_COLORS : MALE_HAIR_COLORS;
      const hairColorBox = document.getElementById('hairColorSwatches');
      hairColorBox.innerHTML = '';
      hairColors.forEach(col => {
        const sw = document.createElement('span');
        sw.className = 'color-swatch' + (playerConfig.hairColor === col ? ' active' : '');
        sw.style.backgroundColor = col;
        sw.onclick = () => {
          playerConfig.hairColor = col;
          updateCashierModel();
          buildDressUpUI();
        };
        hairColorBox.appendChild(sw);
      });

      // 4. Outfits
      const outfits = playerConfig.gender === 'female' ? FEMALE_OUTFITS : MALE_OUTFITS;
      const outfitBox = document.getElementById('outfitChips');
      outfitBox.innerHTML = '';
      outfits.forEach(outfit => {
        const chip = document.createElement('button');
        chip.className = 'btn-chip' + (playerConfig.outfitColor === outfit.primary ? ' active' : '');
        chip.textContent = outfit.name;
        chip.onclick = () => {
          playerConfig.outfitColor = outfit.primary;
          updateCashierModel();
          buildDressUpUI();
        };
        outfitBox.appendChild(chip);
      });

      // 5. Accessories
      const accList = playerConfig.gender === 'female' ? ['Bando Manis', 'Topi Kasir', 'Anting Emas'] : ['Topi Kasir', 'Kacamata Keren', 'Tanpa Aksesori'];
      const accBox = document.getElementById('accChips');
      accBox.innerHTML = '';
      accList.forEach((name, idx) => {
        const chip = document.createElement('button');
        chip.className = 'btn-chip' + (playerConfig.accessory === idx ? ' active' : '');
        chip.textContent = name;
        chip.onclick = () => {
          playerConfig.accessory = idx;
          updateCashierModel();
          buildDressUpUI();
        };
        accBox.appendChild(chip);
      });
    }

    // ==========================================
    // 10. ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      controls.update();

      // Main menu ambient cloud animation
      if (gameState.screen === 'menu') {
        cloudsGroup.children.forEach((c, idx) => {
          c.position.x += delta * 0.4;
          if (c.position.x > 18) c.position.x = -18;
        });
      }

      // Gender Select Preview Models gentle bobbing & slow auto-rotation
      if (gameState.screen === 'gender') {
        if (previewFemaleModel) {
          previewFemaleModel.position.y = Math.sin(time * 2.2) * 0.02;
          previewFemaleModel.rotation.y = Math.sin(time * 0.8) * 0.2;
        }
        if (previewMaleModel) {
          previewMaleModel.position.y = Math.sin(time * 2.2 + 1) * 0.02;
          previewMaleModel.rotation.y = Math.sin(time * 0.8 + 1) * 0.2;
        }
      }

      // Sliding door animation
      const shouldOpenDoor = (gameState.customerState === 'walking_in' && customerChibi && customerChibi.position.x < -3.5) ||
                             (gameState.customerState === 'walking_out' && customerChibi && customerChibi.position.x > 3.5);
      const targetDoorZOffset = shouldOpenDoor ? 0.7 : 0;
      doorL.position.z += (1.05 - targetDoorZOffset - doorL.position.z) * 0.15;
      doorR.position.z += (2.15 + targetDoorZOffset - doorR.position.z) * 0.15;

      // Customer walking animation
      if (customerChibi && gameState.screen === 'gameplay') {
        if (gameState.customerState === 'walking_in') {
          customerChibi.position.x += delta * 3.4;
          customerChibi.position.y = Math.abs(Math.sin(time * 8)) * 0.12;
          if (customerChibi.position.x >= -0.2) {
            customerChibi.position.x = -0.2;
            customerChibi.position.y = 0;
            customerChibi.rotation.y = 0;
            gameState.customerState = 'waiting';
          }
        } else if (gameState.customerState === 'walking_out') {
          customerChibi.rotation.y = -Math.PI / 2;
          customerChibi.position.x += delta * 4.2;
          customerChibi.position.y = Math.abs(Math.sin(time * 8)) * 0.12;
        }
      }

      // Cashier idle breathing
      if (cashierChibi && (gameState.screen === 'gameplay' || gameState.screen === 'dressup')) {
        cashierChibi.position.y = Math.sin(time * 2.2) * 0.025;
      }

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    setScreen('menu');
  </script>
</body>
</html>`;
}
