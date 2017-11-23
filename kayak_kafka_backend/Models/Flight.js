var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Kayak";

//mongoose.connect(mongoURL);

var flightSchema = new Schema({

    flightId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hostId: {
        type: ObjectId,
        required: true,
        ref:'Host'
    },
    flightOperator: {
        type: String,
        required: true
    },
    tripType: {
        type: String,
        required: true
    },
    flightStartTime: {
        type: Date,
        required: true
    },
    flightEndTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    flightImage: {
        type: Number,
        required: true
    },
    classes: {
        classType: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        noOfSeats: {
            type: Number,
            required: true
        }
    },
    ratings: {
        userId: {
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true
        }
    },
    reviews: {
        userId: {
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        reviews: {
            type: String,
            required: true
        }
    }

});

var Flight = mongoose.model('Host', flightSchema);

module.exports = Flight;
