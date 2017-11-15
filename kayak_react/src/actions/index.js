import {actionTypes} from "./actionTypes";

export function signIn(userDet) {
    return {
        type: actionTypes.SIGN_IN,
        userDet
    }
}

export function signUp(userDet) {
    return {
        type: actionTypes.SIGN_UP,
        userDet
    }
}
