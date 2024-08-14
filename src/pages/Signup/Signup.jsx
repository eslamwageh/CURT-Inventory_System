import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernamelChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: Username,
        password: Password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error("username is already taken");
          });
        }
        return res.json();
      })
      .then((data) => {
        alert("you have registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form}>
        <h2>Signup Now !!</h2>
        <form className={styles.inner_form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input_field}
            required
          />
          <input
            type="name"
            placeholder="username"
            className={styles.input_field}
            required
            value={Username}
            onChange={handleUsernamelChange}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input_field}
            required
            value={Password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className={styles.submit_button}
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
