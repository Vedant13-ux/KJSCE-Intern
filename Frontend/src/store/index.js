import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistReducer from './reducers/index';
import { persistStore } from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(persistReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);