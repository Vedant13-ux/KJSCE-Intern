import { SET_CURRENT_USER, UPDATE_USER_SKILLS,UPDATE_USER_PROJECT, UPDATE_USER_EXPERIENCE, UPDATE_USER_CERTIFICATES, UPDATE_USER_BASIC_INFO, UPDATE_USER_INFO, ADD_BOOKMARK, DELETE_BOOKMARK } from '../actionTypes';

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
        case UPDATE_USER_EXPERIENCE:
            state.user.experiences.push(action.experience);
            return {
                ...state
            }
        case UPDATE_USER_PROJECT:
            state.user.projects.push(action.project);
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
            state.user.bookmarks = state.user.bookmarks.filter(b => b !== action.bookmark)
            return {
                ...state
            }

        default:
            return state
    }
}
export default currentUserReducer;


