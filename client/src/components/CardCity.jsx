import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToMyBookmark } from "../store/action";
import JAKARTA from "../assets/JAKARTA.jpeg";
import SURABAYA from "../assets/SURABAYA.jpeg";
import BEKASI from "../assets/BEKASI.jpeg";
import BANDUNG from "../assets/BANDUNG.jpeg";
import MEDAN from "../assets/MEDAN.jpeg";
import DEPOK from "../assets/DEPOK.jpeg";
import TANGERANG from "../assets/TANGERANG.jpeg";
import PALEMBANG from "../assets/PALEMBANG.jpeg";
import SEMARANG from "../assets/SEMARANG.jpeg";
import MAKASSAR from "../assets/MAKASSAR.jpeg";

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
          {city.name == "Jakarta" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={JAKARTA}
              alt=""
            />
          ) : city.name == "Surabaya" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={SURABAYA}
              alt=""
            />
          ) : city.name == "Bekasi" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={BEKASI}
              alt=""
            />
          ) : city.name == "Bandung" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={BANDUNG}
              alt=""
            />
          ) : city.name == "Medan" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={MEDAN}
              alt=""
            />
          ) : city.name == "Depok" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={DEPOK}
              alt=""
            />
          ) : city.name == "Tangerang" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={TANGERANG}
              alt=""
            />
          ) : city.name == "Palembang" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={PALEMBANG}
              alt=""
            />
          ) : city.name == "Semarang" ? (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={SEMARANG}
              alt=""
            />
          ) : (
            <img
              className="rounded-lg h-[200px] w-full object-cover"
              src={MAKASSAR}
              alt=""
            />
          )}
          <div className="absolute bottom-0 left-0 p-5">
            <div className="text-left">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                {city.name}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
