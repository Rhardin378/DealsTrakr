const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./services/passport");

const cors = require("cors");
require("dotenv").config();

const PW = process.env.DB_PW;

const app = express();
app.use(passport.initialize());
// Use cors middleware to enable CORS
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const mainRoutes = require("./routes/main");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(mainRoutes);
mongoose
  .connect(
    `mongodb+srv://spalocsik:${PW}@dealstrakr.feqamgj.mongodb.net/DealsTrakr?retryWrites=true&w=majority&appName=DealsTrakr`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to DB"));

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});
