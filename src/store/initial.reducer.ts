import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as notificationCenter } from 'react-notification-system-redux';

export default (history) => combineReducers({
  notificationCenter,
  router: connectRouter(history),
});
