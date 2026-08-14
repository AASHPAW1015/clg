import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  function loadEmployeeData() {
    fetch(`${API_BASE_URL}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmployees(data); //array of objects{ }
      });
  }
  function handleDelete(id) {
    fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadEmployeeData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function routethatshit() {
    navigate("/add-employee");
  }

  useEffect(() => {
    loadEmployeeData();
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>DELETE</th>
          </tr>
        </thead>

        <tbody>
          {employees &&
            employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.username}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
                <td>{e.department}</td>
                <td>{e.role}</td>
                <td>{e.salary}</td>
                <td>
                  <button onClick={() => handleDelete(e.id)}>DELETE</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <button onClick={routethatshit}>ADD</button>
    </>
  );
};

export default Employees;
