import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchSingleHouseOwner, updateBoardingHouse } from "../store/action";
import { fetchCities, fetchFacilities, fetchRules } from "../store/action";
import axios from "axios";
import Swal from "sweetalert2";
export default function BoardingHouseFormUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const singleHouseOwner = useSelector(
  //   (state) => state.boardingHouses.singleHouseOwner
  // );
  const cities = useSelector((state) => state.boardingHousesIdentifier.cities);

  const facilities = useSelector(
    (state) => state.boardingHousesIdentifier.facilities
  );

  const rules = useSelector((state) => state.boardingHousesIdentifier.rules);

  // const [formUpdate, setFormUpdate] = useState({
  //   StackFacilities: [],
  //   StackRules: [],
  // });
  // const [checkRules, setCheckRules] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchSingleHouseOwner(id));
  // }, []);

  useEffect(() => {
    dispatch(fetchFacilities());
  }, []);

  useEffect(() => {
    dispatch(fetchRules());
  }, []);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);
  const [formUpdate, setFormUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/boardinghouses/${id}`)
      .then((resp) => {
        setFormUpdate(resp.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "<<<<ERROR");
        Swal.fire(err.message);
      });
  }, [id]);
  console.log(formUpdate);

  const facilitiesCheckHandler = (e) => {
    const { value, name, checked } = e.target;
    const { BoardingHouseFacilities } = formUpdate;
    // console.log(StackFacilities, "<<<<");

    if (checked) {
      setFormUpdate({
        ...formUpdate,
        BoardingHouseFacilities: [
          ...BoardingHouseFacilities,
          { FacilityId: +value },
        ],
      });
    } else {
      setFormUpdate({
        ...formUpdate,
        BoardingHouseFacilities: BoardingHouseFacilities.filter(
          (e) => e.FacilityId !== +value
        ),
      });
    }
  };

  const rulesCheckHandler = (e) => {
    const { value, name, checked } = e.target;
    const { BoardingHouseRules } = formUpdate;

    if (checked) {
      setFormUpdate({
        ...formUpdate,
        BoardingHouseRules: [...BoardingHouseRules, { RuleId: +value }],
      });
    } else {
      setFormUpdate({
        ...formUpdate,
        BoardingHouseRules: BoardingHouseRules.filter(
          (e) => e.RuleId !== +value
        ),
      });
    }
  };

  const changeFormHandler = (e) => {
    const { value, name } = e.target;

    const newUpdate = {
      name: formUpdate.name,
      price: formUpdate.price,
      CategoryId: formUpdate.CategoryId,
      CityId: formUpdate.CityId,
      totalRoom: formUpdate.totalRoom,
      description: formUpdate.description,
      mainImg: formUpdate.mainImg,
      description: formUpdate.description,
      address: formUpdate.address,
      BoardingHouseRules: [...formUpdate.BoardingHouseRules],
      BoardingHouseFacilities: [...formUpdate.BoardingHouseFacilities],
    };

    newUpdate[name] = value;
    setFormUpdate(newUpdate);
  };

  const isChecked = (rule) => {
    let isCheck = false;
    for (let i = 0; i < formUpdate.BoardingHouseRules.length; i++) {
      if (formUpdate.BoardingHouseRules[i].RuleId === rule.id) {
        isCheck = true;
      }
    }

    return isCheck;
  };

  const isCheckedFacilities = (facility) => {
    let isCheck = false;

    for (let i = 0; i < formUpdate.BoardingHouseFacilities.length; i++) {
      if (formUpdate.BoardingHouseFacilities[i].FacilityId === facility.id) {
        isCheck = true;
      }
    }

    return isCheck;
  };

  const [saveImage, setSaveImage] = useState([]);
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateBoardingHouse(id, formUpdate, saveImage));
    navigate("/owner");
    // console.log(formUpdate);
  };
  const handleImageUpload = (e) => {
    let uploaded = e.target.files;
    console.log(uploaded, "Uploadd");

    setSaveImage(uploaded);
  };

  return !loading ? (
    <>
      <div className="mt-20">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                href="#"
                className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                aria-current="page"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <Link to="/owner">Daftar Kosan</Link>
              </a>
            </li>
            <li className="mr-2">
              <a className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link to="/owner-add">Tambah Kosan</Link>
              </a>
            </li>

            <li className="mr-2">
              <a
                href="#"
                className="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                </svg>
                Rubah Kosan
              </a>
            </li>

            <li class="mr-2">
              <a
                href="#"
                class="cursor-not-allowed inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                List Penyewa
              </a>
            </li>
            {/* <li className="mr-2">
              <a
                href="#"
                className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Contacts
              </a>
            </li>
            <li>
              <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                Disabled
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="mb-20">
        <div className="flex flex-row">
          <div className="basis-1/4"></div>
          <div className="basis-2/4 px-8 py-8">
            <form onSubmit={handleSave}>
              <h1 className="text-4xl text-left font-semibold">
                A. Detail Kosan
              </h1>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Nama Kos
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={formUpdate.name}
                  onChange={changeFormHandler}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Wilayah Kosan
                </label>
                <select
                  id="CityId"
                  value={formUpdate.CityId}
                  onChange={changeFormHandler}
                  name="CityId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {cities.map((city) => {
                    return (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Alamat Lengkap Kosan
                </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  onChange={changeFormHandler}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  value={formUpdate.address}
                  required
                />
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Harga Kosan / Bulan
              </label>
              <div className="flex mb-6">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Rp
                </span>
                <input
                  type="text"
                  id="website-admin"
                  name="price"
                  onChange={changeFormHandler}
                  className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formUpdate.price}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Kategori Kosan
                </label>
                <select
                  id="countries"
                  name="CategoryId"
                  value={formUpdate.CategoryId}
                  onChange={changeFormHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={1}>Kosan Putri</option>
                  <option value={2}>Kosan Putra</option>
                  <option value={3}>Kosan Campur</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Deskripsi
                </label>
                <textarea
                  id="message"
                  name="description"
                  onChange={changeFormHandler}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formUpdate.description}
                ></textarea>
              </div>

              {/* <div className="mb-6">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  for="user_avatar"
                >
                  Gambar Utama Kosan
                </label>
                <input
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  name="mainImg"
                  onChange={changeFormHandler}
                />
                <div
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  Gambar ini akan menjadi penanda kosan anda di halaman penyewa.
                </div>
              </div> */}

              {/* <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Gambar Utama Kosan "URL"
                </label>
                <input
                  type="mainImg"
                  id="mainImg"
                  name="mainImg"
                  onChange={changeFormHandler}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  value={formUpdate.mainImg}
                  placeholder={singleHouseOwner.mainImg}
                  required
                />
              </div> */}

              <div className="mb-6">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  for="user_avatar"
                >
                  Update Gambar Kosan
                </label>
                <input
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  multiple="multiple"
                  name="img"
                  onChange={handleImageUpload}
                />
                <div
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  Gambar ini akan menjadi penanda kosan anda di halaman penyewa.
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Total Kamar Tersedia
                </label>
                <input
                  type="number"
                  id="password"
                  onChange={changeFormHandler}
                  name="totalRoom"
                  value={formUpdate.totalRoom}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <h1 className="text-4xl text-left font-semibold">
                B. Fasilitas & Peraturan Kosan
              </h1>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Fasilitas Kosan
              </label>
              <fieldset className="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend className="sr-only">Checkbox variants</legend>
                {facilities.map((facility) => {
                  return (
                    <div className="flex items-center mb-4" key={facility.id}>
                      <input
                        id="StackFacilities"
                        type="checkbox"
                        name="StackFacilities"
                        checked={isCheckedFacilities(facility)}
                        onChange={facilitiesCheckHandler}
                        value={facility.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {facility.name}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Peraturan Kosan
              </label>
              <fieldset className="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend className="sr-only">Checkbox variants</legend>
                {rules.map((rule, index) => {
                  return (
                    <div className="flex items-center mb-4" key={rule.id}>
                      <input
                        id="StackRules"
                        type="checkbox"
                        name="StackRules"
                        checked={isChecked(rule)}
                        onChange={rulesCheckHandler}
                        value={rule.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {rule.name}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Saya yakin untuk menyimpan{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    perubahan ini
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
          <div className="basis-1/4"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
}
