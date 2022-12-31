const router = require("express").Router();

const { addRoom, getAllRoom } = require("../controllers/room.controller");

router.post("/addRoom", addRoom);
router.get("/getAllRoom", getAllRoom)

module.exports = router;