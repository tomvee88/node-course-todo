const mongoose = require('mongoose');

var User = mongoose.model('Users', {
    email: {
        type: 'string',
        minlength: 1,
        require: true,
        trim: true
    }
});

module.exports = {User};