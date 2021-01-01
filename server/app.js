const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
var http = require("http");

const app = express();

const index = require('./routes/index');

const port = process.env.PORT || 5000;

app.use(cors());

app.use(index);

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*"
    },
});

io.on('connection', (socket) => {
    console.log("User is connected with id :", socket.id)
    setInterval(() => {
        socket.emit("NOTIFICATION", "Some Data")
    }, 1000);

    socket.on("disconnect", (reason) => {
        console.log("User is disconnected ", reason)
    })
});