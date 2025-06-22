 const express = require('express');
const router = express.Router();
const KitchenMaster = require('../models/KitchenMaster');

router.get('/:username', async (req, res) => {
    try {
        const km = await KitchenMaster.findOne({ username: req.params.username });
        if (!km) return res.status(404).json({ message: "Not found" });
        res.json(km);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { owner, username, password } = req.body;
        const km = new KitchenMaster({ owner, username, password });
        await km.save();
        res.status(201).json(km);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:username', async (req, res) => {
    try {
        const updates = req.body;
        const km = await KitchenMaster.findOneAndUpdate({ username: req.params.username }, updates, { new: true });
        if (!km) return res.status(404).json({ message: "Not found" });
        res.json(km);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:username', async (req, res) => {
    try {
        const km = await KitchenMaster.findOneAndDelete({ username: req.params.username });
        if (!km) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;