import * as React from 'react';
import React__default, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { jsx, jsxs } from 'react/jsx-runtime';

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

const _excluded = ["searchTerm"];
let presets = {
  contains: (a, b) => a.indexOf(b) !== -1,
  startsWith: (a, b) => a.lastIndexOf(b, 0) === 0
};
const filterType = {
  false: null,
  true: "startsWith",
  startsWidth: "startsWidth",
  contains: "contains"
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
function createFilterAction({
  filter,
  caseSensitive = false,
  textField
}) {
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
function suggest(data, _ref) {
  let {
      searchTerm = ""
    } = _ref,
    options = _objectWithoutProperties(_ref, _excluded);
  let filter = createFilterAction(options);
  const dataItem = data.find(item => {
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
const prev = (item, data) => {
  const nextId = data.indexOf(item) - 1;
  if (nextId >= 0) return data[nextId];
  return data[data.length - 1];
};

/**
 * Navigate to the next item on the list of items in an array
 * When we reach the end of the list navigate back to the begining of the list
 * @param {Object} item
 * @param {Array<Object>} data
 */
const next = (item, data) => {
  const nextId = data.indexOf(item) + 1;
  if (nextId < data.length) return data[nextId];
  return data[0];
};

const ComboBoxContext = /*#__PURE__*/React__default.createContext({});

const StyledComboboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 370px;
`;
const StyledComboboxInput = styled.input.attrs(props => ({
  className: props.className
}))`
  ${props => {
  return `
      ${props.open ? "border-radius: 10px 10px 0px 0px;" : "border-radius: 10px;"}
    `;
}}
  height: 3rem;
  width: 370px;
  margin: 0;
  padding: 0 2rem 0 3.2rem;
  box-sizing: border-box;
  font-size: 1rem;
  text-overflow: ellipsis;
  color: rgba(146, 158, 170, 0.5);
  outline: 0;
  box-shadow: 0 3px 6px rgb(149 157 165 / 15%);
  border: 1px solid rgba(33, 33, 33, 0.07);
  background-color: #fff;
  transition: all 0.4s ease;
`;
StyledComboboxInput.defaultProps = {
  id: "cb_input",
  type: "text",
  dir: "ltr",
  spellcheck: "false",
  autocorrect: "off",
  autocomplete: "off",
  autocapitalize: "off",
  maxlength: "2048",
  tabindex: "1",
  placeholder: "search...",
  role: "combobox",
  "aria-owns": "cb_listbox",
  "aria-busy": "false",
  "aria-haspopup": "true",
  "aria-expanded": "true",
  "aria-controls": "cb_listbox",
  "aria-autocomplete": "both",
  "aria-readonly": "false",
  "aria-disabled": "false",
  open: false
};
const StyledComboboxListBox = styled.ul.attrs(props => ({
  className: props.className
}))`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  border-radius: 0px 0px 10px 10px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgb(149 157 165 / 15%);
  border: 1px solid rgba(33, 33, 33, 0.07);
  z-index: 1000;
  outline: 0;
`;
StyledComboboxListBox.defaultProps = {
  id: "cb_listbox",
  tabindex: "-1",
  role: "listbox",
  "aria-hidden": "false",
  "aria-labelledby": "cb_input"
};
const focusStyles = {
  true: `
      background-color: transparent;
      border: 1px #47525d solid;
      color: #333;
    `,
  false: ""
};
const selectStyles = {
  true: `
    background-color: #eee;
    border-color: #eee;
    color: #fff;
  `
};
const StyledComboboxOption = styled.li.attrs(props => ({
  className: props.className
}))`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
  padding: 0.3rem 0.5rem;
  list-style: none;
  text-align: left;
  font-size: 1rem;
  color: #47525d;
  transition: all 0.1s ease-in-out;
  border-radius: 0.35rem;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
  cursor: pointer;
  ${props => {
  return `
      ${focusStyles[props.focused]}
      ${selectStyles[props.selected]}
    `;
}}

  &:hover {
    background: rgba(146, 158, 170, 0.3);
    color: #fff;
    border-color: rgba(146, 158, 170, 0.5);
  }
`;
StyledComboboxOption.propTypes = {
  focused: PropTypes.bool,
  selected: PropTypes.bool
};
StyledComboboxOption.defaultProps = {
  role: "option",
  tabindex: "-1",
  "aria-selected": "false",
  selected: false,
  focused: false
};

/**
 * The tabindex global attribute indicates that its element can be focused,
 * and where it participates in sequential keyboard navigation (usually with the Tab key,
 * hence the name).
 *
 * We don't want the options to be accessible via tab keys thus tabIndex = '-1'
 *
 * A negative value (usually tabindex="-1") means that the element is not
 * reachable via sequential keyboard navigation,
 * but could be focused with Javascript or visually by clicking with the mouse.
 * It's mostly useful to create accessible widgets with JavaScript.
 *
 * A negative value is useful when you have off-screen content
 * that appears on a specific event.
 * The user won't be able to focus any element with a
 * negative tabindex using the keyboard,
 * but a script can do so by calling the focus() method.
 */

const ComboboxListOption = props => {
  const {
    selected,
    focused,
    dataItem
  } = props;
  const comboBoxContext = React.useContext(ComboBoxContext);
  const handleSelect = event => {
    comboBoxContext.handleSelect(dataItem, event);
  };
  return /*#__PURE__*/jsx(StyledComboboxOption, {
    focused: focused,
    selected: selected,
    onClick: handleSelect,
    children: dataItem[comboBoxContext.textField]
  });
};
ComboboxListOption.propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  index: PropTypes.number,
  focused: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
};

function useClickOutside(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
      return;
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const mapDataItems = (data, fn) => {
  return data.map((item, idx) => fn(item, idx, false));
};

// Map items for data requiring grouping

const ComboBoxListBox = props => {
  const {
    data,
    focusedItem,
    open
  } = props;
  return /*#__PURE__*/jsx(StyledComboboxListBox, {
    "aria-live": open && "polite",
    children: mapDataItems(data, (item, idx) => {
      return /*#__PURE__*/jsx(ComboboxListOption, {
        dataItem: item,
        focused: focusedItem === item // Why so? is it based on reference?
      }, `option_${idx}`);
    })
  });
};
ComboBoxListBox.propTypes = {
  data: PropTypes.array,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,
  handleListCloseClick: PropTypes.func
};

const ComboBoxInput = props => {
  const [last, setLast] = React.useState(null);
  const comboBoxInputRef = React.useRef(null);
  const {
    onChange,
    onKeyDown,
    onKeyUp,
    value,
    open
  } = props;
  const handleChange = React.useCallback(e => {
    const latestInputedValue = e.currentTarget.value;
    setLast(latestInputedValue.split("")[latestInputedValue.length - 1]);
    onChange(e, latestInputedValue);
  }, [onChange]);
  React.useEffect(() => {
    if (value && last && value.toLowerCase().includes(last.toLowerCase())) {
      const start = value.toLowerCase().indexOf(last.toLowerCase());
      const end = value.length - start;
      if (start >= 0 && end !== 0) {
        comboBoxInputRef.current.focus();
        comboBoxInputRef.current.setSelectionRange(start + 1, start + end);
      }
    }
  }, [value, last]);
  return /*#__PURE__*/jsx(StyledComboboxInput, {
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onChange: handleChange,
    ref: comboBoxInputRef,
    value: value ? value : "",
    open: open
  });
};
ComboBoxInput.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
  suggest: PropTypes.bool
};

const Combobox = ({
  value,
  data,
  caseSensitive,
  textField,
  valueField,
  suggest: suggest$1
}) => {
  const [currentValue, setCurrentValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [focusedItem, setFocusedItem] = React.useState(data[0]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const comboBoxRef = React.useRef(null);
  const handleChange = e => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (!isDeleting) {
      // return the first item that meets the filter criteria
      const currentItem = suggest(data, {
        textField,
        searchTerm: value,
        filter: suggest$1,
        caseSensitive
      });
      setFocusedItem(currentItem);
    }
    if (isDeleting) {
      setCurrentValue(value);
      setFocusedItem(null);
    }
  };
  const handleKeyInputDown = e => {
    const {
      key
    } = e;
    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(true);
    }
  };
  const handleKeyInputUp = e => {
    const {
      key
    } = e;
    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(false);
    }
  };
  const handleKeyDown = e => {
    const {
      key
    } = e;
    if (key === "End" && open) {
      e.preventDefault();
      setFocusedItem(data[data.length - 1]);
    }
    if (key === "Home" && open) {
      e.preventDefault();
      setFocusedItem(data[0]);
    }
    if (key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
    if (key === "ArrowDown") {
      if (focusedItem) {
        setFocusedItem(next(focusedItem, data));
      }
      if (!focusedItem) {
        setFocusedItem(data[0]);
      }
    }
    if (key === "ArrowUp") {
      if (focusedItem) {
        setFocusedItem(prev(focusedItem, data));
      }
      if (!focusedItem) {
        setFocusedItem(data[data.length - 1]);
      }
    }
  };
  const handleSelect = (dataItem, e) => {
    setFocusedItem(dataItem);
  };
  const toggle = () => {
    comboBoxRef.current.focus();
  };
  const onFocus = e => {
    setOpen(true);
  };
  const handleListCloseClick = e => {
    setOpen(false);
  };
  useClickOutside(comboBoxRef, handleListCloseClick);
  return /*#__PURE__*/jsx(ComboBoxContext.Provider, {
    value: {
      textField,
      valueField,
      handleSelect
    },
    children: /*#__PURE__*/jsxs(StyledComboboxWrapper, {
      ref: comboBoxRef,
      onClick: toggle,
      onFocus: onFocus,
      onKeyDown: handleKeyDown,
      children: [/*#__PURE__*/jsx(ComboBoxInput, {
        value: focusedItem ? focusedItem[textField] : currentValue,
        onChange: handleChange,
        open: open,
        onKeyDown: handleKeyInputDown,
        onKeyUp: handleKeyInputUp
      }), open && /*#__PURE__*/jsx(ComboBoxListBox, {
        handleListCloseClick: handleListCloseClick,
        open: open,
        focusedItem: focusedItem,
        data: data
      })]
    })
  });
};
Combobox.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  data: PropTypes.array,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  caseSensitive: PropTypes.bool,
  filter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.oneOf(Object.keys(presets))]),
  name: PropTypes.string
};
Combobox.defaultProps = {
  caseSensitive: false
};

export { Combobox };
