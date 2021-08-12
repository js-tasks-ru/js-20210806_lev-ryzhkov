/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  const order = param === 'asc' ? 'upper' : 'lower';

  newArr.sort((a, b) => a.normalize().localeCompare(b.normalize(), undefined, {caseFirst: order}));

  return param === 'asc' ? newArr : newArr.reverse();
}
