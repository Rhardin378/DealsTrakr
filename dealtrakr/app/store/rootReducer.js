import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";
import dealsReducer from "./slices/deals";
import addCompanyReducer from "./slices/addCompanySlice";
import addDealReducer, { addDeal } from "./slices/addDealSlice";

const rootReducer = combineReducers({
  companies: companiesReducer,
  addCompany: addCompanyReducer,
  deals: dealsReducer,
  addDeal: addDealReducer
  // auth: authReducer
});

export default rootReducer;
