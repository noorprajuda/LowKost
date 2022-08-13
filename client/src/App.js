import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";

import RegisterOwner from "./views/RegisterOwner";
import HomePageAdmin from "./views/HomePageAdmin";
import RegisterTenant from "./views/RegisterTenant";
import HomePageOwner from "./views/HomePageOwner";
import AddBoardingHousesOwner from "./views/AddBoardingHousesOwner";
import BoardingHouseFormUpdate from "./components/BoardingHouseFormUpdate";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import DetailPage from "./views/DetailPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/owner" element={<HomePageOwner />} />
        <Route path="/owner-add" element={<AddBoardingHousesOwner />} />
        <Route path="/:id/update" element={<BoardingHouseFormUpdate />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
