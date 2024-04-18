const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {type: String, required: true},
  companyOwner: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  dateCreated: {type: String, required: true},
  imageURL: {type: String, required: true},
  deals: [{ type: Schema.Types.ObjectId, ref: "Deal" }]
})

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;