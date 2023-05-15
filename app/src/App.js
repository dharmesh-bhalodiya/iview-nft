import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/Landing/LandingPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { walletReducer } from "./Components/Reducer/walletReducer";
import Explore from "./Pages/Explore/Explore";
import OwnedNFT from "./Pages/MyNFT/OwnedNFT";

const store = configureStore({
  reducer: {
    walletAddress: walletReducer,
  },
});

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path={"/Explore"} element={<Explore />} />
          <Route path={"/Ownednft"} element={<OwnedNFT />} />
          <Route path={"/"} element={<LandingPage />} />
        </Routes>
      </Provider>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
