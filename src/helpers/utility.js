require("dotenv").config();
var jwtDecode = require("jwt-decode");

export function getHeaderDetail(headerInfo = {}) {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    Authorization: "Bearer " + getToken(),
  };
  headers = { ...headers, ...headerInfo };

  return headers;
}

export function validEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !IsNullOrEmpty(email) && re.test(String(email).toLowerCase());
}

export function validPhone(phone) {
  var regmm = "^([0|+[0-9]{1,5})?([6-9][0-9]{9})$";
  var regmob = new RegExp(regmm);
  return regmob.test(phone);
}

export function validPassword(password) {
  const pa = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,}/
  );
  return !IsNullOrEmpty(password) && pa.test(password);
}

export function IsNullOrEmpty(name) {
  return name === "" || name === undefined || name === null;
}

export function getTokenValue(token) {
  try {
    var decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    return {};
  }
}

export function clearToken() {
  sessionStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN);
  sessionStorage.removeItem("persist:lms");
  document.location.href = process.env.PUBLIC_URL;
}

export function getToken() {
  return sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN);
}

export function setToken(token) {
  sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN, token);
}

export function decodeToken() {
  let token = getToken();
  try {
    if (token !== null && token !== undefined && token !== "")
      return jwtDecode(token);
    else return null;
  } catch (e) {
    return null;
  }
}
