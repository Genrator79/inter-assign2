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

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// Make io available in routes
app.set('socketio', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Polling for external changes (Simulation of "Real-Time" from DB direct changes)
// In a real production app with Replica Set, we would use Dish.watch()
setInterval(async () => {
    try {
        // This is a naive implementation for demonstration. 
        // In production, checking all dishes every few seconds is inefficient.
        // We would check for `updatedAt` timestamp if we had one.
        // For this assignment, we just want to ensure the frontend stays in sync.
        // Since we emit events on API updates, this is mainly for "direct DB updates".
        const dishes = await Dish.find();
        io.emit('dishesSync', dishes);
    } catch (err) {
        console.error("Polling error", err);
    }
}, 5000); // Sync every 5 seconds

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
