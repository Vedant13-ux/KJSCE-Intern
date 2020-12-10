import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = "https://kjsce-connect-backend.herokuapp.com";
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => {
                return resolve(res.data);
            }).catch(err => {
                return reject(err)
            })
    });
}