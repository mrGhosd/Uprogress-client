/**
 * Prepare form string to convert to object
 * ex.: solution[metric][form]   =>   solution.metric.form
 * @param {String} str
 */
export function StripSpecialSymbols(str) {
  return str.replace(/([\[|\]|\s\-]+)/g, '_');
}
