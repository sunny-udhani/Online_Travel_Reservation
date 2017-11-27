import {handleAddtoCart, handleRemoveFromCart} from "../actions/index";
import {actionTypes} from "../actions/actionTypes";

const initial_state = {
    email: "",
    isLoggedIn: false,
    message: ""
};

const signIn = (state , action) => {
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

const handleActions = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS :
            return signIn(state, action);
        case actionTypes.SIGN_UP :
            return signUp(state, action);
        default:
            return state;
    }
};

export default handleActions;