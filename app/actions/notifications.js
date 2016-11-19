import store from 'store';
import messages from 'text/messages';

let lastNotifId = 0;

export function Info(textId) {
  const content = messages[textId];
  const structure = {
    id: `id-${++lastNotifId}`,
    type: 'info',
    content
  };

  store.dispatch({ type: 'ADD_INFO_NOTIFICATION', notification: structure });
};

export function Alert(textId) {
  const content = messages[textId];
  const structure = {
    id: `id-${++lastNotifId}`,
    type: 'danger',
    content
  };

  store.dispatch({ type: 'ADD_ALERT_NOTIFICATION', notification: structure });
}

export function DropNotification(id) {
  store.dispatch({ type: 'DROP_NOTIFICATION', id });
};
