import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
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

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Masuk UseEffect");
    dispatch(fetchBoardingHouseByIdUser(id));
  }, [id]);

  const localBoardingHouse = useSelector(
    (state) => state.boardingHouses.boardingHouse
  );
  console.log(localBoardingHouse, "<<<<localBoardingHouse");

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
        console.log("Success:", data);
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createMyBooking(id, formMyBooking));
  };

  if (localBoardingHouse.length == 0) return null;

  console.log(id, "<<<<id");

  return (
    <>
      <div className="mt-14 py-24 px-12">
        <div className="container mx-auto flex ">
          {/* <div className="w-full md:w-1/2 md:pr-4 flex flex-row mb-12 md:mb-0"> */}
          <div className="flex flex-row">
            <div className="p-2 w-3/4">
              <img
                src={localBoardingHouse.mainImg}
                className="w-[800px] h-[400px] object-cover"
              />
            </div>

            <div className="w-1/4 h-[400px] md:w-1/2 md:pl-4 justify-between">
              <div className="p-2 w-full h-1/2">
                <img
                  src={localBoardingHouse.Images[0].imgUrl}
                  className="w-[800px] h-full object-cover"
                />
              </div>
              <div className="relative p-2 w-full h-1/2">
                <img
                  src={localBoardingHouse.Images[1].imgUrl}
                  className=" w-[800px] mt-4 h-full object-cover"
                />
                <button
                  onClick={handleImagesPage}
                  type="button"
                  class="absolute bottom-0 right-5 text-gray-800 font-bold bg-gray-100 hover:text-gray-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  See all photos
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>

        <div className="flex flex-row justify-between">
          <div className="py-5 px-12 w-[900px]">
            <h2 className="font-bold text-left text-4xl mb-10">
              <a
                href="#"
                className="items-left px-1 py-1 mb-3 text-sm font-small text-left text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                {localBoardingHouse.City.name}
              </a>

              <br />
              <div className="mt-1">{localBoardingHouse.name}</div>

              <div className="flex flex-row justify-between">
                <a
                  href="#"
                  className="mt-1 inline-block bg-green-500 text-white px-6 py-3 text-sm hover:bg-gray-800"
                >
                  {localBoardingHouse.Category.name}
                </a>

                <button
                  value={localBoardingHouse.id}
                  onClick={addToMyBookmarkHandle}
                  className="col-2 cursor-pointer pl-0 bg-white text-red-600 text-xl underline"
                >
                  {"♥ bookmark"}

                  {/* <i className="fa fa-bookmark text-xl text-orange-500"></i> */}
                </button>
              </div>
            </h2>
            <div className="w-full">
              <p className="mb-1 text-gray-700 text-justify whitespace-pre-line">
                By {localBoardingHouse.User.fullName}
                <br />
                {localBoardingHouse.description}
              </p>
              <div className="text-gray-700 text-left mt-5 font-semibold">
                Facilities:
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
                Rules:
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
            <div class="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={submitHandler} class="space-y-6">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">
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
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Apply now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
