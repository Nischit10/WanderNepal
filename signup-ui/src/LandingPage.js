import React, { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Jost', sans-serif;
    background: #0a0e1a;
    color: #e8e0d0;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 60px;
    background: linear-gradient(to bottom, rgba(10,14,26,0.95), transparent);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    letter-spacing: 1px;
    color: #e8e0d0;
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    color: #b0a898;
    text-decoration: none;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: #e8e0d0; }
  .nav-btn {
    background: transparent;
    border: 1px solid rgba(232,224,208,0.4);
    color: #e8e0d0;
    padding: 10px 28px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 2px;
  }
  .nav-btn:hover {
    background: rgba(232,224,208,0.1);
    border-color: rgba(232,224,208,0.8);
  }

  /* HERO */
  .hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 80%, rgba(11,61,145,0.25) 0%, transparent 60%),
      linear-gradient(180deg, #0a0e1a 0%, #0d1829 40%, #1a2a4a 70%, #0d1829 100%);
  }

  /* SVG mountain inside hero */
  .hero-mountain {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    width: 100%;
    height: 65%;
  }

  /* stars */
  .stars {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 40% 20%, rgba(255,255,255,0.8) 0%, transparent 100%),
      radial-gradient(1px 1px at 55% 5%, rgba(255,255,255,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 18%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 85% 10%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 35%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 35% 40%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 5% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 78% 38%, rgba(255,255,255,0.3) 0%, transparent 100%);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 20px;
  }
  .hero-eyebrow {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #7a9cc7;
    margin-bottom: 20px;
    opacity: 0;
    animation: fadeUp 1s 0.3s forwards;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(56px, 8vw, 110px);
    font-weight: 400;
    line-height: 1.0;
    color: #e8e0d0;
    margin-bottom: 10px;
    opacity: 0;
    animation: fadeUp 1s 0.5s forwards;
  }
  .hero-title em {
    font-style: italic;
    color: #7a9cc7;
  }
  .hero-subtitle {
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 1px;
    color: #8a8278;
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeUp 1s 0.7s forwards;
  }
  .hero-ctas {
    display: flex;
    gap: 16px;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 1s 0.9s forwards;
  }
  .btn-primary {
    background: #0b3d91;
    color: #e8e0d0;
    border: none;
    padding: 14px 40px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-primary:hover { background: #0e50be; transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    color: #e8e0d0;
    border: 1px solid rgba(232,224,208,0.3);
    padding: 14px 40px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-outline:hover { border-color: rgba(232,224,208,0.8); transform: translateY(-2px); }

  /* SCROLL INDICATOR */
  .scroll-indicator {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeUp 1s 1.2s forwards;
  }
  .scroll-line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, transparent, rgba(232,224,208,0.4));
    animation: scrollPulse 2s infinite;
  }
  .scroll-text {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #5a5450;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  /* STATS STRIP */
  .stats-strip {
    background: #0d1829;
    border-top: 1px solid rgba(122,156,199,0.15);
    border-bottom: 1px solid rgba(122,156,199,0.15);
    padding: 40px 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  .stat-item {
    text-align: center;
    padding: 0 20px;
    border-right: 1px solid rgba(122,156,199,0.1);
  }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 400;
    color: #e8e0d0;
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #5a6880;
  }

  /* SECTION SHARED */
  .section {
    padding: 120px 60px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-eyebrow {
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #7a9cc7;
    margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 400;
    color: #e8e0d0;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  .section-body {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.9;
    color: #7a7268;
    max-width: 520px;
  }

  /* TREKS GRID */
  .treks-section {
    background: #080c18;
    padding: 120px 60px;
  }
  .treks-header {
    max-width: 1200px;
    margin: 0 auto 64px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .treks-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .trek-card {
    background: #0d1829;
    border: 1px solid rgba(122,156,199,0.1);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s;
    position: relative;
  }
  .trek-card:hover {
    border-color: rgba(122,156,199,0.35);
    transform: translateY(-6px);
  }
  .trek-card-visual {
    height: 200px;
    position: relative;
    overflow: hidden;
  }
  .trek-card-content {
    padding: 24px;
  }
  .trek-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #7a9cc7;
    border: 1px solid rgba(122,156,199,0.3);
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 12px;
  }
  .trek-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #e8e0d0;
    margin-bottom: 8px;
    font-weight: 400;
  }
  .trek-desc {
    font-size: 13px;
    color: #5a6880;
    line-height: 1.7;
    margin-bottom: 20px;
    font-weight: 300;
  }
  .trek-meta {
    display: flex;
    gap: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(122,156,199,0.08);
  }
  .trek-meta-item {
    font-size: 12px;
    color: #4a5668;
    letter-spacing: 0.5px;
  }
  .trek-meta-value {
    display: block;
    font-size: 14px;
    color: #a0a898;
    margin-top: 2px;
    font-weight: 400;
  }

  /* FEATURES */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(122,156,199,0.08);
    border: 1px solid rgba(122,156,199,0.08);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 80px;
  }
  .feature-item {
    background: #080c18;
    padding: 48px 40px;
    transition: background 0.3s;
  }
  .feature-item:hover { background: #0d1829; }
  .feature-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
    color: #7a9cc7;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #e8e0d0;
    margin-bottom: 10px;
    font-weight: 400;
  }
  .feature-desc {
    font-size: 14px;
    color: #5a6880;
    line-height: 1.8;
    font-weight: 300;
  }

  /* CTA SECTION */
  .cta-section {
    background: linear-gradient(135deg, #0b3d91 0%, #051d4d 50%, #0a0e1a 100%);
    padding: 120px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(122,156,199,0.1) 0%, transparent 70%);
  }
  .cta-content { position: relative; z-index: 1; }
  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 400;
    color: #e8e0d0;
    margin-bottom: 20px;
    line-height: 1.1;
  }
  .cta-sub {
    font-size: 15px;
    color: #7a9cc7;
    margin-bottom: 48px;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  /* FOOTER */
  footer {
    background: #050810;
    padding: 60px 60px 40px;
    border-top: 1px solid rgba(122,156,199,0.08);
  }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #4a5668;
  }
  .footer-copy {
    font-size: 12px;
    color: #2a3040;
    letter-spacing: 1px;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.8; }
  }
