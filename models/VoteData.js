const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    candidate : {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    voterName: {
        type: String,
        required: true
    }

});

VoteSchema.index({ position: 1, voterName: 1 }, { unique: true });

const VoteData = mongoose.model('VoteData', VoteSchema);

module.exports = VoteData;