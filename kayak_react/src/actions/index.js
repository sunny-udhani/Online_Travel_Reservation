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

export function logout_success() {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}

export function booking_success(booking_state) {
    return {
        type: actionTypes.BOOKING_SUCCESS,
        booking_state
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

export function setHostData_Success(hostData) {
    console.log(hostData);
    return {
        type: actionTypes.ADMIN_HOST_LISTING_SUCCESS,
        hostData
    }
}

export function addHostData_Success(hostData) {
    console.log(hostData);
    return {
        type: actionTypes.ADMIN_ADD_HOST_SUCCESS,
        hostData
    }
}


export function setUserData_Success(userData) {
    console.log(userData);
    return {
        type: actionTypes.ADMIN_USER_LISTING_SUCCESS,
        userData
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

export function flightEssentialsAdd(className, tripType, noOfPassengers, fromDate, toDate) {
    return {
        type: actionTypes.FLIGHT_ESSENTIALS_ADD,
        className, tripType, noOfPassengers, fromDate, toDate
    }
}

export function carEssentialsAdd(fromDate, toDate) {
    return {
        type: actionTypes.CAR_ESSENTIALS_ADD,
        fromDate, toDate
    }
}

export function carList_Success(carList) {
    return {
        type: actionTypes.CAR_LISTING_SUCCESS,
        carList,
    }
}

export function hotelEssentialsAdd(fromDate, toDate, noOfPeople) {
    return {
        type: actionTypes.HOTEL_ESSENTIALS_ADD,
        fromDate, toDate, noOfPeople,
    }
}

export function hotelListingView(id, roomType) {
    return {
        type: actionTypes.HOTEL_LISTING_VIEW,
        id, roomType
    }
}

export function flightListingView(id) {
    return {
        type: actionTypes.FLIGHT_LISTING_VIEW,
        id
    }
}

export function carListingView(id) {
    return {
        type: actionTypes.CAR_LISTING_VIEW,
        id
    }
}

export function toggleLoginModal(togglInd) {
    return {
        type: actionTypes.TOGGLE_LOGIN_MODAL,
        togglInd
    }
}

export function setHotelBookingsData_Success(hotelBookingData){
    console.log(hotelBookingData);
    return {
        type: actionTypes.ADMIN_HOTELBOOKING_LISTING_SUCCESS,
        hotelBookingData
    }
}

export function setCarBookingData_Success(carBookingData){
    console.log(carBookingData);
    return {
        type: actionTypes.ADMIN_CARBOOKING_LISTING_SUCCESS,
        carBookingData
    }
}

export function addFlightBookingData_Success(flightBookingData){
    console.log(flightBookingData);
    return {
        type: actionTypes.ADMIN_FLIGHTBOOKING_LISTING_SUCCESS,
        flightBookingData
    }
}
