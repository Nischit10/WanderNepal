import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDestinations } from "../services/api";
import { findDestinationId } from "../config/footerDestinations";

const styles = `
  footer.site-footer { background: #f8f8f8; border-top: 1px solid #eee; padding: 60px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; }
  .footer-logo { font-weight: 700; font-size: 18px; color: #1a1a1a; margin-bottom: 12px; }
  .footer-tagline { font-size: 13px; color: #888; line-height: 1.7; max-width: 220px; }
  .footer-col h4 { font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; }
  .footer-col a, .footer-col button.footer-link-btn {
    font-size: 13px; color: #666; text-decoration: none; background: none; border: none;
    padding: 0; cursor: pointer; font-family: inherit; text-align: left;
  }
  .footer-col a:hover, .footer-col button.footer-link-btn:hover { color: #1a6bff; }
  .newsletter-row { display: flex; gap: 8px; margin-top: 4px; }
  .newsletter-input { flex: 1; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; outline: none; font-family: 'Inter', sans-serif; }
  .newsletter-btn { background: #1a6bff; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
  .footer-bottom { max-width: 1200px; margin: 32px auto 0; padding-top: 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; font-size: 12px; color: #aaa; }
  .footer-bottom a { color: #aaa; text-decoration: none; margin-left: 16px; }
  .footer-bottom a:hover { color: #1a6bff; }
`;

export default function Footer({ showNewsletter = true }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [destIds, setDestIds] = useState({});

  useEffect(() => {
    getDestinations()
      .then((list) => {
        setDestIds({
          kathmandu: findDestinationId(list, "kathmandu"),
          annapurna: findDestinationId(list, "annapurna"),
          chitwan: findDestinationId(list, "chitwan"),
        });
      })
      .catch(() => {});
  }, []);

  const goDest = (key) => {
    const id = destIds[key];
    if (id) navigate(`/destinations/${id}`);
    else navigate("/destinations");
  };

  return (
    <>
      <style>{styles}</style>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">WanderNepal</div>
            <p className="footer-tagline">Crafting authentic Nepalese experiences since 2018. We are your travel companions in the Himalayas.</p>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><button type="button" className="footer-link-btn" onClick={() => goDest("kathmandu")}>Kathmandu Valley</button></li>
              <li><button type="button" className="footer-link-btn" onClick={() => goDest("annapurna")}>Annapurna Circuit</button></li>
              <li><button type="button" className="footer-link-btn" onClick={() => goDest("chitwan")}>Chitwan Safari</button></li>
              <li><Link to="/destinations">All Destinations</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 12, lineHeight: 1.6 }}>Stay updated with our latest offers and trekking tips.</p>
            <div className="newsletter-row">
              <input className="newsletter-input" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="button" className="newsletter-btn">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WanderNepal. All rights reserved.</span>
          <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
        </div>
      </footer>
    </>
  );
}
