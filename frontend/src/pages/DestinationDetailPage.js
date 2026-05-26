import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDestinationById, getDestinations, getNavigation, destinationImageFallback } from "../services/api";
import Navbar from "../components/Navbar";

function parseDays(duration) {
  const n = parseInt(String(duration), 10);
  return Number.isFinite(n) && n > 0 ? n : 5;
}

function buildItinerary(dest, navData) {
  const days = parseDays(dest.duration);
  if (navData) {
    const stops = [
      { day: 1, title: "Arrival & briefing", place: navData.startPoint },
      ...(navData.waypoints || []).map((wp, i) => ({
        day: i + 2,
        title: `Explore — Day ${i + 2}`,
        place: wp,
      })),
      { day: days, title: "Trip highlight & wrap-up", place: navData.endPoint },
    ];
    return stops.slice(0, days);
  }
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? "Arrival" : i === days - 1 ? "Departure" : `Day ${i + 1} activities`,
    place: i === 0 ? `${dest.city}, ${dest.country}` : dest.name,
  }));
}

function buildReviews(dest) {
  const stars = Math.round(dest.rating);
  const samples = [
    { name: "Priya Sharma", date: "January 2026", text: `Outstanding ${dest.category.toLowerCase()} experience. Our guide was professional and the trip matched the description perfectly.` },
    { name: "James Liu", date: "December 2025", text: "Well organized from pickup to drop-off. Great value and beautiful scenery throughout." },
    { name: "Anita Müller", date: "November 2025", text: "Felt safe at all times. Would book again with WanderNepal for my next Nepal adventure." },
    { name: "Marco Rossi", date: "October 2025", text: "Loved every moment — especially the local food and cultural stops along the way." },
  ];
  return samples.map((r, i) => ({ ...r, rating: i === 0 ? stars : Math.max(4, stars - (i % 2)) }));
}

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
  .nav-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; cursor: pointer; }
  .nav-links { display: flex; gap: 28px; list-style: none; }
  .nav-links a { color: #444; text-decoration: none; font-size: 14px; font-weight: 500; cursor: pointer; transition: color 0.2s; }
  .nav-links a:hover { color: #1a6bff; }
  .nav-actions { display: flex; gap: 12px; align-items: center; }
  .btn-login { background: transparent; border: none; font-size: 14px; font-weight: 500; color: #444; cursor: pointer; padding: 8px 16px; }
  .btn-signup { background: #1a6bff; color: white; border: none; padding: 9px 22px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-signup:hover { background: #0055ee; }

  /* HERO */
  .detail-hero {
    position: relative; height: 520px; margin-top: 65px;
    display: flex; align-items: flex-end; overflow: hidden; background: #0a1628;
  }
  .detail-hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.65; }
  .detail-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.1) 55%, transparent 100%);
  }
  .detail-hero-content {
    position: relative; z-index: 2;
    width: 100%; max-width: 1200px; margin: 0 auto;
    padding: 0 60px 48px;
    display: flex; justify-content: space-between; align-items: flex-end; gap: 24px;
  }
  .detail-hero-left { flex: 1; }
  .detail-rating-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .detail-stars { color: #f5a623; font-size: 14px; }
  .detail-rating-text { font-size: 13px; color: rgba(255,255,255,0.8); }
  .detail-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 700; color: white; line-height: 1.1; margin-bottom: 10px; }
  .detail-location { display: flex; align-items: center; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.75); }

  .detail-book-card {
    background: white; border-radius: 16px; padding: 24px 28px;
    min-width: 240px; box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    flex-shrink: 0;
  }
  .detail-book-from { font-size: 11px; color: #888; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .detail-book-row { display: flex; align-items: baseline; gap: 16px; margin: 6px 0 20px; }
  .detail-book-price { font-size: 32px; font-weight: 700; color: #1a1a1a; }
  .detail-book-duration { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
  .detail-book-duration span { display: block; font-size: 15px; color: #1a1a1a; font-weight: 700; letter-spacing: 0; }
  .btn-book-now {
    width: 100%; background: #1a6bff; color: white; border: none;
    padding: 13px 0; border-radius: 10px; font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .btn-book-now:hover { background: #0055ee; }

  /* TABS */
  .detail-tabs {
    border-bottom: 1px solid #eee;
    display: flex; gap: 0; padding: 0 60px;
    max-width: 1200px; margin: 0 auto;
  }
  .tab-btn {
    padding: 18px 24px; border: none; background: none;
    font-size: 14px; font-weight: 500; color: #888;
    cursor: pointer; border-bottom: 2px solid transparent;
    transition: all 0.2s; font-family: 'Inter', sans-serif;
  }
  .tab-btn.active { color: #1a1a1a; border-bottom-color: #1a1a1a; }
  .tab-btn:hover { color: #1a1a1a; }

  /* BODY */
  .detail-body { max-width: 1200px; margin: 0 auto; padding: 48px 60px 80px; display: grid; grid-template-columns: 1fr 320px; gap: 48px; }
  .detail-main {}
  .detail-section-title { font-size: 22px; font-weight: 700; color: #1a1a1a; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; }
  .detail-difficulty { font-size: 11px; font-weight: 700; color: #e07b39; text-transform: uppercase; letter-spacing: 0.5px; }
  .detail-desc { font-size: 14px; color: #555; line-height: 1.85; margin-top: 16px; margin-bottom: 32px; }

  .highlights-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 40px; }
  .highlight-card { background: #f8f9fc; border-radius: 12px; padding: 16px 18px; display: flex; gap: 14px; align-items: flex-start; }
  .highlight-icon { font-size: 22px; flex-shrink: 0; }
  .highlight-title { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .highlight-desc { font-size: 12px; color: #777; line-height: 1.6; }

  .gallery-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
  .gallery-grid { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; gap: 10px; height: 340px; }
  .gallery-grid img { width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }
  .gallery-main { grid-row: 1 / 3; }

  /* SIDEBAR */
  .detail-sidebar {}
  .essentials-card { background: #f8f9fc; border-radius: 16px; padding: 24px; margin-bottom: 20px; }
  .essentials-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 18px; }
  .essential-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee; }
  .essential-row:last-child { border-bottom: none; }
  .essential-label { font-size: 12px; color: #888; }
  .essential-value { font-size: 13px; font-weight: 600; color: #1a1a1a; }

  .help-card { background: #1a3a6a; border-radius: 16px; padding: 24px; color: white; }
  .help-icon { font-size: 28px; margin-bottom: 12px; }
  .help-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  .help-desc { font-size: 13px; color: rgba(255,255,255,0.72); line-height: 1.6; margin-bottom: 18px; }
  .btn-contact { width: 100%; background: white; color: #1a3a6a; border: none; padding: 11px 0; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; }
  .btn-contact:hover { background: #f0f4ff; }

  /* RELATED */
  .related-section { max-width: 1200px; margin: 0 auto; padding: 0 60px 80px; }
  .related-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
  .related-eyebrow { font-size: 11px; font-weight: 600; color: #1a6bff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .related-title { font-size: 24px; font-weight: 700; color: #1a1a1a; }
  .related-link { font-size: 13px; color: #1a6bff; font-weight: 600; cursor: pointer; }
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .related-card { position: relative; height: 200px; border-radius: 14px; overflow: hidden; cursor: pointer; transition: transform 0.3s; }
  .related-card:hover { transform: scale(1.02); }
  .related-card img { width: 100%; height: 100%; object-fit: cover; }
  .related-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%); }
  .related-card-info { position: absolute; bottom: 14px; left: 14px; color: white; }
  .related-card-eyebrow { font-size: 10px; font-weight: 600; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .related-card-name { font-size: 16px; font-weight: 700; }
  .related-card-sub { font-size: 12px; opacity: 0.8; margin-top: 2px; }

  /* Loading / Error / 404 */
  .center-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 16px; text-align: center; padding: 60px; }
  .center-icon { font-size: 56px; }
  .center-title { font-size: 24px; font-weight: 700; color: #1a1a1a; }
  .center-msg { font-size: 14px; color: #888; max-width: 380px; line-height: 1.7; }
  .center-btn { margin-top: 8px; background: #1a6bff; color: white; border: none; padding: 11px 28px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .center-btn:hover { background: #0055ee; }
  .loading-spinner { width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a6bff; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Navigation section */
  .nav-section { background: #f8f9fc; border-radius: 16px; padding: 24px; margin-bottom: 32px; }
  .nav-section-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
  .nav-route { display: flex; flex-direction: column; gap: 0; }
  .nav-stop { display: flex; align-items: flex-start; gap: 14px; padding: 10px 0; }
  .nav-stop-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
  .nav-stop-line { width: 2px; height: 24px; background: #d0d0d0; margin-left: 5px; }
  .nav-stop-label { font-size: 11px; color: #888; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .nav-stop-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
  .nav-stats { display: flex; gap: 24px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
  .nav-stat { display: flex; flex-direction: column; gap: 2px; }
  .nav-stat-label { font-size: 11px; color: #888; font-weight: 600; text-transform: uppercase; }
  .nav-stat-val { font-size: 15px; font-weight: 700; color: #1a1a1a; }
  .nav-no-data { text-align: center; padding: 20px; color: #888; font-size: 14px; line-height: 1.7; }

  .itinerary-list { display: flex; flex-direction: column; gap: 0; margin-bottom: 32px; }
  .itinerary-day { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid #f0f0f0; }
  .itinerary-day:last-child { border-bottom: none; }
  .itinerary-day-num { width: 48px; height: 48px; border-radius: 12px; background: #1a6bff; color: white; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .itinerary-day-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .itinerary-day-place { font-size: 14px; color: #666; line-height: 1.6; }

  .reviews-summary { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding: 20px; background: #f8f9fc; border-radius: 12px; }
  .reviews-score { font-size: 42px; font-weight: 700; color: #1a1a1a; line-height: 1; }
  .reviews-list { display: flex; flex-direction: column; gap: 16px; }
  .review-card { background: #f8f9fc; border-radius: 14px; padding: 20px 22px; border: 1px solid #eee; }
  .review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
  .review-name { font-size: 15px; font-weight: 700; color: #1a1a1a; }
  .review-date { font-size: 12px; color: #aaa; margin-top: 2px; }
  .review-stars { color: #f5a623; font-size: 14px; }
  .review-text { font-size: 14px; color: #555; line-height: 1.75; }

  footer { background: #f8f8f8; border-top: 1px solid #eee; padding: 48px 60px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; }
  .footer-copy { font-size: 12px; color: #aaa; }
`;

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(null);
  const [relatedList, setRelatedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [navData, setNavData] = useState(null);
  const [navLoading, setNavLoading] = useState(true);
  const [navError, setNavError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setError(null);

    getDestinationById(id)
      .then(async (dest) => {
        setDestination(dest);
        // load related destinations
        if (dest.related && dest.related.length > 0) {
          const all = await getDestinations();
          setRelatedList(all.filter((d) => dest.related.includes(d.id)));
        }
      })
      .catch((err) => {
        if (err.status === 404) setNotFound(true);
        else setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));

    getNavigation(id)
      .then(setNavData)
      .catch((err) => setNavError(err.message || "Route not available"))
      .finally(() => setNavLoading(false));
  }, [id]);



  if (loading) return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="center-wrap" style={{ marginTop: 65 }}>
        <div className="loading-spinner"/>
        <p style={{ fontSize: 14, color: "#888" }}>Loading destination...</p>
      </div>
    </>
  );

  if (notFound) return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="center-wrap" style={{ marginTop: 65 }}>
        <div className="center-icon">🏔️</div>
        <div className="center-title">Destination Not Found</div>
        <div className="center-msg">We couldn't find what you're looking for.</div>
        <button className="center-btn" onClick={() => navigate("/destinations")}>Browse all destinations</button>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="center-wrap" style={{ marginTop: 65 }}>
        <div className="center-icon">⚠️</div>
        <div className="center-title">Something went wrong</div>
        <div className="center-msg">{error}</div>
        <button className="center-btn" onClick={() => window.location.reload()}>Try again</button>
      </div>
    </>
  );

  const d = destination;
  const itinerary = buildItinerary(d, navData);
  const reviews = buildReviews(d);
  const heroImg = d.images?.[0] || d.image;
  const fallbackImg = destinationImageFallback(d.category);

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      {/* HERO */}
      <section className="detail-hero">
        <img
          src={heroImg}
          alt={d.name}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
        />
        <div className="detail-hero-overlay"/>
        <div className="detail-hero-content">
          <div className="detail-hero-left">
            <div className="detail-rating-row">
              <span className="detail-stars">{"★".repeat(Math.round(d.rating))}</span>
              <span className="detail-rating-text">{d.rating}/5 stars ({d.reviews} Reviews)</span>
            </div>
            <h1 className="detail-title">{d.name}</h1>
            <div className="detail-location">
              <span>📍</span>
              <span>{d.city}, {d.country}</span>
            </div>
          </div>
          <div className="detail-book-card">
            <div className="detail-book-from">Starting from</div>
            <div className="detail-book-row">
              <div className="detail-book-price">${(d.priceFrom ?? d.price).toLocaleString()}</div>
              <div className="detail-book-duration">
                DURATION:
                <span>{d.duration}</span>
              </div>
            </div>
            <button
              className="btn-book-now"
              onClick={() => navigate(`/booking/${d.id}`, {
                state: {
                  preferredStartDate: location.state?.preferredStartDate,
                  maxBudget: location.state?.maxBudget,
                },
              })}
            >
              Book Now →
            </button>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="detail-tabs">
        {["Overview", "Itinerary", "Reviews"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="detail-body">
        <div className="detail-main">
          {activeTab === "Overview" && (
            <>
              <div className="detail-section-title">
                <span>{d.name}</span>
                <span className="detail-difficulty">DIFFICULTY: {d.difficulty}</span>
              </div>
              <p className="detail-desc">{d.description}</p>

              {d.highlights && (
                <div className="highlights-grid">
                  {d.highlights.map((h, i) => (
                    <div key={i} className="highlight-card">
                      <div className="highlight-icon">{h.icon}</div>
                      <div>
                        <div className="highlight-title">{h.title}</div>
                        <div className="highlight-desc">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {d.images && d.images.length > 0 && (
                <>
                  <div className="gallery-title">Visual Journey</div>
                  <div className="gallery-grid">
                    <img className="gallery-main" src={d.images[0]} alt={d.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }} />
                    <img src={d.images[1] || d.images[0]} alt={d.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }} />
                    <img src={d.images[2] || d.images[1] || d.images[0]} alt={d.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }} />
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "Itinerary" && (
            <>
              <div className="detail-section-title">
                <span>Trip Itinerary</span>
                <span className="detail-difficulty">{d.duration}</span>
              </div>
              <p className="detail-desc">Day-by-day plan for your {d.name} adventure.</p>

              <div className="itinerary-list">
                {itinerary.map((item) => (
                  <div key={item.day} className="itinerary-day">
                    <div className="itinerary-day-num">D{item.day}</div>
                    <div>
                      <div className="itinerary-day-title">{item.title}</div>
                      <div className="itinerary-day-place">{item.place}</div>
                    </div>
                  </div>
                ))}
              </div>

          {/* GETTING THERE */}
          <div className="nav-section">
            <div className="nav-section-title">🗺️ Route overview</div>
            {navLoading && <p style={{ fontSize: 14, color: "#888" }}>Loading route info...</p>}
            {!navLoading && (navError || !navData) && (
              <p className="nav-no-data">Route information is not available for this destination yet.</p>
            )}
            {!navLoading && navData && (
              <>
                <div className="nav-route">
                  <div className="nav-stop">
                    <div>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a6bff", marginTop: 3 }} />
                    </div>
                    <div>
                      <div className="nav-stop-label">Start</div>
                      <div className="nav-stop-name">{navData.startPoint}</div>
                    </div>
                  </div>
                  <div style={{ width: 2, height: 16, background: "#d0d0d0", marginLeft: 5, marginBottom: 4 }} />
                  {navData.waypoints?.map((wp, i) => (
                    <React.Fragment key={i}>
                      <div className="nav-stop">
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e0e0e0", border: "2px solid #aaa", marginTop: 3 }} />
                        <div>
                          <div className="nav-stop-label">Waypoint {i + 1}</div>
                          <div className="nav-stop-name">{wp}</div>
                        </div>
                      </div>
                      <div style={{ width: 2, height: 16, background: "#d0d0d0", marginLeft: 4, marginBottom: 4 }} />
                    </React.Fragment>
                  ))}
                  <div className="nav-stop">
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981", marginTop: 3 }} />
                    <div>
                      <div className="nav-stop-label">Destination</div>
                      <div className="nav-stop-name">{navData.endPoint}</div>
                    </div>
                  </div>
                </div>
                <div className="nav-stats">
                  <div className="nav-stat">
                    <span className="nav-stat-label">Distance</span>
                    <span className="nav-stat-val">{navData.distanceKm} km</span>
                  </div>
                  <div className="nav-stat">
                    <span className="nav-stat-label">Est. Time</span>
                    <span className="nav-stat-val">{navData.estimatedHours}h total</span>
                  </div>
                </div>
              </>
            )}
          </div>


            </>
          )}

          {activeTab === "Reviews" && (
            <>
              <div className="detail-section-title">
                <span>Traveler Reviews</span>
              </div>
              <div className="reviews-summary">
                <div className="reviews-score">{d.rating}</div>
                <div>
                  <div className="review-stars">{"★".repeat(Math.round(d.rating))}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{d.reviews} verified reviews</div>
                </div>
              </div>
              <div className="reviews-list">
                {reviews.map((r) => (
                  <div key={r.name} className="review-card">
                    <div className="review-header">
                      <div>
                        <div className="review-name">{r.name}</div>
                        <div className="review-date">{r.date}</div>
                      </div>
                      <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                    </div>
                    <p className="review-text">{r.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {/* SIDEBAR */}
        <div className="detail-sidebar">
          <div className="essentials-card">
            <div className="essentials-title">Trip Essentials</div>
            {[
              { label: "Max Elevation", value: d.maxElevation },
              { label: "Group Size", value: d.groupSize },
              { label: "Best Season", value: d.bestSeason },
              { label: "Accommodation", value: d.accommodation },
            ].map((row) => (
              <div key={row.label} className="essential-row">
                <span className="essential-label">{row.label}</span>
                <span className="essential-value">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="help-card">
            <div className="help-icon">🧭</div>
            <div className="help-title">Need Help?</div>
            <div className="help-desc">Our Himalayan experts are ready to help you plan the perfect sanctuary escape.</div>
            <button type="button" className="btn-contact" onClick={() => navigate("/contact")}>Contact Expert</button>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {relatedList.length > 0 && (
        <div className="related-section">
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 40 }}>
            <div className="related-header">
              <div>
                <div className="related-eyebrow">Curation</div>
                <div className="related-title">You might also love</div>
              </div>
              <span className="related-link" onClick={() => navigate("/destinations")}>View all tours →</span>
            </div>
            <div className="related-grid">
              {relatedList.slice(0, 3).map((r) => (
                <div key={r.id} className="related-card" onClick={() => navigate(`/destinations/${r.id}`)}>
                  <img src={r.image} alt={r.name}/>
                  <div className="related-card-overlay"/>
                  <div className="related-card-info">
                    <div className="related-card-eyebrow">{r.difficulty}</div>
                    <div className="related-card-name">{r.name}</div>
                    <div className="related-card-sub">{r.duration} • From ${(r.priceFrom ?? r.price).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">WanderNepal</div>
          <div className="footer-copy">© 2026 WanderNepal. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
