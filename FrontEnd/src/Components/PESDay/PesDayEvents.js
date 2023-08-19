import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateFormatter from "./DateFormatter";
import pesstyles from "../../Components_style/PESDay_css/PesDayEvents.module.css";

export default function PESDayEvents() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const dates = useMemo(() => ["17-06-2023","18-06-2023","19-06-2023", "20-06-2023", "21-06-2023"], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          dates.map((date) => axios.get(`/api/PES_DAY/dates/${date}`))
        );
        const allDocuments = responses.flatMap((response) => response.data);
        setDocuments(allDocuments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dates]);

  const handleEventClick = (doc) => {
    navigate("/eventInfo", { state: { doc } });
  };

  const groupByDate = (documents) => {
    const grouped = {};
    documents.forEach((doc) => {
      const { date } = doc;
      if (grouped[date]) {
        grouped[date].push(doc);
      } else {
        grouped[date] = [doc];
      }
    });
    return grouped;
  };

  const groupedDocuments = groupByDate(documents);

  return (
    <>
      <div className={pesstyles.outer_container}>
        {Object.entries(groupedDocuments).map(([date, docs]) => (
          <div className={pesstyles.section} key={date}>
            <div className={pesstyles.heading}>
              <DateFormatter doc={date} />
            </div>
            <div className={pesstyles.cards}>
              {docs.map((doc) => (
                <div
                  className={pesstyles.card_container}
                  key={doc._id}
                  onClick={() => handleEventClick(doc)}
                >
                  <div className={pesstyles.magic_card}>
                    <div className={pesstyles.magic_card_front}>
                      <img src={doc.imgLink} alt="Event" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}