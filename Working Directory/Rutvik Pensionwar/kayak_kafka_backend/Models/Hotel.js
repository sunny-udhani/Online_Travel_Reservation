var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Kayak";

//mongoose.connect(mongoURL);

var hotelSchema = new Schema({

    hotelId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Host'
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelAddress: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zipCode: {
        type: Number,
        require: true
    },
    totalRooms: {
        type: Number,
        require: true
    },
    availableRooms: {
        type: Number,
        require: true
    },
    stars: {
        type: Number,
        require: true
    },
    images: {
        type: String,
        require: false
    },
    rooms: {
        roomType: {
            type: String,
            require: true
        },
        roomCapacity: {
            type: Number,
            require: true
        },
        roomPrice: {
            type: Number,
            require: true
        }
    },
    ratings: {
        userId: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        reviews: {
            type: String,
            require: true
        }
    }

});

var Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;