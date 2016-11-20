/**
 * Prepare form string to convert to object
 * ex.: solution[metric][form]   =>   solution.metric.form
 * @param {String} str
 */
export function StripSpecialSymbols(str) {
  return str.replace(/([\[|\]|\s\-]+)/g, '_');
}

/**
 * Set not empty fields to object
 * @param {Object} params income params
 * @return {Object} object otuput object
 */
export function setByExistedParams(object) {
  let newObject = {};

  for (let key in object) {
    const item = object[key];

    if (item) {
      newObject[key] = item;
    }
  }

  return newObject;
}

/*eslint-disable */
/**
 * Deep merge objects
 * @param {...Object} objects Any listed object
 */
export function MergeObjects(...objects) {
  let result = {};
  for (const current of objects) {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        if (typeof current[key] === "object" && typeof result[key] === "object") {
          result[key] = MergeObjects(result[key], current[key]);
        }
        else {
          result[key] = current[key];
        }
      }
    }
  }
  return result;
};
/*eslint-enable */
