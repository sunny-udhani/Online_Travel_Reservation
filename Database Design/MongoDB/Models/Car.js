let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let carSchema = new Schema({

    hostId: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    images: {
        type: String
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
    price: {
        type: Number,
        required: true
    },
    ratings: {
        userId: {
            type: Schema.Types.ObjectId,
        },
        rating: {
            type: Number,
        }
    },
    reviews: {
        userId: {
            type: Schema.Types.ObjectId,
        },
        reviews: {
            type: String
        }
    }

});

let Car = mongoose.model('car', carSchema);

module.exports = Car;
