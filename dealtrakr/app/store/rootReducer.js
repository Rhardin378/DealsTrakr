import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";
import dealsReducer from "./slices/deals";

const rootReducer = combineReducers({
  companies: companiesReducer,
  deals: dealsReducer
  // auth: authReducer
});

export default rootReducer;
