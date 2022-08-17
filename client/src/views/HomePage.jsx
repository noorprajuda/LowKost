import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardCity from "../components/CardCity";
import { fetchBoardingHousesUser, fetchCities } from "../store/action";
import useFetch from "../hooks/useFetch";
import image from "../assets/LowKostBanner.jpeg";

export default function HomePage() {
  const { loading } = useFetch("http://localhost:4000/user/boardingHouses");

  const dispatch = useDispatch();
  let [mainImg, setMainImg] = useState("");
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

  const [cityId, setCityId] = useState(0);

  useEffect(() => {
    if (cityId != 0) {
      const filteredBoardingHouses = boardingHouses.filter(
        (boardingHouse) => boardingHouse.CityId == cityId
      );
      setLocalBoardingHouses(filteredBoardingHouses);
    } else {
      setLocalBoardingHouses(boardingHouses);
    }
  }, [cityId]);

  const categories = [
    { id: 1, name: "Kos Putri" },
    { id: 2, name: "Kos Putra" },
    { id: 3, name: "Kos Campur" },
  ];

  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    if (categoryId != 0) {
      const filteredBoardingHouses = boardingHouses.filter(
        (boardingHouse) => boardingHouse.CategoryId == categoryId
      );
      setLocalBoardingHouses(filteredBoardingHouses);
    } else {
      setLocalBoardingHouses(boardingHouses);
    }
  }, [categoryId]);

  return (
    <>
      {loading === false ? (
        <div className="mt-14 mb-28">
          <div className="relative flex justify-center text-center">
            <img
              className="ml-20 mr-20 mb-5 mt-20 h-[500px] w-full object-cover"
              src={mainImg}
              alt=""
            />

            <div className="w-[600px] absolute bottom-20 left-40 text-grey-600 font-bold text-4xl">
              <a
                href="#"
                className="w-[600px] block p-6 bg-white opacity-95 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:opacity-90 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <span className="flex items-center px-1 text-xl text-gray-600">
                  <span className="font-medium italic">Pakai Low Kost!</span>
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
          {/* {JSON.stringify(localBoardingHouses, null, 2)} */}
          <div className="ml-20 mr-20 flex flex-row justify-between mb-5">
            <div className="w-[500px] flex flex-row justify-between ">
              {/* Filter by city */}
              <h1 className="pt-6 text-2xl text-gray-600 sm:text-5xl lg:text-2xl font-bold tracking-tighter leading-tight whitespace-nowrap">
                Cari kos berdasar kota
              </h1>

              <select
                className="ml-2 rounded-lg h-[50px] w-[300px] mt-4"
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value);
                  console.log(e.target.value, "<<<<< e target value city");
                }}
              >
                <option value={0}>Semua Kota</option>

                {cities.map((city, index) => {
                  return (
                    <>
                      <option value={city.id}>{city.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="w-[570px] flex flex-row justify-between ">
              {/* Filter by category */}
              <h1 className="pt-6 text-2xl text-gray-600 sm:text-5xl lg:text-2xl font-bold tracking-tighter leading-tight whitespace-nowrap">
                Cari kos berdasar kategori
              </h1>
              <select
                className="ml-2 rounded-lg h-[50px] w-[300px] mt-4"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  console.log(e.target.value, "<<<<< e target value category");
                }}
              >
                <option value={0}>Semua kategori</option>

                {categories.map((category, index) => {
                  return (
                    <>
                      <option value={category.id}>{category.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
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

          {/* Filter Google Map */}
          <h1 className="pt-4 mb-5 text-4xl text-gray-600 sm:text-5xl lg:text-4xl font-bold tracking-tighter leading-tight whitespace-nowrap">
            Lihat kos dengan Google Map
          </h1>
          <div className="grid grid-cols-4 gap-4 mr-20 ml-20">
            {cities.map((city, index) => {
              return (
                <>
                  <CardCity key={city.id} city={city} />
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
