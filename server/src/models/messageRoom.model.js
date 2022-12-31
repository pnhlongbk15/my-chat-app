const mongoose = require("mongoose");

const messageRoomSchema = new mongoose.Schema({
        message: {
                text: {
                        type: String,
                        required: true,
                },
        },
        sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
                required: true,
        },
        room: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Rooms",
                require: true
        }
}, { timestamps: true })

module.exports.MessageRoom = mongoose.model("MessageRoom", messageRoomSchema, "MessageRoom")