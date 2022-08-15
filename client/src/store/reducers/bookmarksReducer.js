import {
  BOOKMARK_FETCH_USER_SUCCESS,
  BOOKMARK_BY_ID_FETCH_USER_SUCCESS,
} from "../action/actionType";

const initialState = { bookmarks: [], bookmark: [] };

function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK_FETCH_USER_SUCCESS:
      return { ...state, bookmarks: action.payload };
    case BOOKMARK_BY_ID_FETCH_USER_SUCCESS:
      return { ...state, bookmark: action.payload };

    default:
      return state;
  }
}

export default bookmarksReducer;
