const router = require("express").Router();

router.use("/auth", require("./user.route"));

module.exports = router;