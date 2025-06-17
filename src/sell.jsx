import React, { useState } from "react";
import "./SellForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellForm = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    vaccinated: "",
    description: "",
    price: "",
    email: "",
    location: "",
    contact: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return toast.error("You must agree to the terms.");

    toast.info("Submitting...");

    const submissionData = {
      access_key: "e2158152-919f-402f-8674-9aa76afdc614",
      subject: "🐾 New Pet Listing Submission",
      name: form.name,
      email: form.email,
      message: `
New Pet Listing Submission:

Pet Name: ${form.name}
Type: ${form.type}
Breed: ${form.breed}
Age: ${form.age}
Gender: ${form.gender}
Vaccinated: ${form.vaccinated}
Description: ${form.description}
Price: ${form.price}
Email: ${form.email}
Location: ${form.location}
Contact: ${form.contact}
      `,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        toast.success("Pet listed successfully!");
        navigate("/success"); // ✅ Redirect to success page
      } else {
        toast.error("Failed to send listing email.");
      }
    } catch (error) {
      console.error("Web3Forms error:", error);
      toast.error("Something went wrong.");
    }
  };

  const handlePrint = () => {
    const printableWindow = window.open("", "_blank");
    const content = `
      <h2>Pet Listing Summary</h2>
      <p><strong>Pet Name:</strong> ${form.name}</p>
      <p><strong>Type:</strong> ${form.type}</p>
      <p><strong>Breed:</strong> ${form.breed}</p>
      <p><strong>Age:</strong> ${form.age}</p>
      <p><strong>Gender:</strong> ${form.gender}</p>
      <p><strong>Vaccinated:</strong> ${form.vaccinated}</p>
      <p><strong>Description:</strong> ${form.description}</p>
      <p><strong>Price:</strong> ${form.price}</p>
      <p><strong>Email:</strong> ${form.email}</p>
      <p><strong>Location:</strong> ${form.location}</p>
      <p><strong>Contact:</strong> ${form.contact}</p>
    `;
    printableWindow.document.write(
      `<html><head><title>Print</title></head><body>${content}</body></html>`
    );
    printableWindow.document.close();
    printableWindow.print();
  };

  const handleDownload = () => {
    const textContent = `
Pet Name: ${form.name}
Type: ${form.type}
Breed: ${form.breed}
Age: ${form.age}
Gender: ${form.gender}
Vaccinated: ${form.vaccinated}
Description: ${form.description}
Price: ${form.price}
Email: ${form.email}
Location: ${form.location}
Contact: ${form.contact}
    `;
    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pet-listing.txt";
    link.click();
  };

  return (
    <div className="sell-form-container">
      <h2>📋 List Your Pet for Sale or Adoption</h2>
      <form className="sell-form" onSubmit={handleSubmit}>
        {/* Pet Info Inputs */}
        <div className="form-section">
          <label>🐾 Pet Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>🐶 Type/Species:</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>📍 Breed:</label>
          <input
            type="text"
            name="breed"
            value={form.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>🧠 Age:</label>
          <input
            type="text"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>⚧ Gender:</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-section">
          <label>🧬 Vaccinated?</label>
          <select
            name="vaccinated"
            value={form.vaccinated}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-section">
          <label>🗣️ Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>💵 Price (or leave 0 for Free):</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-section">
          <label>📍 Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>📍 Location:</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-section">
          <label>📞 Contact Info:</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <label>I agree to the terms and conditions of listing pets.</label>
        </div>

        <button type="submit" className="submit-button">
          Submit Listing
        </button>

        <div className="summary-actions">
          <button type="button" onClick={handlePrint} className="submit-button">
            🖨️ Print
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="submit-button"
          >
            📥 Download
          </button>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="submit-button"
            style={{ backgroundColor: "#4caf50" }}
          >
            Go to Shop
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellForm;
