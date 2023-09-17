const mongoose = require('mongoose');

const CandidatePostSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
    },
    partyName: {
        type: String,
    },
    slogan: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        // required: true
    },

    img: {
        type: String
    },

});

const CandidatePostData = mongoose.model('CandidatePost', CandidatePostSchema);

module.exports = CandidatePostData;
