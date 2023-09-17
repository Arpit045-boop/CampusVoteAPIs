const mongoose = require('mongoose');

const CandidateDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    electionId: {
        type: String,
        required: true
    },
    party: {
        type: String,
        // required: true
    },
    nomineeId: {
        type: String,
        // required: true,
        unique:true 
    }

});

const CandidateData = mongoose.model('CandidateData', CandidateDataSchema);

module.exports = CandidateData;
