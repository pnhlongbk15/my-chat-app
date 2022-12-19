const { findUser, createUser, findAndUpdateById } = require("../services/user.service")
const { encodePassword, checkPassword } = require("../utils/password")

module.exports = {
    register: (req, res) => {
        try {
            const { username, email, password } = req.body;
            findUser({ username }).then((result) => {
                if (result) {
                    return res.status(201).json({ msg: "Username already used", status: false })
                } else {
                    findUser({ email }).then((result) => {
                        if (result) {
                            return res.status(201).json({ msg: "Email already used", status: false });
                        } else {
                            encodePassword(password).then((result) => {
                                const obj = {
                                    username,
                                    email,
                                    password: result
                                }
                                createUser(obj).then((result) => {
                                    if (result) {
                                        return res.status(201).json({ msg: "Register successful", status: true })
                                    }
                                }).catch((error) => {
                                    return res.status(400).json({ msg: error.message, status: false })
                                })
                            }).catch((error) => {
                                return res.status(400).json({ msg: error.message, status: false })
                            })
                        }
                    }).catch((error) => {
                        return res.status(400).json({ msg: error.message, status: false })
                    })
                }
            }).catch((error) => {
                return res.status(400).json({ msg: error.message, status: false })
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    },
    login: (req, res) => {
        try {
            const { username, password } = req.body;
            findUser({ username }).then((result) => {
                if (!result) {
                    return res.status(201).json({ msg: "Username doesn't exist", status: false })
                } else {
                    const user = result._doc
                    checkPassword(password, result.password).then((isValid) => {
                        if (!isValid) {
                            return res.status(201).json({ msg: "Password doesn't match", status: false })
                        } else {
                            delete user.password
                            return res.status(201).json({ msg: "Logged in successfully", status: true, user })
                        }
                    }).catch((error) => {
                        return res.status(400).json({ msg: error.message, status: false })
                    })
                }
            }).catch((error) => {
                return res.status(400).json({ msg: error.message, status: false })
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    },
    setAvatar: (req, res) => {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const obj = {
                isAvatarImageSet: true,
                avatarImage,
            }
            findAndUpdateById(userId, obj).then((result) => {
                if (!result) {
                    return res.status(201).json({ msg: "User doesn't exist", status: false })
                } else {
                    return res.status(201).json({ isSet: result.isAvatarImageSet, image: result.avatarImage })
                }
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    },
    getAllUsers: (req, res) => {
        try {
            const id = req.params.id
            findUser({ id }, 'many').then((result) => {
                return res.status(201).json({ user: result, status: true })
            }).catch((error) => {
                return res.status(400).json({ msg: error.message, status: false })
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    }
}