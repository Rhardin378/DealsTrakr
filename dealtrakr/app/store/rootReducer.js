import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";

const rootReducer = combineReducers({
  companies: companiesReducer,
});

export default rootReducer;
