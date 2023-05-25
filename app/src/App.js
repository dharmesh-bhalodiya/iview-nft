import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/Landing/LandingPage";
import Footer from "./Components/Footer/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./configureStore";
import Explore from "./Pages/Explore/Explore";
import OwnedNFT from "./Pages/MyNFT/OwnedNFT";
import NFTInfo from "./Pages/NFTInfo/nftInfo";
import "./fonts/Archive.otf";
import Navbar from "./Components/Navbar/Navbar";
import NFTCreator from "./Components/AddNFT/NFTCreator";
import TestAPI from "./Components/TestAPI/TestAPI";

// const store = configureStore({ reducer: reducer });

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Routes>
            <Route path={"/Explore/:id?"} element={<Explore />} />
            <Route path={"/Ownednft"} element={<OwnedNFT />} />
            <Route path={"/nftInfo"} element={<NFTInfo />} />
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
