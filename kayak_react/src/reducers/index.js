import {handleAddtoCart, handleRemoveFromCart} from "../actions/index";
import {actionTypes} from "../actions/actionTypes";

const initial_state = {
    email: "",
    isLoggedIn: false,
    message: "",
    toggleInd: false,
    flightData: [],
    hotelData: [],
    carData: [],
    hostData: [],
    userData: [],
    hotelBookingData: [],
    carBookingData : [],
    flightBookingData : [],
    loginModaltoggleInd: false,
};

const signIn = (state, action) => {
    console.log("signIn");
    return {
        ...state,
        email: action.email,
        message: action.message,
        isLoggedIn: true
    }
};

const logout = (state, action) => {
    console.log("logout");
    return {
        ...state,
        email: "",
        message: "logged out successfully",
        isLoggedIn: false
    }
};

const signUp = (state, action) => {
    console.log("In reducer - signUp");
    console.log("Username is : " + action.username);
    return {
        ...state,
        username: action.username,
        isLoggedIn: true,
    }
};

const booking_success = (state, action) => {
    console.log("booking_state is : " )
    console.log(action.booking_state);
    return {
        ...state,
        booking_state: action.booking_state
    }
};

const hotelList_Success = (state, action) => {
    console.log("hotelList");
    return {
        ...state,
        hotelList: action.hotelList
    }
};

const flightList_Success = (state, action) => {
    console.log("flightlist");
    return {
        ...state,
        flightList: action.flightList
    }
};

const flightEssentialsAdd = (state, action) => {
    console.log("flight essentials add");
    return {
        ...state,
        flightClass: action.className,
        flightTripType: action.tripType,
        flightNoOfPassengers: action.noOfPassengers,
        flightFromDate: action.fromDate,
        flightToDate: action.toDate,
    }
};

const filter_change = (state, action) => {
    return {
        ...state,
        filterInd: action.filterInd
    }
};

const toggle_change = (state, action) => {
    return {
        ...state,
        toggleInd: action.toggleInd
    }
};

const setFlightData = (state, action) => {
    console.log(state);
    console.log(action);
    return {
        ...state,
        flightData: action.flightdata
    }
};

const addFlightData = ((state, action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.flightData.push(action.flightData);
    console.log("After Adding");
    console.log(state);
    return {
        ...state,
        [action.flightData]: state.flightData
    }
});

const setHotelData = ((state, action) => {
    console.log(state);
    console.log(action);
    return {
        ...state,
        hotelData: action.hotelData
    }
});

const addHotelData = ((state, action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.hotelData.push(action.hotelData);
    console.log("After Adding");
    console.log(state);
    return {
        ...state,
        [action.hotelData]: state.hotelData
    }
});

const setCarData = ((state, action) => {
    console.log(state);
    console.log(action);
    return {
        ...state,
        carData: action.carData
    }
});

const addCarData = ((state, action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.carData.push(action.carData);
    console.log("After Adding");
    console.log(state);
    return {
        ...state,
        [action.carData]: state.carData
    }
});

const setHostData = ((state, action) => {
    console.log(state);
    console.log(action);
    return {
        ...state,
        hostData: action.hostData
    }
});

const addHostData = ((state, action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.hostData.push(action.hostData);
    console.log("After Adding");
    console.log(state);
    return {
        ...state,
        [action.hostData]: state.hostData
    }
});

const setUserData = ((state, action) => {
    console.log(state);
    console.log(action);
    return {
        ...state,
        userData: action.userData
    }
});

const carList_Success = (state, action) => {
    console.log("carlist");
    return {
        ...state,
        carList: action.carList
    }
};

const carEssentialsAdd = (state, action) => {
    console.log("car essentials add");
    return {
        ...state,
        carFromDate: action.fromDate,
        carToDate: action.toDate,
    }
};

const hotelEssentialsAdd = (state, action) => {
    console.log("hotel essentials add");
    return {
        ...state,
        hotelFromDate: action.fromDate,
        hotelToDate: action.toDate,
        hotelNoOfPeople: action.noOfPeople,
    }
};

