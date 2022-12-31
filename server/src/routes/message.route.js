const router = require("express").Router();

const { addMessage, getAllMessage, addRoomMessage, getAllMsgRoom } = require("../controllers/message.controller");

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessage);

router.post("/addMsgRoom", addRoomMessage);
router.post("/getAllMsgRoom", getAllMsgRoom);

module.exports = router;