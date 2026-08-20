import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../api";

export default function EditHospital() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [totalBeds, setTotalBeds] = useState("");
  const [availableBeds, setAvailableBeds] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_BASE_URL}/hospitals/${id}`)
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        console.log(data);

        if (response.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message || "hospital not found!",
          });
          navigate("/hospitals");
          return;
        }

        setName(data.name);
        setCity(data.city);
        setTotalBeds(data.totalBeds);
        setAvailableBeds(data.availableBeds);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "could not reach the server!",
        });
      });
  }, [id]);

  function handleSubmit() {
    fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        city,
        totalBeds: Number(totalBeds),
        availableBeds: Number(availableBeds),
      }),
    })
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        console.log(data);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "hospital updated successfully",
          });
          setTimeout(() => {
            navigate("/hospitals");
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
      <h1>Edit Hospital</h1>

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
        <label htmlFor="city">Enter City : </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label htmlFor="totalBeds">Enter Total Beds : </label>
        <input
          type="number"
          id="totalBeds"
          value={totalBeds}
          onChange={(e) => {
            setTotalBeds(e.target.value);
          }}
        ></input>
      </div>

      <div>
        <label htmlFor="availableBeds">Enter Available Beds : </label>
        <input
          type="number"
          id="availableBeds"
          value={availableBeds}
          onChange={(e) => {
            setAvailableBeds(e.target.value);
          }}
        ></input>
      </div>

      <br />

      <div>
        <button onClick={() => handleSubmit()}>Update</button>
        <button onClick={() => navigate("/hospitals")}>Back</button>
      </div>
    </>
  );
}
