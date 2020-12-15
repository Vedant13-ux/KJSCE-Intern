import { apiCall } from '../../services/api'
import { SET_CURRENT_USER } from '../actionTypes'

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export function logout() {
    return dispatch => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
    }
}

export function authUser(emailToken) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', '/api/auth/verify-email/' + emailToken, '')
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token)
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => reject(err));
        });
    };
}
export function loginUser(user) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', '/api/auth/signin', user)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => reject(err));
        })
    }
}