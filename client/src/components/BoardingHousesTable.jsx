import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardingHouses } from "../store/action";
import BoardingHousesTableRow from "./BoardingHousesTableRow";

export default function BoardingHousesTable() {
  const dispatch = useDispatch();
  const boardingHouses = useSelector(
    (state) => state.boardingHouses.boardingHouses
  );

  useEffect(() => {
    dispatch(fetchBoardingHouses());
  }, []);

  console.log(boardingHouses);

  return (
    <>
      <div>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Image
                </th>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  CategoryId
                </th>
                <th scope="col" class="py-3 px-6">
                  CityId
                </th>
                <th scope="col" class="py-3 px-6">
                  roomQty
                </th>
                <th scope="col" class="py-3 px-6">
                  UserId
                </th>
                <th scope="col" class="py-3 px-6">
                  description
                </th>
                <th scope="col" class="py-3 px-6">
                  location
                </th>

                <th scope="col" class="py-3 px-6">
                  action
                </th>
              </tr>
            </thead>
            {boardingHouses.map((boardingHouses) => {
              return (
                <BoardingHousesTableRow
                  key={boardingHouses.id}
                  boardingHouses={boardingHouses}
                />
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
