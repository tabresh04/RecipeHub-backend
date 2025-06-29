const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true}
);

module.exports = mongoose.model("user", userShema);