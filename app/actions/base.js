import store from 'store';

/**
 * toggle Navigation menu for mobile
 */
export function toggleNavigationMenu() {
  return store.dispatch({ type: 'TOGGLE_NAVIGATION_MENU' });
}

/**
 * toggle Navigation menu for mobile
 */
export function setNavigationMenu(show) {
  return store.dispatch({ type: 'SET_NAVIGATION_MENU', show });
}
