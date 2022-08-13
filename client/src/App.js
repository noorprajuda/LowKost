import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterOwner from "./views/RegisterOwner";
import HomePageAdmin from "./views/HomePageAdmin";
import NavBar from "./components/NavBar";
import RegisterTenant from "./views/RegisterTenant";
import HomePageOwner from "./views/HomePageOwner";
import AddBoardingHousesOwner from "./views/AddBoardingHousesOwner";
import BoardingHouseFormUpdate from "./components/BoardingHouseFormUpdate";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/owner" element={<HomePageOwner />} />
        <Route path="/owner-add" element={<AddBoardingHousesOwner />} />
        <Route path="/:id/update" element={<BoardingHouseFormUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
