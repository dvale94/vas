const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const School = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
        default: ''
    },
    schoolCode: {
        type: String,
        required: true
    },
    level: { //Elem, K-8, etc.
        type: String,
        required: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        required: true,
        default: ''
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    state: {
        type: String,
        required: true,
        default: ''
    },
    zipCode: {
        type: String,
        required: true,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('school', School);