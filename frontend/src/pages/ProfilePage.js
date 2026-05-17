import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyBookings } from "../services/api";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #f8f9fc; }
  .pp-page { min-height: 100vh; padding-top: 65px; }
  .pp-header { background: linear-gradient(135deg, #0a1628, #1a3a6a); padding: 56px 24px 44px; text-align: center; }
  .pp-eyebrow { font-size: 11px; font-weight: 600; color: #6fa3ff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .pp-header-title { font-family: 'Playfair Display', serif; font-size: clamp(26px,4vw,38px); font-weight: 700; color: white; }
  .pp-container { max-width: 700px; margin: 0 auto; padding: 36px 24px 80px; }
  .pp-avatar-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .pp-avatar { width: 88px; height: 88px; border-radius: 50%; background: linear-gradient(135deg, #1a6bff, #0a3d9e); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: white; box-shadow: 0 8px 24px rgba(26,107,255,0.3); }
  .pp-card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 32px; margin-bottom: 20px; }
  .pp-card-title { font-size: 15px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
  .pp-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f4f4f4; }
  .pp-row:last-child { border-bottom: none; }
  .pp-row-label { font-size: 13px; color: #888; font-weight: 500; }
  .pp-row-value { font-size: 15px; font-weight: 600; color: #1a1a1a; }
  .pp-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .pp-stat { background: white; border-radius: 14px; padding: 20px 16px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .pp-stat-num { font-size: 28px; font-weight: 700; color: #1a6bff; margin-bottom: 4px; }
  .pp-stat-label { font-size: 12px; color: #888; font-weight: 500; }
  .pp-spinner { width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a6bff; border-radius: 50%; animation: ppspin 0.8s linear infinite; margin: 0 auto; }
  @keyframes ppspin { to { transform: rotate(360deg); } }
  @media (max-width: 480px) { .pp-stat-grid { grid-template-columns: 1fr; } }
`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, authReady } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (authReady && !isLoggedIn) navigate("/signin", { replace: true });
  }, [authReady, isLoggedIn, navigate]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getMyBookings()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoadingBookings(false));
  }, [isLoggedIn]);

  const initials = user?.full_name
    ? user.full_name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "W";

  const confirmed = bookings.filter(b => b.status === "CONFIRMED").length;
  const pending = bookings.filter(b => b.status === "PENDING").length;

  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="pp-page">
        <div className="pp-header">
          <p className="pp-eyebrow">Account</p>
          <h1 className="pp-header-title">My Profile</h1>
        </div>

        <div className="pp-container">
          <div className="pp-avatar-wrap">
            <div className="pp-avatar">{initials}</div>
          </div>

          <div className="pp-card">
            <div className="pp-card-title">Personal Info</div>
            <div className="pp-row">
              <span className="pp-row-label">Full Name</span>
              <span className="pp-row-value">{user?.full_name || "—"}</span>
            </div>
            <div className="pp-row">
              <span className="pp-row-label">Email Address</span>
              <span className="pp-row-value">{user?.email || "—"}</span>
            </div>
            <div className="pp-row">
              <span className="pp-row-label">Member ID</span>
              <span className="pp-row-value">#{user?.user_id || "—"}</span>
            </div>
            <div className="pp-row">
              <span className="pp-row-label">Traveler Level</span>
              <span className="pp-row-value">Peak Explorer 🏔️</span>
            </div>
          </div>

          <div className="pp-card">
            <div className="pp-card-title">Booking Summary</div>
            {loadingBookings ? (
              <div style={{ padding: "20px 0", textAlign: "center" }}><div className="pp-spinner" /></div>
            ) : (
              <div className="pp-stat-grid">
                <div className="pp-stat">
                  <div className="pp-stat-num">{bookings.length}</div>
                  <div className="pp-stat-label">Total Bookings</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-num" style={{ color: "#1a7a45" }}>{confirmed}</div>
                  <div className="pp-stat-label">Confirmed</div>
                </div>
                <div className="pp-stat">
                  <div className="pp-stat-num" style={{ color: "#a06b00" }}>{pending}</div>
                  <div className="pp-stat-label">Pending</div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/bookings")}
            style={{ width: "100%", background: "#1a6bff", color: "white", border: "none", padding: "14px 0", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
          >
            View My Bookings →
          </button>
        </div>
      </div>
    </>
  );
}
