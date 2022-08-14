import { combineReducers } from "redux";
import boardingHousesReducer from "./boardingHousesReducer";
import boardingHousesIdentifierReducer from "./boardingHousesIdentifierReducer";

const rootReducer = combineReducers({
  boardingHouses: boardingHousesReducer,
  boardingHousesIdentifier: boardingHousesIdentifierReducer,
});

export default rootReducer;
