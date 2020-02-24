const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchoolPersonnelSchema = new mongoose.Schema({
    schoolCode: {
        type: String,
        required: true
    },
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
        default: ''
    },
    
    phoneNumber: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('schoolPersonnel', SchoolPersonnelSchema);