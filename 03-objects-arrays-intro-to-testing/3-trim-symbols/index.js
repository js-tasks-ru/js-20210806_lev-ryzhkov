/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }
  if (size === 0) {
    return '';
  }
  let strToArr = string.split('');
  let temp = [];
  let result = [];
  strToArr.forEach((item) => {
    if (temp.length === 0) {
      temp.push(item);
    } else if (!temp.includes(item)) {
      result.push(...temp);
      temp = [item];
    } else if (temp.length < size) {
      temp.push(item);
    }
  });
  result.push(...temp);
  return result.join('');
}
