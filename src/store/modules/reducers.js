import {combineReducers} from 'redux';

import dashboard from './dashboard';
import network from './network';

export default combineReducers({
  dashboard,
  network,
});
