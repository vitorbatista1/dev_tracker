const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/users/login", loginController.loginUser);
router.post("/users/logout", loginController.logoutUser);

module.exports = router;