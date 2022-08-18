import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  fetchBoardingHouseByIdUser,
  fetchBoardingHouses,
} from "../store/action/index";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CardImage from "../components/CardImage";

export default function ImagesPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Masuk UseEffect");
    dispatch(fetchBoardingHouseByIdUser(id));
  }, []);

  const localBoardingHouse = useSelector(
    (state) => state.boardingHouses.boardingHouse
  );
  console.log(localBoardingHouse, "<<<<localBoardingHouse");

  if (localBoardingHouse.length === 0) return null;

  console.log(id, "<<<<id");

  return (
    <>
      <div className="mt-20">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="ml-0 mb-5 px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
        >
          Kembali ke halaman detail
        </button>
        <div className="grid grid-cols-4 gap-4 mr-20 ml-20">
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img
              className="h-[200px] w-full object-cover"
              src={localBoardingHouse.mainImg}
              alt=""
            />
          </div>

          {localBoardingHouse.Images.map((image, index) => {
            return (
              <>
                <CardImage key={index} image={image} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
