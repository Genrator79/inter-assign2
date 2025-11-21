const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/authMiddleware');

// Get all dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Toggle published status
router.put('/:id/toggle', authMiddleware, async (req, res) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.id });
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        dish.isPublished = !dish.isPublished;
        await dish.save();

        // Emit socket event (will be handled in server.js via app.set/get or global io if structured differently, 
        // but for simplicity we can just rely on the polling fallback or pass io here. 
        // To keep it clean, I'll emit from server.js or attach io to req.)
        const io = req.app.get('socketio');
        io.emit('dishUpdated', dish);

        res.json(dish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
