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
      return res.status(404).json({ message: "No companies yet!" });
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
    const {
      name,
      companyOwner,
      phoneNumber,
      city,
      state,
      country,
      dateCreated,
      imageURL,
    } = req.body;

    // create new Company instance
    const newCompany = new Company({
      name,
      companyOwner,
      phoneNumber,
      city,
      state,
      country,
      dateCreated,
      imageURL,
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
 * UPDATE COMPANY stage BY ID ROUTE
 */
router.put("/companies/:companyId", async (req, res, next) => {
  const companyId = req.params.companyId;

  try {
    const company = await Company.findByIdAndUpdate(companyId, req.body, {
      new: true,
    });
    res.status(200).json({ message: "updated company details" });

    if (!company) {
      return res.status(404).json({ message: "No company with this id found" });
    }
  } catch (err) {
    return res.status(404).json({ message: "No company with this id found" });
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
    // fetch deals data from MongoDB
    const deals = await Deal.find();

    // Check if there are no deals
    if (!deals.length) {
      return res.status(404).json({ message: "No deals yet!" });
    }

    // Calculate total amount and average deal amount
    const totalAmount = deals.reduce((sum, deal) => sum + parseFloat(deal.amount), 0);
    const averageDealAmount = (totalAmount / deals.length).toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Calculate the total count of Closed Won and Closed Lost deals
    const closedWonCount = deals.filter(deal => deal.stage.toLowerCase() === "closed won").length;
    const closedLostCount = deals.filter(deal => deal.stage.toLowerCase() === "closed lost").length;
    const totalClosedDeals = closedWonCount + closedLostCount;

    // Calculate the individual percentages of Closed Won and Closed Lost deals
    const closedWonPercentage = totalClosedDeals > 0 ? ((closedWonCount / totalClosedDeals) * 100).toFixed(2) : 0;
    const closedLostPercentage = totalClosedDeals > 0 ? ((closedLostCount / totalClosedDeals) * 100).toFixed(2) : 0;

    // Create response data object
    const responseData = {
      deals: deals,
      averageDealAmount: averageDealAmount,
      closedWonPercentage: closedWonPercentage,
      closedLostPercentage: closedLostPercentage
    };

    res.json(responseData);
  } catch (err) {
    next(err);
  }
});

router.get("/deals/:dealId", async (req, res, next) => {
  //fetch deal
  const dealId = req.params.dealId;

  try {
    const deal = await Deal.findById(dealId).populate("company");

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
    const { name, amount, dateClosed, dateInitiated, stage, company } =
      req.body;

    // create new Company instance
    const newDeal = new Deal({
      name,
      amount,
      dateClosed,
      dateInitiated,
      stage,
      company,
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
 * UPDATE DEAL stage BY ID ROUTE
 */
router.put("/deals/:dealId", async (req, res, next) => {
  const dealId = req.params.dealId;

  try {
    const deal = await Deal.findByIdAndUpdate(dealId, req.body, { new: true });
    res.status(200).json({ message: "updated deal stage" });

    if (!deal) {
      return res.status(404).json({ message: "No Deal with this id found" });
    }
  } catch (err) {
    return res.status(404).json({ message: "No Deal with this id found" });
  }
});

router.put("/deals/:dealId/all", async (req, res, next) => {
  const dealId = req.params.dealId;

  try {
    const deal = await Deal.findByIdAndUpdate(dealId, req.body, { new: true });
    res.status(200);
    const updatedDeals = await Deal.find();

    res.json(updatedDeals);

    if (!deal) {
      return res.status(404).json({ message: "No Deal with this id found" });
    }
  } catch (err) {
    return res.status(404).json({ message: "No Deal with this id found" });
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
      return res.status(404).json({ message: "No users yet!" });
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
    const { email, password, username } = req.body;

    // create new Company instance
    const newUser = new User({
      email,
      password,
      username,
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
