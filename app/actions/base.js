import store from 'store';

/**
 * toggle Navigation menu for mobile
 */
export function toggleNavigationMenu() {
  return store.dispatch({ type: 'TOGGLE_NAVIGATION_MENU' });
}
