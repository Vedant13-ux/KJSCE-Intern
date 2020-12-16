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
        // case UPDATE_USER_SKILLS:
        //     return {
        //         'user.skills': action.skills
        //     }
        // case UPDATE_USER_CERTIFICATES:
        //     return {
        //         'user.certificates': AuthenticatorAssertionResponse.certificate
        //     }

        default:
            return state
    }
}
export default currentUserReducer;


