import {actionEnum} from "../const/actionEnum";

export function setDeviceType(deviceType) {
    return{
        type: actionEnum.SET_DEVICE_TYPE,
        payload: deviceType
    }
}