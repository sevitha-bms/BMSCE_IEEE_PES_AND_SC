import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

export default function ExecomInput({
  selectedDocument = null,
  onClickGoBack,
  onInsertClick,
}) {
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const [event, setEvent] = useState({
    year: selectedDocument?.year || "",
    name: selectedDocument?.name || "",
    designation: selectedDocument?.designation || "",
    order: selectedDocument?.order || "",
    imgLink: selectedDocument?.imgLink || "",
  });

  useEffect(() => {
    if (selectedDocument) {
      setEvent(selectedDocument);
      setUpdating(true);
    }
  }, [selectedDocument]);

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    const yearValue = parseInt(event.year);
    if (yearValue < 2019 || yearValue > 2023) {
      return;
    } else {
      const data = {
        _id: event._id,
        year: event.year,
        name: event.name,
        designation: event.designation,
        order: event.order,
        imgLink: event.imgLink,
      };

      try {
        let response;
        if (event._id) {
          response = await axios.post("/api/execom/update", data);
        } else {
          response = await axios.post("/api/execom/input", data);
        }

        setStatus(response.data);
        setEvent({
          year: "",
          name: "",
          designation: "",
          order: "",
          imgLink: "",
        });
      } catch (error) {
        setStatus("fail");
      }
      onInsertClick(true);
    }
  };

  useEffect(() => {
    console.log(status);
    if (status === "success") {
      if (updating) {
        setPopup(true);
        setMessage("Data Updated Successfully");
        setUpdating(false);
      } else {
        setPopup(true);
        setMessage("Data Inserted Successfully");
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

  const handleWheel = (event) => {
    event.preventDefault();
  };

  const yearInputRef = useRef(null);
  const orderInputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
    };

    const inputElement1 = yearInputRef.current;
    const inputElement2 = orderInputRef.current;

    if (inputElement1 && inputElement2) {
      inputElement1.addEventListener("wheel", handleWheel, { passive: false });
      inputElement2.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (inputElement1 && inputElement2) {
        inputElement1.removeEventListener("wheel", handleWheel);
        inputElement2.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

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
              min="2019"
              max="2023"
              value={event.year}
              onChange={handleInput}
              autoComplete="off"
              required
              autoFocus
              onWheel={handleWheel}
              ref={yearInputRef}
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

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Order">
              Order
            </label>
            <input
              className={eventiStyles.input}
              id="order"
              type="number"
              placeholder="Enter the Order, to be displayed in"
              name="order"
              min="0"
              value={event.order}
              onChange={handleInput}
              autoComplete="off"
              required
              onWheel={handleWheel}
              ref={orderInputRef}
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
              {event._id ? "Update Data" : "Insert Data"}
            </button>
            <button
              type="button"
              className={eventiStyles.arrow_left}
              onClick={handleGoBack}
            >
              <ImArrowLeft style={{ color: "#03e9f4" }} />{" "}
              <p> &nbsp; Go Back </p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
