import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import navStyles from "../Components_style/Navbar.module.css";
import HamburgerMenu from "./Burger";

export default function Navbar() {
  const [logo1, setLogo1] = useState();
  const [logo2, setLogo2] = useState();
  const response = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      let name = "PES White Logo";
      response.current = await axios.get(`/api/images/Images/${name}`);
      setLogo1(response.current.data);
      name = "PES-DAY 2023 Logo";
      response.current = await axios.get(`/api/images/Images/${name}`);
      setLogo2(response.current.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`${navStyles.navbar} ${
          window.location.pathname === "/pesday" ? navStyles.pesdayNavbar : ""
        }`}
      >
        <div className={navStyles.logo_container1}>
          {logo1 && <img src={logo1.imgLink} alt="PESLogo"/>}
        </div>
        {window.location.pathname === "/pesday" && (
          <div className={navStyles.logo_container2}>
            {logo2 && <img src={logo2.imgLink} alt="PESDayLogo"/>}
          </div>
        )}
        <div className={navStyles.container}>
          <div className={navStyles.list_container}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className={navStyles.list_item}>HOME</div>
            </Link>
            <Link to="/events" style={{ textDecoration: "none" }}>
              <div className={navStyles.list_item}>EVENTS</div>
            </Link>
            <Link to="/execom" style={{ textDecoration: "none" }}>
              <div className={navStyles.list_item}>MEET THE SQUAD</div>
            </Link>
            <Link to="/pesday" style={{ textDecoration: "none" }}>
              <div className={navStyles.list_item}>PES-DAY</div>
            </Link>
            <Link to="/contact_us" style={{ textDecoration: "none" }}>
              <div className={navStyles.list_item}>CONTACT US</div>
            </Link>
          </div>
        </div>
        <div className={navStyles.menu}>
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
}