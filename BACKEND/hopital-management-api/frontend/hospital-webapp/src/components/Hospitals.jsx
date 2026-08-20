import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../api";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  function loadHospitalData() {
    fetch(`${API_BASE_URL}/hospitals`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHospitals(data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "could not load hospitals!",
        });
      });
  }

  function handleDelete(id) {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "this hospital will be deleted",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "DELETE",
      })
        .then((response) =>
          response.json().then((data) => ({ response, data })),
        )
        .then(({ response, data }) => {
          console.log(data);

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "hospital deleted successfully",
            });
            loadHospitalData();
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
    });
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please login first!",
      });
      navigate("/");
      return;
    }

    loadHospitalData();
  }, []);

  return (
    <>
      <h1>Hospitals</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Total Beds</th>
            <th>Available Beds</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>

        <tbody>
          {hospitals &&
            hospitals.map((h) => (
              <tr key={h._id}>
                <td>{h._id}</td>
                <td>{h.name}</td>
                <td>{h.city}</td>
                <td>{h.totalBeds}</td>
                <td>{h.availableBeds}</td>
                <td>
                  <button onClick={() => navigate(`/edit-hospital/${h._id}`)}>
                    EDIT
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(h._id)}>DELETE</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate("/add-hospital")}>ADD</button>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
};

export default Hospitals;
