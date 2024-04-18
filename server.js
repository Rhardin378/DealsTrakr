const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const PW = process.env.DB_PW;


mongoose.connect(`mongodb+srv://spalocsik:${PW}@dealstrakr.feqamgj.mongodb.net/?retryWrites=true&w=majority&appName=DealsTrakr`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Use cors middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// const mainRoutes = require("./routes/main");
// app.use(mainRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});