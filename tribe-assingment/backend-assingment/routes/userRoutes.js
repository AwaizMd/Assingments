const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

//routes
router.route("/register").post(registerUser);

module.exports = router;
