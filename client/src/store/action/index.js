
import axios from "axios";
import { BOARDING_HOUSES_FETCH_SUCCESS,BOARDING_HOUSE_FETCH_SUCCESS, } from "./actionType";


const baseUrl = "https://5da9-139-192-206-182.ap.ngrok.io";

export const fetchBoardingHousesSuccess = (payload) => {
  return {
    type: BOARDING_HOUSES_FETCH_SUCCESS,
    payload,
  };
};


// export const fetchBoardingHouses = () => {
//   return (dispatch, getState) => {
//     const headers = {
//       "Content-Type": "application/json",
//       access_token: localStorage.getItem("access_token"),
//     };
//     fetch(`${baseUrl}/owner/boardinghouses`, { headers })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error("Error Sir");
//         }
//       })
//       .then((data) => dispatch(fetchBoardingHousesSuccess(data)))
//       .catch((err) => console.log(err));
//   };
// };

export const fetchBoardingHouseIdSuccess = (payload) => {
  return {
    type: BOARDING_HOUSE_FETCH_SUCCESS,
    payload,
  };
};

export const fetchBoardingHouses = () => {
  console.log("mausk");
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/user/boardinghouses/1`);
      console.log(resp);
      // dispatch(fetchBoardingHousesSuccess(resp.data))
    } catch (error) {
      console.log("error");
    }
  };
};

export const registerOwner = (formRegister) => {
  return (dispatch, getState) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRegister),
    };
    return fetch(`${baseUrl}/owner/register`, requestOptions);
  };
};

export const registerTenant = (formRegister) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.post(`${baseUrl}/user/register`, formRegister);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const login = (formLogin) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.post(`${baseUrl}/login`, formLogin);

        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("role", resp.data.role);
        localStorage.setItem("fullName", resp.data.fullName);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
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
