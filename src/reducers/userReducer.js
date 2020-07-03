import {actionEnum} from "../const/actionEnum";

const initialState = {
    userMessage: "",
    token: "",
    authorized: false,
    modifying: true,
    activeUser: true
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case actionEnum.IS_AUTHORIZED: {
            return {...state, authorized: action.payload};
        }
        case actionEnum.SET_USER_MESSAGE: {
            return {...state, userMessage: action.payload};
        }
        case actionEnum.SET_USERNAME: {
            return {...state, username: action.payload};
        }
        case actionEnum.SET_PASSWORD: {
            return {...state, password: action.payload};
        }
        case actionEnum.IS_MODIFYING: {
            return {...state, modifying: action.payload};
        }
        case actionEnum.SET_TOKEN: {
            return {...state, token: action.payload};
        }
        case actionEnum.SET_FIRST_NAME: {
            return {...state, firstName: action.payload};
        }
        case actionEnum.SET_LAST_NAME: {
            return {...state, lastName: action.payload};
        }
        case actionEnum.IS_USER_ACTIVE: {
            return {...state, activeUser: action.payload};
        }
        case actionEnum.SET_USER_ID: {
            return {...state, id: action.payload};
        }
        default:
            return state;
    }
};