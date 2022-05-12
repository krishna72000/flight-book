import { ActionTypes } from "../contants/action-types"
const initialState = {
    id: null,
    info: {},
    isLogin: false,
    token: ""
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.LOGIN:
            return { ...state, ...payload };
        default:
            return state;
    }
}
