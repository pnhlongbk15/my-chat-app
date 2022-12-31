const checkUser = require("./checkUser")
const privateChat = require("./privateChat")
const roomChat = require("./roomChat")

module.exports.handleSocket = (io) => {
    global.onlineUsers = new Map();
    global.onlineRooms = new Map();

    io.on("connection", (socket) => {
        checkUser(socket, io)

        privateChat(socket, io)
        roomChat(socket, io)
        // console.log('onlineUser-external', onlineUsers)
        // console.log('onlineRooms', onlineRooms)
    })
}
// sự kiện không có như function, sự kiện chỉ khởi tạo một lần khi startup server rồi bắt sự kiện khi xảy ra