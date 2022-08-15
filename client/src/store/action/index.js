import axios from "axios";
import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSES_FETCH_USER_SUCCESS,
  BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS,
  BOOKMARK_FETCH_USER_SUCCESS,
  BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
  MYBOOKINGS_FETCH_USER_SUCCESS,
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

export const fetchBookmarkUserSuccess = (payload) => {
  return {
    type: BOOKMARK_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchMyBookingsByIdUserSuccess = (payload) => {
  return {
    type: MYBOOKINGS_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchBookmarkByIdUserSuccess = (payload) => {
  return {
    type: BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchBoardingHouses = () => {
  console.log("mausk");
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/user/boardinghouses/1`);
      console.log(resp);
      dispatch(fetchBoardingHousesSuccess(resp.data));
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
        localStorage.setItem("email", resp.data.email);
        resolve();
      } catch (err) {
        reject(err);
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

export const addToMyBookmark = (id) => {
  console.log(id, "<<<<id");
  console.log(`${baseUrl}/user/bookmark/${id}`);

  const access_token = localStorage.getItem("access_token");
  console.log(access_token);
  return (dispatch, getState) => {
    //getState
    return fetch(`${baseUrl}/user/bookmark/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: access_token,
      },
      // body: JSON.stringify(newProduct),
    });
  };
};

export const fetchBookmarksUser = () => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: "GET",
        url: `${baseUrl}/user/bookmark`,
        headers: { access_token: access_token },
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });
      console.log(resp, "<<<response axios");

      // axios.get(`${baseUrl}/user/bookmark`);
      dispatch(fetchBookmarkUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const createMyBooking = (id, formMyBooking) => {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axios({
          method: "POST",
          url: `${baseUrl}/user/mybookings/${id}`,
          headers: {
            "Content-Type": "application/json",
            access_token: access_token,
          },
          data: formMyBooking,
        });

        console.log(resp);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const fetchMyBookingsByIdUser = () => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: "GET",
        url: `${baseUrl}/user/mybookings`,
        headers: { access_token: access_token },
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });
      console.log(resp, "<<<response axios");

      // axios.get(`${baseUrl}/user/bookmark`);
      dispatch(fetchMyBookingsByIdUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const fetchBookmarkByIdUser = (id) => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/user/bookmark`);
      dispatch(fetchBookmarkByIdUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const deleteBookmarkByIdUser = (id) => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${baseUrl}/user/bookmark/${id}`,
        headers: { access_token: access_token },
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });

      console.log(resp);

      // dispatch(fetchBookmarkByIdUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const deleteMyBookingByIdUser = (id) => {
  const access_token = localStorage.getItem("access_token");
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${baseUrl}/user/mybookings/${id}`,
        headers: { access_token: access_token },
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });

      console.log(resp);

      // dispatch(fetchBookmarkByIdUserSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};
