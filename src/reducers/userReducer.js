import {actionEnum} from "../const/actionEnum";

const initialState = {
    userMessage: "",
    token: "",
    authorized: false,
    modifying: true,
    activeUser: true
};

export function user(state = initialState, action) {
    switch (action.type) {
        case actionEnum.IS_AUTHORIZED: {
            return Object.assign({}, state, {authorized: action.payload});
        }
        case actionEnum.SET_USER_MESSAGE: {
            return Object.assign({}, state, {userMessage: action.payload});
        }
        case actionEnum.SET_USERNAME: {
            return Object.assign({}, state, {username: action.payload});
        }
        case actionEnum.SET_PASSWORD: {
            return Object.assign({}, state, {password: action.payload});
        }
        case actionEnum.IS_MODIFYING: {
            return Object.assign({}, state, {modifying: action.payload});
        }
        case actionEnum.SET_TOKEN: {
            return Object.assign({}, state, {token: action.payload});
        }
        case actionEnum.SET_FIRST_NAME: {
            return Object.assign({}, state, {firstName: action.payload});
        }
        case actionEnum.SET_LAST_NAME: {
            return Object.assign({}, state, {lastName: action.payload});
        }
        case actionEnum.IS_USER_ACTIVE: {
            return Object.assign({}, state, {activeUser: action.payload});
        }
        case actionEnum.SET_USER_ID: {
            return Object.assign({}, state, {id: action.payload});
        }
        default:
            return state;
    }
}