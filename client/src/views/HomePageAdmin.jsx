import { useDispatch } from "react-redux";
import BoardingHousesTable from "../components/BoardingHousesTable";
import { fetchAdminKos } from "../store/action";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function HomePageAdmin() {
  const dispatch = useDispatch();

  const boardingHouses = useSelector((state) => state.boardingHouses.adminKos);

  useEffect(() => {
    dispatch(fetchAdminKos());
  }, []);

  return (
    <>
      <div className="mt-20 mb-20">
        <h1 className="text-6xl font-bold mb-5">
          Total Kos Aktif di Low Kost : {boardingHouses.length} Kosan
        </h1>
        <BoardingHousesTable />
      </div>
    </>
  );
}
