import React, { useContext, createElement, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var presets = {
  contains: function contains(a, b) {
    return a.indexOf(b) !== -1;
  },
  startsWith: function startsWith(a, b) {
    return a.lastIndexOf(b, 0) === 0;
  }
};
var filterType = {
  "false": null,
  "true": "startsWith",
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

function createFilterAction(_ref) {
  var filter = _ref.filter,
      _ref$caseSensitive = _ref.caseSensitive,
      caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive,
      textField = _ref.textField;

  if (typeof filter === "function") {
    return filter;
  }

  var filterAction = presets[filterType[filter]];
  return function (item, searchTerm) {
    var textValue = item[textField];

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


function suggest(data, _ref2) {
  var _ref2$searchTerm = _ref2.searchTerm,
      searchTerm = _ref2$searchTerm === void 0 ? "" : _ref2$searchTerm,
      options = _objectWithoutProperties(_ref2, ["searchTerm"]);

  var filter = createFilterAction(options);
  var dataItem = data.find(function (item) {
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

var prev = function prev(item, data) {
  var nextIdx = data.indexOf(item) - 1;
  if (nextIdx >= 0) return data[nextIdx];
  return data[data.length - 1];
};
/**
 * Navigate to the next item on the list of items in an array
 * When we reach the end of the list navigate back to the begining of the list
 * @param {Object} item
 * @param {Array<Object>} data
 */

var next = function next(item, data) {
  var nextIdx = data.indexOf(item) + 1;
  if (nextIdx < data.length) return data[nextIdx];
  return data[0];
};

var ComboBoxContext = /*#__PURE__*/React.createContext({});

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var StyledComboboxWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline-block;\n  width: 370px;\n"])));
var StyledComboboxInput = styled.input.attrs(function (props) {
  return {
    className: props.className
  };
})(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  ", "\n  height: 3rem;\n  width: 370px;\n  margin: 0;\n  padding: 0 2rem 0 3.2rem;\n  box-sizing: border-box;\n  font-size: 1rem;\n  text-overflow: ellipsis;\n  color: rgba(146, 158, 170, 0.5);\n  outline: 0;\n  box-shadow: 0 3px 6px rgb(149 157 165 / 15%);\n  border: 1px solid rgba(33, 33, 33, 0.07);\n  background-color: #fff;\n  transition: all 0.4s ease;\n"])), function (props) {
  return "\n      ".concat(props.open ? "border-radius: 10px 10px 0px 0px;" : "border-radius: 10px;", "\n    ");
});
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
var StyledComboboxListBox = styled.ul.attrs(function (props) {
  return {
    className: props.className
  };
})(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  padding: 0;\n  margin: 0;\n  border-radius: 0px 0px 10px 10px;\n  background-color: #fff;\n  box-shadow: 0 3px 6px rgb(149 157 165 / 15%);\n  border: 1px solid rgba(33, 33, 33, 0.07);\n  z-index: 1000;\n  outline: 0;\n"])));
StyledComboboxListBox.defaultProps = {
  id: "cb_listbox",
  tabindex: "-1",
  role: "listbox",
  "aria-hidden": "false",
  "aria-labelledby": "cb_input"
};
var focusStyles = {
  "true": "\n      background-color: transparent;\n      border: 1px #47525d solid;\n      color: #333;\n    ",
  "false": ""
};
var selectStyles = {
  "true": "\n    background-color: #eee;\n    border-color: #eee;\n    color: #fff;\n  "
};
var StyledComboboxOption = styled.li.attrs(function (props) {
  return {
    className: props.className
  };
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  margin: 0.3rem;\n  padding: 0.3rem 0.5rem;\n  list-style: none;\n  text-align: left;\n  font-size: 1rem;\n  color: #47525d;\n  transition: all 0.1s ease-in-out;\n  border-radius: 0.35rem;\n  background-color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  transition: all 0.2s ease;\n  cursor: pointer;\n  ", "\n\n  &:hover {\n    background: rgba(146, 158, 170, 0.3);\n    color: #fff;\n    border-color: rgba(146, 158, 170, 0.5);\n  }\n"])), function (props) {
  return "\n      ".concat(focusStyles[props.focused], "\n      ").concat(selectStyles[props.selected], "\n    ");
});
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

var ComboboxListOption = function ComboboxListOption(props) {
  var selected = props.selected,
      focused = props.focused,
      dataItem = props.dataItem;
  var comboBoxContext = useContext(ComboBoxContext);

  var handleSelect = function handleSelect(event) {
    comboBoxContext.handleSelect(dataItem, event);
  };

  return /*#__PURE__*/createElement(StyledComboboxOption, {
    focused: focused,
    selected: selected,
    onClick: handleSelect
  }, dataItem[comboBoxContext.textField]);
};

ComboboxListOption.propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  index: PropTypes.number,
  focused: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
};

var mapDataItems = function mapDataItems(data, fn) {
  return data.map(function (item, idx) {
    return fn(item, idx, false);
  });
}; // Map items for data requiring grouping


var ComboBoxListBox = function ComboBoxListBox(props) {
  var data = props.data,
      focusedItem = props.focusedItem,
      open = props.open;
  return /*#__PURE__*/createElement(StyledComboboxListBox, {
    "aria-live": open && "polite"
  }, mapDataItems(data, function (item, idx) {
    return /*#__PURE__*/createElement(ComboboxListOption, {
      key: "option_".concat(idx),
      dataItem: item,
      focused: focusedItem === item // Why so? is it based on reference?

    });
  }));
};

ComboBoxListBox.propTypes = {
  data: PropTypes.array,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string
};

var ComboBoxInput = function ComboBoxInput(props) {
  var _React$useState = useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      last = _React$useState2[0],
      setLast = _React$useState2[1];

  var comboBoxInputRef = useRef(null);
  var onChange = props.onChange,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      value = props.value,
      open = props.open;
  var handleChange = useCallback(function (e) {
    var latestInputedValue = e.currentTarget.value;
    setLast(latestInputedValue.split("")[latestInputedValue.length - 1]); // will this cause the component to re-render

    onChange(e, latestInputedValue);
  }, [onChange]);
  useEffect(function () {
    if (value && last != null && value.toLowerCase().includes(last.toLowerCase())) {
      var start = value.toLowerCase().indexOf(last.toLowerCase());
      var end = value.length - start;

      if (start >= 0 && end !== 0) {
        comboBoxInputRef.current.focus();
        comboBoxInputRef.current.setSelectionRange(start + 1, start + end);
      }
    }
  }, [value, last]);
  return /*#__PURE__*/createElement(StyledComboboxInput, {
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

var Combobox = function Combobox(props) {
  var value = props.value,
      data = props.data,
      caseSensitive = props.caseSensitive,
      textField = props.textField,
      valueField = props.valueField,
      suggest$1 = props.suggest;

  var _React$useState = useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currentValue = _React$useState2[0],
      setCurrentValue = _React$useState2[1];

  var _React$useState3 = useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      open = _React$useState4[0],
      setOpen = _React$useState4[1];

  var _React$useState5 = useState(data[0]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      focusedItem = _React$useState6[0],
      setFocusedItem = _React$useState6[1];

  var _React$useState7 = useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      isDeleting = _React$useState8[0],
      setIsDeleting = _React$useState8[1];

  var comboBoxRef = useRef(null);
  /**
   * Set value on first render
   */

  useEffect(function () {
    if (!currentValue && value) {
      setCurrentValue(value);
    }
  }, [currentValue, value]);

  var handleChange = function handleChange(e) {
    e.preventDefault();
    var value = e.currentTarget.value;

    if (!isDeleting) {
      // return the first item that meets the filter criteria
      var currentItem = suggest(data, {
        textField: textField,
        searchTerm: value,
        filter: suggest$1,
        caseSensitive: caseSensitive
      });
      setFocusedItem(currentItem);
    }

    if (isDeleting) {
      setCurrentValue(value);
      setFocusedItem(null);
    }
  };

  var handleKeyInputDown = function handleKeyInputDown(e) {
    var key = e.key;

    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(true);
    }
  };

  var handleKeyInputUp = function handleKeyInputUp(e) {
    var key = e.key;

    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(false);
    }
  };

  var handleKeyDown = function handleKeyDown(e) {
    var key = e.key;

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
      setFocusedItem(next(focusedItem, data));
    }

    if (key === "ArrowUp") {
      setFocusedItem(prev(focusedItem, data));
    }
  };

  var handleSelect = function handleSelect(dataItem, e) {
    setFocusedItem(dataItem);
  };

  var toggle = function toggle() {
    comboBoxRef.current.focus();
  };

  var onFocus = function onFocus(e) {
    setOpen(true);
  };

  var onBlur = function onBlur(e) {
    setOpen(false);
  };

  return /*#__PURE__*/createElement(ComboBoxContext.Provider, {
    value: {
      textField: textField,
      valueField: valueField,
      handleSelect: handleSelect
    }
  }, /*#__PURE__*/createElement(StyledComboboxWrapper, {
    ref: comboBoxRef,
    onClick: toggle,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/createElement(ComboBoxInput, {
    value: focusedItem ? focusedItem[textField] : currentValue,
    onChange: handleChange,
    open: open,
    onKeyDown: handleKeyInputDown,
    onKeyUp: handleKeyInputUp
  }), open && /*#__PURE__*/createElement(ComboBoxListBox, {
    open: open,
    focusedItem: focusedItem,
    data: data
  })));
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
