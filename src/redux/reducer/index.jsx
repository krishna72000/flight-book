import { combineReducers } from "redux";
import { userReducer } from "./userReducer"
import { menuReducer } from "./menuReducer"

const reducers = combineReducers({
    user: userReducer,
    menu: menuReducer
});

export default reducers;