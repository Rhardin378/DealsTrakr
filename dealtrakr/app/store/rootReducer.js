import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";

const rootReducer = combineReducers({
  companies: companiesReducer,
  // deals: dealsReducer,
  // auth: authReducer
});

export default rootReducer;
