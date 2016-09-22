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
