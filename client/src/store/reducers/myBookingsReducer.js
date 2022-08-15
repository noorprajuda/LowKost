import { MYBOOKINGS_FETCH_USER_SUCCESS } from "../action/actionType";

const initialState = { myBookings: [], myBooking: [] };

function myBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case MYBOOKINGS_FETCH_USER_SUCCESS:
      return { ...state, myBookings: action.payload };
    default:
      return state;
  }
}

export default myBookingsReducer;
