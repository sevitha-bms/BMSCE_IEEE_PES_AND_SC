import React from "react";
import footerStyles from "../Components_style/Footer.module.css";
import { SiInstagram } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { GrMail } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <div className={footerStyles.outer_container}>
        <div className={footerStyles.inner_container_1}>
          <div className={footerStyles.social_media}>
            <div className={footerStyles.heading}>Follow us on</div>
            <div className={footerStyles.icons}>
              <a href="https://instagram.com/bmsce_pes?igshid=ZDdkNTZiNTM=">
                <SiInstagram
                  style={{
                    fill: "#E1306C",
                    fontSize: "2.5rem",
                  }}
                />
              </a>

              <a href="https://www.linkedin.com/company/bmsce-ieee-pes/">
                <SiLinkedin
                  style={{
                    borderRadius: "15%",
                    fill: "#0077B5",
                    fontSize: "2.5rem",
                  }}
                />
              </a>
            </div>
          </div>
          <div className={footerStyles.contact_links}>
            <div className={footerStyles.heading}>Contact us</div>

            <div className={footerStyles.content}>
              <div className={footerStyles.wrap}>
                <div className={footerStyles.icon}>
                  <GrMail style={{ color: "white", fontSize: "1rem" }} />
                </div>
                <div className={footerStyles.text}>
                  <a href="mailto:ieee.pes@bmsce.ac.in">ieee.pes@bmsce.ac.in</a>
                </div>
              </div>
              <div className={footerStyles.wrap}>
                <div className={footerStyles.icon}>
                  <MdOutlineLocationOn
                    style={{ color: "white", fontSize: "1.25rem" }}
                  />
                </div>
                <div className={footerStyles.text}>
                  <a href="https://goo.gl/maps/URbRiGTjx1nACTQy7">
                    P.O. Box No.: 1908, Bull Temple Road,
                    <br />
                    Bangalore - 560 019
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={footerStyles.inner_container_2}>
          <div className={footerStyles.links}>
            <a href="https://ieee.org/">IEEE</a>
            <a href="https://ieee-pes.org/">IEEE PES</a>
            <a href="https://ieee-sensors.org/">IEEE Sensors Council</a>
            <a href="https://r10.ieee.org/bangalore-pes/">
              IEEE PES Bangalore Chapter
            </a>
            <a href="https://r10.ieee.org/ic-pes/">Region 10</a>
            <a href="https://pes-women-in-power.org/">IEEE PES WIP</a>
            <a href="https://pes-yp.org/">IEEE PES YP</a>
            <a href="https://ee-scholarship.org/">
              IEEE PES Scolarship Plus Initiative
            </a>
            <a href="https://bmsceieee.com/">BMSCE IEEE SB</a>
            <br /> <br />
            <p className={footerStyles.text}>
              © BMSCE IEEE PES & SC. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
