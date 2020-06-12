import {combineReducers} from "redux";
import {user} from "./userReducer";
import {device} from "./deviceReducer";

export const rootReducer = combineReducers({
    user: user,
    device: device
});