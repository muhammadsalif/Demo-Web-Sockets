const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

//implementing CORS
//Access-control-Allow-Origin(Allowing Everyone to use our API)
app.use(cors());
const index = require('./routes/index');
app.use(index);

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*"
    },
});

let interval;

io.on('connection', (socket) => {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

const getApiAndEmit = (socket) => {
    const response = new Date();
    
    // Emitting a new message. Will be consumed by the client
    
    socket.emit('FromAPI', response);
};