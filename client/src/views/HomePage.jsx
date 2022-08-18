import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardCity from "../components/CardCity";
import { fetchBoardingHousesUser, fetchCities } from "../store/action";
import useFetch from "../hooks/useFetch";
import image from "../assets/LowKostBanner.jpeg";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";
import { useNavigate } from "react-router-dom";

function HomePage({ isScriptLoaded, isScriptLoadSucceed }) {
  const navigate = useNavigate();
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
  const [categoryId, setCategoryId] = useState(0);

  // useEffect(() => {
  //   if (cityId != 0) {
  //     const filteredBoardingHouses = boardingHouses.filter(
  //       (boardingHouse) => boardingHouse.CityId == cityId
  //     );
  //     setLocalBoardingHouses(filteredBoardingHouses);
  //   } else {
  //     setLocalBoardingHouses(boardingHouses);
  //   }
  // }, [cityId]);

  const categories = [
    { id: 1, name: "Kos Putri" },
    { id: 2, name: "Kos Putra" },
    { id: 3, name: "Kos Campur" },
  ];

  // useEffect(() => {
  //   if (categoryId != 0) {
  //     const filteredBoardingHouses = boardingHouses.filter(
  //       (boardingHouse) => boardingHouse.CategoryId == categoryId
  //     );
  //     setLocalBoardingHouses(filteredBoardingHouses);
  //   } else {
  //     setLocalBoardingHouses(boardingHouses);
  //   }
  // }, [categoryId]);

  //Multiple Filter

  const [list, setList] = useState(localBoardingHouses);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null); // => city

  // const handleSelectCategory = (event, value) =>
  //   !value ? null : setSelectedCategory(value);

  // const handleSelectRating = (event, value) =>
  //   !value ? null : setSelectedRating(value); //rating => city

  // const applyFilters = () => {
  //   let updatedList = localBoardingHouses; //datalist boarding house, updatedlist local boarding house

  //   // Rating Filter
  //   if (selectedRating) {
  //     updatedList = updatedList.filter(
  //       (item) => parseInt(item.rating) === parseInt(selectedRating)
  //     );
  //   }

  //   // Category Filter
  //   if (selectedCategory) {
  //     updatedList = updatedList.filter(
  //       (item) => item.category === selectedCategory
  //     );
  //   }

  //   setList(updatedList);

  //   !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  // };

  //

  // const applyFilters = () => {
  //   let filteredBoardingHouses = boardingHouses; //datalist boarding house, updatedlist local boarding house

  //   // Rating Filter
  //   if (cityId != 0) {
  //     filteredBoardingHouses = boardingHouses.filter(
  //       (item) => item.CityId === cityId
  //     );
  //   }

  //   // Category Filter
  //   if (categoryId != 0) {
  //     filteredBoardingHouses = boardingHouses.filter(
  //       (item) => item.CategoryId === categoryId
  //     );
  //   }

  //   setLocalBoardingHouses(filteredBoardingHouses);

  //   // !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  // };

  useEffect(() => {
    let filteredBoardingHouses = boardingHouses; //datalist boarding house, updatedlist local boarding house

    if (cityId != 0 && categoryId != 0) {
      filteredBoardingHouses = boardingHouses.filter(
        (item) => item.CityId == cityId && item.CategoryId == categoryId
      );
    }

    // City Filter
    else if (cityId != 0) {
      filteredBoardingHouses = boardingHouses.filter(
        (item) => item.CityId == cityId
      );
    }

    // Category Filter
    else if (categoryId != 0) {
      filteredBoardingHouses = boardingHouses.filter(
        (item) => item.CategoryId == categoryId
      );
    }

    setLocalBoardingHouses(filteredBoardingHouses);
  }, [cityId, categoryId]);

  // useEffect(() => {
  //   if (cityId != 0) {
  //     const filteredBoardingHouses = boardingHouses.filter(
  //       (boardingHouse) => boardingHouse.CityId == cityId
  //     );
  //     setLocalBoardingHouses(filteredBoardingHouses);
  //   } else if (categoryId != 0) {
  //     const filteredBoardingHouses = boardingHouses.filter(
  //       (boardingHouse) => boardingHouse.CategoryId == categoryId
  //     );
  //     setLocalBoardingHouses(filteredBoardingHouses);
  //   } else if (cityId != 0 && categoryId != 0) {
  //     const filteredBoardingHouses = boardingHouses.filter(
  //       (boardingHouse) =>
  //         boardingHouse.CityId == cityId &&
  //         boardingHouse.CategoryId == categoryId
  //     );
  //     setLocalBoardingHouses(filteredBoardingHouses);
  //   } else {
  //     setLocalBoardingHouses(boardingHouses);
  //   }
  // }, [cityId, categoryId]);

  const [address, setAddress] = React.useState("");
  const handleChange = (value) => {
    setAddress(value);
  };
  const handleSelect = (value) => {
    setAddress(value);
  };

  const handleSearch = () => {
    navigate(`/cari/${address}`);
  };

  if ((isScriptLoaded, isScriptLoadSucceed)) {
    return (
      <>
        {loading === false ? (
          <div className="mt-20 mb-28">
            <div className="mr-20 ml-20 px-10 flex flexrow align-center ">
              <h1 className=" pt-6 text-4xl text-blue-600 sm:text-5xl lg:text-3xl font-bold tracking-tighter leading-tight whitespace-nowrap">
                Cari kos melalui kolom pencarian
              </h1>
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => {
                  return (
                    <div className="pt-6">
                      <input
                        className="rounded-lg w-[600px] ml-10 "
                        {...getInputProps({
                          placeholder:
                            "Masukkan nama lokasi / daerah / alamat ...",
                        })}
                      />
                      <div>{loading && <div>Loading...</div>}</div>
                      {suggestions.map((suggestion) => {
                        const style = suggestion.active
                          ? { backgroundColor: "#a83232", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </PlacesAutocomplete>
              <button
                onClick={handleSearch}
                type="button"
                className="text-white h-[43px] ml-3 w-[100px] mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
              >
                Cari
              </button>
            </div>
            <div className="relative flex justify-center text-center">
              <img
                className="ml-20 mr-20 mb-5 mt-5 h-[500px] w-full object-cover rounded-lg"
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
                    <img
                      className="w-auto h-8"
                      src="/img/vegetable.png"
                      alt=""
                    />
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
                    console.log(
                      e.target.value,
                      "<<<<< e target value category"
                    );
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
                    <Card
                      key={boardingHouse.id}
                      boardingHouse={boardingHouse}
                    />
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
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`,
])(HomePage);