const hotelListingView = (state, action) => {
    return {
        ...state,
        hotelId: action.id,
        hotelRoomType: action.roomType,
    }
};

const flightListingView = (state, action) => {
    return {
        ...state,
        flightId: action.id,
    }
};

const carListingView = (state, action) => {
    return {
        ...state,
        carId: action.id,
    }
};

const toggleLoginModal = (state, action) => {
    return {
        ...state,
        loginModaltoggleInd: action.togglInd
    }
};

const setHotelBookingData = (state, action) => {
    return {
        ...state,
        hotelBookingData: action.hotelBookingData
    }
};

const setCarBookingData = (state, action) => {
    return {
        ...state,
        carBookingData: action.carBookingData
    }
};

const setFlightBookingData = (state, action) => {
    return {
        ...state,
        flightBookingData: action.flightBookingData
    }
};

const handleActions = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS :
            return signIn(state, action);
        case actionTypes.LOGOUT_SUCCESS :
            return logout(state, action);
        case actionTypes.SIGN_UP :
            return signUp(state, action);
        case actionTypes.HOTEL_LISTING_SUCCESS :
            return hotelList_Success(state, action);
        case actionTypes.FILTER_PRICE_CHANGE :
            return filter_change(state, action);
        case actionTypes.TOGGLE_BOOKING_TYPE :
            return toggle_change(state, action);
        case actionTypes.FLIGHT_LISTING_SUCCESS :
            return flightList_Success(state, action);
        case actionTypes.FLIGHT_ESSENTIALS_ADD :
            return flightEssentialsAdd(state, action);
        case actionTypes.ADMIN_FLIGHT_LISTING_SUCCESS :
            return setFlightData(state, action);
        case actionTypes.ADMIN_ADD_FLIGHT_SUCCESS:
            return addFlightData(state, action);
        case actionTypes.ADMIN_HOTEL_LISTING_SUCCESS :
            return setHotelData(state, action);
        case actionTypes.ADMIN_ADD_HOTEL_SUCCESS:
            return addHotelData(state, action);
        case actionTypes.ADMIN_CAR_LISTING_SUCCESS :
            return setCarData(state, action);
        case actionTypes.ADMIN_ADD_CAR_SUCCESS:
            return addCarData(state, action);
        case actionTypes.ADMIN_HOST_LISTING_SUCCESS :
            return setHostData(state, action);
        case actionTypes.ADMIN_ADD_HOST_SUCCESS:
            return addHostData(state, action);
        case actionTypes.ADMIN_USER_LISTING_SUCCESS:
            return setUserData(state, action);
        case actionTypes.CAR_LISTING_SUCCESS:
            return carList_Success(state, action);
        case actionTypes.CAR_ESSENTIALS_ADD:
            return carEssentialsAdd(state, action);
        case actionTypes.HOTEL_ESSENTIALS_ADD:
            return hotelEssentialsAdd(state, action);
        case actionTypes.HOTEL_LISTING_VIEW:
            return hotelListingView(state, action);
        case actionTypes.FLIGHT_LISTING_VIEW:
            return flightListingView(state, action);
        case actionTypes.CAR_LISTING_VIEW:
            return carListingView(state, action);
        case actionTypes.TOGGLE_LOGIN_MODAL:
            return toggleLoginModal(state, action);
        case actionTypes.BOOKING_SUCCESS:
            return booking_success(state, action);
        case actionTypes.ADMIN_HOTELBOOKING_LISTING_SUCCESS:
            return setHotelBookingData(state, action);
        case actionTypes.ADMIN_CARBOOKING_LISTING_SUCCESS:
            return setCarBookingData(state, action);
        case actionTypes.ADMIN_FLIGHTBOOKING_LISTING_SUCCESS:
            return setFlightBookingData(state, action);
        default:
            return state;
    }
};

export default handleActions;