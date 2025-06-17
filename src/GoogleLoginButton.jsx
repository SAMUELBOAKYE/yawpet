// GoogleLoginButton.jsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const user = {
        name: decoded.name,
        email: decoded.email,
      };

      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("auth", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email })
      );

      const users = JSON.parse(localStorage.getItem("users")) || {};
      users[user.email] = { email: user.email, password: "google" };
      localStorage.setItem("users", JSON.stringify(users));

      login(user.email, "google");

      toast.success("🎉 Google login successful!", { position: "top-center" });
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("❌ Google login failed!", { position: "top-center" });
    }
  };

  return (
    <div className="google-login">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          toast.error("❌ Google Login Failed", {
            position: "top-center",
          })
        }
        shape="pill"
        width="100%"
      />
    </div>
  );
};

export default GoogleLoginButton;
