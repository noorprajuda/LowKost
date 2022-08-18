import BoardingHousesList from "../components/BoardingHousesList";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function GoogleMapPage() {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");
  const handleChange = (value) => {
    setAddress(value);
  };
  const handleSelect = (value) => {
    setAddress(value);
  };

  const handleSearch = () => {
    navigate(`/cari/${address}`);
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBSGWwJ1H2sdpp0TKUIFyoY3vW10G2eiLs",
  });

  const { id } = useParams();

  console.log(id);
  const [localBoardingHouse, setLocalBoardingHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/boardinghouses", {
        params: { city: id },
      })
      .then((resp) => {
        setLocalBoardingHouses(resp.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  if (loading) {
    return (
      <>
        <div className="mt-20 flex flex-row">Loading...</div>
      </>
    );
  }
  const markers = localBoardingHouse.map((el, i) => {
    return {
      id: i + 1,
      name: el.name,
      price: el.price,
      position: {
        lat: el.location.coordinates[0],
        lng: el.location.coordinates[1],
      },
    };
  });
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  if (localBoardingHouse.length === 0) {
    return (
      <>
        <div
          role="status"
          class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-20"
        >
          <div class="flex justify-center items-center w-full h-96 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              class="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div class="w-full">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        <h1 className="text-3xl">
          Maaf, belum ada kosan yg tersedia di kota ini...
        </h1>
      </>
    );
  }

  return isLoaded && !loading ? (
    <>
      <div className="mr-20 mt-20 ml-20 px-10 flex flexrow align-center ">
        <h1 className=" pt-6 text-4xl text-blue-600 sm:text-5xl lg:text-3xl font-bold tracking-tighter leading-tight whitespace-nowrap">
          Cari kos melalui kolom pencarian
        </h1>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            return (
              <div className="pt-6">
                <input
                  className="rounded-lg w-[600px] ml-10 "
                  {...getInputProps({
                    placeholder: "Masukkan nama lokasi / daerah / alamat ...",
                  })}
                />
                <div>{loading && <div>Loading...</div>}</div>
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#a83232", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </PlacesAutocomplete>
        <button
          onClick={handleSearch}
          type="button"
          className="text-white h-[43px] ml-3 w-[100px] mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
        >
          Cari
        </button>
      </div>
      <div className=" mt-5 flex flex-row">
        <div className="sticky top-20 mb-20 basis-1/2 h-screen ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={16}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
          >
            {markers.map(({ id, name, position, price }) => (
              <Marker
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{name}</div>
                    <div>{price}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </div>
        <div className="basis-1/2">
          <h1 className="font-bold">
            Daftar kos di {localBoardingHouse[0].City.name}
          </h1>
          {/* {JSON.stringify(localBoardingHouse, null, 2)} */}
          <div className="mb-20">
            {localBoardingHouse.map((boardingHouse, index) => {
              return (
                <>
                  <BoardingHousesList
                    key={boardingHouse.id}
                    boardingHouse={boardingHouse}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mt-20 flex flex-row">Loading...</div>
    </>
  );
}