`;

/* ---- SVG Mountain Scene ---- */
function MountainScene() {
  return (
    <svg
      className="hero-mountain"
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky glow behind peaks */}
      <defs>
        <radialGradient id="peakGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#1a3a6a" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dce8f5"/>
          <stop offset="100%" stopColor="#8aaacf"/>
        </linearGradient>
        <linearGradient id="midGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a4a"/>
          <stop offset="100%" stopColor="#0d1829"/>
        </linearGradient>
        <linearGradient id="fgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1e36"/>
          <stop offset="100%" stopColor="#0a0e1a"/>
        </linearGradient>
      </defs>

      {/* Glow */}
      <rect width="1440" height="500" fill="url(#peakGlow)"/>

      {/* Far background mountains */}
      <polygon points="200,400 380,160 560,400" fill="#0d1523" opacity="0.7"/>
      <polygon points="340,400 550,110 760,400" fill="#0f1a2e" opacity="0.8"/>
      <polygon points="700,400 880,140 1060,400" fill="#0d1523" opacity="0.7"/>
      <polygon points="980,400 1150,180 1320,400" fill="#0f1a2e" opacity="0.6"/>

      {/* Mid mountains */}
      <polygon points="0,500 180,280 360,500" fill="url(#midGrad)"/>
      <polygon points="160,500 420,200 680,500" fill="url(#midGrad)"/>
      <polygon points="500,500 720,230 940,500" fill="#0e1b30"/>
      <polygon points="760,500 1020,190 1280,500" fill="url(#midGrad)"/>
      <polygon points="1100,500 1320,250 1540,500" fill="url(#midGrad)"/>

      {/* Main Everest peak - center */}
      <polygon points="520,500 720,60 920,500" fill="#112040"/>
      {/* Snow cap */}
      <polygon points="680,130 720,60 760,130 740,125 720,90 700,125" fill="url(#snowGrad)" opacity="0.9"/>

      {/* Left major peak */}
      <polygon points="100,500 310,120 520,500" fill="#0f1d35"/>
      <polygon points="275,180 310,120 345,180 330,175 310,145 290,175" fill="url(#snowGrad)" opacity="0.7"/>

      {/* Right major peak */}
      <polygon points="920,500 1130,100 1340,500" fill="#0f1d35"/>
      <polygon points="1095,165 1130,100 1165,165 1148,158 1130,128 1112,158" fill="url(#snowGrad)" opacity="0.7"/>

      {/* Foreground ridge */}
      <polygon points="-10,500 0,420 200,380 400,420 600,370 800,410 1000,365 1200,405 1440,380 1450,500" fill="url(#fgGrad)"/>

      {/* Ground */}
      <rect x="0" y="460" width="1440" height="40" fill="#0a0e1a"/>
    </svg>
  );
}

/* ---- Trek Card SVG Illustrations ---- */
function EverestIllustration() {
  return (
    <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%',display:'block'}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ev1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2040"/>
          <stop offset="100%" stopColor="#070e1c"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#ev1)"/>
      <polygon points="80,200 200,30 320,200" fill="#0f1d35"/>
      <polygon points="150,200 200,60 250,200" fill="#162840"/>
      <polygon points="185,80 200,30 215,80 208,76 200,50 192,76" fill="#c8dcf0" opacity="0.85"/>
      <polygon points="0,200 80,120 160,200" fill="#0b1828"/>
      <polygon points="240,200 320,130 400,200" fill="#0b1828"/>
      <rect x="0" y="185" width="400" height="15" fill="#070e1c"/>
      {/* stars */}
      <circle cx="40" cy="25" r="1" fill="white" opacity="0.6"/>
      <circle cx="120" cy="15" r="1.2" fill="white" opacity="0.5"/>
      <circle cx="280" cy="20" r="1" fill="white" opacity="0.7"/>
      <circle cx="360" cy="10" r="1.2" fill="white" opacity="0.4"/>
      <circle cx="330" cy="50" r="0.8" fill="white" opacity="0.5"/>
    </svg>
  );
}

function AnnapurnaIllustration() {
  return (
    <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%',display:'block'}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="an1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1030"/>
          <stop offset="100%" stopColor="#070a18"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#an1)"/>
      <polygon points="0,200 140,80 280,200" fill="#150f28"/>
      <polygon points="120,200 220,50 340,200" fill="#1c1235"/>
      <polygon points="260,200 340,90 400,160 400,200" fill="#130e25"/>
      <polygon points="190,90 220,50 250,90 238,85 220,65 202,85" fill="#dde8f8" opacity="0.8"/>
      {/* Sunset tinge */}
      <polygon points="90,130 140,80 190,130" fill="#3a1a30" opacity="0.5"/>
      <rect x="0" y="185" width="400" height="15" fill="#070a18"/>
      <circle cx="60" cy="30" r="1.2" fill="white" opacity="0.5"/>
      <circle cx="310" cy="20" r="1" fill="white" opacity="0.6"/>
      <circle cx="380" cy="40" r="0.8" fill="white" opacity="0.4"/>
    </svg>
  );
}

function LangtangIllustration() {
  return (
    <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%',display:'block'}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lt1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081a20"/>
          <stop offset="100%" stopColor="#050e12"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#lt1)"/>
      <polygon points="0,200 100,100 200,200" fill="#0a1e25"/>
      <polygon points="100,200 240,70 380,200" fill="#0d2430"/>
      <polygon points="300,200 380,110 440,200" fill="#0a1e25"/>
      <polygon points="210,110 240,70 270,110 258,106 240,85 222,106" fill="#c0d8e8" opacity="0.8"/>
      {/* Trees suggestion at base */}
      <rect x="30" y="178" width="3" height="12" fill="#0d2c1a" opacity="0.7"/>
      <rect x="55" y="176" width="3" height="14" fill="#0d2c1a" opacity="0.6"/>
      <rect x="340" y="180" width="3" height="10" fill="#0d2c1a" opacity="0.7"/>
      <rect x="365" y="177" width="3" height="13" fill="#0d2c1a" opacity="0.6"/>
      <rect x="0" y="188" width="400" height="12" fill="#050e12"/>
      <circle cx="30" cy="18" r="1.2" fill="white" opacity="0.6"/>
      <circle cx="370" cy="25" r="1" fill="white" opacity="0.5"/>
    </svg>
  );
}

const treks = [
  {
    tag: "Classic",
    name: "Everest Base Camp",
    desc: "The world's most legendary trek. Journey through Sherpa villages to the foot of the highest mountain on Earth.",
    duration: "14 Days",
    altitude: "5,364 m",
    difficulty: "Challenging",
    Illustration: EverestIllustration,
  },
  {
    tag: "Circuit",
    name: "Annapurna Circuit",
    desc: "A complete circumnavigation offering staggering biodiversity — subtropical valleys to arctic high passes.",
    duration: "18 Days",
    altitude: "5,416 m",
    difficulty: "Moderate",
    Illustration: AnnapurnaIllustration,
  },
  {
    tag: "Hidden Gem",
    name: "Langtang Valley",
    desc: "Nepal's closest Himalayan trail to Kathmandu. Glaciers, yak pastures, and remote Tamang culture.",
    duration: "10 Days",
    altitude: "4,984 m",
    difficulty: "Moderate",
    Illustration: LangtangIllustration,
  },
];

const features = [
  {
    title: "Expert Sherpa Guides",
    desc: "Every trek is led by certified high-altitude guides with decades of mountain knowledge passed through generations.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="20" cy="12" r="6"/>
        <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
        <path d="M30 8l4 4-4 4"/>
      </svg>
    ),
  },
  {
    title: "Acclimatisation Planning",
    desc: "Scientifically designed itineraries with rest days built in to ensure your body adapts safely to altitude.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 4v10M20 26v10M4 20h10M26 20h10"/>
        <circle cx="20" cy="20" r="8"/>
        <circle cx="20" cy="20" r="3"/>
      </svg>
    ),
  },
  {
    title: "Small Group Expeditions",
    desc: "Maximum 8 trekkers per group. More personal, less impact, and a deeper connection to the landscapes you cross.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="14" cy="12" r="5"/>
        <circle cx="26" cy="12" r="5"/>
        <path d="M4 34c0-5.523 4.477-10 10-10"/>
        <path d="M26 24c5.523 0 10 4.477 10 10"/>
        <path d="M17 34c0-1.657 1.343-3 3-3s3 1.343 3 3"/>
      </svg>
    ),
  },
  {
    title: "Teahouse & Camping",
    desc: "Choose your style — cosy teahouse culture with local hosts, or wilderness camping beneath a sky full of stars.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 34L20 8l16 26H4z"/>
        <path d="M15 34v-8h10v8"/>
        <path d="M12 20h16"/>
      </svg>
    ),
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav" style={scrolled ? { background: "rgba(10,14,26,0.97)" } : {}}>
        <a href="/" className="nav-logo">Nepal Sanctuary</a>
        <ul className="nav-links">
          <li><a href="#treks">Treks</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#guides">Guides</a></li>
        </ul>
        <button className="nav-btn" onClick={() => window.location.href = "/signup"}>
          Begin Journey
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="stars"/>
        <MountainScene />
        <div className="hero-content">
          <p className="hero-eyebrow">Est. Kathmandu, Nepal</p>
          <h1 className="hero-title">
            Roof of<br/><em>the World</em>
          </h1>
          <p className="hero-subtitle">Guided Himalayan Treks · Curated Expeditions · Authentic Culture</p>
          <div className="hero-ctas">
            <a href="#treks" className="btn-primary">Explore Treks</a>
            <a href="/signup" className="btn-outline">Create Account</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        {[
          { number: "8,849", label: "Metres — Everest summit" },
          { number: "2,400+", label: "Expeditions completed" },
          { number: "94 %", label: "Summit success rate" },
          { number: "18", label: "Curated trek routes" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* TREKS */}
      <section className="treks-section" id="treks">
        <div className="treks-header">
          <div>
            <p className="section-eyebrow">Our Routes</p>
            <h2 className="section-title">Choose<br/>Your Summit</h2>
          </div>
          <p className="section-body" style={{ margin: 0 }}>
            Each trek is a world unto itself — different terrain, culture, and challenge.
            All share the same sky, the same silence, the same reward.
          </p>
        </div>

        <div className="treks-grid">
          {treks.map((trek) => (
            <div className="trek-card" key={trek.name}>
              <div className="trek-card-visual">
                <trek.Illustration />
              </div>
              <div className="trek-card-content">
                <span className="trek-tag">{trek.tag}</span>
                <h3 className="trek-name">{trek.name}</h3>
                <p className="trek-desc">{trek.desc}</p>
                <div className="trek-meta">
                  <div className="trek-meta-item">
                    Duration
                    <span className="trek-meta-value">{trek.duration}</span>
                  </div>
                  <div className="trek-meta-item">
                    Max Altitude
                    <span className="trek-meta-value">{trek.altitude}</span>
                  </div>
                  <div className="trek-meta-item">
                    Difficulty
                    <span className="trek-meta-value">{trek.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about" style={{ background: "#0a0e1a" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <p className="section-eyebrow">Our Philosophy</p>
            <h2 className="section-title">The Mountain<br/>Demands Respect</h2>
            <p className="section-body">
              Nepal Sanctuary was born from a belief that the Himalayas should be experienced
              slowly, responsibly, and deeply. We are not a tour operator — we are mountain
              companions who believe the journey is as sacred as the summit.
            </p>
            <p className="section-body" style={{ marginTop: 20 }}>
              Every itinerary we craft honours the land, the communities who call it home,
              and the trekkers who trust us with some of the most meaningful days of their lives.
            </p>
          </div>
          {/* Decorative element */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: "100%",
              aspectRatio: "4/3",
              background: "linear-gradient(135deg, #0d1829 0%, #112040 100%)",
              border: "1px solid rgba(122,156,199,0.1)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8,
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, color: "#0b3d91", opacity: 0.4, lineHeight: 1 }}>
                &#9651;
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, letterSpacing: 6, color: "#2a3a5a", textTransform: "uppercase" }}>
                Since 2018
              </div>
            </div>
            <div style={{
              position: "absolute",
              top: -16, right: -16,
              width: 120, height: 120,
              border: "1px solid rgba(122,156,199,0.08)",
              borderRadius: 4,
              zIndex: -1,
            }}/>
          </div>
        </div>

        <div className="features-grid" id="guides">
          {features.map((f) => (
            <div className="feature-item" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <p className="section-eyebrow" style={{ marginBottom: 20 }}>Ready to Begin?</p>
          <h2 className="cta-title">Your Himalayan<br/><em style={{ fontFamily: "'Playfair Display', serif" }}>Story Starts Here</em></h2>
          <p className="cta-sub">Create your account and start planning your expedition today.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/signup" className="btn-primary" style={{ background: "#e8e0d0", color: "#0a0e1a" }}>
              Create Account
            </a>
            <a href="/signin" className="btn-outline">Sign In</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">Nepal Sanctuary</div>
          <div className="footer-copy">© 2026 Nepal Sanctuary. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}