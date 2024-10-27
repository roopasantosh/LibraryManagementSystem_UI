import { action } from "typesafe-actions";
import { AuthenticationActionTypes } from "./auth.model";

export const loginUserRequest = (req) => action(AuthenticationActionTypes.LOGIN_REQUEST, req);
export const loginUserSuccess = (res) => action(AuthenticationActionTypes.LOGIN_SUCCESS, res);
export const loginUserFailure = (err) => action(AuthenticationActionTypes.LOGIN_FAILURE, err);

const logoutUserRequest = (req) => action(AuthenticationActionTypes.LOGOUT_REQUEST, req);
const logoutUserSuccess = (res) => action(AuthenticationActionTypes.LOGOUT_FAILURE, res);
const logoutUserFailure = (err) => action(AuthenticationActionTypes.LOGOUT_SUCCESS, err);

