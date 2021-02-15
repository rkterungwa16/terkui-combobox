import * as React from "react";
import PropTypes from "prop-types";
import { StyledComboboxOption } from "./style";
import ComboBoxContext from "./ComboBoxContext";

const ComboboxListOption = (props) => {
  const { selected, focused, dataItem } = props;
  const comboBoxContext = React.useContext(ComboBoxContext);
  const handleSelect = (event) => {
    console.log("options handle select", event);
    comboBoxContext.handleSelect(dataItem, event);
  };

  return (
    <StyledComboboxOption
      focused={focused}
      selected={selected}
      onClick={handleSelect}
    >
      {dataItem[comboBoxContext.textField]}
    </StyledComboboxOption>
  );
};

ComboboxListOption.propTypes = {
  activeId: PropTypes.string,
  dataItem: PropTypes.any,
  index: PropTypes.number,
  focused: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

/**
 * Using arrow keys changes the items that are on focus
 * Clicking enter on a focused item selects the item
 * - The selected item is displayed in the input box
 * - The selected item in the list box has full background color
 *
 * If the text in the input box does not match any item in the listbox,
 * none of the items will be selected
 */

export default ComboboxListOption;
