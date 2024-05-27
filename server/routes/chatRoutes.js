const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
} = require("../controllers/chatControllers");
const router = express.Router();
// Access or create cht
router.route("/").post(protect, accessChat);
// Gets all of the chts for that particular user
router.route("/").get(protect, fetchChats);
// creation of group chts
router.route("/group").post(protect, createGroupChat);
// Rename a group cht that has been created Usiong Put (to UPDATE a particular entry in out DB)
router.route("/rename").put(protect, renameGroupChat);
router.route("/groupadd").put(protect, addToGroupChat);
router.route("/groupremove").put(protect, removeFromGroupChat);

module.exports = router;
