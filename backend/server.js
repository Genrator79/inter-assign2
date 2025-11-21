const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dishRoutes = require('./routes/dishRoutes');
const Dish = require('./models/Dish');

const app = express();
const server = http.createServer(app);

// socket.io setup
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    }
});

// middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// pass socket instance to routes so controllers can emit events
app.set('socketio', io);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);

// connect to Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// socket.io connection logs
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// simple polling to detect DB changes done outside the API
// (not ideal for production, but good for demo)
setInterval(async () => {
    try {
        // grabbing all dishes every few seconds and pushing to frontend
        // again, not efficient but works
        const dishes = await Dish.find();
        io.emit('dishesSync', dishes);
    } catch (err) {
        console.error("Polling error", err);
    }
}, 5000); // check every 5 seconds

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
