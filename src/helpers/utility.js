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
