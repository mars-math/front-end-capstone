const axios = require('axios');

const axiosInstance = axios.default.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products'
});

module.exports = axiosInstance;