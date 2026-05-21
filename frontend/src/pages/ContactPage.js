import CompanyPage from "./CompanyPage";

export default function ContactPage() {
  return (
    <CompanyPage title="Contact Us" subtitle="Reach our team for trip planning, support, or partnerships.">
      <div className="co-contact-card">
        <div className="co-contact-row"><span>📞</span><a href="tel:+9779746953216">+977 9746953216</a></div>
        <div className="co-contact-row"><span>✉️</span><a href="mailto:wandernepal@gmail.com">wandernepal@gmail.com</a></div>
        <div className="co-contact-row"><span>📍</span><span>Kathmandu, Nepal</span></div>
      </div>
      <h2>Office hours</h2>
      <p>Sunday – Friday, 9:00 AM – 6:00 PM NPT. We typically respond within one business day.</p>
    </CompanyPage>
  );
}
