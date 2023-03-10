import axios from "axios";
import store from '../reudx/store'

axios.defaults.baseURL = '/'

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // 显示loading
    store.dispatch({
        type: 'change_loading',
        payload: true
    })
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // 隐藏loading
    store.dispatch({
        type: 'change_loading',
        payload: false
    })
    return response;
}, function (error) {
    // 隐藏loading
    store.dispatch({
        type: 'change_loading',
        payload: false
    })
    return Promise.reject(error);
});