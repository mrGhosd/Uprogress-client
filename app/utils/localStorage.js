/**
 * define localStorage
 */
export function initLocalStorage() {
  if (typeof localStorage === 'undefined' || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    
    localStorage = new LocalStorage('./scratch');
  }
}
