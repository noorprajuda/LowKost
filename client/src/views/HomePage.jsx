import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchBoardingHousesUser, fetchCities } from "../store/action";
import useFetch from "../hooks/useFetch";
import image from "../assets/LowKostBanner.jpeg";

export default function HomePage() {
  const { loading } = useFetch("http://localhost:4000/user/boardingHouses");

  const dispatch = useDispatch();
  let [mainImg, setMainImg] = useState("");
  // const [boardingHouses, setBoardingHouses] = [];
  const boardingHouses = useSelector(
    (state) => state.boardingHouses.boardingHouses
  );

  const cities = useSelector((state) => state.boardingHousesIdentifier.cities);

  const [localBoardingHouses, setLocalBoardingHouses] =
    useState(boardingHouses);

  useEffect(() => {
    dispatch(fetchBoardingHousesUser());
  }, []);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  useEffect(() => {
    setMainImg(image);
    setLocalBoardingHouses(boardingHouses);
  }, [boardingHouses]);

  console.log(mainImg);
  console.log(boardingHouses);

  // VVVVVVVVVVV-=-=-=-=-=-=-=-=VVVVVVVVV

  const [city, setCity] = useState(null);

  useEffect(() => {
    dispatch(fetchBoardingHousesUser());
  }, []);

  useEffect(() => {
    if (city !== null) {
      const filteredBoardingHouses = boardingHouses.filter(
        (boardingHouse) => boardingHouse.CityId == city
      );
      setLocalBoardingHouses(filteredBoardingHouses);
      console.log(localBoardingHouses, "<<<<<<<< localBoardingHouses");
    } else {
      setLocalBoardingHouses(boardingHouses);
    }
  }, [city]);

  // AAAAAAAA-=-=-=-=-=-=-=-=AAAAAAA
  return (
    <>
      {loading === false ? (
        <div className="mt-14 mb-28">
          <div className="relative flex justify-center text-center">
            <img
              className="ml-20 mr-20 mb-20 mt-20 h-[500px] w-full object-cover"
              src={mainImg}
              alt=""
            />

            <div className="w-[600px] absolute bottom-40 left-40 text-grey-600 font-bold text-4xl">
              <a
                href="#"
                className="w-[600px] block p-6 bg-white opacity-95 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:opacity-90 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <span className="flex items-center px-1 text-xl text-gray-600">
                  <span className="font-medium">Pakai Low Kost!</span>
                  <img className="w-auto h-8" src="/img/vegetable.png" alt="" />
                </span>
                <h1 className="pt-4 text-4xl text-gray-600 sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight whitespace-nowrap">
                  DISKON <br />
                  300RB <br />
                  <span className="whitespace-nowrap text-blue-700">
                    {" "}
                    bagi pengguna baru!{" "}
                  </span>
                </h1>
                <p className="ml-10 pt-8 sm:text-lg max-w-md font-normal text-gray-600 leading-relaxed">
                  Sekarang cari kost murah jadi mudah
                </p>
              </a>
            </div>
          </div>
          {JSON.stringify(localBoardingHouses, null, 2)}

          {JSON.stringify(cities, null, 2)}

          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              console.log(e.target.value, "<<<<< e target value ");
            }}
          >
            <option disabled>--SELECT ONE--</option>

            {cities.map((city, index) => {
              return (
                <>
                  <option value={city.id}>{city.name}</option>
                </>
              );
            })}
          </select>

          {/* Display Card Boarding Houses */}

          <div className="grid grid-cols-4 gap-4 mr-20 ml-20">
            {localBoardingHouses.map((boardingHouse, index) => {
              return (
                <>
                  <Card key={boardingHouse.id} boardingHouse={boardingHouse} />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
