const mongoose = require("mongoose");
const { User } = require("../models/user.model");

module.exports = {
   findUser: (info, mode = 'one') => {
      var processSearch;
      switch (mode) {
         case 'one':
            switch (Object.keys(info)[0]) {
               case "email":
               case "username":
                  processSearch = User.findOne(info)
                  break;
               default:
                  processSearch = User.findOne({ _id: mongoose.Types.ObjectId(info.id) })
                     .select([
                        "email",
                        "username",
                        "avatarImage",
                        "listFriend",
                        "_id",
                     ])
            }
            break;
         case 'many':
            switch (Object.keys(info)[0]) {

               default:
                  processSearch = User.findOne({ _id: mongoose.Types.ObjectId(info.id) })
                     .populate('listFriend', 'email username avatarImage isAvatarImageSet')
               // processSearch = User.find({ _id: { $ne: mongoose.Types.ObjectId(info.id) } })
               //    .select([
               //       "email",
               //       "username",
               //       "avatarImage",
               //       "_id",
               //    ])
            }
            break;
      }

      return new Promise((resolve, reject) => {
         processSearch.then((result) => {
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
   },
}