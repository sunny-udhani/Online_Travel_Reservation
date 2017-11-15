import {handleAddtoCart, handleRemoveFromCart} from "../actions/index";
import {actionTypes} from "../actions/actionTypes";

const initial_state = {
    user: {
        userId: "",
        pass: ""
    },
    isLoggedIn: false,
    message: ""
};

const signIn = (state = {initial_state}, action) => {
    console.log("signIn");
};

const signUp = (state = {initial_state}, action) => {
    console.log("signUp");

};

const handleActions = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.SIGN_IN :
            return signIn(state, action);
        case actionTypes.SIGN_UP :
            return signUp(state, action);
        default:
            return state;
    }
};

export default handleActions;