const { createRoom, findRoom } = require("../services/room.service")

module.exports = {
   addRoom: (req, res) => {
      try {
         const name = req.body.name;
         createRoom({ name }).then((result) => {
            return res.status(201).json({ result, msg: "Room added successfully" })
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   },
   getAllRoom: (req, res) => {
      try {
         findRoom().then((result) => {
            if (result.length) {
               return res.status(201).json({ rooms: result, status: true });
            } else {
               return res.status(201).json({ msg: "No room exist", status: false });
            }
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   }
}
