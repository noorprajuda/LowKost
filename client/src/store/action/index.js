import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSE_FETCH_SUCCESS,
} from "./actionType";

export const fetchBoardingHousesSuccess = (payload) => {
  return {
    type: BOARDING_HOUSES_FETCH_SUCCESS,
    payload,
  };
};

export const fetchBoardingHouseIdSuccess = (payload) => {
  return {
    type: BOARDING_HOUSE_FETCH_SUCCESS,
    payload,
  };
};

export const fetchBoardingHouses = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:3004/BoardingHouses")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error Sir");
        }
      })
      .then((data) => dispatch(fetchBoardingHousesSuccess(data)))
      .catch((err) => console.log(err));
  };
};

export const fetchBoardingHouseById = (id) => {
  const baseUrl = "http://localhost:3004/BoardingHouses";
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/${id}`, {
      // headers: {
      //   access_token: access_token,
      // },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, "<<<<data fetchBoardingHouse");
        dispatch(fetchBoardingHouseIdSuccess(data));
        console.log("getState BoardingHouse>>>", getState());
      })
      .catch(console.log);
  };
};
