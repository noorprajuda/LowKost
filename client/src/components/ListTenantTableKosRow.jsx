import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBoardingHouseOwner,
  deleteTenantKos,
  fetchListTenant,
} from "../store/action";

import Swal from "sweetalert2";

export default function ListTenantTableKosRow({ listTenant, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const removeHandler = (e, tenantId, listTenantId) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah benar penghuni ini sudah selesai menyewa?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: `Tidak`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil!", "", "success");
        dispatch(deleteTenantKos(tenantId, listTenantId, +id));
        dispatch(fetchListTenant(+id));
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
          <td className="py-4 px-6 text-center">
            <a
              onClick={(e) =>
                removeHandler(e, listTenant.id, listTenant.UserId)
              }
              href="#"
              className="font-medium text-red-600  hover:underline"
            >
              Selesai
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}
