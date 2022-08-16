import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToMyBookmark } from "../store/action";
require("react-dom");
window.React2 = require("react");

export default function CardCity({ city }) {
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
    navigate(`/kos/${city.id}`);
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={handleDetailPage}
        className="cursor-pointer h-full relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="relative h-full max-w-sm bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg h-[200px] w-full object-cover"
            src={city.name}
            alt=""
          />

          <div className="p-5">
            <div className="text-left">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {city.name}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
