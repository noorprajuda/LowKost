import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyBookingByIdUser,
  fetchMyBookingsByIdUser,
} from "../store/action";

const baseUrl = "http://localhost:4000";

export default function MyBookingsTableRow({ myBooking }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changeStatus, setChangeStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchMyBookingsByIdUser());
  }, [changeStatus]);

  const deleteMyBooking = (e) => {
    dispatch(deleteMyBookingByIdUser(e.target.value))
      .then(() => {
        dispatch(fetchMyBookingsByIdUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paymentHandler = async (e) => {
    try {
      const obj = {
        email: localStorage.getItem("email"),
        name: localStorage.getItem("fullName"),
        amount: myBooking.BoardingHouse.price,
      };
      const access_token = localStorage.getItem("access_token");
      console.log("access_token", access_token);
      const { data } = await axios({
        method: "post",
        url: `${baseUrl}/user/payment`,
        headers: { access_token },
        data: {
          email: obj.email,
          amount: obj.amount,
          name: obj.name,
        },
      });

      console.log("data>>>", data);

      let tio = this;

      console.log(window);

      window.snap.pay(data.token, {
        onSuccess: async (result) => {
          console.log(result);

          console.log(result.order_id);

          let baseUrl = "http://localhost:4000";

          const resp = await axios({
            method: "patch",
            url: `${baseUrl}/user/mybookings/${e.target.value}`,
            headers: { access_token: access_token },
            data: { email: localStorage.email },
          });

          console.log(resp);

          if (resp.status === 200) {
            setChangeStatus(true);
            Swal.fire(
              "Payment Success",
              "Thank you for using our service!",
              "success"
            );
          }
        },

        onPending(result) {
          navigate("my-bookings");
        },
        onClose(result) {
          navigate("my-bookings");
        },

        onError(result) {
          Swal.fire("Payment Failed", "", "error");
        },
      });
    } catch (err) {
      console.log(err);
      // Swal.fire(`${err.response.data.message}`, '', 'error')
    }
  };

  const updateStatusHandler = async (OrderId) => {
    try {
      await axios.patch(`${baseUrl}/payment`, {
        OrderId,
      });
    } catch (err) {
      Swal.fire(`${err.response.data.message}`, "", "error");
    }
  };

  const getpayments = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/payment`);
      this.payments = data;
    } catch (err) {
      Swal.fire(`${err.response.data.message}`, "", "error");
    }
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
          {myBooking.status == "Paid" ? (
            <td className="py-4 px-6 text-xs font-bold text-green-600">
              {myBooking.status}
            </td>
          ) : (
            <td className="py-4 px-6 text-xs font-bold text-red-600 ">
              {myBooking.status}
            </td>
          )}

          {myBooking.status == "Paid" ? null : (
            <td className="py-4 px-6 text-center">
              <button
                value={myBooking.id}
                onClick={paymentHandler}
                className="font-medium text-blue-600  hover:underline"
              >
                Pay
              </button>
              <button
                value={myBooking.id}
                onClick={deleteMyBooking}
                className="font-medium text-red-600  hover:underline"
              >
                Delete
              </button>
            </td>
          )}
        </tr>
      </tbody>
    </>
  );
}
