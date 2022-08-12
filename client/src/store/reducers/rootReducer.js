import { combineReducers } from "redux";
import boardingHousesReducer from "./boardingHousesReducer";

const rootReducer = combineReducers({
  boardingHouses: boardingHousesReducer,
});

export default rootReducer;
