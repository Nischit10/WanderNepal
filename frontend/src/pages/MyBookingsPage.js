import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../services/api";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #f8f9fc; }

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
  .nav-links a:hover, .nav-links a.active { color: #1a6bff; }
  .nav-actions { display: flex; gap: 12px; align-items: center; }
  .btn-login { background: transparent; border: none; font-size: 14px; font-weight: 500; color: #444; cursor: pointer; padding: 8px 16px; }
  .btn-signup { background: #1a6bff; color: white; border: none; padding: 9px 22px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; }
  .btn-signup:hover { background: #0055ee; }

  /* PAGE HEADER */
  .bookings-header {
    background: #0a1628;
    padding: 64px 60px 48px;
    margin-top: 65px;
    position: relative; overflow: hidden;
  }
  .bookings-header::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(26,107,255,0.15) 0%, transparent 60%);
  }
  .bookings-header-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .bookings-eyebrow { font-size: 11px; font-weight: 600; color: #6fa3ff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .bookings-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: white; margin-bottom: 8px; }
  .bookings-sub { font-size: 14px; color: rgba(255,255,255,0.65); }

  /* CONTENT */
  .bookings-content { max-width: 1200px; margin: 0 auto; padding: 40px 60px 80px; }

  /* STATS ROW */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; }
  .stat-card { background: white; border-radius: 14px; padding: 20px 24px; border: 1px solid #eee; }
  .stat-label { font-size: 12px; color: #888; font-weight: 500; margin-bottom: 8px; }
  .stat-value { font-size: 26px; font-weight: 700; color: #1a1a1a; }
  .stat-sub { font-size: 12px; color: #aaa; margin-top: 4px; }

  /* BOOKINGS LIST */
  .bookings-list { display: flex; flex-direction: column; gap: 16px; }

  .booking-card {
    background: white; border-radius: 16px; border: 1px solid #eee;
    display: flex; overflow: hidden; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .booking-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
  .booking-img { width: 180px; flex-shrink: 0; position: relative; }
  .booking-img img { width: 100%; height: 100%; object-fit: cover; }
  .booking-body { flex: 1; padding: 22px 24px; display: flex; flex-direction: column; justify-content: space-between; }
  .booking-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .booking-name { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .booking-city { font-size: 13px; color: #888; }
  .status-badge {
    padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0;
  }
  .status-CONFIRMED { background: #e8f8ef; color: #1a7a45; }
  .status-PENDING { background: #fff8e6; color: #a06b00; }
  .status-CANCELLED { background: #ffeef0; color: #c0392b; }

  .booking-meta { display: flex; gap: 28px; margin-top: 14px; flex-wrap: wrap; }
  .booking-meta-item { display: flex; flex-direction: column; gap: 3px; }
  .booking-meta-label { font-size: 11px; color: #aaa; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .booking-meta-value { font-size: 14px; font-weight: 600; color: #1a1a1a; }

  .booking-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-top: 16px; border-top: 1px solid #f4f4f4; }
  .booking-price { font-size: 20px; font-weight: 700; color: #1a1a1a; }
  .booking-link { font-size: 13px; color: #1a6bff; font-weight: 600; }

  /* EMPTY STATE */
  .empty-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 0; text-align: center; gap: 14px; }
  .empty-icon { font-size: 56px; }
  .empty-title { font-size: 22px; font-weight: 700; color: #1a1a1a; }
  .empty-msg { font-size: 14px; color: #888; max-width: 360px; line-height: 1.7; }
  .empty-btn { margin-top: 8px; background: #1a6bff; color: white; border: none; padding: 11px 28px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .empty-btn:hover { background: #0055ee; }

  /* LOADING */
  .loading-wrap { display: flex; flex-direction: column; align-items: center; padding: 80px 0; gap: 14px; }
  .loading-spinner { width: 40px; height: 40px; border: 3px solid #eee; border-top-color: #1a6bff; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ERROR */
  .error-wrap { display: flex; flex-direction: column; align-items: center; padding: 80px 0; gap: 14px; text-align: center; }
  .error-title { font-size: 20px; font-weight: 700; color: #1a1a1a; }
  .error-msg { font-size: 14px; color: #888; }
  .retry-btn { background: #1a6bff; color: white; border: none; padding: 10px 24px; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .retry-btn:hover { background: #0055ee; }

  footer { background: white; border-top: 1px solid #eee; padding: 32px 60px; margin-top: 0; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-weight: 700; font-size: 16px; color: #1a1a1a; }
  .footer-copy { font-size: 12px; color: #aaa; }
`;

const STATUS_LABEL = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth guard – redirect to /signin if no token
  useEffect(() => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const totalSpent = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <>
      <style>{styles}</style>

      <Navbar />

      {/* HEADER */}
      <div className="bookings-header">
        <div className="bookings-header-content">
          <div className="bookings-eyebrow">Your Account</div>
          <div className="bookings-title">My Bookings</div>
          <div className="bookings-sub">Track all your upcoming and past adventures</div>
        </div>
      </div>

      <div className="bookings-content">
        {/* STATS */}
        {!loading && !error && bookings.length > 0 && (
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Total Bookings</div>
              <div className="stat-value">{bookings.length}</div>
              <div className="stat-sub">{confirmed} confirmed</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value" style={{ color: "#a06b00" }}>{pending}</div>
              <div className="stat-sub">awaiting confirmation</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">${totalSpent.toLocaleString()}</div>
              <div className="stat-sub">across {confirmed + pending} trip{confirmed + pending !== 1 ? "s" : ""}</div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-wrap">
            <div className="loading-spinner"/>
            <p style={{ fontSize: 14, color: "#888" }}>Loading your bookings...</p>
          </div>
        )}

        {error && (
          <div className="error-wrap">
            <div style={{ fontSize: 48 }}>⚠️</div>
            <div className="error-title">Couldn't load bookings</div>
            <div className="error-msg">{error}</div>
            <button className="retry-btn" onClick={() => window.location.reload()}>Try again</button>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="empty-wrap">
            <div className="empty-icon">🧳</div>
            <div className="empty-title">No bookings yet</div>
            <div className="empty-msg">You haven't booked any trips yet. Start exploring and plan your next Himalayan adventure!</div>
            <button className="empty-btn" onClick={() => navigate("/destinations")}>Browse destinations</button>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="booking-card"
                onClick={() => navigate(`/bookings/${b.id}`)}
              >
                <div className="booking-img">
                  <img src={b.image} alt={b.destinationName}/>
                </div>
                <div className="booking-body">
                  <div>
                    <div className="booking-top">
                      <div>
                        <div className="booking-name">{b.destinationName}</div>
                        <div className="booking-city">📍 {b.city}</div>
                      </div>
                      <span className={`status-badge status-${b.status}`}>
                        {STATUS_LABEL[b.status] || b.status}
                      </span>
                    </div>
                    <div className="booking-meta">
                      <div className="booking-meta-item">
                        <span className="booking-meta-label">Check-in</span>
                        <span className="booking-meta-value">{formatDate(b.startDate)}</span>
                      </div>
                      <div className="booking-meta-item">
                        <span className="booking-meta-label">Check-out</span>
                        <span className="booking-meta-value">{formatDate(b.endDate)}</span>
                      </div>
                      <div className="booking-meta-item">
                        <span className="booking-meta-label">Booking ID</span>
                        <span className="booking-meta-value">#{String(b.id).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="booking-footer">
                    <div className="booking-price">${b.totalPrice?.toLocaleString()}</div>
                    <span className="booking-link">View details →</span>
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
