import {actionTypes} from "../actions/actionTypes";

const initial_state = {
    email: "",
    isLoggedIn: false,
    message: "",
    flightData:[],
    hotelData:[],
    carData:[]
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

const signUp = (state , action) => {
    console.log("In reducer - signUp");
    console.log("Username is : " + action.username);
    return {
        ...state,
        username: action.username
    }
};


const hotelList_Success = (state, action) => {
    console.log("hotelList");
    return {
        ...state,
        hotelList: action.hotelList
    }
};

const filter_change = (state, action) => {
    console.log("hotelList");
    return {
        ...state,
        filterInd: action.filterInd
    }
};

const setFlightData = (state , action) => {
    console.log(state);
    console.log(action);
    return{
        ...state,
        flightData : action.flightdata
    }
};

const addFlightData = ((state , action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.flightData.push(action.flightData);
    console.log("After Adding");
    console.log(state);
    return{
        ...state,
        [action.flightData] : state.flightData
    }
});

const setHotelData = ((state, action) => {
    console.log(state);
    console.log(action);
    return{
        ...state,
        hotelData : action.hotelData
    }
});


const addHotelData = ((state , action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.hotelData.push(action.hotelData);
    console.log("After Adding");
    console.log(state);
    return{
        ...state,
        [action.hotelData] : state.hotelData
    }
});

const setCarData = ((state, action) => {
    console.log(state);
    console.log(action);
    return{
        ...state,
        carData : action.carData
    }
});


const addCarData = ((state , action) => {
    console.log("Before Adding");
    console.log(state);
    console.log(action);
    state.carData.push(action.carData);
    console.log("After Adding");
    console.log(state);
    return{
        ...state,
        [action.carData] : state.carData
    }
});

const handleActions = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS :
            return signIn(state, action);
        case actionTypes.SIGN_UP :
            return signUp(state, action);
        case actionTypes.HOTEL_LISTING_SUCCESS :
            return hotelList_Success(state, action);
        case actionTypes.FILTER_PRICE_CHANGE :
            return filter_change(state, action);
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
        default:
            return state;
    }
};

export default handleActions;