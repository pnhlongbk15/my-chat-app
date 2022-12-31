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
            // findUser({ id }).then(async (result) => {
            //     const friendArr = [];
            //     for (let id of result._doc.listFriend) {
            //         const result = await findUser({ id })
            //         friendArr.push(result)
            //     }
            //     return res.status(201).json({ listFriend: friendArr, status: true })
            // }).catch((error) => {
            //     return res.status(400).json({ msg: error.message, status: false })
            // })
            findUser({ id }, 'many').then(async (result) => {
                const listFriend = result?.listFriend;
                return res.status(201).json({ listFriend, status: true })
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    },
    search: (req, res) => {
        try {
            const username = req.params.username;
            findUser({ username }).then((result) => {
                if (result) {
                    const user = result._doc;
                    delete user.password
                    return res.status(201).json({ status: true, user })
                } else {
                    return res.status(201).json({ status: false, msg: "user doesn't exist." })
                }
            }).catch((error) => {
                return res.status(400).json({ msg: error.message, status: false })
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false })
        }
    },
    addFriend: (req, res) => {
        try {
            const { userId, friendId } = req.body;
            findUser({ id: userId }).then((result) => {
                // let listFriend = result._doc.listFriend;
                // if (listFriend.includes(friendId)) {
                //     return res.status(201).json({ msg: "Add friend unsuccess", status: false })
                // } else {
                //     listFriend = [...listFriend, friendId];
                //     findAndUpdateById(userId, { listFriend : {friend:} }).then((result) => {
                //         if (result) {
                //             return res.status(201).json({ msg: "Add friend success", status: true })
                //         } else {
                //             return res.status(201).json({ msg: "Add friend unsuccess", status: false })
                //         }
                //     }).catch((error) => {
                //         return res.status(400).json({ msg: error.message, status: false });
                //     })
                // }
                if (userId === friendId) {
                    return res.status(201).json({ msg: "Don't match friend myself", status: false })
                }
                let listFriend = [...result.listFriend]
                if (!listFriend.includes(friendId)) {
                    listFriend.push(friendId)
                } else {
                    return res.status(201).json({ msg: "Friend is exist", status: false })
                }

                findAndUpdateById(userId, { listFriend }).then((result) => {
                    if (result) {
                        return res.status(201).json({ msg: "Add friend success", status: true })
                    } else {
                        return res.status(201).json({ msg: "Add friend unsuccess", status: false })
                    }
                }).catch((error) => {
                    return res.status(400).json({ msg: error.message, status: false });
                })
            }).catch((error) => {
                return res.status(400).json({ msg: error.message, status: false });
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message, status: false });
        }
    }
}