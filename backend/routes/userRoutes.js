const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/", (req, res) => {
    res.status(200).json({ message: "API rodando" });
})

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.editUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;