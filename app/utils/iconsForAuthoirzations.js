const clients = ['Chrome', 'Safari', 'Mozilla', 'Opera', 'UProgress'];
const systems = ['OS X', 'Android', 'iOS'];

/**
 * Return icon name
 * @param  {Object} authorization authorization object
 * @return {String}               icon name
 */
export function getClientIcon(authorization) {
  const client = matchedClient(authorization);

  return `${client}_auth_icon`;
}

/**
 * Return matched client name
 * @param  {Object} authorization authorization object
 * @return {String}               matched client name
 */
function matchedClient(authorization) {
  const indexOfBrowser = clients.indexOf(authorization.appName);

  if (indexOfBrowser !== -1) {
    return clients[indexOfBrowser].toLowerCase();
  }
}


/**
 * Get authorization icon
 * @param  {Object} authorization authorization object
 * @return {String}               matched os  name
 */
export function getOSIcon(authorization) {
  const os = matchedOS(authorization);

  return `${os}_os_auth_icon`;
}

/**
 * Parse authorization os value
 * @param  {Object} authorization authorization object
 * @return {String}               matched and replaced platform name
 */
function matchedOS(authorization) {
  const indexOfBrowser = systems.indexOf(authorization.platform);

  if (indexOfBrowser !== -1) {
    return systems[indexOfBrowser].toLowerCase().replace(/ /g, '_');
  }
}
