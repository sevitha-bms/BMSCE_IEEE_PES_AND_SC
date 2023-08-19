import "../Components_style/Burger.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div ref={menuRef} className={`menu ${isOpen ? "open" : ""}`}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="list_item" onClick={toggleMenu}>
            HOME
          </div>
        </Link>
        <Link to="/events" style={{ textDecoration: "none" }}>
          <div className="list_item" onClick={toggleMenu}>
            EVENTS
          </div>
        </Link>
        <Link to="/execom" style={{ textDecoration: "none" }}>
          <div className="list_item" onClick={toggleMenu}>
            MEET THE SQUAD
          </div>
        </Link>
        <Link to="/pesday" style={{ textDecoration: "none" }}>
          <div className="list_item" onClick={toggleMenu}>
            PES-DAY
          </div>
        </Link>
        <Link to="/contact_us" style={{ textDecoration: "none" }}>
          <div className="list_item" onClick={toggleMenu}>
            CONTACT US
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
