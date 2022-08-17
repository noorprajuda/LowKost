import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardingHouseOwner } from "../store/action";
import Swal from "sweetalert2";

export default function ListTenantTableKosRow({ listTenant, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <tr class="bg-white dark:bg-gray-800">
          {/* <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Apple MacBook Pro 17"
          </th> */}
          <td class="py-4 px-6">{index + 1}</td>
          <td class="py-4 px-6">{listTenant.User.fullName}</td>
          <td class="py-4 px-6">{listTenant.User.phoneNumber}</td>
          <td class="py-4 px-6">{listTenant.User.email}</td>
          <td class="py-4 px-6">{listTenant.User.address}</td>
          <td class="py-4 px-6">
            {new Date(listTenant.startDate).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </td>
          {/* <td class="py-4 px-6">
            {new Date(new Date().setDate(date.getDate() + 30))}
          </td> */}
        </tr>
      </tbody>
    </>
  );
}
