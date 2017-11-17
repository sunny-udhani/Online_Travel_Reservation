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
        require: true
    },
    carType: {
        type: String,
        require: true
    },
    carSpecification: {
        capacity: {
            type: Number,
            require: true
        }
    },
    images: {
        type: String,
        require: false
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
    price: {
        type: Number,
        require: true
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

var Car = mongoose.model('Car', carSchema);

module.exports = Car;