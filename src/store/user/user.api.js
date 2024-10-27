import HttpHelper from "../../helpers/httpHelper";
import { decodeToken } from "../../helpers/utility";

require("dotenv").config();
const headerInfo = {};

class UserAPI {
  static async RegisterUser(req) {
    let url = process.env.REACT_APP_API_URL + "/member";
    return HttpHelper.httpRequest(url, "POST", headerInfo, req);
  }

  static async GetCurrentUser() {
    const user = decodeToken();
    let url =
      process.env.REACT_APP_API_URL +
      "/api/Library/getCurrentUser?userID=" +
      user.userId;
    return HttpHelper.httpRequest(url, "GET", headerInfo);
  }

  static async GetBooks() {
    let url = process.env.REACT_APP_API_URL + "/api/Library/getAllBooks";
    return HttpHelper.httpRequest(url, "GET", headerInfo);
  }

  static async GetTransactions() {
    const user = decodeToken();
    let url =
      process.env.REACT_APP_API_URL +
      "/api/Library/getAllUserTransactions?userID=" +
      user.userId;
    return HttpHelper.httpRequest(url, "GET", headerInfo);
  }

  static async BorrowBook(bookId) {
    const user = decodeToken();
    let url =
      process.env.REACT_APP_API_URL +
      "/api/Library/borrow?userId=" +
      user.userId +
      "&bookId=" +
      bookId;
    return HttpHelper.httpRequest(url, "POST", headerInfo);
  }
  static async ReturnBook(bookId) {
    const user = decodeToken();
    let url =
      process.env.REACT_APP_API_URL +
      "/api/Library/return?userId=" +
      user.userId +
      "&bookId=" +
      bookId;
    return HttpHelper.httpRequest(url, "POST", headerInfo);
  }

  static async GetAllTransactions() {
    let url =
      process.env.REACT_APP_API_URL + "/api/Library/GetBookTransactions";
    return HttpHelper.httpRequest(url, "GET", headerInfo);
  }
}

export default UserAPI;
