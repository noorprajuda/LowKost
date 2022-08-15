import { useNavigate } from "react-router-dom";
import { Button } from "flowbite";

export default function CardImage({ image }) {
  const navigate = useNavigate();
  const handleDetailPage = (e) => {
    // console.log("PRODUCT ID>>>>>", e.target.value);
    // const id = e.target.value;
    // navigate(`/${boardingHouse.id}`);
    e.preventDefault();
  };

  return (
    <>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img
          className="h-[200px] w-full object-cover"
          src={image.imgUrl}
          alt=""
        />
      </div>
    </>
  );
}
