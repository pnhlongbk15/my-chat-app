const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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

app.use("/api", require("./src/routes"))