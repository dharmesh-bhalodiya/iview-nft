import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/Landing/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Pages/Main/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/Main"} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
