const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('admin', AdminSchema);