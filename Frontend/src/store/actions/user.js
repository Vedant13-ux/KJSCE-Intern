
import { apiCall } from '../../services/api';
import { UPDATE_USER_SKILLS, UPDATE_USER_EXPERIENCE,UPDATE_USER_CERTIFICATES, UPDATE_USER_BASIC_INFO, UPDATE_USER_INFO, ADD_BOOKMARK, DELETE_BOOKMARK } from '../actionTypes';


function userSkills(skills) {
    return {
        type: UPDATE_USER_SKILLS,
        skills
    }
}
export function updateSkills(skills, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/profile/update/skills', { skills, id })
                .then(() => {
                    dispatch(userSkills(skills));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function userinfo(user) {
    return {
        type: UPDATE_USER_INFO,
        user
    }
}

export function updateinfo(data) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', "/api/profile/update/basicinfo", data)
                .then(() => {
                    dispatch(userinfo(data.user));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function userbasicinfo(user) {
    return {
        type: UPDATE_USER_BASIC_INFO,
        user
    }
}

export function updatebasicinfo(data) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', "/api/profile/update/basicinfo", data)
                .then(() => {
                    dispatch(userbasicinfo(data.user));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function userCertificates(certificate) {
    return {
        type: UPDATE_USER_CERTIFICATES,
        certificate
    }
}
export function updateCertificates(certificate, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/profile/update/certificates', { certificate, id })
                .then((newCertificate) => {
                    dispatch(userCertificates(newCertificate));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function userExperience(experience) {
    return {
        type: UPDATE_USER_EXPERIENCE,
        experience
    }
}
export function updateExperiences(experience, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/profile/update/experiences', { experience, id })
                .then((newExperience) => {
                    dispatch(userExperience(newExperience));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function addBook(bookmark) {
    return {
        type: ADD_BOOKMARK,
        bookmark
    }
}
export function addBookmark(bookmark, userId) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/internship/bookmark/add/' + bookmark, { userId })
                .then(() => {
                    dispatch(addBook(bookmark));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function deleteBook(bookmark) {
    return {
        type: DELETE_BOOKMARK,
        bookmark
    }
}
export function deleteBookmark(bookmark, userId) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/internship/bookmark/delete/' + bookmark, { userId })
                .then(() => {
                    dispatch(deleteBook(bookmark));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}