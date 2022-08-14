import { useNavigate } from "react-router-dom";
import { Button } from "flowbite";

export default function Card({ boardingHouse }) {
  const navigate = useNavigate();
  const handleDetailPage = (e) => {
    // console.log("PRODUCT ID>>>>>", e.target.value);
    // const id = e.target.value;
    navigate(`/${boardingHouse.id}`);
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={handleDetailPage}
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img
            className="rounded-t-lg h-[200px] w-full object-cover"
            src={boardingHouse.mainImg}
            alt=""
          />
        </a>
        <div className="p-5">
          <div className="text-left">
            <a
              href="#"
              className="inline-flex items-left py-1 px-1 text-sm font-small text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              {boardingHouse.City.name}
            </a>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {boardingHouse.name}
            </h5>
          </div>

          <div className="flex flex-row justify-between">
            <a
              href="#"
              className="inline-flex items-center py-1 px-1 text-sm font-small text-center text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {boardingHouse.Category.name}
            </a>
            <h6>Rp. {boardingHouse.price.toLocaleString("id-ID")} / month</h6>
          </div>
          <br />

          <p className="mb-3 text-justify font-normal text-gray-700 dark:text-gray-400">
            {boardingHouse.description.substring(0, 200)}...
          </p>
        </div>
      </div>
    </>
  );
}
