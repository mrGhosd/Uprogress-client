const clients = ['Chrome', 'Safari'];
const systems = ['OS X'];

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


export function getOSIcon(authorization) {
  const os = matchedOS(authorization);

  return `${os}_os_auth_icon`;
}

function matchedOS(authorization) {
  const indexOfBrowser = systems.indexOf(authorization.platform);

  if (indexOfBrowser !== -1) {
    return systems[indexOfBrowser].toLowerCase().replace(/ /g, '_');
  }
}
