import store from 'store';

import { getUser } from 'actions/users';

/**
 * Redirect from root path if user not signed in
 * @param  {Object} nextState state of the router
 * @param  {Function} replace helps to replace the route path
 * @param  {Function} callback make a callback after onEnter hook
 * @return {Dispatch} Dispatch function
 */
export function redirectFromRoot(nextState, replace, callback) {
  const storeContent = store.getState();

  if (storeContent.users.current.isEmpty) {
    replace('/sign_in');
  }
  callback();
}


/**
 * Update user information after entering some url
 * @param  {Object} nextState state of the router
 * @param  {Function} replace helps to replace the route path
 * @param  {Function} callback make a callback after onEnter hook
 * @return {Dispatch} Dispatch function
 */
export function updateUserInfo(nextState, replace, callback) {
  const storeContent = store.getState();
  
  if (!storeContent.users.show.isEmpty) {
    store.dispatch(getUser(nextState.params.user));
  }

  callback();
}
