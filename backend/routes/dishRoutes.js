const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const authMiddleware = require('../middleware/authMiddleware');

// get all dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// toggle published status
router.put('/:id/toggle', authMiddleware, async (req, res) => {
    try {
        // find dish by dishId (not the Mongo _id)
        const dish = await Dish.findOne({ dishId: req.params.id });
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // flip the publish flag
        dish.isPublished = !dish.isPublished;
        await dish.save();

        // fire socket event so the UI updates immediately
        const io = req.app.get('socketio');
        io.emit('dishUpdated', dish);

        res.json(dish);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
