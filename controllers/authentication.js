const jwt = require("jwt-simple");
const User = require("../models/User");
require("../services/passport");
const secret = process.env.TOKEN_SECRET;
require("dotenv").config();

const tokenForUser = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
      exp: timestamp + 5 * 60 * 60,
    },
    secret
  );
};

exports.signin = (req, res) => {
  res.send({ email: req.user.email, token: tokenForUser(req.user) });
};

exports.currentUser = (req, res) => {
  const user = {
    email: req.user.email,
    token: tokenForUser(req.user),
    deals: req.user.deals || [],
  };
  res.send(user);
};

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log({ email, password });
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User();
    user.email = email;
    user.setPassword(password);

    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};
