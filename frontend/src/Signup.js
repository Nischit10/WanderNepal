import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { apiUrl } from "./config";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;
    if ((name === "password" || name === "confirmPassword") && /\s/.test(value)) return;
    if (name === "name" && value.length > 50) return;
    if (name === "email" && value.length > 100) return;
    if (name === "password" && value.length > 64) return;
    if (name === "confirmPassword" && value.length > 64) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      formData.password.length < 8 ||
      !/[0-9]/.test(formData.password) ||
      !/[^a-zA-Z0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include a number and a symbol.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/signup/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const raw = await response.text();
      let data = {};
      try {
        if (raw) data = JSON.parse(raw);
      } catch {
        data = {};
      }

      if (response.ok) {
        navigate("/signin");
      } else {
        const parts = [];
        for (const v of Object.values(data)) {
          if (Array.isArray(v)) parts.push(...v.filter((x) => typeof x === "string"));
          else if (typeof v === "string") parts.push(v);
        }
        setApiError(parts.join(" ").trim());
      }
    } catch {
      setApiError("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ ...styles.container, paddingTop: 65 }}>
      <h1 style={styles.title}>WanderNepal</h1>
      <p style={styles.subtitle}>
        Begin your journey to the roof of the world. Create your account to
        start planning.
      </p>

      <div style={styles.card}>
        <h2>Create Account</h2>

        {apiError && <p style={styles.errorBanner}>{apiError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            style={{ ...styles.input, borderColor: errors.name ? "#e53e3e" : "#ccc" }}
          />
          {errors.name && <p style={styles.fieldError}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            style={{ ...styles.input, borderColor: errors.email ? "#e53e3e" : "#ccc" }}
          />
          {errors.email && <p style={styles.fieldError}>{errors.email}</p>}

          <div style={styles.row}>
            <div style={{ width: "48%" }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{ ...styles.input, marginRight: 0, width: "100%", borderColor: errors.password ? "#e53e3e" : "#ccc" }}
              />
              {errors.password && <p style={styles.fieldError}>{errors.password}</p>}
            </div>

            <div style={{ width: "48%" }}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ ...styles.input, width: "100%", borderColor: errors.confirmPassword ? "#e53e3e" : "#ccc" }}
              />
              {errors.confirmPassword && <p style={styles.fieldError}>{errors.confirmPassword}</p>}
            </div>
          </div>

          <p style={styles.info}>
            Password must contain at least 8 characters, including a symbol and a number.
          </p>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signin")}>
            Login
          </span>
        </p>
      </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #cfd9df, #e2ebf0)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
  },
  title: { color: "#0b3d91" },
  subtitle: {
    color: "#555",
    textAlign: "center",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "380px",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0 4px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  row: { display: "flex", justifyContent: "space-between" },
  info: { fontSize: "12px", color: "green" },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0b3d91",
    color: "white",
    border: "none",
    borderRadius: "25px",
    marginTop: "10px",
    cursor: "pointer",
  },
  link: { color: "#0b3d91", cursor: "pointer", fontWeight: "600" },
  fieldError: {
    color: "#e53e3e",
    fontSize: "11px",
    margin: "0 0 6px",
  },
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #e53e3e",
    color: "#e53e3e",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
    fontSize: "13px",
  },
};

export default Signup;