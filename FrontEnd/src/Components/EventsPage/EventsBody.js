import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventsStyle from "../../Components_style/EventsPage_css/Events_Body.module.css";

export default function Events_Body() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/events");
        setDocuments(response.data);
      } catch (error) {
        console.log("Error Retrieveing data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleEventClick = (doc) => {
    navigate("/eventInfo", { state: { doc } });
  };

  return (
    <>
      <div className={EventsStyle.content}>
        <div className={EventsStyle.heading}>Just Around the Corner!</div>
        <div className={EventsStyle.cards}>
          {documents.map((doc) => (
            <div
              className={EventsStyle.card_container}
              key={doc._id}
              onClick={() => handleEventClick(doc)}
            >
              <div className={EventsStyle.magic_card}>
                <div className={EventsStyle.magic_card_front}>
                  <img src={doc.imgLink} alt="EventsImage"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
