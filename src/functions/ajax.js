import axios from 'axios';
import _ from 'lodash';
import { config } from '../config';

axios.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});


export default (function() {
  const ajax = (method, url, option) => {
    console.log("ajax ", method, url);
    const options = _.isUndefined(option) ? {} : option;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (_.has(options, 'headers')) {
      Object.keys(options.headers).forEach((item) => {
        headers[item] = options.headers[item];
      });
    }

    options.headers = headers;
    options.method = method;
    options.timeout = 3000000;
    options.url = url;
    options.baseURL = config.baseURL;

    return axios(options)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          return error.response;
        },
      )
      .catch((error) => {
        return error.response;
      });
  };

  ['get', 'put', 'post', 'delete'].forEach((method) => {
    ajax[method] = function (url, options) {
      return ajax(method, url, options);
    };
  });

  return ajax;
}());
