let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let flightSchema = new Schema({

    flightNo: {
        type: String,
        required: true
    },
    hostId: {
        type: String,
        required: true,
    },
    flightOperator: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
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
        required: false
    },
    classes: [{
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
    }],
    ratings: {
        userId: {
            type: Schema.Types.ObjectId
        },
        rating: {
            type: Number
        }
    },
    reviews: {
        userId: {
            type: Schema.Types.ObjectId
        },
        reviews: {
            type: String
        }
    }

});

let Flight = mongoose.model('flight', flightSchema);

module.exports = Flight;
