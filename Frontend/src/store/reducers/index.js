import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['currentUser']
}
const rootReducer = combineReducers({ currentUser: currentUser, errors: errors });

export default persistReducer(persistConfig, rootReducer)

