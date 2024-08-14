import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleUsernamelChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:5000/api/auth/login", {
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
        return res.json();
      })
      .then((data) => {
        if (data.status != "success") {
          alert("invalid credintals");
          console.log("error");
        } else {
          console.log("loggedin");
          const token = data.token;
          console.log(token);
          localStorage.setItem("token", `Bearer ${token}`);
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("username", JSON.stringify(data.username));
          login();
          navigate("/");
        }
      })
      .catch((error) => {
        alert("invalid credintals");
      });
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form}>
        <h2>Login</h2>
        <form className={styles.inner_form}>
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
            Login
          </button>
        </form>
        <p className={styles.signup_link}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
