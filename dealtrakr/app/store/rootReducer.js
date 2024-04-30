import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";
import dealsReducer from "./slices/deals";
import addCompanyReducer from "./slices/addCompanySlice";
import addDealReducer from "./slices/addDealSlice";
import companyDetailsReducer from "./slices/companyDetailsSlice";

const rootReducer = combineReducers({
  companies: companiesReducer,
  addCompany: addCompanyReducer,
  companyDetails: companyDetailsReducer,
  deals: dealsReducer,
  addDeal: addDealReducer
  // auth: authReducer
});

export default rootReducer;
