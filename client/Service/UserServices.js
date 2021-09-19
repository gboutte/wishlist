
import axios from 'axios';

export default class UserService {
  static login(username, password) {
    const request = axios.post(process.env.API_DOMAIN + '/api/user/login', {
      username: username,
      password: password
    });
    return new Promise((resolve, reject) => {
      request.then((response) => {
        if (typeof response.data.data.token !== 'undefined') {
          resolve({
            token: response.data.data.token
          });
        }

      }).catch((error) => {
        reject(error);
      });
    });
  }

  static install(username, password) {
    const request = axios.post(process.env.API_DOMAIN + '/api/install/user', {
      username: username,
      password: password
    });

    return new Promise((resolve, reject) => {
      request.then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
