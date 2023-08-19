import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import {Routes, Route, useLocation, useNavigate, Navigate} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Execom from "./Components/Execom";
import Events from "./Components/Events";
import PESDay from "./Components/PESDay";
import { AuthContext } from "./AuthenticationProvider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const UpdateDatabase = lazy(() => import("./Components/UpdateDatabase"));
const Login = lazy(() => import("./Components/Login"));
const EventInfo = lazy(() => import("./Components/EventsPage/EventInfo.js"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));
const Contactus = lazy(() => import("./Components/Contactus"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [isNotFoundVisible, setIsNotFoundVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsNotFoundVisible(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  useEffect(() => {
    let isDatabasePath = location.pathname.includes("/database");

    if (!isAuthenticated && isDatabasePath) {
      navigate("userauthentication", { replace: true });
    }

    if (isAuthenticated && !isDatabasePath) {
      handleLogout();
    }
  }, [location, isAuthenticated, handleLogout ,navigate]);

    return (
      <>
        <Navbar />
        <div className="outer_container">
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="execom" element={<Execom />} />
          <Route path="pesday" element={<PESDay />} />
          <Route path="contact_us" element={<Contactus />} />
          <Route
            path=":slug/userauthentication"
            element={<Navigate to="/userauthentication" replace={true} />}
          />
          <Route path="userauthentication" element={<Login />} />
          <Route path="database" element={<UpdateDatabase />} />
          {isNotFoundVisible && <Route path="*" element={<PageNotFound />} />}
          <Route path="/eventInfo" element={<EventInfo />} />
        </Routes>
        </Suspense>
        </div>
        <Footer />
      </>
    );
};

export default App;