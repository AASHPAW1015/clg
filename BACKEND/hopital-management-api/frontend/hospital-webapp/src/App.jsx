import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Hospitals from "./components/Hospitals";
import AddHospital from "./components/AddHospital";
import EditHospital from "./components/EditHospital";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/hospitals" element={<Hospitals />}></Route>
          <Route path="/add-hospital" element={<AddHospital />}></Route>
          <Route path="/edit-hospital/:id" element={<EditHospital />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
