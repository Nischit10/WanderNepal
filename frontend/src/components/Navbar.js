import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className={`wn-nav${scrolled ? " scrolled" : ""}`}>
      <span className="wn-nav-logo" onClick={() => navigate("/")}>
        WanderNepal
      </span>

      <ul className="wn-nav-links">
        <li><a className={isActive("/")} onClick={() => navigate("/")}>Home</a></li>
        <li><a className={isActive("/destinations")} onClick={() => navigate("/destinations")}>Destinations</a></li>
        {isLoggedIn && (
          <>
            <li><a className={isActive("/dashboard")} onClick={() => navigate("/dashboard")}>Dashboard</a></li>
            <li><a className={isActive("/bookings")} onClick={() => navigate("/bookings")}>My Bookings</a></li>
            <li><a className={isActive("/profile")} onClick={() => navigate("/profile")}>Profile</a></li>
          </>
        )}
      </ul>

      <div className="wn-nav-actions">
        {isLoggedIn ? (
          <button className="wn-btn-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="wn-btn-ghost" onClick={() => navigate("/signin")}>Login</button>
            <button className="wn-btn-primary" onClick={() => navigate("/signup")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}
