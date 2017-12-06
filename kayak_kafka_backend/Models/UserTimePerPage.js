let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userTimePerPageSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    UserHome: {
        type: Number,
        required: false
    },
    SignIn: {
        type: Number,
        required: false
    },
    SignUp: {
        type: Number,
        required: false
    },
    HotelListing: {
        type: Number,
        required: false
    },
    CarListing: {
        type: Number,
        required: false
    },
    FlightListing: {
        type: Number,
        required: false
    },
    UserProfile: {
        type: Number,
        required: false
    },
    UserPaymentPage: {
        type: Number,
        required: false
    },
    SuccesfulPayment: {
        type: Number,
        required: false
    },
});

let UserTimePerPage = mongoose.model('userTimePerPage', userTimePerPageSchema);

module.exports = UserTimePerPage;
