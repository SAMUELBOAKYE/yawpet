import React, { useState } from "react";
import "./index.css";
import myPro from "./assets/dnc.png";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Close menu on any link or button click
  const handleCloseMenu = () => setMenuOpen(false);

  // Handle navigation to protected routes
  const handleProtectedClick = (path) => {
    handleCloseMenu();
    if (!isAuthenticated) {
      alert("Please sign up or log in first.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    handleCloseMenu();
    navigate("/login");
  };

  // ✅ Handle search logic
  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    handleCloseMenu();

    if (!query) return;

    if (query.includes("adopt")) navigate("/adopt");
    else if (query.includes("shop") || query.includes("buy")) navigate("/shop");
    else if (query.includes("sell")) navigate("/sell");
    else if (query.includes("donate")) navigate("/donate");
    else if (query.includes("home")) navigate("/");
    else alert("No matching page found.");
  };

  return (
    <header className="head">
      <div className="logo-container">
        <img src={myPro} alt="logo" />
        <span className="brand-name">D & C</span>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`navbar-items ${menuOpen ? "open" : ""}`}>
        <ul className="items">
          <li>
            <Link to="/" onClick={handleCloseMenu}>
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleProtectedClick("/adopt")}>
              Adoptions
            </button>
          </li>
          <li>
            <button onClick={() => handleProtectedClick("/shop")}>Shop</button>
          </li>
          <li>
            <button onClick={() => handleProtectedClick("/sell")}>Sell</button>
          </li>
        </ul>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search pets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Search on Enter
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="cta-buttons">
          <button onClick={() => handleProtectedClick("/adopt")}>
            Adopt a Pet
          </button>

          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate("/signup");
                handleCloseMenu();
              }}
            >
              Get Started
            </button>
          )}

          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
