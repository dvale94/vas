const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchoolPersonnelSchema = new mongoose.Schema({
    schoolID: {
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
});

module.exports = mongoose.model('schoolPersonnel', SchoolPersonnelSchema);