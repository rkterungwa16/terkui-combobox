export let presets = {
  contains: (a, b) => a.indexOf(b) !== -1,
  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0,
};

const filterType = {
  false: null,
  true: "startsWith",
  startsWidth: "startsWidth",
};

function createFilterAction({ filter, caseSensitive = false, textField }) {
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

export function suggest(data, { searchTerm = "", ...options }) {
  let filter = createFilterAction(options);
  const dataItem = data.find((datum) => {
    if (filter(datum, searchTerm)) return true;
    return false;
  });
  if (dataItem) return dataItem;
  return searchTerm;
}

export const prev = (item, data) => {
  let nextIdx = data.indexOf(item) - 1;
  if (nextIdx >= 0) return data[nextIdx];
  return data[data.length - 1];
};

export const next = (item, data) => {
  let nextIdx = data.indexOf(item) + 1;
  if (nextIdx < data.length) return data[nextIdx];
  return data[0];
};
