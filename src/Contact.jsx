import React, { useState, useEffect } from "react";
import "./Contact.css";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import successSound from "./assets/success.mp3";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "e2158152-919f-402f-8674-9aa76afdc614",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "", message: "" });
        new Audio(successSound).play(); // 🔊 Play success sound
        setShowModal(true);
      } else {
        toast.error("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("❌ An error occurred. Please try again.");
    }

    setSubmitting(false);
  };

  // Auto-close modal after 4 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          We’re here to help with your pet adoption, shopping, or selling
          experience.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Get In Touch</h2>
          <div className="info-item">
            <h4>📍 Address</h4>
            <p>123 Pet Street, Ghana</p>
          </div>
          <div className="info-item">
            <h4>📧 Email</h4>
            <p>boakyesamuel189gmail.com</p>
          </div>
          <div className="info-item">
            <h4>📞 Phone</h4>
            <p>+233 541 45 1661</p>
          </div>
          <div className="info-item">
            <h4>⏰ Business Hours</h4>
            <p>Mon - Sat: 8AM - 6PM</p>
          </div>
        </div>
      </div>

      {/* ✅ Modal with animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-box"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CheckCircle size={48} color="green" strokeWidth={2.5} />
              <h2>Message Sent!</h2>
              <p>We’ll get back to you soon.</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
