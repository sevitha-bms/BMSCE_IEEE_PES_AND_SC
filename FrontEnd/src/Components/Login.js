import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lstyles from "../Components_style/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthenticationProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("/api/login");
      const result = response.data;

      if (username === result.username && password === result.password) {
        setErrorMessage("");
        handleLogin();
        navigate("/database", { replace: true });
      } else {
        setErrorMessage("Incorrect details. Please try again.");
      }
    } catch (error) {
      console.error("Error accessing", error);
    }
  };

  return (
    <>
      <div className={lstyles.container}>
        <div className={lstyles.login_box}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={lstyles.user_box}>
              <input
                type="text"
                name="username"
                required=""
                autoComplete="off"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoFocus
              />
              <label>Username</label>
            </div>
            <div className={lstyles.user_box}>
              <input
                type={showPassword ? "text" : "password"}
                name=""
                required=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label>Password</label>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={lstyles.eye_icon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorMessage && (
              <p className={lstyles.error_message}>{errorMessage}</p>
            )}
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
