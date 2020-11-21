const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});
//implementing CORS
//Access-control-Allow-Origin(Allowing Everyone to use our API)
app.use(cors());
app.options('*', cors());
const index = require('./routes/index');
app.use(index);

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

let interval;

io.on('connection', (socket) => {
    console.log('New client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
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