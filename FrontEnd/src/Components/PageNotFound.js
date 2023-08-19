import React from "react";
import "../Components_style/PageNotFound.css";

export default function Execom() {
  return (
    <>
      <div className="pnf_one">
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <div className="error">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
