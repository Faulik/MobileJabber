import { combineReducers } from 'redux';
// import messages from './messages';

import rooms from './rooms';

const rootReducer = combineReducers({
  rooms,
});

export default rootReducer;
