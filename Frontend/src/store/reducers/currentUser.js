import { SET_CURRENT_USER, DELETE_USER_PROJECT,DELETE_USER_EXPERIENCE,EDIT_USER_EXPERIENCE, DELETE_USER_CERTIFICATE,EDIT_USER_PROJECT,UPDATE_USER_SKILLS, UPDATE_USER_REFRESH, UPDATE_USER_PROJECT, UPDATE_USER_EXPERIENCE, UPDATE_USER_CERTIFICATES, UPDATE_USER_BASIC_INFO, UPDATE_USER_INFO, ADD_BOOKMARK, DELETE_BOOKMARK, ADD_MEMBER, DELETE_MEMBER } from '../actionTypes';

const defaultState = {
    isAuthenticated: false,
    user: {}
}
const currentUserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        case UPDATE_USER_REFRESH:
            // state.user.projects=action.user.projects
            return {
                isAuthenticated: true,
                user: action.user
            }
        case UPDATE_USER_SKILLS:
            state.user.skills = action.skills;
            return {
                ...state
            }
        case UPDATE_USER_INFO:
            if (state.user.role === "Student") {
                state.user.year = action.user.year;
                state.user.rollNo = action.user.rollNo;
                state.user.dept = action.user.dept;

            } else if (state.user.role === "Faculty") {
                state.user.dept = action.user.dept;
                state.user.position = action.user.position

            } else {
                state.user.passedOut = action.user.passedOut;
                state.user.workingAt = action.user.workingAt;
                state.user.position = action.user.position;
            }

            return {
                ...state
            }
        case UPDATE_USER_CERTIFICATES:
            state.user.certificates.push(action.certificate);
            return {
                ...state
            }
        case DELETE_USER_CERTIFICATE:
            state.user.certificates=state.user.certificates.filter((m) => String(m._id) !== String(action.cert_id));
            return {
                ...state
            }
        case UPDATE_USER_EXPERIENCE:
            state.user.experiences.push(action.experience);
            return {
                ...state
            }
        case DELETE_USER_EXPERIENCE:
            state.user.experiences=state.user.experiences.filter((m) => String(m._id) !== String(action.expId));
            return {
                ...state
            }
        case EDIT_USER_EXPERIENCE:
            let index=state.user.experiences.findIndex((m) => String(m._id) === String(action.experience._id));
            state.user.experiences[index]=action.experience
            return {
                ...state
            }
        case UPDATE_USER_PROJECT:
            state.user.projects.push(action.project);
            return {
                ...state
            }
        case DELETE_USER_PROJECT:
            state.user.projects=state.user.projects.filter((m) => String(m._id) !== String(action.projectId));
            return {
                ...state
            }
        case EDIT_USER_PROJECT:
            let index=state.user.projects.findIndex((m) => String(m._id) === String(action.project._id));
            state.user.projects[index]=action.project
            return {
                ...state
            }
        case UPDATE_USER_BASIC_INFO:
            state.user.bio = action.user.bio;
            state.user.fname = action.user.fname;
            state.user.lname = action.user.lname;
            state.user.socialHandles = action.user.socialHandles;
            return {
                ...state
            }
        case ADD_BOOKMARK:
            state.user.bookmarks.push(action.bookmark);
            return {
                ...state
            }
        case DELETE_BOOKMARK:
            state.user.bookmarks = state.user.bookmarks.filter(b => b !== action.bookmark);
            return {
                ...state
            }
        case ADD_MEMBER:
            state.user.members.push(action.member);
            return {
                ...state
            }
        case DELETE_MEMBER:
            state.user.members = state.user.members.filter(b => b._id !== action.memberId)
            return {
                ...state
            }
        default:
            return state
    }
}
export default currentUserReducer;


