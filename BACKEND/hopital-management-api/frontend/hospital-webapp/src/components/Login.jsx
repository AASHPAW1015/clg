import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        console.log(data);

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(data.user));
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Login successful",
          });
          setTimeout(() => {
            navigate("/hospitals");
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message || "invalid credentials!",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "could not reach the server!",
        });
      });
  }

  return (
    <>
      <h1>Login</h1>

      <div>
        <label htmlFor="username">Enter Username : </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label htmlFor="password">Enter Password : </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>

      <br />

      <div>
        <button onClick={() => handleSubmit()}>Submit</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </>
  );
}
