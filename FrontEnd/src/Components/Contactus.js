import React, { useState } from "react";
import axios from "axios";
import ContactStyle from "../Components_style/ContactusPage_css/Contactus.module.css";
import Lanime from "./lottie_animation";

export default function Contactus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    setReply("");
    event.preventDefault();
    const obj = {
      name: name,
      email: email,
      message: message,
    };
    setSubmitting(true);
    const response = await axios.post("/api/contact", obj);
    setStatus(response.data.status);
    if (response.data.status === "success") {
      setReply("Success! Email sent.");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setReply("Oops! Email sending failed.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className={ContactStyle.container}>
        <div className={ContactStyle.textbox}>
          <h1>Get in touch</h1>
        </div>
      </div>
      <div className={ContactStyle.container2}>
        <div className={ContactStyle.anim_container}>
          <Lanime filename="contact" />
        </div>
        <div className={ContactStyle.forms_container}>
          <form onSubmit={handleSubmit}>
            <div className={ContactStyle.box}>
              <label className={ContactStyle.label} htmlFor="name">
                Name
              </label>
              <input
                className={ContactStyle.input}
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="off"
              ></input>
            </div>
            <div className={ContactStyle.box}>
              <label className={ContactStyle.label} htmlFor="email">
                Email
              </label>
              <input
                className={ContactStyle.input}
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="off"
              ></input>
            </div>
            <div className={ContactStyle.box}>
              <label className={ContactStyle.label} htmlFor="message">
                Message
              </label>
              <textarea
                className={ContactStyle.message}
                id="message"
                placeholder="Enter your message"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <div className={ContactStyle.wrapper}>
              <button type="submit" disabled={submitting}>
                <span />
                <span />
                <span />
                <span />
                {submitting ? "Submitting..." : "SUBMIT"}
              </button>
              <h1 style={{ fontSize: "1.5rem" }}>
                {status === "fail" ? (
                  <span style={{ color: "red" }}>{reply}</span>
                ) : status === "success" ? (
                  <span style={{ color: "#54fa65" }}>{reply}</span>
                ) : null}
              </h1>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
