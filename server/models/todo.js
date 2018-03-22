const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    }, 
    completed_at: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};