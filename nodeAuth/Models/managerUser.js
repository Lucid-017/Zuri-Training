const mongoose = require('mongoose');

const managerUserSchema = mongoose.Schema({
    // PROPERTIES OF A manager USER
    adminUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminUsers'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('managerUser', managerUserSchema);