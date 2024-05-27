const jwt = require("jsonwebtoken");

// JWT helps to authorise our user in the backend
// We sign a new jwt token using the id that was passed from userconrollers
// token: generateToken(user._id),
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "40 days",
  });
};
module.exports = generateToken;
