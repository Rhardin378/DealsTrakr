const router = require("express").Router();
const Company = require("../models/Company");
const Deal = require("../models/Deal");
const User = require("../models/User");

/**
 * GET companies route
 */
router.get("/companies", async (req, res, next) => {
  try {
    // fetch companies data from mongoDB
    const companies = await Company.find();

    // message if no companies available
    if (!companies) {
     return res.status(404).json({ message: "No companies yet!" })
    }
    res.json(companies);
  } catch (err) {
    next(err);
  }
});

/**
 * POST companies route
 */
router.post("/companies", async (req, res, next) => {
  try {
    const {name, companyOwner, phoneNumber, city, state, country, dateCreated, imageURL} = req.body;

    // create new Company instance
    const newCompany = new Company({
      name,
      companyOwner, 
      phoneNumber, 
      city, 
      state, 
      country, 
      dateCreated, 
      imageURL
    });

    // save the new company to mongoDB
    await newCompany.save();

    res.status(200).json(newCompany);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * GET deals route
 */
router.get("/deals", async (req, res, next) => {
  try {
    // fetch companies data from mongoDB
    const deals = await Deal.find();

    // message if no companies available
    if (!deals) {
     return res.status(404).json({ message: "No deals yet!" })
    }
    res.json(deals);
  } catch (err) {
    next(err);
  }
});

/**
 * POST deals route
 */
router.post("/deals", async (req, res, next) => {
  try {
    const {name, amount, closeDate} = req.body;

    // create new Company instance
    const newDeal = new Deal({
      name,
      amount,
      closeDate
    });

    // save the new company to mongoDB
    await newDeal.save();

    res.status(200).json(newDeal);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;