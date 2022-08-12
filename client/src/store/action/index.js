import { BOARDING_HOUSES_FETCH_SUCCESS } from "./actionType";

export const fetchBoardingHousesSuccess = (payload) => {
  return {
    type: BOARDING_HOUSES_FETCH_SUCCESS,
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
