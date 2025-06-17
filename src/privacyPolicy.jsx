import React from "react";
import { useNavigate } from "react-router-dom";
import "./Policy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-page">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. Here's how we handle your data:</p>

      <ul>
        <li>
          🔒 We collect only the necessary data to deliver pet and product
          services.
        </li>
        <li>
          📧 Emails are used for order updates, account alerts, and adoption
          confirmations.
        </li>
        <li>🛡️ Your personal info is never sold to third parties.</li>
        <li>🔐 Passwords are encrypted and never stored in plain text.</li>
        <li>
          📊 We use analytics to improve the user experience, never to identify
          users.
        </li>
      </ul>

      <p>
        Questions? Reach us at{" "}
        <a href="mailto:privacy@petpal.com">privacy@petpal.com</a>.
      </p>

      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default PrivacyPolicy;
