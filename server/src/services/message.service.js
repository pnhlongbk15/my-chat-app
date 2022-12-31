const mongoose = require("mongoose");
const { Message } = require("../models/message.model");
const { MessageRoom } = require("../models/messageRoom.model");

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
   },
   createMsgRoom: ({ room, from, message }) => {
      return new Promise((resolve, reject) => {
         MessageRoom.create({
            message: { text: message },
            sender: from,
            room: room
         }).then((result) => {
            resolve(result)
         }).catch((error) => {
            reject(error)
         })
      })
   },
   getAllMsgRoom: ({ from, room }) => {
      return new Promise((resolve, reject) => {
         MessageRoom.find({
            room: room
         }).populate('sender','avatarImage')
         .sort({ updateAt: 1 }).then((result) => {
            resolve(result)
         }).catch((error) => {
            reject(error)
         })
      })
   }
}