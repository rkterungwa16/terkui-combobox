export let presets = {
  contains: (a, b) => a.indexOf(b) !== -1,
  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0,
};

const filterType = {
  false: null,
  true: "startsWith",
  startsWidth: "startsWidth",
  contains: "contains",
};

/**
 * Create a function that is used to compare the input value entered
 * and an item in the list of items
 *
 * By default the comparison is not case sensitive
 * which means lowercase and uppercase letters with similar letters will be equal
 *
 * @param {Object} options
 * @param {String|Boolean|Function} options.filter if false will disable the filter option
 * if true should default to "startWith". We can use custom filter functions to perform filter
 * @param {Boolean} options.caseSensitive specify is filter comparison of items are case sensitive
 * @param {String} options.textField Each item in the data is an object that contains a textField which
 * contains the item data to be displayed on the list
 * @param {String} options.searchTerm
 */
function createFilterAction({ filter, caseSensitive = false, textField }) {
  if (typeof filter === "function") {
    return filter;
  }
  const filterAction = presets[filterType[filter]];
  return (item, searchTerm) => {
    let textValue = item[textField];

    if (!caseSensitive) {
      textValue = textValue.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
    }

    return filterAction(textValue, searchTerm);
  };
}

/**
 * Suggest the first item that corresponds to the filter criteria
 * E.g If filter criteria is "startsWith" return the first item that also starts with similar letters
 *
 * @param {Array} data
 * @param {Object} options
 * @param {String} options.searchTerm
 * @param {Boolean} options.caseSensitive
 * @param {String} options.textField
 * @param {String|Boolean|Function} options.filter
 *
 * @returns {Object} first item that meets the filter criteria
 */
export function suggest(data, { searchTerm = "", ...options }) {
  let filter = createFilterAction(options);
  const dataItem = data.find((item) => {
    if (filter(item, searchTerm)) return true;
    return false;
  });
  if (dataItem) return dataItem;
  return searchTerm;
}

/**
 * Navigate to the previous item on the list of items in an array
 * When we reach the start of the list navigate back to the end of the list
 * @param {Object} item
 * @param {Array<Object>} data
 *
 * @return {Object} then previous item on the list
 */
export const prev = (item, data) => {
  const nextIdx = data.indexOf(item) - 1;
  if (nextIdx >= 0) return data[nextIdx];
  return data[data.length - 1];
};

/**
 * Navigate to the next item on the list of items in an array
 * When we reach the end of the list navigate back to the begining of the list
 * @param {Object} item
 * @param {Array<Object>} data
 */
export const next = (item, data) => {
  const nextIdx = data.indexOf(item) + 1;
  if (nextIdx < data.length) return data[nextIdx];
  return data[0];
};
