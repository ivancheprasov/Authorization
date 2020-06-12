import {actionEnum} from "../const/actionEnum";
import {deviceEnum} from "../const/deviceEnum";

const initialState = {
    deviceType: deviceEnum.DESKTOP
};

export function device(state = initialState, action) {
    switch (action.type) {
        case actionEnum.SET_DEVICE_TYPE:
            return Object.assign({}, state, {deviceType: action.payload});
        default:
            return state;
    }
}