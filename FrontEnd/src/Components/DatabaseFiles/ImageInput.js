import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

export default function ImageInput({
  selectedDocument = null,
  onClickGoBack,
  onInsertClick,
}) {
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const [event, setEvent] = useState({
    posterType: selectedDocument?.posterType || "",
    imgName: selectedDocument?.imgName || "",
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

    if (
      !(
        event.posterType === "T" ||
        event.posterType === "I" ||
        event.posterType === "Timeline" ||
        event.posterType === "Images"
      )
    ) {
      window.alert("Invalid Poster Type");
      return;
    }

    if (event.posterType === "T" || event.posterType === "Timeline") {
      event.posterType = "Timeline";
    } else if (event.posterType === "I" || event.posterType === "Images") {
      event.posterType = "Images";
    }

    const data = {
      _id: event._id,
      posterType: event.posterType,
      imgName: event.imgName,
      order: event.order,
      imgLink: event.imgLink,
    };

    try {
      let response;
      if (event._id) {
        response = await axios.post("/api/images/update", data);
      } else {
        response = await axios.post("/api/images/input", data);
      }

      setStatus(response.data);
      setEvent({
        posterType: "",
        imgName: "",
        order: "",
        imgLink: "",
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
        setMessage("Image Updated Successfully");
        setUpdating(false);
      } else {
        setPopup(true);
        setMessage("Image Inserted Successfully");
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

  const orderInputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
    };

    const inputElement1 = orderInputRef.current;

    if (inputElement1) {
      inputElement1.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (inputElement1) {
        inputElement1.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <>
      <div className={eventiStyles.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Title">
              Choose Poster Type
              <p>Enter T for Timeline Poster , I for Images</p>
            </label>

            <input
              className={eventiStyles.input}
              id="posterType"
              type="text"
              placeholder="Enter the Poster Type"
              name="posterType"
              value={event.posterType}
              onChange={handleInput}
              autoComplete="off"
              autoFocus
              required
            />
          </div>

          <div className={eventiStyles.box}>
            <label className={eventiStyles.label} htmlFor="Image_Name">
              Image Name
            </label>
            <input
              className={eventiStyles.input}
              id="image_name"
              type="text"
              placeholder="Enter the Image Name"
              name="imgName"
              value={event.imgName}
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
              {event._id ? "Update Data" : "Insert Image"}
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
