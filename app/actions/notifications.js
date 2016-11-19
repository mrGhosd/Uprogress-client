import store from 'store';
import messages from 'text/messages';

let lastNotifId = 0;

/**
 * Shows info notification popup for common information
 * @param {String} textId id of text message
 */
export function Info(textId) {
  const content = messages[textId];
  const structure = {
    id: `id-${++lastNotifId}`,
    type: 'info',
    content
  };

  store.dispatch({ type: 'ADD_INFO_NOTIFICATION', notification: structure });
}

/**
 * Shows alert notification popup for errors
 * @param {String} textId id of text message
 */
export function Alert(textId) {
  const content = messages[textId];
  const structure = {
    id: `id-${++lastNotifId}`,
    type: 'danger',
    content
  };

  store.dispatch({ type: 'ADD_ALERT_NOTIFICATION', notification: structure });
}

/**
 * Remove popup notification from reducer
 * @param {String} id popup notification id
 */
export function DropNotification(id) {
  store.dispatch({ type: 'DROP_NOTIFICATION', id });
}
