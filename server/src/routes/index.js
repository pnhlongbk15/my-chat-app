const router = require("express").Router();

router.use("/auth", require("./user.route"));
router.use("/message", require("./message.route"))

module.exports = router;