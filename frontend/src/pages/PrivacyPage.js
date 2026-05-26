import CompanyPage from "./CompanyPage";

export default function PrivacyPage() {
  return (
    <CompanyPage title="Privacy Policy" subtitle="How we collect, use, and protect your information.">
      <p>Last updated: May 2026. WanderNepal (&quot;we&quot;) respects your privacy. This policy explains what data we collect when you use our website and booking services.</p>
      <h2>Information we collect</h2>
      <p>We collect account details (name, email), booking information, and usage data to operate our services and improve your experience.</p>
      <h2>How we use data</h2>
      <ul>
        <li>Process bookings and communicate about your trips</li>
        <li>Improve our website and customer support</li>
        <li>Send offers only if you opt in to our newsletter</li>
      </ul>
      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:wandernepal@gmail.com">wandernepal@gmail.com</a>.</p>
    </CompanyPage>
  );
}
