import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function BoardingHousesTableRow({ boardingHouses }) {
  const dispatch = useDispatch();

  return (
    <>
      <tbody>
        <tr className="bg-white border-b">
          <td className="py-4 px-6 text-xs">
            #{boardingHouses.id}-{boardingHouses.UserId}-
            {boardingHouses.CategoryId}-2022
          </td>
          <td className="py-4 px-6 text-center">
            <img src={boardingHouses.mainImg} alt="" className="w-96" />
          </td>

          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {boardingHouses.name}
          </th>
          <td className="py-4 px-6">{boardingHouses.price}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.CategoryId}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.CityId}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.totalRoom}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.UserId}</td>
          <td className="py-4 px-6 text-xs">{boardingHouses.description}</td>
          <td className="py-4 px-6 text-center">{boardingHouses.location}</td>
          <td className="py-4 px-6">
            <a href="#" className="font-medium text-red-600  hover:underline">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}
