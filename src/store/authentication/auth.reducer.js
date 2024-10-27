import { clearToken, setToken } from '../../helpers/utility';
import { AuthenticationActionTypes } from './auth.model';
require('dotenv').config();

const initialState = {
    isLoading: false,
    token: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthenticationActionTypes.LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }

        case AuthenticationActionTypes.LOGIN_SUCCESS: {
            setToken(action.payload);
            return {
                ...state,
                isLoading: false,
                token: action.payload
            };
        }

        case AuthenticationActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }

        case AuthenticationActionTypes.LOGOUT_REQUEST: {
            clearToken();
            return {
                ...state,
                isLoading: false
            };
        }

        case AuthenticationActionTypes.LOGOUT_SUCCESS: {
            clearToken();
            return {
                ...state,
                isLoading: false
            };
        }

        case AuthenticationActionTypes.LOGOUT_FAILURE: {
            clearToken();
            return {
                ...state,
                isLoading: false
            };
        }

        default: {
            return state;
        }
    }
};

export { reducer as AuthenticationReducer };