import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDestinationById, createBooking } from "../services/api";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #f8f9fc; }
  .bf-page { min-height: 100vh; padding-top: 65px; }
  .bf-hero { background: linear-gradient(135deg, #0a1628, #1a3a6a); padding: 48px 0 32px; text-align: center; }
  .bf-hero-eyebrow { font-size: 11px; font-weight: 600; color: #6fa3ff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .bf-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,40px); font-weight: 700; color: white; }
  .bf-container { max-width: 900px; margin: 0 auto; padding: 40px 24px 80px; display: grid; grid-template-columns: 1fr 340px; gap: 32px; }
  .bf-card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
  .bf-dest-img { width: 100%; height: 200px; object-fit: cover; }
  .bf-dest-body { padding: 24px; }
  .bf-dest-label { font-size: 11px; font-weight: 700; color: #1a6bff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .bf-dest-name { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .bf-dest-loc { font-size: 14px; color: #888; margin-bottom: 16px; }
  .bf-price-val { font-size: 28px; font-weight: 700; }
  .bf-price-note { font-size: 13px; color: #888; }
  .bf-form-card { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 28px; height: fit-content; }
  .bf-form-title { font-size: 18px; font-weight: 700; margin-bottom: 24px; }
  .bf-field { margin-bottom: 18px; }
  .bf-label { display: block; font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .bf-input { width: 100%; padding: 12px 14px; border: 1.5px solid #e0e0e0; border-radius: 10px; font-size: 14px; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
  .bf-input:focus { outline: none; border-color: #1a6bff; }
  .bf-divider { height: 1px; background: #f0f0f0; margin: 20px 0; }
  .bf-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .bf-total-label { font-size: 13px; color: #888; }
  .bf-total-val { font-size: 13px; font-weight: 600; }
  .bf-grand-label { font-size: 15px; font-weight: 700; }
  .bf-grand-val { font-size: 22px; font-weight: 700; color: #1a6bff; }
  .bf-submit-btn { width: 100%; margin-top: 20px; background: #1a6bff; color: white; border: none; padding: 14px 0; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
  .bf-submit-btn:hover:not(:disabled) { background: #0055ee; }
  .bf-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .bf-note { font-size: 12px; color: #aaa; text-align: center; margin-top: 10px; }
  .bf-error { background: #fff5f5; border: 1px solid #e53e3e; color: #e53e3e; padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-top: 12px; }
  .bf-center { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 14px; text-align: center; }
  .bf-spinner { width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a6bff; border-radius: 50%; animation: bfspin 0.8s linear infinite; }
  @keyframes bfspin { to { transform: rotate(360deg); } }
  @media (max-width: 768px) { .bf-container { grid-template-columns: 1fr; } }
`;

function getDays(start, end) {
  if (!start || !end) return 0;
  return Math.max(0, Math.ceil((new Date(end) - new Date(start)) / 86400000));
}

export default function BookingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, authReady } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const days = getDays(startDate, endDate);
  const rate = destination ? (destination.pricePerNight ?? destination.price) : 0;
  const total = rate * days;

  useEffect(() => {
    if (authReady && !isLoggedIn) navigate("/signin", { replace: true });
  }, [authReady, isLoggedIn, navigate]);

  useEffect(() => {
    const preferred = location.state?.preferredStartDate;
    if (preferred && !startDate) setStartDate(preferred);
  }, [location.state, startDate]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getDestinationById(id)
      .then(setDestination)
      .catch((err) => setError(err.message || "Not found"))
      .finally(() => setLoading(false));
  }, [id, isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!startDate || !endDate) { setSubmitError("Please select both dates."); return; }
    if (days <= 0) { setSubmitError("End date must be after start date."); return; }
    setSubmitting(true);
    try {
      await createBooking({ destinationId: id, destinationName: destination.name, city: destination.city, image: destination.image, startDate, endDate, totalPrice: total });
      navigate("/bookings");
    } catch (err) {
      setSubmitError(err.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const Center = ({ icon, title, msg, btn }) => (
    <><style>{styles}</style><Navbar /><div className="bf-page"><div className="bf-center">
      {icon && <div style={{ fontSize: 52 }}>{icon}</div>}
      {!icon && <div className="bf-spinner" />}
      {title && <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>}
      {msg && <div style={{ fontSize: 14, color: "#888" }}>{msg}</div>}
      {btn}
    </div></div></>
  );

  if (!authReady || loading) return <Center msg="Loading..." />;
  if (error) return <Center icon="🏔️" title="Destination not found" msg={error} btn={<button onClick={() => navigate("/destinations")} style={{ background: "#1a6bff", color: "white", border: "none", padding: "11px 28px", borderRadius: 24, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Browse destinations</button>} />;

  const d = destination;
  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="bf-page">
        <div className="bf-hero">
          <p className="bf-hero-eyebrow">Secure Your Adventure</p>
          <h1 className="bf-hero-title">Book Your Trip</h1>
        </div>
        <div className="bf-container">
          <div className="bf-card">
            <img className="bf-dest-img" src={d.images?.[0] || d.image} alt={d.name} />
            <div className="bf-dest-body">
              <p className="bf-dest-label">{d.difficulty} · {d.duration}</p>
              <h2 className="bf-dest-name">{d.name}</h2>
              <p className="bf-dest-loc">📍 {d.city}, {d.country}</p>
              <span className="bf-price-val">${rate.toLocaleString()}</span>
              {" "}<span className="bf-price-note">per night</span>
            </div>
          </div>

          <div className="bf-form-card">
            <h3 className="bf-form-title">Travel Dates</h3>
            <form onSubmit={handleSubmit}>
              <div className="bf-field">
                <label className="bf-label" htmlFor="bf-start">Start Date</label>
                <input id="bf-start" className="bf-input" type="date" min={today} value={startDate} onChange={e => { setStartDate(e.target.value); setSubmitError(""); }} required />
              </div>
              <div className="bf-field">
                <label className="bf-label" htmlFor="bf-end">End Date</label>
                <input id="bf-end" className="bf-input" type="date" min={startDate || today} value={endDate} onChange={e => { setEndDate(e.target.value); setSubmitError(""); }} required />
              </div>
              <div className="bf-divider" />
              <div className="bf-total-row"><span className="bf-total-label">Duration</span><span className="bf-total-val">{days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : "—"}</span></div>
              <div className="bf-total-row"><span className="bf-total-label">Rate per night</span><span className="bf-total-val">${rate.toLocaleString()}</span></div>
              <div className="bf-divider" />
              <div className="bf-total-row"><span className="bf-grand-label">Total</span><span className="bf-grand-val">{total > 0 ? `$${total.toLocaleString()}` : "—"}</span></div>
              {submitError && <div className="bf-error">{submitError}</div>}
              <button type="submit" className="bf-submit-btn" disabled={submitting}>{submitting ? "Confirming..." : "Confirm Booking →"}</button>
              <p className="bf-note">Free cancellation within 24 hours</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
