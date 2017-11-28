import {actionTypes} from "./actionTypes";

export function login_success(email, message) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        email,
        message,
    }
}

export function signUpSuccess(username) {
    return {
        type: actionTypes.SIGN_UP,
        username
    }
}


export function filter_change(filterInd) {
    return {
        type: actionTypes.FILTER_PRICE_CHANGE,
        filterInd
    }
}

export function hotelList_Success(hotelList) {
    return {
        type: actionTypes.HOTEL_LISTING_SUCCESS,
        hotelList
    }
}
