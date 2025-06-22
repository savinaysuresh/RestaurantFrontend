const mongoose = require('mongoose');

const waiterSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Waiter', waiterSchema);
