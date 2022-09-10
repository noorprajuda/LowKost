import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMyBookingsByIdUser } from "../store/action";
import MyBookingsTable from "../components/MyBookingsTable";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import DataNotFound from "../components/DataNotFound";

export default function MyBookingsPage() {
  const dispatch = useDispatch();
  const { loading } = useFetch("https://low-kost-server.herokuapp.com/user/bookmark");
  const myBookings = useSelector((state) => state.myBookings.myBookings);

  useEffect(() => {
    dispatch(fetchMyBookingsByIdUser());
  }, []);

  if (myBookings.length == 0) {
    return (
      <>
        <DataNotFound message={"Ayo kembali dan sewa kos"} />
      </>
    );
  }

  return (
    <>
      <MyBookingsTable />
    </>
  );
}
