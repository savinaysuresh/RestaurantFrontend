 const mongoose = require('mongoose');

const kitchenMasterSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('KitchenMaster', kitchenMasterSchema);

