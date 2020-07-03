import {actionEnum} from "../const/actionEnum";
import {deviceEnum} from "../const/deviceEnum";

const initialState = {
    deviceType: deviceEnum.DESKTOP
};

export const device = (state = initialState, action) => {
    switch (action.type) {
        case actionEnum.SET_DEVICE_TYPE:
            return {...state, deviceType: action.payload};
        default:
            return state;
    }
};