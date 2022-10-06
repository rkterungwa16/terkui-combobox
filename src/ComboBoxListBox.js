import * as React from "react";
import PropTypes from "prop-types";
import { StyledComboboxListBox } from "./style";
import ComboboxListOption from "./ComboBoxListOption";
import { useClickOutside } from "./useClickOutside";

const mapDataItems = (data, fn) => {
  return data.map((item, idx) => fn(item, idx, false));
};

// Map items for data requiring grouping

const ComboBoxListBox = (props) => {
  const { data, focusedItem, open} = props;
  return (
    <StyledComboboxListBox aria-live={open && "polite"}>
      {mapDataItems(data, (item, idx) => {
        return (
          <ComboboxListOption
            key={`option_${idx}`}
            dataItem={item}
            focused={focusedItem === item} // Why so? is it based on reference?
          />
        );
      })}
    </StyledComboboxListBox>
  );
};

ComboBoxListBox.propTypes = {
  data: PropTypes.array,
  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,
  handleListCloseClick: PropTypes.func,
};

export default ComboBoxListBox;
