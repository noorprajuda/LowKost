import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToMyBookmark } from "../store/action";
require("react-dom");
window.React2 = require("react");

export default function BoardingHousesList({ boardingHouse }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDetailPage = (e) => {
    navigate(`/${boardingHouse.id}`);
    e.preventDefault();
  };

  return (
    <>
      {/* {
      "name": "Kost Kiara 51",
      "price": 1100000,
      "CategoryId": 1,
      "CityId": 1,
      "totalRoom": 20,
      "UserId": 1,
      "description": "Kost ini terdiri dari 2 lantai. Tipe kamar B berada di lantai berada di lantai 1 dan lantai 2. Semua kamar di kamar ini memiliki jendela yang menghadap secara langsung ke arah koridor.Tersedia juga layanan pembersihan AC secara rutin setiap 3 bulan sekali. Apabila Anda membutuhkan bantuan, Anda bisa menghubungi penjaga yang bertugas dari pukul 10.00-17.00 WIB.",
      "location": "-6.31845 106.89748",
      "address": "Jalan Madrasah No./Kav. 1A, Kecamatan Cipayung, DKI Jakarta 13890, Indonesia",
      "mainImg": "https://www.uhb.ac.id/uploads/images/dsc052972_1.jpg"
    }, */}
      <div
        onClick={handleDetailPage}
        className="flex flex-row mt-3 cursor-pointer"
      >
        <img
          className="w-[315px] h-[210px] ml-5 rounded-lg"
          src={boardingHouse.mainImg}
        />
        <div className="relative align-left  text-left justify-start ml-5 w-[300px]">
          <a className="items-left py-1 px-1 text-sm font-small text-left text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            {boardingHouse.Category.name}
          </a>
          <br />
          <a className="font-bold text-gray-900">{boardingHouse.name}</a>
          <br />
          <a className="font-normal text-gray-900">
            {boardingHouse.description.substring(0, 150)}...
          </a>
          <br />
          <a className="absolute bottom-2 right-2 font-semibold text-gray-900">
            Rp. {boardingHouse.price.toLocaleString("id-ID")}{" "}
            <span className="font-normal text-gray-900">/ bulan</span>
          </a>
        </div>
      </div>
      <hr className="mt-3 ml-5 mr-5" />
    </>
  );
}
