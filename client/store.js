/**
 * ************************************
 *
 * @module  store.js
 * @description Redux 'single source of truth' - Step 1
 *
 * ************************************
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

// RUN npm install redux-devtools-extension  ***** NOTE *****
// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;