// All imports unchanged
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();
  const { signup, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
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
      const success = signup(formData.email, formData.password);
      if (!success) {
        setLoading(false);
        toast.error("Signup failed. Email may already exist.");
        return;
      }

      const userInfo = {
        name: formData.name,
        email: formData.email,
      };

      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("auth", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: formData.email })
      );

      // ✅ Send email via Web3Forms
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "e2158152-919f-402f-8674-9aa76afdc614", // 🔑 Replace this
            subject: "📥 New Signup Notification",
            name: formData.name,
            email: formData.email,
            message: `A new user just signed up:\nName: ${formData.name}\nEmail: ${formData.email}`,
          }),
        });

        if (!res.ok) {
          console.warn("Web3Forms email failed.");
        }
      } catch (err) {
        console.error("Web3Forms error:", err);
      }

      // Reset faorm and notify
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
      setLoading(false);

      toast.success("🎉 Signup successful!", { position: "top-center" });
      navigate("/");
    }, 1000);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const user = {
        name: decoded.name,
        email: decoded.email,
      };

      const users = JSON.parse(localStorage.getItem("users")) || {};
      users[user.email] = { email: user.email, password: "google" };
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email })
      );
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("auth", "true");

      login(user.email, "google");

      toast.success("🎉 Google signup successful!", { position: "top-center" });
      navigate("/");
    } catch (err) {
      console.error("Google decode error:", err);
      toast.error("❌ Failed to authenticate with Google.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>Full Name:</label>
        <div className="input-group">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <label>Email:</label>
        <div className="input-group">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <label>Password:</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <label>Confirm Password:</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="toggle-show">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label> Show Password</label>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Processing..." : "Sign Up"}
        </button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <div className="or-divider">OR</div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              toast.error("❌ Google Login Failed", {
                position: "top-center",
              })
            }
          />
        </GoogleOAuthProvider>
      </form>
    </div>
  );
}

export default SignUp;
