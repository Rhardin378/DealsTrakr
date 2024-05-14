const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  dateInitiated: { type: Date },
  dateLastUpdated: { type: Date },
  dateClosed: { type: Date },
  stage: {
    type: String,
    // enum: ["initiated", "qualified", "contract sent", "closed won", "closed lost"],
  },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

const Deal = mongoose.model("Deal", DealSchema);

module.exports = Deal;
