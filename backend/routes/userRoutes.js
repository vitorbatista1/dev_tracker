const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.editUser);

module.exports = router;