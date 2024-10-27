import HttpHelper from '../../helpers/httpHelper';
require('dotenv').config();
const headerInfo = {};
class AuthAPI {
  static async Login(request) {
    let url =
      process.env.REACT_APP_API_URL + `/api/Auth/login?emailID=${request.userName}&password=${request.password}`;
    return HttpHelper.httpRequest(url, 'GET', headerInfo);
  }

  static async Logout(id) {
    let url = process.env.REACT_APP_API_URL + '/logout';
    return HttpHelper.httpRequest(url, 'GET', headerInfo);
  }
}

export default AuthAPI;
