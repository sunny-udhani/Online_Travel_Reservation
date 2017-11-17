import {actionTypes} from "./actionTypes";

export function login_success(email, message) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        email,
        message,
    }
}

export function signUp(userDet) {
    return {
        type: actionTypes.SIGN_UP,
        userDet
    }
}
