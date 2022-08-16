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
import GoogleMapPage from "./views/GoogleMapPage";
import GoogleMapSearchPage from "./views/GoogleMapSearchPage";
import MyBookmarksPage from "./views/MyBookmarksPage";
import ImagesPage from "./views/ImagesPage";
import MyBookingsPage from "./views/MyBookingsPage";
import AuthOwner from "./components/RouteGuard/AuthOwner";
import AuthTenant from "./components/RouteGuard/AuthTenant";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/:id/images" element={<ImagesPage />} />
        <Route
          path="/my-bookmarks"
          element={
            <AuthTenant>
              <MyBookmarksPage />
            </AuthTenant>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <AuthTenant>
              <MyBookingsPage />
            </AuthTenant>
          }
        />

        <Route path="/admin" element={<HomePageAdmin />} />

        <Route
          path="/owner"
          element={
            <AuthOwner>
              <HomePageOwner />
            </AuthOwner>
          }
        />
        <Route
          path="/owner-add"
          element={
            <AuthOwner>
              <AddBoardingHousesOwner />
            </AuthOwner>
          }
        />
        <Route path="/:id/update" element={<BoardingHouseFormUpdate />} />
        <Route path="/kos/:id" element={<GoogleMapPage />} />
        <Route path="/cari/:address" element={<GoogleMapSearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
