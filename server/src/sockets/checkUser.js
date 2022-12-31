
module.exports = function (socket, io) {
        socket.on("add-user", (username) => {
                onlineUsers.set(username, socket.id);
                console.log(`${username} connected`)
                socket.on("disconnect", () => {
                        console.log(`${username} disconnected`);
                        if (onlineUsers.delete(username)) {
                                socket.emit("response-status", 'offline')
                        }
                });
        })
}