import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #fff; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 48px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .nav-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; text-decoration: none; }
  .nav-links { display: flex; gap: 28px; list-style: none; }
  .nav-links a { color: #444; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
  .nav-links a:hover { color: #1a6bff; }
  .nav-actions { display: flex; gap: 12px; align-items: center; }
  .btn-login { background: transparent; border: none; font-size: 14px; font-weight: 500; color: #444; cursor: pointer; padding: 8px 16px; }
  .btn-signup { background: #1a6bff; color: white; border: none; padding: 9px 22px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .btn-signup:hover { background: #0055ee; }

  .hero {
    position: relative; height: 100vh; min-height: 600px;
    display: flex; align-items: center;
    overflow: hidden;
    background: #0a1628;
  }
  .hero-bg-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
    z-index: 1;
  }
  .hero-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
  .hero-content { position: relative; z-index: 2; padding: 0 60px; max-width: 680px; margin-top: 60px; }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 6vw, 68px);
    font-weight: 700; color: white; line-height: 1.1; margin-bottom: 16px;
  }
  .hero-subtitle { font-size: 15px; color: rgba(255,255,255,0.82); line-height: 1.75; margin-bottom: 36px; max-width: 460px; font-weight: 400; }

  .search-bar {
    display: flex; align-items: center;
    background: white; border-radius: 50px;
    padding: 6px 6px 6px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    max-width: 560px;
  }
  .search-field { display: flex; flex-direction: column; flex: 1; padding: 4px 16px; border-right: 1px solid #e8e8e8; }
  .search-field:last-of-type { border-right: none; }
  .search-label { font-size: 10px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .search-input { border: none; outline: none; font-size: 13px; color: #1a1a1a; background: transparent; font-family: 'Inter', sans-serif; }
  .search-btn { background: #1a6bff; border: none; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  .search-btn:hover { background: #0055ee; }

  .section { padding: 80px 60px; max-width: 1200px; margin: 0 auto; }
  .section-eyebrow { font-size: 12px; font-weight: 600; color: #1a6bff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .section-title { font-size: clamp(28px, 3vw, 40px); font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
  .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; }
  .section-desc { font-size: 14px; color: #666; line-height: 1.7; max-width: 340px; text-align: right; }

  .dest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .dest-card { position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.3s; }
  .dest-card:hover { transform: scale(1.02); }
  .dest-card.large { height: 260px; }
  .dest-card.small { height: 180px; }
  .dest-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%); }
  .dest-card-info { position: absolute; bottom: 16px; left: 16px; color: white; }
  .dest-card-name { font-size: 18px; font-weight: 700; }
  .dest-card-sub { font-size: 12px; opacity: 0.85; margin-top: 2px; }
  .dest-card-tag { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); color: white; font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }

  .exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .exp-card { border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0; transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; background: white; }
  .exp-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
  .exp-card-img { height: 200px; position: relative; overflow: hidden; }
  .exp-card-tag { position: absolute; top: 12px; left: 12px; background: #1a6bff; color: white; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
  .exp-card-body { padding: 16px; }
  .exp-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .exp-stars { color: #f5a623; font-size: 13px; }
  .exp-rating-text { font-size: 12px; color: #888; }
  .exp-name { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; }
  .exp-desc { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 14px; }
  .exp-footer { display: flex; justify-content: space-between; align-items: center; }
  .exp-price { font-size: 20px; font-weight: 700; color: #1a1a1a; }
  .exp-link { font-size: 13px; color: #1a6bff; font-weight: 600; text-decoration: none; }

  .cta-banner { margin: 0 60px 80px; border-radius: 24px; overflow: hidden; position: relative; background: linear-gradient(135deg, #0a1628 0%, #1a3a6a 50%, #2d6a4f 100%); padding: 80px 60px; text-align: center; }
  .cta-banner-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(26,107,255,0.12) 0%, transparent 70%); }
  .cta-content { position: relative; z-index: 1; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(30px, 4vw, 50px); font-weight: 700; color: white; margin-bottom: 12px; }
  .cta-sub { font-size: 15px; color: rgba(255,255,255,0.72); margin-bottom: 32px; }
  .cta-btns { display: flex; gap: 16px; justify-content: center; }
  .cta-btn-primary { background: white; color: #1a1a1a; border: none; padding: 13px 32px; border-radius: 30px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; }
  .cta-btn-primary:hover { background: #f0f0f0; }
  .cta-btn-outline { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.45); padding: 13px 32px; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .cta-btn-outline:hover { border-color: white; }

  footer { background: #f8f8f8; border-top: 1px solid #eee; padding: 60px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; }
  .footer-logo { font-weight: 700; font-size: 18px; color: #1a1a1a; margin-bottom: 12px; }
  .footer-tagline { font-size: 13px; color: #888; line-height: 1.7; max-width: 220px; }
  .footer-col h4 { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; }
  .footer-col ul li a { font-size: 13px; color: #666; text-decoration: none; }
  .footer-col ul li a:hover { color: #1a6bff; }
  .newsletter-row { display: flex; gap: 8px; margin-top: 4px; }
  .newsletter-input { flex: 1; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; outline: none; font-family: 'Inter', sans-serif; }
  .newsletter-btn { background: #1a6bff; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .footer-bottom { max-width: 1200px; margin: 32px auto 0; padding-top: 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; font-size: 12px; color: #aaa; }
  .footer-bottom a { color: #aaa; text-decoration: none; margin-left: 16px; }
`;

function HeroScene() {
  return (
    <svg className="hero-svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628"/>
          <stop offset="45%" stopColor="#1a3a6a"/>
          <stop offset="100%" stopColor="#2d6a4f"/>
        </linearGradient>
        <linearGradient id="hsnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#b8d4f0"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#hsky)"/>
      {[[100,55],[260,30],[420,75],[600,20],[760,50],[920,35],[1080,65],[1250,28],[1400,45]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%2===0?1.5:1} fill="white" opacity="0.45"/>
      ))}
      <polygon points="0,500 140,280 280,500" fill="#0b1c35" opacity="0.6"/>
      <polygon points="180,500 360,230 540,500" fill="#0e2240" opacity="0.65"/>
      <polygon points="480,500 660,260 840,500" fill="#0b1c35" opacity="0.6"/>
      <polygon points="800,500 980,210 1160,500" fill="#0e2240" opacity="0.65"/>
      <polygon points="1100,500 1280,250 1460,500" fill="#0b1c35" opacity="0.6"/>
      <polygon points="440,800 720,100 1000,800" fill="#112040"/>
      <polygon points="690,175 720,100 750,175 737,168 720,135 703,168" fill="url(#hsnow)" opacity="0.95"/>
      <polygon points="60,800 280,190 500,800" fill="#0f1d38"/>
      <polygon points="252,252 280,190 308,252 295,245 280,215 265,245" fill="url(#hsnow)" opacity="0.82"/>
      <polygon points="940,800 1160,170 1380,800" fill="#0f1d38"/>
      <polygon points="1132,235 1160,170 1188,235 1174,228 1160,198 1146,228" fill="url(#hsnow)" opacity="0.82"/>
      <polygon points="-10,800 0,690 220,650 500,668 720,640 940,662 1200,652 1440,668 1450,800" fill="#1b4332"/>
      <rect x="0" y="760" width="1440" height="40" fill="#122e22"/>
      {[70,150,230,330,430,550,670,800,950,1080,1200,1330].map((x,i)=>(
        <polygon key={i} points={`${x},675 ${x+10},648 ${x+20},675`} fill="#0d2318" opacity="0.8"/>
      ))}
    </svg>
  );
}

function DestIllustration({ type }) {
  const map = {
    kathmandu: { bg: "#8B4513", mid: "#C4A35A", top: "#DEB887" },
    pokhara: { bg: "#2d6a4f", mid: "#40916c", top: "#74c69d" },
    everest: { bg: "#0a1628", mid: "#1a3a6a", top: "#4a7ab5" },
    lumbini: { bg: "#7B5E3A", mid: "#C4A35A", top: "#DEB887" },
    chitwan: { bg: "#1B4332", mid: "#40916c", top: "#74c69d" },
    mustang: { bg: "#2C1810", mid: "#8B4513", top: "#A0522D" },
  };
  const c = map[type] || map.everest;
  return (
    <svg viewBox="0 0 400 260" style={{ width: "100%", height: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill={c.bg}/>
      <polygon points="0,260 160,100 320,260" fill={c.mid} opacity="0.85"/>
      <polygon points="160,260 280,130 400,260" fill={c.top} opacity="0.7"/>
      <polygon points="200,260 280,160 360,260" fill={c.bg} opacity="0.5"/>
      {type === "kathmandu" && <>
        <rect x="150" y="110" width="100" height="100" fill={c.mid}/>
        <polygon points="140,110 200,70 260,110" fill={c.top}/>
        <rect x="178" y="140" width="18" height="60" fill="#8B6914"/>
        <rect x="204" y="140" width="18" height="60" fill="#8B6914"/>
      </>}
      {type === "pokhara" && <>
        <ellipse cx="200" cy="175" rx="220" ry="35" fill="#3a7bd5" opacity="0.4"/>
        <polygon points="120,170 200,80 280,170" fill="white" opacity="0.85"/>
        <polygon points="178,170 230,110 282,170" fill="white" opacity="0.65"/>
      </>}
      {type === "everest" && <>
        <polygon points="160,260 240,80 320,260" fill={c.mid}/>
        <polygon points="218,115 240,80 262,115 252,109 240,90 228,109" fill="white" opacity="0.9"/>
      </>}
      {type === "lumbini" && <>
        <rect x="160" y="90" width="80" height="120" fill={c.mid}/>
        <polygon points="150,90 200,55 250,90" fill={c.top}/>
        <circle cx="200" cy="55" r="8" fill="#FFD700" opacity="0.8"/>
      </>}
      {type === "chitwan" && <>
        <circle cx="100" cy="90" r="50" fill={c.mid}/>
        <circle cx="220" cy="80" r="60" fill={c.top}/>
        <circle cx="340" cy="95" r="45" fill={c.mid}/>
      </>}
      {type === "mustang" && <>
        <rect x="150" y="100" width="100" height="120" fill={c.mid}/>
        <polygon points="140,100 200,65 260,100" fill={c.top}/>
        <circle cx="320" cy="50" r="22" fill="#FF8C00" opacity="0.45"/>
      </>}
      <rect x="0" y="230" width="400" height="30" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

function ExpIllustration({ type }) {
  const scenes = {
    basecamp: { bg: "#0a1628", mid: "#112040", peak: "#1a3a6a" },
    annapurna: { bg: "#1a2a4a", mid: "#1f3560", peak: "#243870" },
    heritage: { bg: "#7B4A1A", mid: "#C4935A", peak: "#DEB87A" },
  };
  const c = scenes[type] || scenes.basecamp;
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill={c.bg}/>
      <polygon points="60,200 200,40 340,200" fill={c.mid}/>
      <polygon points="172,100 200,40 228,100 216,94 200,65 184,94" fill="white" opacity="0.9"/>
      <polygon points="0,200 80,120 160,200" fill={c.peak} opacity="0.8"/>
      <polygon points="240,200 320,130 400,200" fill={c.peak} opacity="0.8"/>
      {type === "basecamp" && <>
        <polygon points="172,200 200,168 228,200" fill="#c0392b" opacity="0.85"/>
        <rect x="197" y="168" width="4" height="18" fill="#999"/>
      </>}
      {type === "heritage" && <>
        <rect x="160" y="100" width="80" height="80" fill={c.mid}/>
        <polygon points="152,100 200,68 248,100" fill={c.peak}/>
        <rect x="183" y="120" width="15" height="50" fill="#8B6914"/>
        <rect x="202" y="120" width="15" height="50" fill="#8B6914"/>
      </>}
      <rect x="0" y="188" width="400" height="12" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

const destinations = [
  { id: "kathmandu", name: "Kathmandu", sub: "The City of Temples", tag: "Cultural", size: "large" },
  { id: "pokhara", name: "Pokhara", sub: "Tranquility by the Lake", tag: "Nature", size: "large" },
  { id: "everest", name: "Everest", sub: "Safe & Work", tag: "Adventure", size: "small" },
  { id: "lumbini", name: "Lumbini", sub: "Birthplace of Buddha", tag: "Heritage", size: "small" },
  { id: "chitwan", name: "Chitwan", sub: "Safe & Work", tag: "Wildlife", size: "small" },
  { id: "mustang", name: "Mustang", sub: "The Forbidden Kingdom", tag: "Remote", size: "small" },
];

const experiences = [
  { type: "basecamp", tag: "Trek", name: "Everest Base Camp Trek", desc: "The ultimate trekking journey through Sherpa villages to the foot of the world.", rating: "4.9", reviews: "712", price: "$1,299" },
  { type: "annapurna", tag: "Circuit", name: "Annapurna Sanctuary", desc: "Experience the natural amphitheater of towering Himalayan peaks and local hospitality.", rating: "4.8", reviews: "534", price: "$950" },
  { type: "heritage", tag: "Cultural", name: "Cultural Heritage Tour", desc: "Explore the UNESCO World Heritage sites of the Kathmandu Valley and spiritual Lumbini.", rating: "4.9", reviews: "6", price: "$780" },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{styles}</style>

      <nav className="nav">
        <a href="/" className="nav-logo">Nepal Sanctuary</a>
        <ul className="nav-links">
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#experiences">Tours</a></li>
          <li><a href="#experiences">Packages</a></li>
          <li><a href="#cta">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-login" onClick={() => window.location.href = "/signin"}>Login</button>
          <button className="btn-signup" onClick={() => window.location.href = "/signup"}>Sign Up</button>
        </div>
      </nav>

      <section className="hero">
        <HeroScene />
        <div className="hero-bg-overlay"/>
        <div className="hero-content">
          <h1 className="hero-title">Explore the Beauty of Nepal</h1>
          <p className="hero-subtitle">Experience breathtaking trekking, ancient culture, and unforgettable landscapes — from the peaks of Everest to the jungles of Chitwan.</p>
          <div className="search-bar">
            <div className="search-field">
              <span className="search-label">Destination</span>
              <input className="search-input" placeholder="Where to go?"/>
            </div>
            <div className="search-field">
              <span className="search-label">Date</span>
              <input className="search-input" placeholder="When?"/>
            </div>
            <div className="search-field">
              <span className="search-label">Budget</span>
              <input className="search-input" placeholder="Max budget"/>
            </div>
            <button className="search-btn">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div style={{ background: "#fff" }} id="destinations">
        <div className="section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Curated Journeys</p>
              <h2 className="section-title">Featured Destinations</h2>
            </div>
            <p className="section-desc">Hand-picked spiritual and natural wonders curated by local experts for an authentic Nepalese encounter.</p>
          </div>
          <div className="dest-grid">
            {destinations.slice(0, 2).map((d) => (
              <div key={d.id} className="dest-card large">
                <div style={{ width: "100%", height: "100%" }}><DestIllustration type={d.id}/></div>
                <div className="dest-card-overlay"/>
                <span className="dest-card-tag">{d.tag}</span>
                <div className="dest-card-info">
                  <div className="dest-card-name">{d.name}</div>
                  <div className="dest-card-sub">{d.sub}</div>
                </div>
              </div>
            ))}
            {destinations.slice(2).map((d) => (
              <div key={d.id} className="dest-card small">
                <div style={{ width: "100%", height: "100%" }}><DestIllustration type={d.id}/></div>
                <div className="dest-card-overlay"/>
                <span className="dest-card-tag" style={{ fontSize: "9px" }}>{d.tag}</span>
                <div className="dest-card-info">
                  <div className="dest-card-name" style={{ fontSize: "15px" }}>{d.name}</div>
                  <div className="dest-card-sub">{d.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#fafafa" }} id="experiences">
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">Unforgettable Experiences</h2>
            <div style={{ width: 48, height: 3, background: "#1a6bff", margin: "12px auto 0", borderRadius: 2 }}/>
          </div>
          <div className="exp-grid">
            {experiences.map((e) => (
              <div key={e.name} className="exp-card">
                <div className="exp-card-img">
                  <ExpIllustration type={e.type}/>
                  <span className="exp-card-tag">{e.tag}</span>
                </div>
                <div className="exp-card-body">
                  <div className="exp-rating">
                    <span className="exp-stars">★★★★★</span>
                    <span className="exp-rating-text">{e.rating} ({e.reviews} reviews)</span>
                  </div>
                  <div className="exp-name">{e.name}</div>
                  <div className="exp-desc">{e.desc}</div>
                  <div className="exp-footer">
                    <span className="exp-price">{e.price}</span>
                    <a href="#" className="exp-link">View Details →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="cta">
        <div className="cta-banner">
          <div className="cta-banner-overlay"/>
          <div className="cta-content">
            <h2 className="cta-title">Book Your Adventure Now</h2>
            <p className="cta-sub">Connect with our local travel experts and design your perfect Nepalese getaway.</p>
            <div className="cta-btns">
              <button className="cta-btn-primary" onClick={() => window.location.href = "/signup"}>Start Planning</button>
              <button className="cta-btn-outline">Talk to Expert</button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Nepal Sanctuary</div>
            <p className="footer-tagline">Crafting authentic Nepalese experiences since 2018. We are your travel companions in the Himalayas.</p>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><a href="#">Kathmandu Valley</a></li>
              <li><a href="#">Everest Region</a></li>
              <li><a href="#">Annapurna Circuit</a></li>
              <li><a href="#">Chitwan Safari</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 12, lineHeight: 1.6 }}>Stay updated with our latest offers and trekking tips.</p>
            <div className="newsletter-row">
              <input className="newsletter-input" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}/>
              <button className="newsletter-btn">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nepal Sanctuary. All rights reserved.</span>
          <div><a href="#">Privacy</a><a href="#">Terms</a></div>
        </div>
      </footer>
    </>
  );
}
