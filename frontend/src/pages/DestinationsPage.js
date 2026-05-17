import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinations } from "../services/api";
import Navbar from "../components/Navbar";

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
  .nav-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; text-decoration: none; cursor: pointer; }
  .nav-links { display: flex; gap: 28px; list-style: none; }
  .nav-links a { color: #444; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; cursor: pointer; }
  .nav-links a:hover { color: #1a6bff; }
  .nav-links a.active { color: #1a6bff; border-bottom: 2px solid #1a6bff; padding-bottom: 2px; }
  .nav-actions { display: flex; gap: 12px; align-items: center; }
  .btn-login { background: transparent; border: none; font-size: 14px; font-weight: 500; color: #444; cursor: pointer; padding: 8px 16px; }
  .btn-signup { background: #1a6bff; color: white; border: none; padding: 9px 22px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-signup:hover { background: #0055ee; }

  .dest-hero {
    position: relative; height: 360px;
    display: flex; align-items: flex-end;
    overflow: hidden; background: #0a1628;
    margin-top: 65px;
  }
  .dest-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
  .dest-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 60%, transparent 100%);
  }
  .dest-hero-content { position: relative; z-index: 2; padding: 0 60px 52px; max-width: 1200px; width: 100%; }
  .dest-hero-eyebrow { font-size: 11px; font-weight: 600; color: #6fa3ff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .dest-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4.5vw, 52px); font-weight: 700; color: white; line-height: 1.1; margin-bottom: 12px; }
  .dest-hero-sub { font-size: 15px; color: rgba(255,255,255,0.72); max-width: 480px; line-height: 1.7; }

  .filter-bar {
    background: white; border-bottom: 1px solid #f0f0f0;
    padding: 0 60px;
    display: flex; align-items: center; gap: 4px;
    position: sticky; top: 65px; z-index: 50;
  }
  .filter-btn {
    padding: 16px 20px; border: none; background: none;
    font-size: 13px; font-weight: 500; color: #666;
    cursor: pointer; border-bottom: 2px solid transparent;
    transition: all 0.2s; white-space: nowrap; font-family: 'Inter', sans-serif;
  }
  .filter-btn:hover { color: #1a6bff; }
  .filter-btn.active { color: #1a6bff; border-bottom-color: #1a6bff; }

  .dest-content { max-width: 1200px; margin: 0 auto; padding: 48px 60px 80px; }
  .dest-count { font-size: 13px; color: #888; margin-bottom: 32px; }
  .dest-count span { font-weight: 600; color: #1a1a1a; }

  .dest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

  .dest-card {
    border-radius: 16px; overflow: hidden; cursor: pointer;
    border: 1px solid #f0f0f0;
    transition: transform 0.3s, box-shadow 0.3s;
    background: white;
  }
  .dest-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
  .dest-card-img { position: relative; height: 220px; overflow: hidden; background: #0a1628; }
  .dest-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .dest-card:hover .dest-card-img img { transform: scale(1.05); }
  .dest-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%); }
  .dest-card-tag {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.18); backdrop-filter: blur(8px);
    color: white; font-size: 10px; font-weight: 700;
    padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .dest-card-price-badge {
    position: absolute; bottom: 12px; right: 12px;
    background: white; color: #1a1a1a;
    font-size: 13px; font-weight: 700;
    padding: 5px 12px; border-radius: 20px;
  }
  .dest-card-body { padding: 18px 20px 20px; }
  .dest-card-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .dest-card-city { font-size: 12px; color: #888; }
  .dest-card-dot { width: 3px; height: 3px; border-radius: 50%; background: #ccc; }
  .dest-card-rating { display: flex; align-items: center; gap: 4px; }
  .dest-card-stars { color: #f5a623; font-size: 12px; }
  .dest-card-rating-num { font-size: 12px; color: #888; }
  .dest-card-name { font-size: 17px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; line-height: 1.3; }
  .dest-card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f4f4f4; }
  .dest-card-duration { font-size: 12px; color: #888; display: flex; align-items: center; gap: 5px; }
  .dest-card-link { font-size: 13px; color: #1a6bff; font-weight: 600; }

  /* Loading */
  .loading-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 0; gap: 16px; }
  .loading-spinner { width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a6bff; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 14px; color: #888; }

  /* Error */
  .error-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 0; gap: 16px; text-align: center; }
  .error-icon { font-size: 48px; }
  .error-title { font-size: 20px; font-weight: 700; color: #1a1a1a; }
  .error-msg { font-size: 14px; color: #888; }
  .retry-btn { margin-top: 8px; background: #1a6bff; color: white; border: none; padding: 10px 24px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .retry-btn:hover { background: #0055ee; }

  /* Skeleton */
  .skeleton-card { border-radius: 16px; overflow: hidden; border: 1px solid #f0f0f0; }
  .skeleton-img { height: 220px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
  .skeleton-body { padding: 18px 20px 20px; }
  .skeleton-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; margin-bottom: 10px; }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  footer { background: #f8f8f8; border-top: 1px solid #eee; padding: 48px 60px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; }
  .footer-copy { font-size: 12px; color: #aaa; }
`;

const FILTERS = ["All", "Trekking", "Cultural", "Easy", "Moderate", "Challenging"];

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line" style={{ width: "40%" }} />
        <div className="skeleton-line" style={{ width: "75%" }} />
        <div className="skeleton-line" style={{ width: "55%", marginTop: 14 }} />
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchData = () => {
    setLoading(true);
    setError(null);
    getDestinations()
      .then((data) => setDestinations(data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = destinations.filter((d) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Trekking") return d.difficulty && d.difficulty !== "Easy";
    if (activeFilter === "Cultural") return d.name.toLowerCase().includes("cultural") || d.name.toLowerCase().includes("kathmandu");
    return d.difficulty && d.difficulty.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <>
      <style>{styles}</style>

      <Navbar />

      {/* HERO */}
      <section className="dest-hero">
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1440 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1628"/>
              <stop offset="50%" stopColor="#1a3a6a"/>
              <stop offset="100%" stopColor="#2d6a4f"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="360" fill="url(#dsky)"/>
          {[[100,30],[300,18],[500,40],[700,12],[900,28],[1100,35],[1350,20]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={i%2===0?1.5:1} fill="white" opacity="0.4"/>
          ))}
          <polygon points="0,280 180,140 360,280" fill="#0b1c35" opacity="0.6"/>
          <polygon points="300,280 500,110 700,280" fill="#0e2240" opacity="0.65"/>
          <polygon points="600,280 800,130 1000,280" fill="#0b1c35" opacity="0.6"/>
          <polygon points="900,280 1100,100 1300,280" fill="#0e2240" opacity="0.65"/>
          <polygon points="650,360 800,80 950,360" fill="#112040"/>
          <polygon points="778,108 800,80 822,108 812,102 800,88 788,102" fill="white" opacity="0.9"/>
          <rect x="0" y="330" width="1440" height="30" fill="#1b4332"/>
        </svg>
        <div className="dest-hero-overlay"/>
        <div className="dest-hero-content">
          <p className="dest-hero-eyebrow">Explore Nepal</p>
          <h1 className="dest-hero-title">All Destinations</h1>
          <p className="dest-hero-sub">From Himalayan summits to jungle safaris — browse every adventure we offer.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? " active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="dest-content">
        {!loading && !error && (
          <p className="dest-count">
            Showing <span>{filtered.length}</span> destination{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {loading && (
          <div className="dest-grid">
            {[1,2,3,4,5,6].map((i) => <SkeletonCard key={i}/>)}
          </div>
        )}

        {error && (
          <div className="error-wrap">
            <div className="error-icon">🏔️</div>
            <div className="error-title">Couldn't load destinations</div>
            <div className="error-msg">{error}</div>
            <button className="retry-btn" onClick={fetchData}>Try again</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="error-wrap">
            <div className="error-icon">🔍</div>
            <div className="error-title">No destinations found</div>
            <div className="error-msg">Try a different filter.</div>
            <button className="retry-btn" onClick={() => setActiveFilter("All")}>Show all</button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="dest-grid">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="dest-card"
                onClick={() => navigate(`/destinations/${d.id}`)}
              >
                <div className="dest-card-img">
                  <img src={d.image} alt={d.name} loading="lazy"/>
                  <div className="dest-card-overlay"/>
                  <span className="dest-card-tag">{d.difficulty || "Adventure"}</span>
                  <span className="dest-card-price-badge">From ${d.price.toLocaleString()}</span>
                </div>
                <div className="dest-card-body">
                  <div className="dest-card-meta">
                    <span className="dest-card-city">📍 {d.city}, {d.country}</span>
                    <div className="dest-card-dot"/>
                    <div className="dest-card-rating">
                      <span className="dest-card-stars">★</span>
                      <span className="dest-card-rating-num">{d.rating} ({d.reviews})</span>
                    </div>
                  </div>
                  <div className="dest-card-name">{d.name}</div>
                  <div className="dest-card-footer">
                    <span className="dest-card-duration">🕐 {d.duration}</span>
                    <span className="dest-card-link">View details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">WanderNepal</div>
          <div className="footer-copy">© 2026 WanderNepal. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
