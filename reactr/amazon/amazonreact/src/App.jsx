import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import PageContainer from "./components/PageContainer/PageContainer";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <>
    <div className="appMainContainer mainContainer">
      <Header />
      <PageContainer />
    </div>
    </>
  );
}

export default App;
