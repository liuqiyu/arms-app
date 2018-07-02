/**
 * store
 * create by lqy 2018/6/30
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer  from './reducers';

let store = createStore(rootReducer, composeWithDevTools());

export default store;