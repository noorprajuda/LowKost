import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToMyBookmark } from "../store/action";
require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

export default function Card({ boardingHouse }) {
  const dispatch = useDispatch();

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

  const navigate = useNavigate();

  const handleDetailPage = (e) => {
    navigate(`/${boardingHouse.id}`);
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={handleDetailPage}
        className="cursor-pointer relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg h-[200px] w-full object-cover"
            src={boardingHouse.mainImg}
            alt=""
          />

          <div className="p-5">
            <div className="text-left">
              <div className="flex flex-row justify-between">
                <a className="inline-flex items-left py-1 px-1 text-sm font-small text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                  {boardingHouse.City.name}
                </a>
              </div>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {boardingHouse.name}
              </h5>
            </div>

            <div className="flex flex-row justify-between">
              <a className="inline-flex items-center py-1 px-1 text-sm font-small text-center text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                {boardingHouse.Category.name}
              </a>
              <h6>Rp. {boardingHouse.price.toLocaleString("id-ID")} / month</h6>
            </div>
            <br />

            <p className="mb-4 text-justify font-normal text-gray-700 dark:text-gray-400">
              {boardingHouse.description.substring(0, 200)}...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
