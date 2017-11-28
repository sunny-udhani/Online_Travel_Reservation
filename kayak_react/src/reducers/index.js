import {handleAddtoCart, handleRemoveFromCart} from "../actions/index";
import {actionTypes} from "../actions/actionTypes";

const initial_state = {
    email: "",
    isLoggedIn: false,
    message: ""
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
        default:
            return state;
    }
};

export default handleActions;