import { CLEAR_STATE, SET_APP_DATA, SET_PAGE_LOADER } from "../constants";

const initialState = {
  pages: {},
};

const App = (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        ...payload,
      };
    case SET_PAGE_LOADER:
      return {
        ...state,
        pages: { ...state?.pages, ...payload },
      };
    case CLEAR_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default App;
