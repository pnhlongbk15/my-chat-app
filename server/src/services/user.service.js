const { User } = require("../models/user.model");

module.exports = {
        findUser: ({ email = null, username = null }) => {
                return new Promise((resolve, reject) => {
                        var obj = {};
                        if (email) obj = { email }
                        if (username) obj = { username }

                        User.find(obj).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        },
        createUser: (obj) => {
                return new Promise((resolve, reject) => {
                        User.create(obj).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        },
        findAndUpdateById: (userId, obj) => {
                return new Promise((resolve, reject) => {
                        User.findByIdAndUpdate(userId, obj).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        }
}