let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoURL = "mongodb://localhost:27017/Kayak";
mongoose.connect(mongoURL);

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
    // totalRooms: {
    //     type: Number,
    //     required: true
    // },
    // availableRooms: {
    //     type: Number,
    //     required: true
    // },
    stars: {
        type: Number,
        required: true
    },
    images: {
        type: String
    },
    rooms: [{
        roomType: {
            type: String,
            required : true
        },
        roomCapacity: {
            type: Number,
            required : true
        },
        roomPrice: {
            type: Number,
            required : true
        },
        noOfRooms : {
            type: Number,
            required : true
        },
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

let Hotel = mongoose.model('hotel', hotelSchema);

module.exports = Hotel;
