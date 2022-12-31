const { createMsg, getAllMessage, createMsgRoom, getAllMsgRoom } = require("../services/message.service")

module.exports = {
   addMessage: (req, res) => {
      try {
         const { from, to, message } = req.body;
         createMsg({ from, to, message }).then((result) => {
            if (result) {
               return res.status(201).json({ msg: "Message added successfully" })
            } else {
               return res.status(201).json({ msg: "Failed to add message to the database" })
            }
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   },
   getAllMessage: (req, res) => {
      try {
         const { from, to } = req.body;
         getAllMessage({ from, to }).then((result) => {
            const messages = result.map((msg) => {
               return {
                  fromSelf: msg.sender.toString() === from,
                  message: msg.message.text,
               }
            })
            res.status(201).json({ status: true, messages })
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   },
   addRoomMessage: (req, res) => {
      try {
         const { room, from, message } = req.body;
         createMsgRoom({ room, from, message }).then((result) => {
            if (result) {
               return res.status(201).json({ msg: "Message added successfully" })
            } else {
               return res.status(201).json({ msg: "Failed to add message to the database" })
            }
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   },
   getAllMsgRoom: (req, res) => {
      try {
         const { from, room } = req.body;
         getAllMsgRoom({ room }).then((result) => {
            const messages = result.map((msg) => {
               return {
                  fromSelf: msg.sender._id.toString() === from,
                  message: msg.message.text,
                  avatarImage: msg.sender.avatarImage
               }
            })
            res.status(201).json({ status: true, messages })
         }).catch((error) => {
            return res.status(400).json({ msg: error.message, status: false });
         })
      } catch (error) {
         return res.status(400).json({ msg: error.message, status: false });
      }
   }
}