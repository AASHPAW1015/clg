import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        console.log(data);

        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "user registered successfully",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message || "Something went wrong!",
          });
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
      <h1>Register</h1>

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
        <label htmlFor="email">Enter Email : </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
