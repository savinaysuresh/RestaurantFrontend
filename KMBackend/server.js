 const express = require('express');
const mongoose = require('mongoose');
const app = express();
const kitchenMasterRoutes = require('./routes/kitchenMaster');
require('dotenv').config();

app.use(express.json());
app.use('/api/kitchenMaster', kitchenMasterRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

