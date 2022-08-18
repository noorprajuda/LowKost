import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import {
  fetchBoardingHouseByIdUser,
  fetchBoardingHouses,
  createMyBooking,
  addToMyBookmark,
} from "../store/action/index";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function DetailPage() {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBSGWwJ1H2sdpp0TKUIFyoY3vW10G2eiLs",
  });
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  // const onLoad = useCallback(function callback(map) {
  //   if(!center.lat){
  //     const bounds = new window.google.maps.LatLngBounds({
  //       "lat": -6.173110,
  //       "lng": 106.829361
  //     });
  //     map.fitBounds(bounds);
  //     setMap(map);
  //   }else{
  //     const bounds = new window.google.maps.LatLngBounds();
  //     bounds.extend(center)
  //     map.fitBounds(bounds);
  //     setMap(map);
  //   }
  // }, [center]);

  // const position={
  //   //       "lat": -6.173110,
  //   //       "lng": 106.829361
  //   //     }
  const onLoad = (marker) => {
    console.log("marker", marker);
  };

  const [map, setMap] = useState(null);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();

  const localBoardingHouse = useSelector(
    (state) => state.boardingHouses.boardingHouse
  );

  useEffect(() => {
    // console.log("Masuk UseEffect");
    dispatch(fetchBoardingHouseByIdUser(id)).then(() => {
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!loading) {
      setCenter({
        lat: localBoardingHouse.location.coordinates[0],
        lng: localBoardingHouse.location.coordinates[1],
      });
    }
  }, [loading]);

  const handleImagesPage = (e) => {
    navigate(`/${localBoardingHouse.id}/images`);
    e.preventDefault();
  };

  const [formMyBooking, setFormMyBooking] = useState({
    BoardingHouseId: "",
    UserId: "",
    startDate: "",
  });

  const addToMyBookmarkHandle = (e) => {
    e.preventDefault();
    dispatch(addToMyBookmark(e.target.value))
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "-=-=-=-=-=");
        if (data.message == "Already added to your bookmark!") {
          Swal.fire(
            "Terjadi kesalahan!",
            "Anda telah menambahkan kosan ini sebelumnya ke favorit",
            "error"
          );
        } else {
          Swal.fire(
            "Hebat!",
            "Anda sukses menambahkan kos ini ke favorit!",
            "success"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    const newForm = {
      BoardingHouseId: localBoardingHouse.id,
      startDate: formMyBooking.startDate,
    };

    newForm[name] = value;
    setFormMyBooking(newForm);
  };
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value, "<<<<<<<<< date");
    if (formMyBooking.startDate == "") {
      Swal.fire("Terjadi kesalahan!", "Tanggal harus diisi!", "error");
    } else if (localBoardingHouse.totalRoom == 0) {
      Swal.fire("Terjadi kesalahan!", "Maaf kosan ini sudah penuh!", "error");
    } else {
      dispatch(createMyBooking(id, formMyBooking))
        .then((_) => {
          Swal.fire(
            "Hebat!",
            "Anda sukses menambahkan kos ini ke Pembelian!",
            "success"
          );
        })
        .then(navigate("/my-bookings"))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // if (localBoardingHouse.length == 0) return null;
  if (localBoardingHouse.length === 0) {
    return (
      <div
        role="status"
        class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
      >
        <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
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
    );
  }

  if (!center.lat) {
    return (
      <div
        role="status"
        class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-28"
      >
        <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
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
    );
  }
  return isLoaded ? (
    <>
      <div className="mt-14 py-24 px-12">
        <div className="container mx-auto flex ">
          {/* <div className="w-full md:w-1/2 md:pr-4 flex flex-row mb-12 md:mb-0"> */}
          <div className="flex flex-row">
            <div className="p-2 w-3/4">
              <img
                src={localBoardingHouse.mainImg}
                className="w-[800px] h-[400px] object-cover rounded"
              />
            </div>

            {localBoardingHouse.Images.length >= 2 ? (
              <div className="w-1/4 h-[400px] md:w-1/2 md:pl-4 justify-between">
                <div className="p-2 w-full h-1/2">
                  <img
                    src={localBoardingHouse.Images[0].imgUrl}
                    className="w-[800px] h-full object-cover rounded"
                  />
                </div>
                <div className="relative p-2 w-full h-1/2">
                  <img
                    src={localBoardingHouse.Images[1].imgUrl}
                    className=" w-[800px] mt-4 h-full object-cover rounded"
                  />
                  <button
                    onClick={handleImagesPage}
                    type="button"
                    className="absolute bottom-0 right-5 text-gray-800 font-bold bg-gray-100 hover:text-gray-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Lihat semua foto
                  </button>
                </div>
              </div>
            ) : localBoardingHouse.Images.length == 1 ? (
              <div className="w-1/4 h-[400px] md:w-1/2 md:pl-4 justify-between">
                <div className="p-2 w-full h-1/2">
                  <img
                    src={localBoardingHouse.Images[0].imgUrl}
                    className="w-[800px] h-full object-cover"
                  />
                </div>
                <div className="mt-2 relative pr-2 pl-2 pt-2 w-full h-1/2">
                  <div className="outline outline-1 outline-gray-200 align-center w-[600px] h-full ">
                    <h5 className="pt-20 text-gray-700">Tidak ada foto lain</h5>
                  </div>
                  <button
                    onClick={handleImagesPage}
                    type="button"
                    className="absolute bottom-0 right-5 text-gray-800 font-bold bg-gray-100 hover:text-gray-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Lihat semua foto
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-1/4 h-[400px] md:w-1/2 md:pl-4 justify-between">
                <div className="p-2 w-full h-1/2">
                  <div className="outline outline-1 outline-gray-200 align-center w-[600px] h-full ">
                    <h5 className="pt-20 text-gray-700">Tidak ada foto lain</h5>
                  </div>
                </div>
                <div className="mt-3 relative pr-2 pl-2 pt-2 w-full h-1/2">
                  <div className="outline outline-1 outline-gray-200 align-center w-[600px] h-full ">
                    <h5 className="pt-20 text-gray-700">Tidak ada foto lain</h5>
                  </div>
                  <button
                    onClick={handleImagesPage}
                    type="button"
                    className="absolute bottom-0 right-5 text-gray-800 font-bold bg-gray-100 hover:text-gray-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Lihat semua foto
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>

        <div className="flex flex-row justify-between">
          <div className="py-5 px-12 w-[900px]">
            <h2 className="font-bold text-left text-4xl mb-10">
              <div className="flex flex-row mb-3">
                <a
                  href="#"
                  className="items-left px-1 py-1 text-sm font-small text-left text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  {localBoardingHouse.City.name}
                </a>

                {localBoardingHouse.totalRoom < 5 ? (
                  <a className="text-red-600 text-base font-normal italic ml-2">
                    Sisa kamar {localBoardingHouse.totalRoom}
                  </a>
                ) : (
                  <a></a>
                )}
              </div>

              <div className="">{localBoardingHouse.name}</div>

              <div className="flex flex-row justify-between">
                <a
                  href="#"
                  className="mt-1 inline-block bg-green-500 text-white px-6 py-3 text-sm rounded hover:bg-gray-800"
                >
                  {localBoardingHouse.Category.name}
                </a>

                <button
                  type="button"
                  value={localBoardingHouse.id}
                  onClick={addToMyBookmarkHandle}
                  class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tambahkan ke Favorit{" "}
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>

                {/* <button
                  value={localBoardingHouse.id}
                  onClick={addToMyBookmarkHandle}
                  className="col-2 cursor-pointer pl-0 bg-white text-red-600 text-xl"
                >
                  Tambahkan ke Favorit */}
                {/* <i className="fa fa-bookmark text-xl text-orange-500"></i> */}
                {/* </button> */}
              </div>
            </h2>
            <div className="w-full">
              <p className="mb-1 text-gray-700 text-justify whitespace-pre-line">
                Dikelola oleh : {localBoardingHouse.User.fullName}
                <br />
                {localBoardingHouse.description}
              </p>
              <div className="text-gray-700 text-left mt-5 font-semibold">
                Fasilitas :
                <br />
                <span className="font-normal">
                  {localBoardingHouse.BoardingHouseFacilities.map(
                    (facility, index) => {
                      return (
                        <>
                          {facility.Facility.name}
                          <br />
                        </>
                      );
                    }
                  )}
                </span>
              </div>
              <div className="text-gray-700 text-left mt-5 font-semibold">
                Peraturan :
                <br />
                <span className="font-normal">
                  {localBoardingHouse.BoardingHouseRules.map((rule, index) => {
                    return (
                      <>
                        {rule.Rule.name}
                        <br />
                      </>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="py-5 px-12">
            <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={submitHandler} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Rp. {localBoardingHouse.price.toLocaleString("id-ID")} / month
                </h5>

                <input
                  name="startDate"
                  onChange={onChange}
                  className="rounded-lg w-full"
                  type="date"
                />

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sewa
                </button>
              </form>
            </div>
            <div className="text-gray-700 text-left mt-5 font-semibold">
              Lokasi:
              <br />
              <div className="w-[420px]">
                <span className="font-normal ">
                  {localBoardingHouse.address}
                </span>
              </div>
              {!center.lat ? (
                <p>Loading...</p>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={16}
                  // onLoad={onLoad}
                  // onUnmount={onUnmount}
                  center={center}
                >
                  <MarkerF
                    key={localBoardingHouse.id}
                    onLoad={onLoad}
                    position={center}
                  />
                  <></>
                </GoogleMap>
              )}
              {/* {JSON.stringify(center)} */}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
