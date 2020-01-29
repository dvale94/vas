const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SchoolPersonnelSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        default: ''
    },
    schoolID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    grade: { //Elem, K-8, etc.
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('schoolPersonnel', SchoolPersonnelSchema);