const router = require("express").Router();

const { register, login, setAvatar, getAllUsers, search, addFriend } = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.post("/addFriend", addFriend)

router.get("/search/:username", search)
router.get("/allUsers/:id", getAllUsers)

module.exports = router;