let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoURL = "mongodb://localhost:27017/Kayak";
mongoose.connect(mongoURL);

let carSchema = new Schema({

    carId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
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
    carSpecification: {
        capacity: {
            type: Number,
            required: true
        }
    },
    images: {
        type: String,
        required: false
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
