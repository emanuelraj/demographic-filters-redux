import { combineReducers } from 'redux';

import { census } from './census.reducer';


const rootReducer = combineReducers({
  census
});

export default rootReducer;
