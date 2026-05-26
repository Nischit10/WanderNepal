/** Logged-in dashboard — URL `/dashboard`, file `src/pages/DashboardPage.js`. */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --primary-blue: #003d82;
    --secondary-blue: #0052a3;
    --light-blue: #e8f1f8;
    --text-dark: #1a1a1a;
    --text-gray: #666666;
    --text-light: #999999;
    --border-color: #e0e0e0;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --background: #f9fafb;
    --white: #ffffff;
    --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 25px -5px rgba(0,0,0,0.15);
  }

  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: var(--background); color: var(--text-dark); }

  .db-header {
    background: var(--white);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .db-header-container {
    max-width: 1400px; margin: 0 auto;
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
  }
  .db-logo { font-size: 1.25rem; font-weight: 700; color: var(--primary-blue); cursor: pointer; }
  .db-nav { display: flex; gap: 2rem; }
  .db-nav a { color: var(--text-gray); text-decoration: none; font-size: 0.95rem; cursor: pointer; transition: color 0.2s; }
  .db-nav a:hover { color: var(--primary-blue); }
  .db-header-actions { display: flex; gap: 1rem; align-items: center; }
  .db-logout-header { color: var(--error-color); background: none; border: 1px solid var(--error-color); padding: 0.5rem 1.2rem; border-radius: 0.5rem; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.2s; font-family: inherit; }
  .db-logout-header:hover { background: rgba(239,68,68,0.08); }

  .db-main-container {
    display: flex; max-width: 1400px; margin: 0 auto;
    gap: 2rem; padding: 2rem;
    min-height: calc(100vh - 80px);
  }

  /* SIDEBAR */
  .db-sidebar {
    width: 250px; background: var(--white);
    border-radius: 0.75rem; padding: 2rem 1.5rem;
    box-shadow: var(--shadow-md);
    height: fit-content;
    position: sticky; top: 90px; flex-shrink: 0;
  }
  .db-profile-card {
    text-align: center; margin-bottom: 2rem;
    padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);
  }
  .db-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 700; color: white;
    margin: 0 auto 1rem;
  }
  .db-profile-name { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.25rem; }
  .db-profile-meta { font-size: 0.85rem; color: var(--text-gray); }

  .db-sidebar-nav { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }
  .db-sidebar-link {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.75rem 1rem; color: var(--text-dark);
    text-decoration: none; border-radius: 0.5rem;
    transition: all 0.2s; font-size: 0.95rem; cursor: pointer; border: none; background: none; font-family: inherit; width: 100%; text-align: left;
  }
  .db-sidebar-link:hover { background: var(--light-blue); color: var(--primary-blue); }
  .db-sidebar-link.active { background: var(--primary-blue); color: white; font-weight: 600; }

  .db-level-badge {
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
    color: white; padding: 1.5rem; border-radius: 0.75rem;
    text-align: center; margin-bottom: 1.5rem;
  }
  .db-level-badge h4 { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 0.5rem; opacity: 0.9; }
  .db-level-name { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem; }
  .db-level-desc { font-size: 0.78rem; opacity: 0.85; }

  .db-logout-btn {
    display: flex; align-items: center; gap: 0.75rem;
    width: 100%; padding: 0.75rem 1rem;
    background: none; border: none;
    color: var(--error-color); border-radius: 0.5rem;
    cursor: pointer; font-size: 0.95rem; transition: background 0.2s; font-family: inherit;
  }
  .db-logout-btn:hover { background: rgba(239,68,68,0.1); }

  /* MAIN CONTENT */
  .db-main-content { flex: 1; min-width: 0; }

  .db-overview {
    background: var(--white); border-radius: 0.75rem;
    padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);
  }
  .db-overview-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; color: var(--text-gray); margin-bottom: 0.5rem; text-transform: uppercase; }
  .db-overview-title { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 700; margin-bottom: 1.5rem; }
  .db-stats-row { display: flex; gap: 3rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .db-stat { display: flex; flex-direction: column; }
  .db-stat-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; color: var(--text-gray); margin-bottom: 0.4rem; text-transform: uppercase; }
  .db-stat-number { font-size: 1.8rem; font-weight: 700; color: var(--text-dark); }
  .db-view-history { color: var(--primary-blue); text-decoration: none; font-weight: 600; font-size: 0.95rem; cursor: pointer; border: none; background: none; font-family: inherit; }
  .db-view-history:hover { color: var(--secondary-blue); }

  .db-section-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 1.5rem; }

  /* EXPEDITION CARDS */
  .db-expedition-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 1.5rem; margin-bottom: 2rem;
  }
  .db-expedition-card {
    background: var(--white); border-radius: 0.75rem;
    overflow: hidden; box-shadow: var(--shadow-md);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .db-expedition-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .db-expedition-img { position: relative; height: 180px; overflow: hidden; }
  .db-expedition-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
  .db-expedition-card:hover .db-expedition-img img { transform: scale(1.05); }
  .db-status-badge {
    position: absolute; top: 1rem; left: 1rem;
    padding: 0.35rem 0.75rem; border-radius: 0.25rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
  }
  .db-status-badge.confirmed { background: var(--success-color); color: white; }
  .db-status-badge.pending { background: var(--warning-color); color: white; }
  .db-status-badge.cancelled { background: var(--error-color); color: white; }

  .db-expedition-body { padding: 1.5rem; }
  .db-expedition-body h4 { font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem; }
  .db-expedition-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: var(--text-gray); margin-bottom: 0.5rem; }
  .db-expedition-price { font-size: 1.2rem; font-weight: 700; color: var(--secondary-blue); margin-top: 1rem; }
  .db-expedition-actions { padding: 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .db-manage-btn {
    background: var(--primary-blue); color: white; border: none;
    padding: 0.7rem; border-radius: 0.5rem; cursor: pointer;
    font-weight: 600; font-size: 0.9rem; transition: background 0.2s; font-family: inherit;
  }
  .db-manage-btn:hover { background: var(--secondary-blue); }
  .db-process-btn {
    background: #e5e7eb; color: var(--text-dark); border: none;
    padding: 0.7rem; border-radius: 0.5rem; cursor: pointer;
    font-weight: 600; font-size: 0.9rem; font-family: inherit;
  }
  .db-details-link { color: var(--primary-blue); text-align: center; font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; background: none; font-family: inherit; }
  .db-details-link:hover { color: var(--secondary-blue); }

  /* PERSONAL INFO */
  .db-personal-info {
    background: var(--white); border-radius: 0.75rem;
    padding: 2rem; box-shadow: var(--shadow-md); margin-bottom: 2rem;
  }
  .db-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem; margin-bottom: 2rem;
  }
  .db-info-group { display: flex; flex-direction: column; }
  .db-info-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; color: var(--text-gray); margin-bottom: 0.4rem; text-transform: uppercase; }
  .db-info-value { font-size: 1rem; font-weight: 600; color: var(--text-dark); }
  .db-edit-btn {
    background: white; color: var(--primary-blue);
    border: 1px solid var(--border-color); padding: 0.7rem 1.5rem;
    border-radius: 0.5rem; cursor: pointer; font-weight: 600;
    font-size: 0.95rem; transition: all 0.2s; font-family: inherit;
  }
  .db-edit-btn:hover { background: var(--light-blue); border-color: var(--primary-blue); }

  /* FOOTER */
  .db-footer {
    background: var(--white); border-top: 1px solid var(--border-color);
    padding: 3rem 2rem 2rem; margin-top: 2rem;
  }
  .db-footer-container {
    max-width: 1400px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem; margin-bottom: 2rem;
  }
  .db-footer-section h4 { font-weight: 700; margin-bottom: 1rem; }
  .db-footer-section p { font-size: 0.9rem; color: var(--text-gray); line-height: 1.6; }
  .db-footer-section a { display: block; color: var(--text-gray); text-decoration: none; font-size: 0.9rem; margin-bottom: 0.5rem; transition: color 0.2s; cursor: pointer; }
  .db-footer-section a:hover { color: var(--primary-blue); }
  .db-newsletter { display: flex; gap: 0.5rem; }
  .db-newsletter-input { flex: 1; padding: 0.7rem; border: 1px solid var(--border-color); border-radius: 0.5rem; font-size: 0.9rem; font-family: inherit; }
  .db-newsletter-input:focus { outline: none; border-color: var(--primary-blue); }
  .db-newsletter-btn { background: var(--primary-blue); color: white; border: none; padding: 0.7rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-family: inherit; }
  .db-newsletter-btn:hover { background: var(--secondary-blue); }
  .db-footer-bottom { text-align: center; padding-top: 2rem; border-top: 1px solid var(--border-color); color: var(--text-gray); font-size: 0.9rem; }

  @media (max-width: 768px) {
    .db-main-container { flex-direction: column; padding: 1rem; gap: 1rem; }
    .db-sidebar { width: 100%; position: static; }
    .db-header-container { flex-wrap: wrap; gap: 0.75rem; padding: 0 1rem; }
    .db-expedition-cards { grid-template-columns: 1fr; }
    .db-info-grid { grid-template-columns: 1fr; }
  }
