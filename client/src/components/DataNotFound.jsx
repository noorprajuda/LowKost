import { Button } from "flowbite";
import { useNavigate, useParams } from "react-router-dom";

export default function DataNotFound({ message }) {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div class="h-screen w-screen bg-gray-100 flex items-center">
        <div class="ml-[100px] container flex flex-col align-middle  md:flex-row items-center justify-center px-5 text-gray-700">
          <div class="max-w-md ">
            <div class="text-5xl font-dark font-bold">Oops</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Data tidak ditemukan!{" "}
            </p>
            <p class="mb-8">{message}</p>

            <button
              onClick={() => {
                navigate(-1);
              }}
              className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
            >
              Kembali
            </button>
          </div>
          <div class="max-w-lg"></div>
        </div>
      </div>
    </>
  );
}
