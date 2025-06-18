import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

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

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("auth", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: formData.email })
      );

      // Send email notification
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "e2158152-919f-402f-8674-9aa76afdc614",
            subject: "📥 New Signup Notification",
            name: formData.name,
            email: formData.email,
            message: `New user signup:\nName: ${formData.name}\nEmail: ${formData.email}`,
          }),
        });
      } catch (err) {
        console.warn("Web3Forms email failed:", err);
      }

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
      </form>
    </div>
  );
}

export default SignUp;
