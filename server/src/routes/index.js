const router = require("express").Router();

router.use("/auth", require("./user.route"));
router.use("/message", require("./message.route"))
router.use("/room", require("./room.route"))

module.exports = router;