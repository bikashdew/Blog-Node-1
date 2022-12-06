const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new mongoose.Schema({

    quistion: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, 'Minimun  2 characters'],

    },
    topic: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, 'Minimun  2 characters'],
        // maxlength: [12, 'Minimun  12 characters']
    },

    answer: {
        type: String,
        required: true,
        minlength: [2, 'Minimun  2 characters'],

    },

    User: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },

    Date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model("Blog", blogSchema);