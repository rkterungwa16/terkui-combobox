import * as React from "react";
import PropTypes from "prop-types";
import * as Filter from "./filter-utils";
import ComboBoxContext from "./ComboBoxContext";
import { StyledComboboxWrapper } from "./style";

import ComboBoxListBox from "./ComboBoxListBox";
import ComboBoxInput from "./ComboBoxInput";
import { useClickOutside } from "./useClickOutside";

const Combobox = (props) => {
  const { value, data, caseSensitive, textField, valueField, suggest } = props;
  const [currentValue, setCurrentValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [focusedItem, setFocusedItem] = React.useState(data[0]);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const comboBoxRef = React.useRef(null);

  /**
   * Set value on first render
   */
  React.useEffect(() => {
    if (!currentValue && value) {
      setCurrentValue(value);
    }
  }, [currentValue, value]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (!isDeleting) {
      // return the first item that meets the filter criteria
      const currentItem = Filter.suggest(data, {
        textField,
        searchTerm: value,
        filter: suggest,
        caseSensitive,
      });

      console.log("currentItem", currentItem);
      console.log("value", value);
      setFocusedItem(currentItem);
    }
    if (isDeleting) {
      setCurrentValue(value);
      setFocusedItem(null);
    }
  };

  const handleKeyInputDown = (e) => {
    const { key } = e;
    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(true);
    }
  };

  const handleKeyInputUp = (e) => {
    const { key } = e;
    if (key === "Backspace" || key === "Delete") {
      setIsDeleting(false);
    }
  };

  const handleKeyDown = (e) => {
    const { key } = e;
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
      setFocusedItem(Filter.next(focusedItem, data));
    }

    if (key === "ArrowUp") {
      setFocusedItem(Filter.prev(focusedItem, data));
    }
  };

  const handleSelect = (dataItem, e) => {
    setFocusedItem(dataItem);
  };

  const toggle = () => {
    comboBoxRef.current.focus();
  };

  const onFocus = (e) => {
    setOpen(true);
  };

  // const onBlur = (e) => {
  //   setOpen(false);
  // };

  const handleListCloseClick = (e) => {
    setOpen(false);
  };

  useClickOutside(comboBoxRef, handleListCloseClick);

  return (
    <ComboBoxContext.Provider value={{ textField, valueField, handleSelect }}>
      <StyledComboboxWrapper
        ref={comboBoxRef}
        onClick={toggle}
        onFocus={onFocus}
        // onBlur={onBlur}
        onKeyDown={handleKeyDown}
      >
        <ComboBoxInput
          value={focusedItem ? focusedItem[textField] : currentValue}
          onChange={handleChange}
          open={open}
          onKeyDown={handleKeyInputDown}
          onKeyUp={handleKeyInputUp}
        />
        {open && (
          <ComboBoxListBox
            handleListCloseClick={handleListCloseClick}
            open={open}
            focusedItem={focusedItem}
            data={data}
          />
        )}
      </StyledComboboxWrapper>
    </ComboBoxContext.Provider>
  );
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
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.oneOf(Object.keys(Filter.presets)),
  ]),
  name: PropTypes.string,
};

Combobox.defaultProps = {
  caseSensitive: false,
};

export default Combobox;
