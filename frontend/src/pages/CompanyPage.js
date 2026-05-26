import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const styles = `
  .co-page { padding-top: 65px; min-height: 100vh; background: #fafafa; }
  .co-hero { background: linear-gradient(135deg, #0a1628, #1a3a6a); padding: 56px 60px; color: white; }
  .co-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); margin-bottom: 8px; }
  .co-hero p { color: rgba(255,255,255,0.75); font-size: 15px; max-width: 560px; line-height: 1.7; }
  .co-body { max-width: 800px; margin: 0 auto; padding: 48px 24px 80px; }
  .co-body h2 { font-size: 20px; font-weight: 700; margin: 28px 0 12px; color: #1a1a1a; }
  .co-body p, .co-body li { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 12px; }
  .co-body ul { padding-left: 20px; margin-bottom: 16px; }
  .co-contact-card { background: white; border-radius: 16px; padding: 28px; border: 1px solid #eee; margin-top: 24px; }
  .co-contact-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; font-size: 15px; }
  .co-contact-row a { color: #1a6bff; text-decoration: none; font-weight: 600; }
  .co-contact-row a:hover { text-decoration: underline; }
`;

export default function CompanyPage({ title, subtitle, children }) {
  return (
    <>
      <style>{styles}</style>
      <Navbar />
      <div className="co-page">
        <div className="co-hero">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="co-body">{children}</div>
      </div>
      <Footer showNewsletter={false} />
    </>
  );
}
