const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Team = new mongoose.Schema({
    schoolCode: {
        type: String,
        required: true,
        default: ''
    },
    semester: {
        type: String,
        required: true,
        default: ''
    },
    year: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: Array,
        required: true,
        default: ''
    },
    startTime: {
        type: String,
        default: ''
    },
    endTime: {
        type: String,
        required: true,
        default: ''
    },
    volunteerPIs: {
        type: Array,
        required: true,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('team', Team);