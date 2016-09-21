import store from 'store';

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
