
module.exports = function (socket, io) {
    socket.on("check-status", (username) => {
        console.log('check-status')
        if (!onlineUsers.get(username)) {
            var status = false;
        } else {
            var status = true;
        }
        socket.emit("response-status", status ? 'online' : 'offline')
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.messages)
        }
    })
}