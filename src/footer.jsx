import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="world-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand">
          <h2>🐾 PetPal</h2>
          <p>Adopt. Shop. Love. Connecting pets with families worldwide.</p>
        </div>

        {/* Explore Links */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/adopt">Adopt</a>
            </li>
            <li>
              <a href="/sell">Sell</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>

        <div className="footer-section socials">
          <h4>Connect</h4>
          <div className="social-icons">
            <a
              href="https://wa.me/233509758567?text=Hi%20PetPal!%20I%20want%20to%20adopt%20a%20pet."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
              aria-label="Chat with us on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
              aria-label="Visit our Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
              aria-label="Visit our Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
              aria-label="Visit our Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PetPal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
