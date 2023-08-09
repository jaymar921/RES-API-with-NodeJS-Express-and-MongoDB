const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);