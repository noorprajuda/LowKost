import {
  RULES_FETCH_SUCCESS,
  CITIES_FETCH_SUCCESS,
  FACILITIES_FETCH_SUCCESS,
} from "../action/actionType";

const initialState = { rules: [], cities: [], facilities: [], categories: [] };

function boardingHousesIdentifierReducer(state = initialState, action) {
  switch (action.type) {
    case RULES_FETCH_SUCCESS:
      return { ...state, rules: action.payload };
    case CITIES_FETCH_SUCCESS:
      return { ...state, cities: action.payload };
    case FACILITIES_FETCH_SUCCESS:
      return { ...state, facilities: action.payload };
    default:
      return state;
  }
}

export default boardingHousesIdentifierReducer;
