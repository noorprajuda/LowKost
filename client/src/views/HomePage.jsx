import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchBoardingHousesUser } from "../store/action";
import useFetch from "../hooks/useFetch";

export default function HomePage() {
  const { loading } = useFetch("http://localhost:4000/user/boardingHouses");

  const dispatch = useDispatch();
  let [mainImg, setMainImg] = useState("");
  // const [boardingHouses, setBoardingHouses] = [];
  const boardingHouses = useSelector(
    (state) => state.boardingHouses.boardingHouses
  );

  useEffect(() => {
    dispatch(fetchBoardingHousesUser());
  }, []);

  useEffect(() => {
    setMainImg(
      "https://static.mamikos.com/uploads/cache/data/style/2022-07-29/8RfLwycx-360x480.jpg"
    );
  }, [boardingHouses]);

  console.log(mainImg);
  console.log(boardingHouses);

  return (
    <>
      {loading === false ? (
        <div className="mt-14 mb-28">
          <div className="flex justify-center text-center">
            <img
              className="ml-20 mr-20 mb-20 mt-20 h-[500px] w-full object-cover"
              src={mainImg}
              alt=""
            />
          </div>
          {JSON.stringify(boardingHouses[0], null, 2)}
          <div className="grid grid-cols-4 gap-4 mr-20 ml-20">
            {boardingHouses.map((boardingHouse, index) => {
              return (
                <>
                  <Card key={boardingHouse.id} boardingHouse={boardingHouse} />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
