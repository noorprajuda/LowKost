import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoardingHouse,
  fetchCities,
  fetchFacilities,
  fetchRules,
} from "../store/action";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function BoardingHousesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cities = useSelector((state) => state.boardingHousesIdentifier.cities);
  const facilities = useSelector(
    (state) => state.boardingHousesIdentifier.facilities
  );
  const rules = useSelector((state) => state.boardingHousesIdentifier.rules);

  const [checkRules, setCheckRules] = useState([]);

  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState([]);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  useEffect(() => {
    dispatch(fetchFacilities());
  }, []);

  useEffect(() => {
    dispatch(fetchRules());
  }, []);

  const [formBoardingHouse, setFormBoardingHouse] = useState({
    name: "",
    price: "",
    CategoryId: "",
    CityId: "",
    totalRoom: "",
    description: "",
    mainImg: "",
    description: "",
    address: "",
    StackRules: [],
    mainImg: "",
    StackFacilities: [],
  });

  const handleImageUpload = (e) => {
    let uploaded = e.target.files;
    console.log(uploaded, "Uploadd");

    setSaveImage(uploaded);
  };

  const rulesCheckHandler = (e) => {
    const { value, name, checked } = e.target;

    if (checked) {
      setCheckRules([...checkRules, { id: value }]);
    } else {
      setCheckRules(checkRules.filter((e) => e.id !== value));
    }
  };

  const facilitiesCheckHandler = (e) => {
    const { value, name, checked } = e.target;
    const { StackFacilities } = formBoardingHouse;

    if (checked) {
      setFormBoardingHouse({
        ...formBoardingHouse,
        StackFacilities: [...StackFacilities, { id: value }],
      });
    } else {
      setFormBoardingHouse({
        ...formBoardingHouse,
        StackFacilities: StackFacilities.filter((e) => e.id !== value),
      });
    }
  };

  const changeFormHandler = (e) => {
    const { value, name, checked } = e.target;

    const newForm = {
      // StackRules: checkRules,
      // mainImg: formBoardingHouse.mainImg,
      StackFacilities: formBoardingHouse.StackFacilities,
      name: formBoardingHouse.name,
      price: formBoardingHouse.price,
      CategoryId: formBoardingHouse.CategoryId,
      CityId: formBoardingHouse.CityId,
      totalRoom: formBoardingHouse.totalRoom,
      description: formBoardingHouse.description,
      mainImg: formBoardingHouse.mainImg,
      address: formBoardingHouse.address,
    };

    newForm[name] = value;
    setFormBoardingHouse(newForm);
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(createBoardingHouse(formBoardingHouse, checkRules, saveImage))
      .then((resp) => {
        Swal.fire("Hebat!", "Anda akan diarahkan ke halaman home!", "success");
        navigate("/owner");
      })
      .catch((err) =>
        Swal.fire(
          "Alamat tidak valid",
          "Pastikan alamat yang dimasukkan lengkap",
          "question"
        )
      );
  };

  return (
    <>
      <div>
        <div className="flex flex-row">
          <div className="basis-1/4"></div>
          <div className="basis-2/4 px-8 py-8">
            <form onSubmit={handleSave} encType="multipart/form-data">
              <h1 className="text-4xl text-left font-semibold">
                A. Detail Kosan
              </h1>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nama Kos
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  onChange={changeFormHandler}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Kos Adinda 77 Minimalis"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Wilayah Kosan
                </label>
                <select
                  id="CityId"
                  onChange={changeFormHandler}
                  name="CityId"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Pilih Kota
                  </option>
                  {cities.map((city) => {
                    return (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Alamat Lengkap Kosan
                </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  onChange={changeFormHandler}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Jl. Peta Barat No.33 rt.10 rw.13 Kalideres Jakarta Barat"
                  required
                />
              </div>

              <label
                for="website-admin"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Harga Kosan / Bulan
              </label>
              <div class="flex mb-6">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Rp
                </span>
                <input
                  type="text"
                  id="website-admin"
                  name="price"
                  onChange={changeFormHandler}
                  class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1.450.000"
                />
              </div>
              <div className="mb-6">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Kategori Kosan
                </label>
                <select
                  id="countries"
                  name="CategoryId"
                  onChange={changeFormHandler}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Pilih kategori
                  </option>
                  <option value={1}>Kosan Putri</option>
                  <option value={2}>Kosan Putra</option>
                  <option value={3}>Kosan Campur</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Deskripsi
                </label>
                <textarea
                  id="message"
                  name="description"
                  onChange={changeFormHandler}
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>

              <div className="mb-6">
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

              {/* <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Gambar Utama Kosan "URL"
                </label>
                <input
                  type="mainImg"
                  id="mainImg"
                  name="mainImg"
                  onChange={changeFormHandler}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="http://www.image.com"
                  required
                />
              </div> */}

              <div class="mb-6">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Total Kamar Tersedia
                </label>
                <input
                  type="number"
                  id="password"
                  onChange={changeFormHandler}
                  name="totalRoom"
                  placeholder="Total Room Available"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <h1 className="text-4xl text-left font-semibold">
                B. Fasilitas & Peraturan Kosan
              </h1>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="user_avatar"
              >
                Fasilitas Kosan
              </label>
              <fieldset class="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend class="sr-only">Checkbox variants</legend>
                {facilities.map((facility) => {
                  return (
                    <div class="flex items-center mb-4">
                      <input
                        id="StackFacilities"
                        type="checkbox"
                        name="StackFacilities"
                        onChange={facilitiesCheckHandler}
                        key={facility.id}
                        value={facility.id}
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="checkbox-1"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {facility.name}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="user_avatar"
              >
                Peraturan Kosan
              </label>
              <fieldset class="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend class="sr-only">Checkbox variants</legend>
                {rules.map((rule, index) => {
                  return (
                    <div class="flex items-center mb-4">
                      <input
                        id="StackRules"
                        type="checkbox"
                        name="StackRules"
                        onChange={rulesCheckHandler}
                        key={rule.id}
                        value={rule.id}
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="checkbox-2"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {rule.name}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
              <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="terms"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Saya setuju dengan{" "}
                  <a
                    href="#"
                    class="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    syarat dan ketentuan
                  </a>
                </label>
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Mulai iklankan kosanmu!
              </button>
            </form>
          </div>
          <div className="basis-1/4"></div>
        </div>
      </div>
    </>
  );
}
