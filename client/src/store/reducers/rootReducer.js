import { combineReducers } from "redux";
import boardingHousesReducer from "./boardingHousesReducer";
import boardingHousesIdentifierReducer from "./boardingHousesIdentifierReducer";

import bookmarksReducer from "./bookmarksReducer";
import myBookingsReducer from "./myBookingsReducer";

const rootReducer = combineReducers({
  boardingHouses: boardingHousesReducer,
  bookmarks: bookmarksReducer,
  myBookings: myBookingsReducer,
  boardingHousesIdentifier: boardingHousesIdentifierReducer,
});

export default rootReducer;
