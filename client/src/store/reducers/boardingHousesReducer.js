import { BOARDING_HOUSES_FETCH_SUCCESS } from "../action/actionType";

const initialState = { boardingHouses: [], boardingHouse: {} };

function boardingHousesReducer(state = initialState, action) {
  switch (action.type) {
    case BOARDING_HOUSES_FETCH_SUCCESS:
      return { ...state, boardingHouses: action.payload };
    default:
      return state;
  }
}

export default boardingHousesReducer;
