const mongoose = require('mongoose')

const VolunteerSchema = new mongoose.Schema({
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
    pantherID: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        default: ''
    },
    carAvailable: {
        type: Boolean,
        default: false
    },
    volunteerStatus: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    MDCPS_ID: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('volunteer', VolunteerSchema);