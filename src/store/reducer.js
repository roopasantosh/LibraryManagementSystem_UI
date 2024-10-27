import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { AuthenticationReducer } from './authentication/auth.reducer';
import { UserActionTypes } from './user/user.model';
import { UserReducer } from './user/user.reducers';

const appReducer = combineReducers({
    AuthenticationReducer,
    UserReducer
});

const persistConfig = {
    key: "lms",
    storage: storageSession,
};
const rootReducer = (state, action) => {
    if (action.type === UserActionTypes.USER_LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
