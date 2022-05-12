import { ActionTypes } from "../contants/action-types"

export const setLogin = (user) => {
    console.log("loginset");
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
};

export const setLogout = () => {
    window.localStorage.removeItem("userModel");
    return {
        type: ActionTypes.LOGOUT,
    }
};
