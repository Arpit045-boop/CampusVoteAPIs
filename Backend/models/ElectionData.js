const mongoose = require('mongoose');

const ElectionDataSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true
    },
    startdate: {
        type: String,
    },
    enddate: {
        type: String,
    },
    candidateId:{
        type: Array
    }

});

const ElectionData = mongoose.model('ElectionData', ElectionDataSchema);

module.exports = ElectionData;
