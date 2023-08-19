import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import EventsBody from "./EventsPage/EventsBody";
import PESDayEvents from "./PESDay/PesDayEvents";
import AnimatedCube from "./AnimatedCube";

const EventNotFound = lazy( () => import("./EventsPage/EventNotFound"));

export default function Excom() {
  const [PESDayEnable, setPESDayEnable] = useState(null);
  const [eventsEnable, setEventsEnable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("/api/count/PES-DAY-EVENTS");
        setPESDayEnable(response1.data.count);
        const response2 = await axios.get("/api/count/Events");
        setEventsEnable(response2.data.count);
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
        <>
        <AnimatedCube />
        </>
      ) : (
        <>
          {PESDayEnable >= 0 ? (
            <PESDayEvents />
          ) : eventsEnable > 0 ? (
            <EventsBody />
          ) : (
            <EventNotFound />
          )}
        </>
      )}
      </Suspense>
    </>
  );
}
