import axios from 'axios'
import jwtDecode from 'jwt-decode'
// axios.defaults.baseURL = 'https://kjsce-connect-backend.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:3001'

var secureId = null;
if (localStorage.jwtToken) {
    secureId = jwtDecode(localStorage.jwtToken)['_id'];
}


export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](`/api/${secureId}/${path}`, data)
            .then(res => {
                return resolve(res.data);
            }).catch(err => {
                return reject(err)
            })
    });
}
export function apiCallAuth(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](`/api/${path}`, data)
            .then(res => {
                return resolve(res.data);
            }).catch(err => {
                return reject(err)
            })
    });
}