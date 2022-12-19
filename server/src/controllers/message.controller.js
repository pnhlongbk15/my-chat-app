const { createMsg, getAllMessage } = require("../services/message.service")

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
   }
}