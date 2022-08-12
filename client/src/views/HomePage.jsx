import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchBoardingHouses } from "../store/action";

export default function HomePage() {
  const dispatch = useDispatch();
  // const [boardingHouses, setBoardingHouses] = [];
  const boardingHouses = useSelector((state) => state.boardingHouses);

  useEffect(() => {
    dispatch(fetchBoardingHouses());
  }, []);

  return (
    <>
      <div className="mt-14">
        <h1 className="text-9xl font-bold underline">HOME</h1>
        {JSON.stringify(boardingHouses, null, 2)}
        {/* {boardingHouses.map((boardingHouse, index) => {
          <Card boardingHouse={boardingHouse} />;
        })} */}
      </div>
    </>
  );
}
