import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, cancelBooking } from "../services/api";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #f8f9fc; }
  .bd-page { min-height: 100vh; padding-top: 65px; }
  .bd-header { background: #0a1628; padding: 48px 24px 36px; text-align: center; }
  .bd-eyebrow { font-size: 11px; font-weight: 600; color: #6fa3ff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .bd-title { font-family: 'Playfair Display', serif; font-size: clamp(26px,4vw,38px); font-weight: 700; color: white; }
  .bd-container { max-width: 760px; margin: 0 auto; padding: 36px 24px 80px; }
  .bd-card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; margin-bottom: 20px; }
  .bd-img { width: 100%; height: 220px; object-fit: cover; }
  .bd-body { padding: 28px; }
  .bd-badge { display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
  .bd-badge-CONFIRMED { background: #e8f8ef; color: #1a7a45; }
  .bd-badge-PENDING { background: #fff8e6; color: #a06b00; }
  .bd-badge-CANCELLED { background: #ffeef0; color: #c0392b; }
  .bd-name { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
  .bd-loc { font-size: 14px; color: #888; margin-bottom: 24px; }
  .bd-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
  .bd-info-group {}
  .bd-info-label { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
  .bd-info-value { font-size: 15px; font-weight: 600; color: #1a1a1a; }
  .bd-divider { height: 1px; background: #f0f0f0; margin: 20px 0; }
  .bd-price-row { display: flex; justify-content: space-between; align-items: center; }
  .bd-price-label { font-size: 16px; font-weight: 700; }
  .bd-price-val { font-size: 26px; font-weight: 700; color: #1a6bff; }
  .bd-cancel-btn { width: 100%; margin-top: 20px; background: white; color: #e53e3e; border: 2px solid #e53e3e; padding: 13px 0; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
  .bd-cancel-btn:hover:not(:disabled) { background: #fff5f5; }
  .bd-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .bd-back-btn { display: inline-flex; align-items: center; gap: 6px; color: #1a6bff; font-size: 14px; font-weight: 600; cursor: pointer; border: none; background: none; font-family: 'Inter', sans-serif; margin-bottom: 24px; }
  .bd-error { background: #fff5f5; border: 1px solid #e53e3e; color: #e53e3e; padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-top: 12px; }
  .bd-center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 14px; text-align: center; }
  .bd-spinner { width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a6bff; border-radius: 50%; animation: bdspin 0.8s linear infinite; }
  @keyframes bdspin { to { transform: rotate(360deg); } }

  /* Modal */
  .bd-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .bd-modal { background: white; border-radius: 16px; padding: 32px; max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
  .bd-modal-icon { font-size: 40px; text-align: center; margin-bottom: 16px; }
  .bd-modal-title { font-size: 20px; font-weight: 700; text-align: center; margin-bottom: 10px; }
  .bd-modal-msg { font-size: 14px; color: #666; text-align: center; line-height: 1.7; margin-bottom: 28px; }
  .bd-modal-actions { display: flex; gap: 12px; }
  .bd-modal-confirm { flex: 1; background: #e53e3e; color: white; border: none; padding: 13px 0; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; }
  .bd-modal-confirm:hover { background: #c53030; }
  .bd-modal-cancel { flex: 1; background: #f5f5f5; color: #444; border: none; padding: 13px 0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
  .bd-modal-cancel:hover { background: #ebebeb; }
`;

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    getBookingById(id)
      .then(setBooking)
      .catch((err) => setError(err.message || "Booking not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setCancelError("");
    try {
      const updated = await cancelBooking(id);
      setBooking((prev) => ({ ...prev, status: updated.status || "CANCELLED" }));
      setShowModal(false);
    } catch (err) {
      setCancelError(err.message || "Cancellation failed. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return (
    <><style>{styles}</style><Navbar />
      <div className="bd-page"><div className="bd-center"><div className="bd-spinner" /></div></div>
    </>
  );

  if (error) return (
    <><style>{styles}</style><Navbar />
      <div className="bd-page"><div className="bd-center">
        <div style={{ fontSize: 52 }}>🧳</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Booking not found</div>
        <div style={{ fontSize: 14, color: "#888" }}>{error}</div>
        <button onClick={() => navigate("/bookings")} style={{ background: "#1a6bff", color: "white", border: "none", padding: "11px 28px", borderRadius: 24, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>My Bookings</button>
      </div></div>
    </>
  );

  const b = booking;
  const isConfirmed = b.status === "CONFIRMED";

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      {showModal && (
        <div className="bd-modal-overlay">
          <div className="bd-modal">
            <div className="bd-modal-icon">⚠️</div>
            <div className="bd-modal-title">Cancel Booking?</div>
            <div className="bd-modal-msg">
              Are you sure you want to cancel your booking for <strong>{b.destinationName}</strong>? This action cannot be undone.
            </div>
            {cancelError && <div className="bd-error" style={{ marginBottom: 16 }}>{cancelError}</div>}
            <div className="bd-modal-actions">
              <button className="bd-modal-cancel" onClick={() => { setShowModal(false); setCancelError(""); }}>Keep Booking</button>
              <button className="bd-modal-confirm" onClick={handleConfirmCancel} disabled={cancelling}>
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bd-page">
        <div className="bd-header">
          <p className="bd-eyebrow">Your Account</p>
          <h1 className="bd-title">Booking Details</h1>
        </div>

        <div className="bd-container">
          <button className="bd-back-btn" onClick={() => navigate("/bookings")}>← Back to My Bookings</button>

          <div className="bd-card">
            {b.image && <img className="bd-img" src={b.image} alt={b.destinationName} />}
            <div className="bd-body">
              <span className={`bd-badge bd-badge-${b.status}`}>{b.status}</span>
              <h2 className="bd-name">{b.destinationName}</h2>
              <p className="bd-loc">📍 {b.city}</p>

              <div className="bd-grid">
                <div className="bd-info-group">
                  <div className="bd-info-label">Check-in</div>
                  <div className="bd-info-value">{formatDate(b.startDate)}</div>
                </div>
                <div className="bd-info-group">
                  <div className="bd-info-label">Check-out</div>
                  <div className="bd-info-value">{formatDate(b.endDate)}</div>
                </div>
                <div className="bd-info-group">
                  <div className="bd-info-label">Booking ID</div>
                  <div className="bd-info-value">#{String(b.id).toUpperCase()}</div>
                </div>
                <div className="bd-info-group">
                  <div className="bd-info-label">Status</div>
                  <div className="bd-info-value">{b.status}</div>
                </div>
              </div>

              <div className="bd-divider" />
              <div className="bd-price-row">
                <span className="bd-price-label">Total Paid</span>
                <span className="bd-price-val">${b.totalPrice?.toLocaleString()}</span>
              </div>

              {isConfirmed && (
                <button className="bd-cancel-btn" onClick={() => setShowModal(true)}>
                  Cancel Booking
                </button>
              )}
              {cancelError && !showModal && <div className="bd-error">{cancelError}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
