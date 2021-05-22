const axios = require('axios');
const config = require('../../config');

const baseURL = config.backendAPI;

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 1800000,
  headers
});

module.exports = {
  backendAPI: axiosInstance
};