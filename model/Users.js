const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Users", registerSchema);