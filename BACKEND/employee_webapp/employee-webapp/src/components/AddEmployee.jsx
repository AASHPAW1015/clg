import { useState } from "react";
import { API_BASE_URL } from "../api";
import Swal from "sweetalert2";
export default function AddEmployee() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  function handleSubmit() {
    fetch(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        department,
        role,
        salary,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const message = data.message;
        if (message == "Employee created successfully") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee created successfully",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div>
        <label htmlFor="name">Enter Name : </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>

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

      <div>
        <label htmlFor="department">Enter department : </label>
        <input
          type="text"
          id="department"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label htmlFor="role">Enter role : </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label htmlFor="salary">Enter Salary : </label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => {
            setSalary(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </>
  );
}
