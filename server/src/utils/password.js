const bcrypt = require("bcrypt");

module.exports = {
        encodePassword: (password) => {
                return new Promise((resolve, reject) => {
                        bcrypt.hash(password, 10).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        },
        checkPassword: (passwordSideClient, passwordSideDB) => {
                return new Promise((resolve, reject) => {
                        bcrypt.compare(
                                passwordSideClient,
                                passwordSideDB
                        ).then((result) => {
                                resolve(result)
                        }).catch((error) => {
                                reject(error)
                        })
                })
        }
}