import { SET_APP_DATA, SET_PAGE_LOADER } from "../constants";

const initialState = {
  auth: {},
  pages: {},
  company: {},
};

const App = (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        auth: { ...state?.auth, ...payload },
      };
    case SET_PAGE_LOADER:
      return {
        ...state,
        pages: { ...state?.pages, ...payload },
      };
    default:
      return state;
  }
};

export default App;
