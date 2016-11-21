const clients = ['Chrome', 'Safari'];

/**
 * Return icon name
 * @param  {Object} authorization authorization object
 * @return {String}               icon name
 */
export function getIcon(authorization) {
  const client = matchedCliend(authorization);

  return `${client}_auth_icon`;
}

/**
 * Return matched client name
 * @param  {Object} authorization authorization object
 * @return {String}               matched client name
 */
function matchedCliend(authorization) {
  const indexOfBrowser = clients.indexOf(authorization.appName);

  if (indexOfBrowser !== -1) {
    return clients[indexOfBrowser].toLowerCase();
  }
}
