const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require('socket.io')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Server start on port ${process.env.PORT || 5000}`)
})

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL,
        {
                useNewUrlParser: true,
                useUnifiedTopology: true
        },
        (err) => {
                if (err) {
                        console.log(err.message)
                } else {
                        console.log('Connect database successfull')
                }
        }
)

const io = socket(server, {
        cors: {
                origin: "http://localhost:3000",
                credentials: true,
        }
})
global.onlineUsers = new Map();

io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
                onlineUsers.set(userId, socket.id);
        })

        socket.on("send-msg", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                console.log('external',sendUserSocket)

                if (sendUserSocket) {
                        console.log('internal',sendUserSocket)
                        socket.to(sendUserSocket).emit("msg-recieve", data.messages)
                }
        })
})

app.use("/api", require("./src/routes"))

