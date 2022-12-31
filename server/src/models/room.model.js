const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
                unique: true
        },
        members: [{
                type: String,
                ref: "Users",
                unique: true
        }]
}, { timestamps: true })

module.exports.Room = mongoose.model("Rooms", roomSchema, "Rooms")