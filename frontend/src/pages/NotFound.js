import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; }
  .nf-page { min-height: 100vh; padding-top: 65px; background: #f8f9fc; display: flex; flex-direction: column; }
  .nf-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px; text-align: center; }
  .nf-mountains { margin-bottom: 32px; }
  .nf-code { font-size: 80px; font-weight: 800; color: #e8f0ff; font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 8px; }
  .nf-title { font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 38px); font-weight: 700; color: #1a1a1a; margin-bottom: 14px; }
  .nf-msg { font-size: 15px; color: #666; line-height: 1.75; max-width: 420px; margin-bottom: 36px; }
  .nf-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
  .nf-btn-home { background: #1a6bff; color: white; border: none; padding: 13px 32px; border-radius: 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
  .nf-btn-home:hover { background: #0055ee; }
  .nf-btn-dest { background: white; color: #1a1a1a; border: 1.5px solid #e0e0e0; padding: 13px 32px; border-radius: 28px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
  .nf-btn-dest:hover { border-color: #1a6bff; color: #1a6bff; }
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="nf-page">
        <div className="nf-main">
          <div className="nf-mountains">
            <svg viewBox="0 0 320 140" width="280" xmlns="http://www.w3.org/2000/svg">
              <rect width="320" height="140" fill="#e8f0ff" rx="16"/>
              <polygon points="0,140 80,50 160,140" fill="#bcd0f5" opacity="0.8"/>
              <polygon points="100,140 180,30 260,140" fill="#a3bef0" opacity="0.9"/>
              <polygon points="158,70 180,30 202,70 192,64 180,45 168,64" fill="white" opacity="0.9"/>
              <polygon points="200,140 280,70 320,140" fill="#bcd0f5" opacity="0.7"/>
              <rect x="0" y="128" width="320" height="12" fill="#8ab0e8" opacity="0.3"/>
            </svg>
          </div>
          <div className="nf-code">404</div>
          <h1 className="nf-title">Lost in the Himalayas?</h1>
          <p className="nf-msg">
            The page you're looking for seems to have wandered off the trail.
            Don't worry — every great adventure has a few wrong turns.
          </p>
          <div className="nf-actions">
            <button className="nf-btn-home" onClick={() => navigate("/")}>Go Home</button>
            <button className="nf-btn-dest" onClick={() => navigate("/destinations")}>Browse Destinations</button>
          </div>
        </div>
      </div>
    </>
  );
}