`;

const MOCK_EXPEDITIONS = [
  {
    id: 1,
    name: 'Everest Base Camp Trek',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&h=300&fit=crop',
    status: 'CONFIRMED',
    dates: 'Oct 14 – Oct 28, 2025',
    people: '2 People',
    price: '$1,850',
    destId: '2',
  },
  {
    id: 2,
    name: 'Pokhara Lakeside Retreat',
    image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&h=300&fit=crop',
    status: 'PENDING',
    dates: 'Dec 05 – Dec 10, 2025',
    people: '1 Person',
    price: '$420',
    destId: '4',
  },
];

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> },
  { label: 'Profile', path: '/profile', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { label: 'My Bookings', path: '/bookings', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><polyline points="17 8 12 13 7 8"/></svg> },
  { label: 'Wishlist', path: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [user, setUser] = useState({ full_name: 'Traveler', email: '', user_id: null });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (_) {}
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout(navigate);
    }
  };

  const firstName = user.full_name?.split(' ')[0] || 'Traveler';
  const initials = user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'W';

  return (
    <>
      <style>{styles}</style>

      <Navbar />

      <div className="db-main-container">
        {/* SIDEBAR */}
        <aside className="db-sidebar">
          <div className="db-profile-card">
            <div className="db-avatar">{initials}</div>
            <h3 className="db-profile-name">{user.full_name || 'Traveler'}</h3>
            <p className="db-profile-meta">{user.email || 'WanderNepal Member'}</p>
          </div>

          <nav className="db-sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`db-sidebar-link${activeNav === item.label ? ' active' : ''}`}
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.path) navigate(item.path);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="db-level-badge">
            <h4>TRAVELER LEVEL</h4>
            <p className="db-level-name">Peak Explorer</p>
            <p className="db-level-desc">3 more treks to reach 'Summit Master'</p>
          </div>

          <button className="db-logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </aside>

        {/* MAIN */}
        <main className="db-main-content">
          {/* Overview */}
          <div className="db-overview">
            <p className="db-overview-eyebrow">Dashboard Overview</p>
            <h1 className="db-overview-title">Namaste, {firstName} 🙏</h1>
            <div className="db-stats-row">
              <div className="db-stat">
                <span className="db-stat-label">Active Trips</span>
                <span className="db-stat-number">0{MOCK_EXPEDITIONS.filter(e => e.status === 'CONFIRMED').length}</span>
              </div>
              <div className="db-stat">
                <span className="db-stat-label">Miles Covered</span>
                <span className="db-stat-number">142</span>
              </div>
            </div>
            <button className="db-view-history" onClick={() => navigate('/bookings')}>View all bookings →</button>
          </div>

          {/* Upcoming Expeditions */}
          <section style={{ marginBottom: '2rem' }}>
            <h3 className="db-section-title">Upcoming Expeditions</h3>
            <div className="db-expedition-cards">
              {MOCK_EXPEDITIONS.map((exp) => (
                <div key={exp.id} className="db-expedition-card">
                  <div className="db-expedition-img">
                    <img src={exp.image} alt={exp.name} loading="lazy"/>
                    <span className={`db-status-badge ${exp.status.toLowerCase()}`}>{exp.status}</span>
                  </div>
                  <div className="db-expedition-body">
                    <h4>{exp.name}</h4>
                    <p className="db-expedition-meta">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {exp.dates}
                    </p>
                    <p className="db-expedition-meta">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {exp.people}
                    </p>
                    <p className="db-expedition-price">{exp.price}</p>
                  </div>
                  <div className="db-expedition-actions">
                    {exp.status === 'CONFIRMED'
                      ? <button className="db-manage-btn" onClick={() => navigate('/bookings')}>Manage Booking</button>
                      : <button className="db-process-btn">Processing Payment</button>
                    }
                    <button className="db-details-link" onClick={() => navigate(`/destinations/${exp.destId}`)}>View Destination →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Personal Info */}
          <section className="db-personal-info">
            <h3 className="db-section-title">Personal Information</h3>
            <div className="db-info-grid">
              <div className="db-info-group">
                <label className="db-info-label">Full Name</label>
                <p className="db-info-value">{user.full_name || '—'}</p>
              </div>
              <div className="db-info-group">
                <label className="db-info-label">Email Address</label>
                <p className="db-info-value">{user.email || '—'}</p>
              </div>
              <div className="db-info-group">
                <label className="db-info-label">Member ID</label>
                <p className="db-info-value">#{user.user_id || '—'}</p>
              </div>
              <div className="db-info-group">
                <label className="db-info-label">Traveler Level</label>
                <p className="db-info-value">Peak Explorer</p>
              </div>
            </div>
            <button className="db-edit-btn">Edit Personal Details</button>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="db-footer">
        <div className="db-footer-container">
          <div className="db-footer-section">
            <h4>WanderNepal</h4>
            <p>Crafting immersive Himalayan journeys for the discerning traveler.</p>
          </div>
          <div className="db-footer-section">
            <h4>Quick Links</h4>
            <a onClick={() => navigate('/')}>About</a>
            <a>Privacy</a>
            <a>Terms</a>
            <a>Contact</a>
          </div>
          <div className="db-footer-section">
            <h4>Destinations</h4>
            <a onClick={() => navigate('/destinations/2')}>Everest Region</a>
            <a onClick={() => navigate('/destinations/1')}>Annapurna Circuit</a>
            <a onClick={() => navigate('/destinations/5')}>Langtang Heritage</a>
          </div>
          <div className="db-footer-section">
            <h4>Newsletter</h4>
            <div className="db-newsletter">
              <input
                type="email"
                placeholder="Your email"
                className="db-newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button className="db-newsletter-btn" onClick={() => {
                if (newsletterEmail) { alert('Thanks for subscribing!'); setNewsletterEmail(''); }
                else alert('Please enter your email.');
              }}>→</button>
            </div>
          </div>
        </div>
        <div className="db-footer-bottom">
          <p>© 2026 WanderNepal. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
