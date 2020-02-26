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
        monday: {
            type: Boolean,
            required: true,
            default: false
        },
        tuesday: {
            type: Boolean,
            required: true,
            default: false
        },
        wednesday: {
            type: Boolean,
            required: true,
            default: false
        },
        thursday: {
            type: Boolean,
            required: true,
            default: false
        },
        friday: {
            type: Boolean,
            required: true,
            default: false
        },

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