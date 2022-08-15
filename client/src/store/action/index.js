import axios from "axios";
import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSE_FETCH_SUCCESS,
  CITIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  FACILITIES_FETCH_SUCCESS,
  RULES_FETCH_SUCCESS,
  BOARDING_HOUSES_FETCH_USER_SUCCESS,
  BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS,
  BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
  SINGLE_HOUSE_OWNER_FETCH_SUCESS,
} from "./actionType";

const baseUrl = "http://localhost:4000";

export const fetchBoardingHousesSuccess = (payload) => {
  return {
    type: BOARDING_HOUSES_FETCH_SUCCESS,
    payload,
  };
};

export const fetchBoardingHousesUserSuccess = (payload) => {
  return {
    type: BOARDING_HOUSES_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchBoardingHousesUser = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/user/boardinghouses`);
      // console.log(resp);
      dispatch(fetchBoardingHousesUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchBoardingHouseByIdUserSuccess = (payload) => {
  return {
    type: BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchBookmarkByIdUserSuccess = (payload) => {
  return {
    type: BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchRulesSuccess = (payload) => {
  return {
    type: RULES_FETCH_SUCCESS,
    payload,
  };
};

export const fetchFacilitiesSuccess = (payload) => {
  return {
    type: FACILITIES_FETCH_SUCCESS,
    payload,
  };
};

export const fetchCitiesSuccess = (payload) => {
  return {
    type: CITIES_FETCH_SUCCESS,
    payload,
  };
};

export const singleHouseOwnerSuccess = (payload) => {
  return {
    type: SINGLE_HOUSE_OWNER_FETCH_SUCESS,
    payload,
  };
};

export const fetchBoardingHouses = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/owner/boardinghouses`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(fetchBoardingHousesSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchCities = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/cities`);
      dispatch(fetchCitiesSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchRules = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/rules`);
      dispatch(fetchRulesSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchFacilities = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/facilities`);
      dispatch(fetchFacilitiesSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const createBoardingHouse = (formBoardingHouse, checkRules) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(
          `${baseUrl}/owner/boardinghouse`,
          {
            StackFacilities: formBoardingHouse.StackFacilities,
            name: formBoardingHouse.name,
            price: formBoardingHouse.price,
            CategoryId: formBoardingHouse.CategoryId,
            CityId: formBoardingHouse.CityId,
            totalRoom: formBoardingHouse.totalRoom,
            description: formBoardingHouse.description,
            mainImg: formBoardingHouse.mainImg,
            address: formBoardingHouse.address,
            StackRules: checkRules,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        dispatch(fetchBoardingHouses());

        resolve();
      } catch (err) {
        console.log(err, "aaaa");
        reject(err);
      }
    });
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

export const registerTenant = (formBoardingHouse) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.post(
          `${baseUrl}/user/register`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          },
          formBoardingHouse
        );

        dispatch(fetchBoardingHouses());

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

export const deleteBoardingHouseOwner = (id) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.delete(`${baseUrl}/owner/boardinghouse/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        dispatch(fetchBoardingHouses());
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
};

export const fetchSingleHouseOwner = (id) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios.get(`${baseUrl}/owner/boardinghouse/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        dispatch(singleHouseOwnerSuccess(resp.data));

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
};

export const fetchBoardingHouseByIdUser = (id) => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/user/boardinghouses/${id}`);
      dispatch(fetchBoardingHouseByIdUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchBookmarkByIdUser = (id) => {
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
        dispatch(fetchBookmarkByIdUserSuccess(data));
        console.log("getState BoardingHouse>>>", getState());
      })
      .catch(console.log);
  };
};

export const updateBoardingHouse = (id, formUpdate) => {
  console.log(id);
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.put(
          `${baseUrl}/owner/boardinghouse/${id}`,
          {
            StackFacilities: formUpdate.StackFacilities,
            name: formUpdate.name,
            price: formUpdate.price,
            CategoryId: formUpdate.CategoryId,
            CityId: formUpdate.CityId,
            totalRoom: formUpdate.totalRoom,
            description: formUpdate.description,
            mainImg: formUpdate.mainImg,
            address: formUpdate.address,
            StackRules: formUpdate.StackRules,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        dispatch(fetchBoardingHouses());

        resolve();
      } catch (err) {
        console.log(err, "aaaa");
        reject(err);
      }
    });
  };
};
