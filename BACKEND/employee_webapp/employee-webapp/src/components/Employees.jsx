import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  function loadEmployeeData() {
    fetch(`${API_BASE_URL}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmployees(data); //array of objects{ }
      });
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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Employees;
