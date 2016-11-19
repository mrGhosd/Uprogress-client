/**
 * define localStorage
 */

import { LocalStorage } from 'node-localstorage';

/**
 * initialization localStorage for specs
 */
export function initLocalStorage() {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    localStorage = new LocalStorage('./scratch');
  }
}
