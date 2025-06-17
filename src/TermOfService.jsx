import React from "react";
import { useNavigate } from "react-router-dom";
import "./Policy.css";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-page">
      <h1>Terms of Service</h1>
      <p>By using our services, you agree to the following terms:</p>

      <ul>
        <li>
          🐾 You must be 18+ or have guardian consent to adopt or sell pets.
        </li>
        <li>🐶 Do not post illegal or unethical animal listings.</li>
        <li>
          🚚 Shop deliveries are managed through verified logistics partners.
        </li>
        <li>🔐 You're responsible for your account’s security.</li>
        <li>📦 Product return policies vary by item.</li>
        <li>📜 Terms may change; continued use means acceptance.</li>
      </ul>

      <p>
        Questions? Email us at{" "}
        <a href="mailto:support@petpal.com">support@petpal.com</a>.
      </p>

      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default TermsOfService;
