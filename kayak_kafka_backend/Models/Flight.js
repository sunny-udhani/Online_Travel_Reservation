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
        require: true
    },
    flightStartTime: {
        type: Date,
        require: true
    },
    flightEndTime: {
        type: Date,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    origin: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    flightImage: {
        type: Number,
        require: true
    },
    classes: {
        classType: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        noOfSeats: {
            type: Number,
            require: true
        }
    },
    ratings: {
        userId: {
            type: ObjectId,
            require: true,
            ref: 'User'
        },
        rating: {
            type: Number,
            require: true
        }
    },
    reviews: {
        userId: {
            type: ObjectId,
            require: true,
            ref: 'User'
        },
        reviews: {
            type: String,
            require: true
        }
    }

});

var Flight = mongoose.model('Host', flightSchema);

module.exports = Flight;