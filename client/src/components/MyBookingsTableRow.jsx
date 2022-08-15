import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyBookingByIdUser,
  fetchMyBookingsByIdUser,
} from "../store/action";

export default function MyBookingsTableRow({ myBooking }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteMyBooking = (e) => {
    dispatch(deleteMyBookingByIdUser(e.target.value));
    dispatch(fetchMyBookingsByIdUser());
    navigate("/my-bookings");
  };

  return (
    <>
      <tbody className="mb-20">
        <tr className="bg-white border-b">
          {/* <td className="py-4 px-6 text-xs">
            #{bookmark.id}-{bookmark.UserId}-
            {bookmark.CategoryId}-2022
          </td> */}
          <td className="py-4 px-6 text-center">
            <img
              src={myBooking.BoardingHouse.mainImg}
              alt=""
              className="w-96"
            />
          </td>

          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {myBooking.BoardingHouse.name}
          </th>
          <td className="py-4 px-6">
            {
              myBooking.BoardingHouse.price
                .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                .split(",")[0]
            }
          </td>
          <td className="py-4 px-6">{myBooking.BoardingHouse.Category.name}</td>

          <td className="py-4 px-6 text-center">
            {myBooking.BoardingHouse.City.name}
          </td>
          <td className="py-4 px-6 text-center">
            {myBooking.BoardingHouse.totalRoom}
          </td>
          <td className="py-4 px-6 text-center">
            {myBooking.BoardingHouse.User.fullName}
          </td>
          <td className="py-4 px-6 text-xs">
            {myBooking.BoardingHouse.description}
          </td>
          <td className="py-4 px-6 text-center">
            {myBooking.BoardingHouse.location.coordinates[0]},{" "}
            {myBooking.BoardingHouse.location.coordinates[1]}
          </td>
          <td className="py-4 px-6 text-xs">{myBooking.startDate}</td>
          <td className="py-4 px-6 text-xs">{myBooking.status}</td>
          <td className="py-4 px-6 text-center">
            <button className="font-medium text-blue-600  hover:underline">
              Pay
            </button>{" "}
            <button
              value={myBooking.id}
              onClick={deleteMyBooking}
              className="font-medium text-red-600  hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}
