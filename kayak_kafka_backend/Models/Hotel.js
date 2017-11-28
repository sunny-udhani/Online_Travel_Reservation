var mongoose = require('mongoose');
var Schema = mongoose.Schema;



let hotelSchema = new Schema({

    // hotelId: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    hostId: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    },
    availableRooms: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    images: {
        type: String,
        required: false
    },
    rooms: {
        roomType: {
            type: String,
            required: true
        },
        roomCapacity: {
            type: Number,
            required: true
        },
        roomPrice: {
            type: Number,
            required: true
        }
    },
    ratings: {
        userId: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reviews: {
            type: String,
            required: true
        }
    }

});

var Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
