import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSE_FETCH_SUCCESS,
} from "../action/actionType";

const initialState = { boardingHouses: [], boardingHouse: [] };

function boardingHousesReducer(state = initialState, action) {
  switch (action.type) {
    case BOARDING_HOUSES_FETCH_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSES_FETCH_USER_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS:
      return { ...state, boardingHouse: action.payload };
    default:
      return state;
  }
}

export default boardingHousesReducer;
