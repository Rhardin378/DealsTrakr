const router = require("express").Router();
const Company = require("../models/Company");
const { Deal } = require("../models/Deal");
const User = require("../models/User");
const passport = require("passport");
const Authentication = require("../models/controllers/authentication");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

router.post("/auth/signin", requireSignin, Authentication.signin);
router.post("/auth/signup", Authentication.signup);
router.get("/auth/current_user", requireAuth, Authentication.currentUser);

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

router.get("/deals", async (req, res, next) => {
  try {
    const deals = await Deal.find().populate("company");

    if (!deals.length) {
      return res.status(404).json({ message: "No deals yet!" });
    }

    // Calculate total earnings by summing up all deal amounts
    const totalEarnings = deals.reduce(
      (sum, deal) => sum + parseFloat(deal.amount),
      0
    );

    // Format total earnings to have two decimal points
    const formattedTotalEarnings = totalEarnings.toLocaleString(
      undefined,
      { minimumFractionDigits: 2 });

    const totalAmount = totalEarnings;
    const averageDealAmount = (totalAmount / deals.length).toLocaleString(
      undefined,
      { minimumFractionDigits: 2 }
    );

    const closedWonDeals = deals.filter(
      (deal) =>
        deal.stage.toLowerCase() === "closed_won" ||
        deal.stage.toLowerCase() === "closed won"
    );
    const closedLostCount = deals.filter(
      (deal) =>
        deal.stage.toLowerCase() === "closed_lost" ||
        deal.stage.toLowerCase() === "closed lost"
    ).length;
    const totalClosedDeals = closedWonDeals.length + closedLostCount;

    const closedWonPercentage =
      totalClosedDeals > 0
        ? ((closedWonDeals.length / totalClosedDeals) * 100).toFixed(2)
        : 0;
    const closedLostPercentage =
      totalClosedDeals > 0
        ? ((closedLostCount / totalClosedDeals) * 100).toFixed(2)
        : 0;

    const totalDaysToClose = closedWonDeals.reduce((sum, deal) => {
      const initiatedDate = new Date(deal.dateInitiated);
      const closedDate = new Date(deal.dateClosed);
      const timeDifference =
        (closedDate - initiatedDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return sum + timeDifference;
    }, 0);

    const averageTimeToClose =
      closedWonDeals.length > 0
        ? (totalDaysToClose / closedWonDeals.length).toFixed(2)
        : 0;

    // Calculate average number of deals by date
    const dealsByDate = {};
    deals.forEach((deal) => {
      const date = new Date(deal.dateInitiated).toISOString().split("T")[0]; // Get only the date part
      dealsByDate[date] = (dealsByDate[date] || 0) + 1;
    });

    const dealsCount = Object.values(dealsByDate);
    const averageDealsByDate =
      dealsCount.length > 0
        ? (
            dealsCount.reduce((sum, count) => sum + count, 0) /
            dealsCount.length
          ).toFixed(2)
        : 0;

    // Calculate monthly revenue
    const revenueByMonth = {};
    deals.forEach((deal) => {
      const date = new Date(deal.dateInitiated);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + parseFloat(deal.amount);
    });

    const responseData = {
      deals: deals,
      totalEarnings: formattedTotalEarnings,
      averageDealAmount: averageDealAmount,
      closedWonPercentage: closedWonPercentage,
      closedLostPercentage: closedLostPercentage,
      averageTimeToClose: averageTimeToClose,
      averageDealsByDate: averageDealsByDate,
      dealsByDate: dealsByDate,
      revenueByMonth: revenueByMonth
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
