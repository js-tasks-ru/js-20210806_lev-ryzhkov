/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let toArr = path.split('.');
  let result;

  const getter = (obj) => {
    for (let key of toArr) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] !== 'object') {
          result = obj[key];
        } else {
          getter(obj[key])
        }
      }
    }
    return result
  }

  return getter ;
}
