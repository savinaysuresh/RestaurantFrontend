
const express = require('express');
const router = express.Router();
const Waiter = require('../models/Waiter');

router.get('/:username', async (req, res) => {
    try {
        const waiter = await Waiter.findOne({ username: req.params.username });
        if (!waiter) return res.status(404).json({ message: 'Waiter not found' });
        res.json(waiter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { owner, username, password } = req.body;
        const newWaiter = new Waiter({ owner, username, password });
        await newWaiter.save();
        res.status(201).json(newWaiter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:username', async (req, res) => {
    try {
        const updates = req.body;
        const updated = await Waiter.findOneAndUpdate({ username: req.params.username }, updates, { new: true });
        if (!updated) return res.status(404).json({ message: 'Waiter not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:username', async (req, res) => {
    try {
        const deleted = await Waiter.findOneAndDelete({ username: req.params.username });
        if (!deleted) return res.status(404).json({ message: 'Waiter not found' });
        res.json({ message: 'Waiter deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
