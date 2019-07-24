import { combineReducers } from 'redux';
import auth from './auth';
import todos from './todos';
import counter from './counter';

const rootReducer = combineReducers({
  auth,
  todos,
  counter
});

export default rootReducer;
