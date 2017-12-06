let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userTraceTreeSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    page: {
        type: [String],
        required: true
    },
    timePerPage: {
        type: [Number],
        required: true
    },

});

let UserTraceTree = mongoose.model('userTraceTree', userTraceTreeSchema);

module.exports = UserTraceTree;
