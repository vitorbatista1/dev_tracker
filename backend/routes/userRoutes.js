const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { autenticarToken } = require("../middlewares/autenticarToken.middleware");
const { autorizarAdministrador } = require("../middlewares/verifyAdmin.middleware");


router.get("/", (req, res) => {
    res.status(200).json({ message: "API rodando" });
})

router.post("/users", autenticarToken, autorizarAdministrador, userController.createUser,);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.editUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;