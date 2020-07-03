import {actionEnum} from "../const/actionEnum";

export const setUsername = username => {
    return {
        type: actionEnum.SET_USERNAME,
        payload: username
    }
};
export const setPassword = password => {
    return {
        type: actionEnum.SET_PASSWORD,
        payload: password
    }
};
export const isAuthorized = flag => {
    return {
        type: actionEnum.IS_AUTHORIZED,
        payload: flag
    }
};
export const setUserMessage = message => {
    return {
        type: actionEnum.SET_USER_MESSAGE,
        payload: message
    }
};
export const isModifying = flag => {
    return {
        type: actionEnum.IS_MODIFYING,
        payload: flag
    }
};
export const setToken = token => {
    return {
        type: actionEnum.SET_TOKEN,
        payload: token
    }
};
export const setFirstName = firstName => {
    return {
        type: actionEnum.SET_FIRST_NAME,
        payload: firstName
    }
};
export const setLastName = lastName => {
    return {
        type: actionEnum.SET_LAST_NAME,
        payload: lastName
    }
};
export const isUserActive = flag => {
    return {
        type: actionEnum.IS_USER_ACTIVE,
        payload: flag
    }
};
export const setUserId = id => {
    return {
        type: actionEnum.SET_USER_ID,
        payload: id
    }
};