const router = require("express").Router();

const { addMessage, getAllMessage } = require("../controllers/message.controller");

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessage);


module.exports = router;