import React, { useState, useEffect } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

export default function ExecomDelete({ onClickGoBack, onInsertClick }) {
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [event, setEvent] = useState({
    year: "",
    name: "",
    designation: "",
  });

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const data = {
      year: event.year,
      name: event.name,
      designation: event.designation,
    };

    try {
      const response = await axios.post("/api/execom/delete", data);
      setStatus(response.data);
      setEvent({
        year: "",
        name: "",
        designation: "",
      });
    } catch (error) {
      setStatus("fail");
    }
    onInsertClick(true);
  };

  useEffect(() => {
    if (status === "success") {
      setPopup(true);
      setMessage("Data Deleted Successfully");
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
            <label className={eventiStyles.label} htmlFor="Year">
              Year
            </label>
            <input
              className={eventiStyles.input}
              id="year"
              type="number"
              placeholder="Enter the Year"
              name="year"
              value={event.year}
              onChange={handleInput}
              autoComplete="off"
              min="2019"
              max="2023"
              autoFocus
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Name">
              Name
            </label>
            <input
              className={eventiStyles.input}
              id="description"
              type="text"
              placeholder="Enter the Name"
              name="name"
              value={event.name}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>
          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Designation">
              Designation
            </label>
            <input
              className={eventiStyles.input}
              id="designation"
              type="text"
              placeholder="Enter the Designation"
              name="designation"
              value={event.designation}
              onChange={handleInput}
              autoComplete="off"
              required
            />
          </div>
          <div className={eventiStyles.button_container}>
            <button type="submit">Delete Data</button>
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
                <h1 style={{ color: "#54fa65", fontSize: "1.5rem" }}>
                  {message}
                </h1>
              ) : (
                <h1 style={{ color: "red", fontSize: "1.5rem" }}>{message}</h1>
              ))}
          </div>
        </form>
      </div>
    </>
  );
}
