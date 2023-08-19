import React, { useState, useEffect } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

export default function PESDayDelete({ onClickGoBack, onInsertClick }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const [event, setEvent] = useState({
    title: "",
    date: "",
  });

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const data = {
      title: event.title,
      date: event.date,
    };

    try {
      const response = await axios.post("/api/PES_DAY/delete", data);
      setStatus(response.data);
      setEvent({
        title: "",
        date: "",
      });
    } catch (error) {
      setStatus("fail");
    }
    onInsertClick(true);
  };

  useEffect(() => {
    if (status === "success") {
      setPopup(true);
      setMessage("Event Deleted Successfully");
    } else if (status === "fail") {
      setPopup(true);
      setMessage("Deletion Failed");
    }
  }, [status]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    setPopup(false);
    setMessage("");
    setStatus("");
    onClickGoBack();
  };

  return (
    <>
      <div className={eventiStyles.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Title">
              Title
            </label>
            <input
              className={eventiStyles.input}
              type="text"
              placeholder="Enter the Event Name"
              name="title"
              value={event.title}
              onChange={handleInput}
              autoComplete="off"
              autoFocus
              required
            />
          </div>
          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Date">
              Event Date
            </label>
            <input
              className={eventiStyles.input}
              id="date"
              type="text"
              placeholder="Enter the Event Date (DD-MM-YYYY)"
              name="date"
              value={event.date}
              onChange={handleInput}
              autoComplete="off"
              minLength={10}
              maxLength={10}
              required
            />
          </div>
          <div className={eventiStyles.button_container}>
            <button type="submit">Delete Event</button>
            <button
              type="button"
              className={eventiStyles.arrow_left}
              onClick={handleGoBack}
            >
              <ImArrowLeft style={{ color: "#03e9f4" }} />{" "}
              <p> &nbsp; Go Back </p>
            </button>
          </div>
          <div className={eventiStyles.message_container}>
            {popup &&
              (status === "success" ? (
                <h1 style={{ color: "#54fa65", fontSize: "2rem" }}>
                  {message}
                </h1>
              ) : (
                <h1 style={{ color: "red", fontSize: "2rem" }}>{message}</h1>
              ))}
          </div>
        </form>
      </div>
    </>
  );
}
