const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

module.exports = {
    db
}