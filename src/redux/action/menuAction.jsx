import { ActionTypes } from "../contants/action-types"

export const setMenu = (menu) => {
    return {
        type: ActionTypes.LOGIN,
        payload: menu
    }
};
