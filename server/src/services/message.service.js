const mongoose = require("mongoose");
const { Message } = require("../models/message.model");

module.exports = {
   createMsg: ({ from, to, message }) => {
      return new Promise((resolve, reject) => {
         Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
         }).then((result) => {
            resolve(result)
         }).catch((error) => {
            reject(error)
         })
      })
   },
   getAllMessage: ({ from, to }) => {
      return new Promise((resolve, reject) => {
         Message.find({
            users: {
               $all: [from, to]
            }
         }).sort({ updateAt: 1 }).then((result) => {
            resolve(result)
         }).catch((error) => {
            reject(error)
         })
      })
   }
}