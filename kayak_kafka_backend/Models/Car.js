var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoURL = "mongodb://localhost:27017/Kayak";

//mongoose.connect(mongoURL);

var carSchema = new Schema({

    carId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Host'
    }
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

var Car = mongoose.model('Car', carSchema);

module.exports = Car;
