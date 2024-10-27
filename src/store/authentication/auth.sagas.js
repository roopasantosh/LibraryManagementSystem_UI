import { call, put, takeEvery } from 'redux-saga/effects';
import * as AuthActions from './auth.actions';
import AuthAPI from './auth.api';
import { AuthenticationActionTypes } from './auth.model';

function* handleLogin(action) {
  try {
    const response = yield call(AuthAPI.Login, action.payload);
    yield put(AuthActions.loginUserSuccess(response));
  } catch (e) {
    yield put(AuthActions.loginUserFailure(e));
  }
}

export function* AuthSaga() {
  yield takeEvery(AuthenticationActionTypes.LOGIN_REQUEST, handleLogin);
}

