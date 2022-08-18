import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardingHouseOwner } from "../store/action";
import Swal from "sweetalert2";

export default function BoardingHousesTableRow({ boardingHouses, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateHandler = (e, id) => {
    e.preventDefault();
    navigate(`/${id}/update`);
  };

  const tenantHandler = (e, id) => {
    e.preventDefault();
    navigate(`/${id}/tenant`);
  };

  const removeHandler = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin menghapus kosan ini?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: `Tidak`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Berhasil!", "", "success");
        dispatch(deleteBoardingHouseOwner(id));
      }
    });
  };

  return (
    <>
      <tbody>
        <tr className="bg-white border-b">
          <td className="text-center bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5">
            {index + 1}.
          </td>
          <td className="py-4 px-6 text-center ">
            <img
              src={boardingHouses.mainImg}
              alt=""
              className="rounded-lg w-96 h-40"
            />
          </td>

          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {boardingHouses.name}
          </th>
          <td className="py-4 px-6">
            {
              boardingHouses.price
                .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                .split(",")[0]
            }
          </td>
          <td className="py-4 px-6 text-center ">
            <h5 class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">
              {boardingHouses.Category.name}
            </h5>
          </td>
          <td className="py-4 px-6 text-center">{boardingHouses.City.name}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.totalRoom}</td>
          {/* <td className="py-4 px-6 text-center">{boardingHouses.UserId}</td> */}
          <td className="py-4 px-6 text-xs">{boardingHouses.description}</td>
          {/* <td className="py-4 px-6 text-center">{boardingHouses.location}</td> */}
          <td className="py-4 px-6 text-center">
            <a
              href="#"
              onClick={(e) => tenantHandler(e, boardingHouses.id)}
              className="font-medium text-green-600  hover:underline"
            >
              Lihat Penyewa{" "}
            </a>
          </td>
          <td className="py-4 px-6 text-center">
            <a
              href="#"
              onClick={(e) => updateHandler(e, boardingHouses.id)}
              className="font-medium text-blue-600  hover:underline"
            >
              Rubah Kosan{" "}
            </a>
          </td>
          <td className="py-4 px-6 text-center">
            <a
              onClick={(e) => removeHandler(e, boardingHouses.id)}
              href="#"
              className="font-medium text-red-600  hover:underline"
            >
              Hapus Kosan
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}
