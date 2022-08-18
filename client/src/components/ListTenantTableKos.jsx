import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBoardingHouses, fetchListTenant } from "../store/action";
import BoardingHousesTableRowOwner from "./BoardingHousesTableRowOwner";
import ListTenantTableKosRow from "./ListTenantTableKosRow";

export default function ListTenantTableKos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listTenant = useSelector((state) => state.boardingHouses.listTenant);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchListTenant(id));
  }, []);

  if (!listTenant.length) {
    return (
      <>
        <div className="flex flex-row">
          <div className="basis-2/12 "></div>
          <div className="basis-10/12">
            <div class="h-96  flex items-center">
              <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div class="max-w-md">
                  <div class="text-5xl font-dark font-bold">Waduh</div>
                  <p class="text-2xl md:text-3xl font-light leading-normal">
                    Kosan mu masih kosong.{" "}
                  </p>
                  <p class="mb-8">
                    Buat kosan mu semenarik mungkin agar calon penyewa melirik
                    kosan mu.
                  </p>

                  <button
                    onClick={() => navigate(-1)}
                    class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
                  >
                    Kembali
                  </button>
                </div>
                <div class="max-w-lg"></div>
              </div>
            </div>
          </div>
          <div className="basis-2/12 "></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6 rounded-l-lg">
                  No.
                </th>
                <th scope="col" class="py-3 px-6">
                  Nama Penghuni
                </th>
                <th scope="col" class="py-3 px-6">
                  Nomor Penghuni
                </th>
                <th scope="col" class="py-3 px-6 ">
                  Email Penghuni
                </th>
                <th scope="col" class="py-3 px-6">
                  Alamat Penghuni
                </th>
                <th scope="col" class="py-3 px-6">
                  Tanggal Masuk
                </th>
                <th scope="col" class="py-3 px-6 rounded-r-lg">
                  -
                </th>
              </tr>
            </thead>

            {listTenant.map((listTenant, index) => {
              return (
                <ListTenantTableKosRow
                  key={listTenant.id}
                  listTenant={listTenant}
                  index={index}
                />
              );
            })}
          </table>
          <hr />
          <div className="flex flex-row">
            <div className="basis-2/12"></div>
            <div className="basis-10/12">
              <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-12">
                <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Kapasitas Kamar
                      </p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {listTenant[0].BoardingHouse.totalRoom} Kamar
                      </p>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        class="w-5 h-5"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Penyewa Aktif
                      </p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {listTenant.length} Orang
                      </p>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Ketersediaan Kamar
                      </p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {listTenant[0].BoardingHouse.totalRoom -
                          listTenant.length}{" "}
                        Kamar
                      </p>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
                      <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Tanggal
                      </p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {new Date().toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-2/12"></div>
          </div>
        </div>
      </>
    );
  }
}
