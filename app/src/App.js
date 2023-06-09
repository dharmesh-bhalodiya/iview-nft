import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/Landing/LandingPage";
import Footer from "./Components/Footer/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./configureStore";
import OwnedNFT from "./Pages/MyNFT/OwnedNFT";
import NFTInfo from "./Pages/NFTInfo/nftInfo";
import "./fonts/Archive.otf";
import Navbar from "./Components/Navbar/Navbar";
import NFTCreator from "./Components/AddNFT/NFTCreator";
import TestAPI from "./Components/TestAPI/TestAPI";
import Header from "./Components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Routes>
            <Route path={"/Explore/:id?"} element={<Header />} />
            <Route path={"/Ownednft"} element={<OwnedNFT />} />
            <Route
              path={"/:initial/:page?/nftInfo/:id?"}
              element={<NFTInfo />}
            />
            <Route path={"/nftCreator"} element={<NFTCreator />} />
            <Route path={"/testapi"} element={<TestAPI />} />
            <Route path={"/"} element={<LandingPage />} />
          </Routes>
        </PersistGate>
      </Provider>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
