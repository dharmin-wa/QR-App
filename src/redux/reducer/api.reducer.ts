import { SET_API_DATA, LOADING_CHANGE } from "../constants";

const initialState = {
  loader: {},
};

const Api = (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case SET_API_DATA:
      return {
        ...state,
        ...payload,
      };
    case LOADING_CHANGE:
      return {
        ...state,
        loader: { ...state.loader, ...payload },
      };
    default:
      return state;
  }
};

export default Api;
