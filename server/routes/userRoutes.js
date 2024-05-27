const express = require("express");
const router = express.Router();
const {
  registerUser,
  authorizeUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authorizeUser);

module.exports = router;
// *** #9 routing and endpoints
// *** Notes
