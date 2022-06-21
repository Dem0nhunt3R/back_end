const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
    },

    age: {
        type: Number
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = model('user', UserSchema);