
module.exports = function (socket, io) {
    socket.on("join_room", (room, user) => {
        console.log('join_room')
        if (!onlineRooms.get(room)) {
            onlineRooms.set(room, [])
        }
        var memberRoom = onlineRooms.get(room)
        if (!memberRoom.includes(user)) {
            memberRoom.push(user)
            onlineRooms.set(room, memberRoom)
            socket.join(room)
            socket.to(room).emit("server_message", {
                message: `${user} just joined ${room}.`
            })
        }
        socket.on("disconnect", () => {
            if (memberRoom.includes(user)) {
                const index = memberRoom.findIndex(e => e === user);
                memberRoom.splice(index, 1)
                onlineRooms.set(room, memberRoom)
            }
        })
    })

    socket.on("send_msg_room", (data) => {
        socket.to(data.room).emit("msg_room_recieve", data.message, data.avatarImage)
    })
}