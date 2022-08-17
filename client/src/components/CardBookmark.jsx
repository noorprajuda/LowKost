import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchBookmarksUser, deleteBookmarkByIdUser } from "../store/action";

import { Button } from "flowbite";

export default function CardBookmark({ bookmark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBookmarksUser());
  }, []);

  const deleteBookmark = (e) => {
    dispatch(deleteBookmarkByIdUser(e.target.value))
      .then(() => {
        dispatch(fetchBookmarksUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetailPage = (e) => {
    navigate(`/${bookmark.BoardingHouse.id}`);
    e.preventDefault();
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={handleDetailPage}
          className="h-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg h-[200px] w-full object-cover"
              src={bookmark.BoardingHouse.mainImg}
              alt=""
            />
          </a>
          <div className=" p-5">
            <div className="text-left">
              <div className="flex flex-row">
                <a
                  href="#"
                  className="inline-flex items-left py-1 px-1 text-sm font-small text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  {bookmark.BoardingHouse.City.name}
                </a>
                {bookmark.BoardingHouse.totalRoom < 5 ? (
                  <a className="text-red-600 italic ml-2">
                    Sisa kamar {bookmark.BoardingHouse.totalRoom}
                  </a>
                ) : (
                  <a></a>
                )}
              </div>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {bookmark.BoardingHouse.name}
              </h5>
            </div>

            <div className="flex flex-row justify-between">
              <a
                href="#"
                className="inline-flex items-center py-1 px-1 text-sm font-small text-center text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                {bookmark.BoardingHouse.Category.name}
              </a>
              <h6>
                Rp. {bookmark.BoardingHouse.price.toLocaleString("id-ID")} /
                month
              </h6>
            </div>
            <br />

            <p className="mb-7 text-justify font-normal text-gray-700 dark:text-gray-400">
              {bookmark.BoardingHouse.description.substring(0, 170)}...
            </p>
          </div>
        </div>

        <button
          value={bookmark.id}
          onClick={deleteBookmark}
          className="absolute bottom-2 left-1 inline-flex ml-3 mt-[-50px] w-[280px] h-[40px] justify-center items-center py-3 px-5 text-sm font-small text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 "
        >
          Hapus
        </button>
      </div>
    </>
  );
}
