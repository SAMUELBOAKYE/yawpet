import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useAuth } from "./AuthContext"; // ✅ Auth Context

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ AuthContext login function
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (formData.password.length < 6) newErrors.password = "Password too short";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const success = login(formData.email, formData.password); // ✅ Call context login
      if (success) {
        toast.success("✅ Login successful!", { position: "top-center" });

        // 🔗 Send email to you via Web3Forms
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_key: "e2158152-919f-402f-8674-9aa76afdc614", // ⛳ Replace with your actual Web3Forms key!
              subject: "New Login Activity",
              name: "Login Form",
              email: formData.email,
              message: `🔐 User ${formData.email} just logged in.`,
            }),
          });
        } catch (err) {
          console.error("Web3Forms error:", err);
        }

        setFormData({ email: "", password: "" });
        setErrors({});
        setLoading(false);
        setTimeout(() => navigate("/"), 1000); // ✅ Redirect after login
      } else {
        toast.error("❌ Invalid credentials", { position: "top-center" });
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email:</label>
        <div className="input-group">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <label>Password:</label>
        <div className="input-group">
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
