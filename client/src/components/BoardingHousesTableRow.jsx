import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteKosAdmin } from "../store/action";

export default function BoardingHousesTableRow({ boardingHouses, index }) {
  const dispatch = useDispatch();

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
        dispatch(deleteKosAdmin(id));
      }
    });
  };

  return (
    <>
      <tbody>
        <tr className="bg-white border-b">
          <td className="py-4 px-6 text-xs text-center">{index + 1}.</td>
          <td className="py-4 px-6 text-center text-xs">
            <img
              src={boardingHouses.mainImg}
              alt=""
              className="rounded-lg w-96 h-28"
            />
          </td>

          <th
            scope="row"
            className="py-4 px-6 font-small text-gray-900 whitespace-nowrap dark:text-white"
          >
            {boardingHouses.name}
          </th>
          <td className="py-4 px-6 text-xs">
            {
              boardingHouses.price
                .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                .split(",")[0]
            }
          </td>
          <td className="py-4 px-6 text-center text-xs">
            <h1 class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {boardingHouses.Category.name}
            </h1>
          </td>
          <td className="py-4 px-6 text-center text-xs">
            {boardingHouses.City.name}
          </td>
          <td className="py-4 px-6 text-center text-xs">
            {boardingHouses.totalRoom}
          </td>
          <td className="py-4 px-6 text-center text-xs">
            {boardingHouses.User.fullName}
          </td>
          <td className="py-4 px-6 text-xs">{boardingHouses.description}</td>
          <td className="py-4 px-6 text-center text-xs">
            {boardingHouses.address}
          </td>
          <td className="py-4 px-6">
            <a
              href="#"
              onClick={(e) => removeHandler(e, boardingHouses.id)}
              className="font-small text-red-600  hover:underline"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}
