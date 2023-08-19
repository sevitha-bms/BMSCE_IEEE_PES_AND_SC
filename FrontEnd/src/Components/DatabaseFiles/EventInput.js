import React, { useState, useEffect } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

const validateTime = (timeString) => {
  const pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const isValid = pattern.test(timeString);

  if (!isValid) {
    window.alert("Incorrect Time! Check the Time Format.");
    return false;
  }
  return true;
};
const validateDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const numericDay = parseInt(day, 10);
  const numericMonth = parseInt(month, 10);
  const numericYear = parseInt(year, 10);
  const isValidDay = numericDay >= 1 && numericDay <= 31;
  const isValidMonth = numericMonth >= 1 && numericMonth <= 12;
  const isValidYear =
    year.length === 4 && numericYear >= 1000 && numericYear <= 9999;
  const isValidDate = isValidDay && isValidMonth && isValidYear;
  if (isValidDate === false) {
    window.alert("Incorrect Date! Check the Date Format");
  }
  return isValidDate;
};

export default function EventInput({
  selectedDocument = null,
  onClickGoBack,
  onInsertClick,
}) {
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [event, setEvent] = useState({
    title: selectedDocument?.title || "",
    date: selectedDocument?.date || "",
    time: selectedDocument?.time || "",
    description: selectedDocument?.description || "",
    imgLink: selectedDocument?.imgLink || "",
    regLink: selectedDocument?.regLink || "",
  });

  useEffect(() => {
    if (selectedDocument) {
      setEvent(selectedDocument);
      setUpdating(true);
    }
  }, [selectedDocument]);
  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    const isValidTime = validateTime(event.time);
    if (!isValidTime) {
      return;
    }

    const isValidDate = validateDate(event.date);
    if (!isValidDate) {
      return;
    }

    const description = event.description;

    const formattedText = description.replace(/\n/g, "<br>");

    const data = {
      _id: event._id,
      title: event.title,
      date: event.date,
      time: event.time,
      description: formattedText,
      imgLink: event.imgLink,
      regLink: event.regLink,
    };

    try {
      let response;
      if (event._id) {
        response = await axios.post("/api/events/update", data);
      } else {
        response = await axios.post("/api/events/input", data);
      }

      setStatus(response.data);
      setEvent({
        title: "",
        date: "",
        time: "",
        description: "",
        imgLink: "",
        regLink: "",
      });
    } catch (error) {
      setStatus("fail");
    }
    onInsertClick(true);
  };

  useEffect(() => {
    console.log(status);
    if (status === "success") {
      if (updating) {
        setPopup(true);
        setMessage("Event Updated Successfully");
        setUpdating(false);
      } else {
        setPopup(true);
        setMessage("Event Inserted Successfully");
      }
    } else if (status === "fail") {
      setPopup(true);
      setMessage("Insertion/Updation Failed");
    }
  }, [status, updating]);

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
              Event Name
            </label>
            <input
              className={eventiStyles.input}
              id="title"
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
              placeholder="Enter the Event Date(DD-MM-YYYY)"
              name="date"
              value={event.date}
              onChange={handleInput}
              autoComplete="off"
              minLength={10}
              maxLength={10}
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Time">
              Event Time
            </label>
            <input
              className={eventiStyles.input}
              id="time"
              type="text"
              placeholder="Enter the Event Time in 24h Format (hh:mm)"
              name="time"
              value={event.time}
              onChange={handleInput}
              autoComplete="off"
              minLength={5}
              maxLength={5}
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Description">
              Event Description
            </label>
            <textarea
              className={eventiStyles.message}
              id="description"
              type="text"
              placeholder="Enter the Event Description"
              name="description"
              value={event.description.replace(/<br>/g, "\n")}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="ImageLink">
              Image Link
            </label>
            <input
              className={eventiStyles.input}
              id="image_link"
              type="text"
              placeholder="Enter the Image Link"
              name="imgLink"
              value={event.imgLink}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="RegistrationLink">
              Registration Link
            </label>
            <input
              className={eventiStyles.input}
              id="registration"
              type="text"
              placeholder="Enter the Registration Link"
              name="regLink"
              value={event.regLink}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>
          <div className={eventiStyles.message_container}>
            {popup &&
              (status === "success" ? (
                <h1 style={{ color: "#54fa65", fontSize: "1.5rem" }}>
                  {message}
                </h1>
              ) : (
                <h1 style={{ color: "red", fontSize: "1.5rem" }}>{message}</h1>
              ))}
          </div>
          <div className={eventiStyles.button_container}>
            <button type="submit">
              {event._id ? "Update Event" : "Insert Event"}
            </button>
            <button
              type="button"
              className={eventiStyles.arrow_left}
              onClick={handleGoBack}
            >
              <ImArrowLeft style={{ color: "#03e9f4" }} /> <p>&nbsp; Go Back</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
