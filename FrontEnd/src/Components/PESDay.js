import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import PESDayBody from "./PESDay/PESDayBody";
import AnimatedCube from "./AnimatedCube";

const EventNotFound = lazy(() => import("./EventsPage/EventNotFound"));

export default function PESDay() {
  const [pageEnable, setPageEnable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/count/PES-DAY-EVENTS");
        setPageEnable(response.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {loading ? (
          <AnimatedCube />
        ) : (
          <>{pageEnable > 0 ? <PESDayBody /> : <EventNotFound />}</>
        )}
      </Suspense>
    </>
  );
}
