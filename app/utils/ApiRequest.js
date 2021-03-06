import Axios from 'axios';
import envConfig from '../../config/env.config';
import { Alert } from 'actions/notifications';
const host = envConfig[process.env.NODE_ENV].host;
const port = envConfig[process.env.NODE_ENV].port;

const axios = Axios.create({
  baseURL: `http://${host}:${port}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Key-Inflection': 'camel'
  }
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('uprogresstoken');

  if (token) {
    config.headers['uprogresstoken'] = token;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
},
(error) => {
  handleErrors(error);
  return Promise.reject(error);
});

/**
 * Handle errors
 * @param  {Object} errors    Errors object
 * @return {Promise}          Thenable/Catheable
 */
function handleErrors(error) {
  if (error.status >= 500) {
    Alert('server_error');
  }
  return error;
}


/**
 * Send GET request to project API
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data converts to URI: ?key=value&foo=bar
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function get(url, data = {}, options = {}) {
  return axios.get(url, { params: data }, options);
}

/**
 * Send POST request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function post(url, data = {}, options = {}) {
  return axios.post(url, data, options);
}


/**
 * Send PUT request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function put(url, data = {}, options = {}) {
  return axios.put(url, data, options);
}


/**
 * Send PATCH request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function patch(url, data = {}, options = {}) {
  return axios.patch(url, data, options);
}


/**
 * Send DELETE request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catheable
 */
export function destroy(url, data = {}, options = {}) {
  return axios.delete(url, data, options);
}
