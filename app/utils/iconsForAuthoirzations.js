const clients = ['Chrome', 'Safari'];

export function getIcon(authorization) {
  const client = matchedCliend(authorization);

  return `${client}_auth_icon`;
}

function matchedCliend(authorization) {
  const indexOfBrowser = clients.indexOf(authorization.appName);

  if (indexOfBrowser !== -1) {
    return clients[indexOfBrowser].toLowerCase();
  }
}
