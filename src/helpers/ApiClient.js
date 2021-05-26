import axios from 'axios';
import config from '../config/appconfig';

function get(url) {
  const header = {
    Accept: 'application/xml',
    'Content-Type': 'application/json',
  };

  const API = axios.create({
    baseURL: config.development.apiUrl,
    headers: header,
  });

  return new Promise((resolve, reject) => {
    API.get(`${url}`)
      .then(res => {
        if (res.status !== 200) {
          console.log('Api_error', res);
          return reject(res);
        } else {
          return resolve(res.data);
        }
      })
      .catch(error => {
        console.log('catch_error', error);
        reject();
      });
  });
}

module.exports = {
  get,
};
