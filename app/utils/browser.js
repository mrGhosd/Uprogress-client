import platform from 'platform';

/**
 * Return browser name
 * @return {String} Platform name
 */
function getBrowserName() {
  return platform.name;
}

/**
 * Return browser version
 * @return {String} Platform version
 */
function getBrowserVersion() {
  return platform.version;
}

/**
 * Return OS name
 * @return {String} OS name
 */
export function getOSName() {
  return platform.os.family;
}

/**
 * Return OS version
 * @return {String} OS version
 */
function getOSVersion() {
  return platform.os.version;
}

/**
 * Return device product name
 * @return {String} OS version
 */
export function getProduct() {
  return platform.product;
}

/**
 * Return Authorization object
 * @return {Object} Authorization
 */
export function getAuthorizationParams() {
  return {
    platform: getOSName(),
    platform_version: getOSVersion(),
    app_name: getBrowserName(),
    app_version: getBrowserVersion(),
    provider: 'UProgress'
  };
}
