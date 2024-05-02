import { combineReducers } from "redux";
import companiesReducer from "./slices/companies";
import dealsReducer from "./slices/deals";
import addCompanyReducer from "./slices/addCompanySlice";
import addDealReducer from "./slices/addDealSlice";
import companyDetailsReducer from "./slices/companyDetailsSlice";
import dealDetailsReducer from "../../app/store/slices/dealDetailsSlice";

const rootReducer = combineReducers({
  companies: companiesReducer,
  addCompany: addCompanyReducer,
  companyDetails: companyDetailsReducer,
  deals: dealsReducer,
  addDeal: addDealReducer,
  dealDetails: dealDetailsReducer,
  // auth: authReducer
});

export default rootReducer;
