import React from "react";
import { useNavigate } from "react-router-dom";
import "./successPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>🎉 Success!</h1>
      <p>Your pet listing has been submitted successfully.</p>
      <div className="success-actions">
        <button onClick={() => navigate("/shop")}>View Shop</button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default SuccessPage;
