import { all } from 'redux-saga/effects';
import { AuthSaga } from './authentication/auth.sagas';
import { UserSaga } from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        AuthSaga(),
        UserSaga(),
    ]);
}