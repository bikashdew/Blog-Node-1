const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, 'Minimun  3 characters'],

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
        minlength: [10, 'Minimun  10 disit'],

    },

    subject: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, 'Minimun  3 characters'],

    },

    message: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, 'Minimun  3 characters'],

    },
    Date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Contact", contactSchema);