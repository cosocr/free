const axios = require('axios')
const { retryInterceptorArgs } = require('@axios-use/plugins')

const http = axios.create({
    timeout: 12 * 1000,
    retry: 3,
    retryDelay: 1000
})
http.interceptors.response.use(...retryInterceptorArgs)
module.exports = http
