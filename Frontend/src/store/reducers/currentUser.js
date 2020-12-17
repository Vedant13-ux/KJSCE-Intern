import { SET_CURRENT_USER, UPDATE_USER_SKILLS, UPDATE_USER_CERTIFICATES, UPDATE_USER_BIO, UPDATE_USER_INFO } from '../actionTypes';

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
            state.user.dept = action.user.dept;
            state.user.year = action.user.year;
            state.user.rollNo = action.user.rollNo;
            return {
                ...state
            }
        case UPDATE_USER_CERTIFICATES:
            state.user.certificates.push(action.certificate);
            return {
                ...state
            }
        case UPDATE_USER_BIO:
            state.user.bio = action.bio;
            return {
                ...state
            }
        // case UPDATE_USER_INFO:
        //     state.user.bio = action.bio;
        //     return {
        //         ...state
        //     }
        default:
            return state
    }
}
export default currentUserReducer;


