const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);

  try {
    const secretKey = process.env.JWT_SECRET;
    console.log(secretKey);
    const decoded = jwt.verify(token, secretKey);
    console.log("in2");
    console.log(`decoded: ${JSON.stringify(decoded)}`);
    console.log("in3");
    const user = await User.findOne({ _id: decoded.id });
    console.log(`user: ${user}`);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = { authenticate };
