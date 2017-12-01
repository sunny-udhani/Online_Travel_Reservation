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

export function setFlightData_Success(flightdata) {
    return {
        type: actionTypes.ADMIN_FLIGHT_LISTING_SUCCESS,
        flightdata
    }
}

export function addFlightData_Success(flightData) {
    console.log(flightData);
    return {
        type: actionTypes.ADMIN_ADD_FLIGHT_SUCCESS,
        flightData
    }
}

export function setHotelData_Success(hotelData) {
    console.log(hotelData);
    return {
        type: actionTypes.ADMIN_HOTEL_LISTING_SUCCESS,
        hotelData
    }
}

export function addHotelData_Success(hotelData) {
    console.log(hotelData);
    return {
        type: actionTypes.ADMIN_ADD_HOTEL_SUCCESS,
        hotelData
    }
}

export function setCarData_Success(carData) {
    console.log(carData);
    return {
        type: actionTypes.ADMIN_CAR_LISTING_SUCCESS,
        carData
    }
}

export function addCarData_Success(carData) {
    console.log(carData);
    return {
        type: actionTypes.ADMIN_ADD_CAR_SUCCESS,
        carData
    }
}

export function flightList_Success(flightList) {
    return {
        type: actionTypes.FLIGHT_LISTING_SUCCESS,
        flightList
    }
}

export function toggleBookingType(toggleInd) {
    return {
        type: actionTypes.TOGGLE_BOOKING_TYPE,
        toggleInd
    }
}

export function flightEssentialsAdd(className,tripType,noOfPassengers) {
    return {
        type: actionTypes.FLIGHT_ESSENTIALS_ADD,
        className,tripType,noOfPassengers
    }
}



