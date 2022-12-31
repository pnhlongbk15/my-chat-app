const mongoose = require("mongoose");
const { Room } = require("../models/room.model");

module.exports = {
        createRoom: ({ name }) => {
                return new Promise((resolve, reject) => {
                        Room.create({
                                name: name
                        }).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        },
        findRoom: () => {
                return new Promise((resolve, reject) => {
                        Room.find({}).select(["name", "members"])
                                .then((result) => {
                                        resolve(result)
                                }).catch((error) => {
                                        reject(error)
                                })
                })
        }
}