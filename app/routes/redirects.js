import store from 'store';

import { getUser } from 'actions/users';
import { setNavigationMenu } from 'actions/base';
import { removeFormErrors } from 'actions/directions';
import { getOSName } from 'utils/browser';

let redirectToMobileLanding = true;

/*
* check if current device is mobile
*/
function isMobileDevice() {
  return getOSName() === 'Android' || getOSName() === 'iOS';
}

/**
 * Redirect from root path if user not signed in
 * @param  {Object} nextState state of the router
 * @param  {Function} replace helps to replace the route path
 * @param  {Function} callback make a callback after onEnter hook
 * @return {Dispatch} Dispatch function
 */
export function redirectFromRoot(nextState, replace, callback) {
  const storeContent = store.getState();
  const token = localStorage.getItem('uprogresstoken');

  if (!token && storeContent.users.current.isEmpty) {
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

/**
 * Remove errors from form after leaving it
 * @param  {Object} nextState state of the router
 * @return {Dispatch} Dispatch function
 */
export function removeErrorsFromForm() {
  store.dispatch(removeFormErrors());
}

/**
 * Check device type
 */
export function checkMobileDevice(nextState, replace, callback) {
  let isMobile = isMobileDevice();
  let hideLanding = localStorage.getItem('hideMobileLanding');

  if (isMobile && !hideLanding && redirectToMobileLanding) {
    redirectToMobileLanding = false;
    replace('/landing_mobile');
  }
  callback();
}

/**
 * Hide navigation menu if it is an mobile version
 */
export function hideMobileNavigation() {
  if (isMobileDevice()) {
    const storeContent = store.getState();

    if (storeContent.base.isShow) {
      store.dispatch(setNavigationMenu(false));
    }
  }
}
