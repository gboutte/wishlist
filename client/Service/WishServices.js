
import axios from 'axios';

export default class WishService {
  static getAll() {
    const request = axios.get(process.env.API_DOMAIN + '/api/public/wish');
    return new Promise((resolve) => {
      request.then((response) => {
        let allData = response.data.data;
        resolve(allData);

      });
    });
  }

  static getImage(id) {
    return new Promise((resolve) => {

      axios.get(process.env.API_DOMAIN + '/api/public/wish/' + id + '/image')
        .then((response) => {
          let img = response.data.data.img;
          resolve(img);
        });
    });
  }

}
