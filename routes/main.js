const router = require("express").Router();
const Company = require("../models/Company");

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
 * POST trax route
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

    // save the new track to mongoDB
    await newCompany.save();

    res.status(200).json(newCompany);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;