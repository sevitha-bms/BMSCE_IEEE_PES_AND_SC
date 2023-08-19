import React, { useState, useEffect } from "react";
import axios from "axios";
import eventiStyles from "../../Components_style/Database_css/EventInput.module.css";
import { ImArrowLeft } from "react-icons/im";

export default function ImageDelete({ onClickGoBack, onInsertClick }) {
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [event, setEvent] = useState({
    imgName: "",
  });

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const data = {
      imgName: event.imgName,
    };

    try {
      const response = await axios.post("/api/images/delete", data);
      setStatus(response.data);
      setEvent({
        imgName: "",
      });
    } catch (error) {
      setStatus("fail");
    }
    onInsertClick(true);
  };

  useEffect(() => {
    if (status === "success") {
      setPopup(true);
      setMessage("Image Deleted Successfully");
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
              autoFocus
              required
            />
          </div>

          <div className={eventiStyles.button_container}>
            <button type="submit">Delete Image</button>
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
      </div>
    </>
  );
}
