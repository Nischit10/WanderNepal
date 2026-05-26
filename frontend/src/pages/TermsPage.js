import CompanyPage from "./CompanyPage";

export default function TermsPage() {
  return (
    <CompanyPage title="Terms & Conditions" subtitle="Please read these terms before booking with WanderNepal.">
      <p>By using WanderNepal and confirming a booking, you agree to the following terms.</p>
      <h2>Bookings & payments</h2>
      <p>Prices shown are estimates based on selected dates. Final totals are calculated at checkout. A deposit may be required for certain treks.</p>
      <h2>Cancellations</h2>
      <p>Free cancellation within 24 hours of booking where stated. After that, fees may apply depending on how close to the departure date you cancel.</p>
      <h2>Liability</h2>
      <p>Adventure travel involves risk. You are responsible for suitable fitness, insurance, and following guide instructions. WanderNepal is not liable for events outside our reasonable control.</p>
    </CompanyPage>
  );
}
