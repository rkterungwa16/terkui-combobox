'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var styled = require('styled-components');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(t)
    }
  }));
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var _excluded = ["searchTerm"];
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
    options = _objectWithoutProperties(_ref2, _excluded);
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
  var nextId = data.indexOf(item) - 1;
  if (nextId >= 0) return data[nextId];
  return data[data.length - 1];
};

/**
 * Navigate to the next item on the list of items in an array
 * When we reach the end of the list navigate back to the begining of the list
 * @param {Object} item
 * @param {Array<Object>} data
 */
var next = function next(item, data) {
  var nextId = data.indexOf(item) + 1;
  if (nextId < data.length) return data[nextId];
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
  var comboBoxContext = React__namespace.useContext(ComboBoxContext);
  var handleSelect = function handleSelect(event) {
    comboBoxContext.handleSelect(dataItem, event);
  };
  return /*#__PURE__*/React__namespace.createElement(StyledComboboxOption, {
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

function useClickOutside(ref, action) {
  React.useEffect(function () {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
      return;
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

var mapDataItems = function mapDataItems(data, fn) {
  return data.map(function (item, idx) {
    return fn(item, idx, false);
  });
};

// Map items for data requiring grouping

var ComboBoxListBox = function ComboBoxListBox(props) {
  var data = props.data,
    focusedItem = props.focusedItem,
    open = props.open;
  return /*#__PURE__*/React__namespace.createElement(StyledComboboxListBox, {
    "aria-live": open && "polite"
  }, mapDataItems(data, function (item, idx) {
    return /*#__PURE__*/React__namespace.createElement(ComboboxListOption, {
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
  searchTerm: PropTypes.string,
  handleListCloseClick: PropTypes.func
};

var ComboBoxInput = function ComboBoxInput(props) {
  var _React$useState = React__namespace.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    last = _React$useState2[0],
    setLast = _React$useState2[1];
  var comboBoxInputRef = React__namespace.useRef(null);
  var onChange = props.onChange,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    value = props.value,
    open = props.open;
  var handleChange = React__namespace.useCallback(function (e) {
    var latestInputedValue = e.currentTarget.value;
    setLast(latestInputedValue.split("")[latestInputedValue.length - 1]);
    onChange(e, latestInputedValue);
  }, [onChange]);
  React__namespace.useEffect(function () {
    if (value && last && value.toLowerCase().includes(last.toLowerCase())) {
      var start = value.toLowerCase().indexOf(last.toLowerCase());
      var end = value.length - start;
      if (start >= 0 && end !== 0) {
        comboBoxInputRef.current.focus();
        comboBoxInputRef.current.setSelectionRange(start + 1, start + end);
      }
    }
  }, [value, last]);
  return /*#__PURE__*/React__namespace.createElement(StyledComboboxInput, {
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

var Combobox = function Combobox(_ref) {
  var value = _ref.value,
    data = _ref.data,
    caseSensitive = _ref.caseSensitive,
    textField = _ref.textField,
    valueField = _ref.valueField,
    suggest$1 = _ref.suggest;
  var _React$useState = React__namespace.useState(value),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    currentValue = _React$useState2[0],
    setCurrentValue = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    open = _React$useState4[0],
    setOpen = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(data[0]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedItem = _React$useState6[0],
    setFocusedItem = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    isDeleting = _React$useState8[0],
    setIsDeleting = _React$useState8[1];
  var comboBoxRef = React__namespace.useRef(null);
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
  var handleSelect = function handleSelect(dataItem, e) {
    setFocusedItem(dataItem);
  };
  var toggle = function toggle() {
    comboBoxRef.current.focus();
  };
  var onFocus = function onFocus(e) {
    setOpen(true);
  };
  var handleListCloseClick = function handleListCloseClick(e) {
    setOpen(false);
  };
  useClickOutside(comboBoxRef, handleListCloseClick);
  return /*#__PURE__*/React__namespace.createElement(ComboBoxContext.Provider, {
    value: {
      textField: textField,
      valueField: valueField,
      handleSelect: handleSelect
    }
  }, /*#__PURE__*/React__namespace.createElement(StyledComboboxWrapper, {
    ref: comboBoxRef,
    onClick: toggle,
    onFocus: onFocus,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React__namespace.createElement(ComboBoxInput, {
    value: focusedItem ? focusedItem[textField] : currentValue,
    onChange: handleChange,
    open: open,
    onKeyDown: handleKeyInputDown,
    onKeyUp: handleKeyInputUp
  }), open && /*#__PURE__*/React__namespace.createElement(ComboBoxListBox, {
    handleListCloseClick: handleListCloseClick,
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

exports.Combobox = Combobox;
