import {actionEnum} from "../const/actionEnum";

export const setDeviceType = deviceType => {
    return {
        type: actionEnum.SET_DEVICE_TYPE,
        payload: deviceType
    }
};