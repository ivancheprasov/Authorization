import {actionEnum} from "../const/actionEnum";

export function setUsername(username) {
    return{
        type: actionEnum.SET_USERNAME,
        payload: username
    }
}
export function setPassword(password) {
    return{
        type: actionEnum.SET_PASSWORD,
        payload: password
    }
}
export function isAuthorized(flag) {
    return{
        type: actionEnum.IS_AUTHORIZED,
        payload: flag
    }
}
export function setUserMessage(message) {
    return{
        type: actionEnum.SET_USER_MESSAGE,
        payload: message
    }
}
export function isModifying(flag) {
    return{
        type: actionEnum.IS_MODIFYING,
        payload: flag
    }
}
export function setToken(token) {
    return{
        type: actionEnum.SET_TOKEN,
        payload: token
    }
}
export function setFirstName(firstName) {
    return{
        type: actionEnum.SET_FIRST_NAME,
        payload: firstName
    }
}
export function setLastName(lastName) {
    return{
        type: actionEnum.SET_LAST_NAME,
        payload: lastName
    }
}
export function isUserActive(flag) {
    return{
        type: actionEnum.IS_USER_ACTIVE,
        payload: flag
    }
}
export function setUserId(id){
    return{
        type: actionEnum.SET_USER_ID,
        payload: id
    }
}