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
            default: false
        },
        wednesday: {
            type: Boolean,
            default: false
        },
        thursday: {
            type: Boolean,
            default: false
        },
        friday: {
            type: Boolean,
            default: false
        }
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
    timeStamp: {
        type: Number,
        default: 0
    },
    closureNotes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('team', Team);