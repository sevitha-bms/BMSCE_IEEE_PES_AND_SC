import React from "react";
import { useLocation} from "react-router-dom";
import style from "../../Components_style/EventsPage_css/EventInfo.module.css";

export default function EventInfo() {
  const location = useLocation();
  const doc = location.state.doc;
  var formattedText = doc.description.replace(/<br>/g, "\n");
  return (
    <>
      <div className={style.outer_container}>
        <div className={style.ImgContainer}>
          <img src={doc.imgLink} alt="EventImage"></img>
        </div>
        <div className={style.info}>
          <div className={style.textcont}>{formattedText}</div>
          <div className={style.button}>
            <a href={doc.regLink}>
              <button type="button">
                <span />
                <span />
                <span />
                <span />
                Register!
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
