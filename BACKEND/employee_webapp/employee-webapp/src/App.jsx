import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Employees />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
