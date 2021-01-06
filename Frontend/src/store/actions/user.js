
import { apiCall } from '../../services/api';
import { UPDATE_USER_SKILLS, DELETE_USER_PROJECT, UPDATE_USER_EXPERIENCE, UPDATE_USER_REFRESH, UPDATE_USER_PROJECT, UPDATE_USER_CERTIFICATES, UPDATE_USER_BASIC_INFO, UPDATE_USER_INFO, ADD_BOOKMARK, DELETE_BOOKMARK, ADD_MEMBER, DELETE_MEMBER, UPDATE_EVENT, DELETE_EVENT, EDIT_EVENT } from '../actionTypes';

function userRefresh(user) {
    return {
        type: UPDATE_USER_REFRESH,
        user
    }
}

export function updateRefresh(username) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('get', "/api/user/" + username, '')
                .then((data) => {
                    dispatch(userRefresh(data));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

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

function userProjectdelete(projectId) {
    return {
        type: DELETE_USER_PROJECT,
        projectId
    }
}
export function deleteProjects(projectId, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('delete', '/api/profile/update/projects/' + id + '/' + projectId)
                .then(() => {
                    dispatch(userProjectdelete(projectId));
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

function userProject(project) {
    return {
        type: UPDATE_USER_PROJECT,
        project
    }
}
export function updateProjects(project, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/profile/update/projects', { project, id })
                .then((newProject) => {
                    dispatch(userProject(newProject));
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


function addMemb(member) {
    return {
        type: ADD_MEMBER,
        member
    }
}
export function addMember(member, id) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/council/addMember/' + id, member)
                .then((newMember) => {
                    newMember.member = {
                        _id: newMember.member._id,
                        ...member.member
                    }
                    console.log(newMember);
                    dispatch(addMemb(newMember));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}

function deleteMemb(member) {
    return {
        type: DELETE_MEMBER,
        member
    }
}
export function deleteMember(userId, memberId) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('put', '/api/council/deleteMember/' + userId + '/' + memberId, '')
                .then(() => {
                    dispatch(deleteMemb(memberId));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}
function addEv(event) {
    return {
        type: UPDATE_EVENT,
        event
    }
}

export function addEvent(event, userId) {
    return dispatch => {
        return new Promise((res, rej) => {
            return apiCall('post', '/api/council/addEvent/' + userId, event )
                .then((newEvent) => {
                    dispatch(addEv(newEvent));
                    res();
                }).catch((err) => {
                    rej(err);
                });
        })
    }
}