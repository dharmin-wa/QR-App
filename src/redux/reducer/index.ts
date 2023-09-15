import { combineReducers } from "redux";
import { LOGOUT } from "../constants";
import { equal } from "../../utils/javascript";
import Form from "./form.reducer";
import Api from "./api.reducer";
import App from "./app.reducer";

const rootReducer = combineReducers({
  app: App,
  api: Api,
  form: Form,
});

const appReducer = (state: any, action: any) => {
  if (equal(action.type, LOGOUT)) {
    state = undefined;
  }

  return rootReducer(state, action);
};

export default appReducer;
