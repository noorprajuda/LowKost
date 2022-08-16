import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetch(url) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // setData(data);
          dispatch({ type: "products/fetchSuccess", payload: data });
        })
        .catch((error) => {
          console.log(
            "There has been a problem with your fetch operation",
            error
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      fetch(url, {
        headers: {
          access_token: access_token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // setData(data);
          dispatch({ type: "products/fetchSuccess", payload: data });
        })
        .catch((error) => {
          console.log(
            "There has been a problem with your fetch operation",
            error
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url]);

  return { data, loading };
}
