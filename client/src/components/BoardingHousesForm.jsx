export default function BoardingHousesForm() {
  return (
    <>
      <div>
        <div className="flex flex-row">
          <div className="basis-1/4"></div>
          <div className="basis-2/4 px-8 py-8">
            <form>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nama Kos
                </label>
                <input
                  type="email"
                  id="email"
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
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Pilih Kota
                  </option>
                  <option>Jakarta</option>
                  <option>Bandung</option>
                  <option>Bali</option>
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
                  type="email"
                  id="email"
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected disabled>
                    Pilih kategori
                  </option>
                  <option>Kosan Putri</option>
                  <option>Kosan Putra</option>
                  <option>Kosan Campur</option>
                </select>
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
                />
                <div
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  Gambar ini akan menjadi penanda kosan anda di halaman penyewa.
                </div>
              </div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="user_avatar"
              >
                Fasilitas Kosan
              </label>
              <fieldset class="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend class="sr-only">Checkbox variants</legend>

                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>

                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-3"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-3"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I am 18 years or older
                  </label>
                </div>
              </fieldset>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="user_avatar"
              >
                Peraturan Kosan
              </label>
              <fieldset class="mb-6 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                <legend class="sr-only">Checkbox variants</legend>

                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I want to get promotional offers
                  </label>
                </div>

                <div class="flex items-center mb-4">
                  <input
                    id="checkbox-3"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checkbox-3"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I am 18 years or older
                  </label>
                </div>
              </fieldset>
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
                  placeholder="Total Room Available"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
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
