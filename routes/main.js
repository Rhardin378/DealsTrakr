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

router.get("/companies/:companyId", async (req, res, next) => {
  //fetch company 
  const companyId = req.params.companyId;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
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
 * DELETE company by ID route
 */
router.delete("/companies/:companyId", async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company successfully deleted" });
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

router.get("/deals/:dealId", async (req, res, next) => {
  //fetch deal
  const dealId = req.params.dealId;

  try {
    const deal = await Deal.findById(dealId);

    if (!deal) {
      return res.status(404).json({ message: "deal not found" });
    }

    res.json(deal);
  } catch (err) {
    next(err);
  }
});

/**
 * POST deals route
 */
router.post("/deals", async (req, res, next) => {
  try {
    const {name, amount, dateClosed, dateInitiated, stage, company} = req.body;

    // create new Company instance
    const newDeal = new Deal({
      name,
      amount,
      dateClosed,
      dateInitiated,
      stage,
      company
    });

    // save the new company to mongoDB
    await newDeal.save();

    res.status(200).json(newDeal);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE deal by ID route
 */
router.delete("/deals/:dealId", async (req, res, next) => {
  const dealId = req.params.dealId;

  try {
    const deal = await Deal.findByIdAndDelete(dealId);

    if (!deal) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company successfully deleted" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET users route
 */
router.get("/users", async (req, res, next) => {
  try {
    // fetch companies data from mongoDB
    const users = await User.find();

    // message if no companies available
    if (!users) {
     return res.status(404).json({ message: "No users yet!" })
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * POST users route
 */
router.post("/users", async (req, res, next) => {
  try {
    const {email, password, username} = req.body;

    // create new Company instance
    const newUser = new User({
      email,
      password,
      username
    });

    // save the new company to mongoDB
    await newUser.save();

    res.status(200).json(newUser);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;