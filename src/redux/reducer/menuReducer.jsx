import { ActionTypes } from "../contants/action-types"

const initialState = {
    isHome: true,
    title: ""
}

export const menuReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.MENU:
            return { ...state, menu: payload };
        default:
            return state;
    }
}
