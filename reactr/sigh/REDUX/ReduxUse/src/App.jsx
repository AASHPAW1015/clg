import { useSelector } from "react-redux";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import "./App.css";

const App = () => {
  const { theme } = useSelector((state) => state.user);

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main className="main-content">
        <Settings />
      </main>
    </div>
  );
};

export default App;
