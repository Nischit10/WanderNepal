import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Field-level error messages
  const [errors, setErrors] = useState({});

  // API response state
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for this field as the user types
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  // --- Validation ---
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
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

  // --- Submit: validate then call backend ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Account created successfully! You can now log in.");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        // Show backend validation errors (e.g. "email already exists")
        const messages = Object.values(data).flat().join(" ");
        setApiError(messages || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setApiError("Cannot reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nepal Sanctuary</h1>
      <p style={styles.subtitle}>
        Begin your journey to the roof of the world. Create your account to
        start planning.
      </p>

      <div style={styles.card}>
        <h2>Create Account</h2>

        {/* Global success / API error banners */}
        {successMsg && <p style={styles.successBanner}>{successMsg}</p>}
        {apiError && <p style={styles.errorBanner}>{apiError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.name ? "#e53e3e" : "#ccc",
            }}
          />
          {errors.name && <p style={styles.fieldError}>{errors.name}</p>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.email ? "#e53e3e" : "#ccc",
            }}
          />
          {errors.email && <p style={styles.fieldError}>{errors.email}</p>}

          {/* Password row */}
          <div style={styles.row}>
            <div style={{ width: "48%" }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  marginRight: 0,
                  width: "100%",
                  borderColor: errors.password ? "#e53e3e" : "#ccc",
                }}
              />
              {errors.password && (
                <p style={styles.fieldError}>{errors.password}</p>
              )}
            </div>

            <div style={{ width: "48%" }}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  width: "100%",
                  borderColor: errors.confirmPassword ? "#e53e3e" : "#ccc",
                }}
              />
              {errors.confirmPassword && (
                <p style={styles.fieldError}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <p style={styles.info}>
            Password must contain at least 8 characters, including a symbol and
            a number.
          </p>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", margin: "20px 0" }}>
          Or continue with
        </p>

        <div style={styles.row}>
          <button style={styles.socialBtn}>Google</button>
          <button style={styles.socialBtn}>Apple</button>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <span style={styles.link}>Login</span>
        </p>
      </div>
    </div>
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
    opacity: 1,
  },
  socialBtn: {
    width: "48%",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  link: { color: "#0b3d91", cursor: "pointer" },
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
  successBanner: {
    background: "#f0fff4",
    border: "1px solid #38a169",
    color: "#276749",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
    fontSize: "13px",
  },
};

export default Signup;