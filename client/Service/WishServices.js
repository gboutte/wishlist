
import axios from 'axios';
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default class WishService {
  static getAllPublic() {
    return this.getAll(false);
  }
  static getAllAdmin() {
    return this.getAll(true);
  }
  static getAll(admin) {
    let url = process.env.API_DOMAIN;
    if (admin) {
      url += '/api/wish';
    } else {
      url += '/api/public/wish';
    }
    const request = axios.get(url);
    return new Promise((resolve, reject) => {
      request.then((response) => {
        let allData = response.data.data;
        resolve(allData);

      }).catch((error) => {
        reject(error);
      });
    });
  }

  static get(id) {
    const request = axios.get(process.env.API_DOMAIN + '/api/wish/' + id);
    return new Promise((resolve, reject) => {
      request.then((response) => {
        let wish = response.data.data;
        resolve(wish);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static post(values) {
    const request = axios.post(process.env.API_DOMAIN + '/api/wish', {
      title: values.title,
      description: values.description,
      link: values.link,
      disabled: values.disabled,
      price: values.price,
      order: values.order,
      picture: values.picture
    });

    return new Promise((resolve, reject) => {
      request.then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static delete(id) {
    const request = axios.delete(process.env.API_DOMAIN + '/api/wish/' + id);
    return new Promise((resolve, reject) => {
      request.then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });

  }

  static put(id, values) {
    const request = axios.put(process.env.API_DOMAIN + '/api/wish', {
      id: id,
      title: values.title,
      description: values.description,
      link: values.link,
      disabled: values.disabled,
      price: values.price,
      order: values.order,
      picture: values.picture
    });

    return new Promise((resolve, reject) => {
      request.then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
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
