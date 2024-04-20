const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealSchema = new Schema({
  name: {type: String, required: true},
  amount: {type: String, required: true},
  closeDate: {type: String, required: true},
  companies: [{ type: Schema.Types.ObjectId, ref: "Company" }]
});

const Deal = mongoose.model("Deal", DealSchema);

module.exports = Deal;