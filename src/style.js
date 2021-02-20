import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledComboboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 370px;
`;

export const StyledComboboxInput = styled.input.attrs((props) => ({
  className: props.className,
}))`
  ${(props) => {
    return `
      ${
        props.open
          ? "border-radius: 10px 10px 0px 0px;"
          : "border-radius: 10px;"
      }
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
  placeholder: "search country",
  role: "combobox",
  "aria-owns": "cb_listbox",
  "aria-busy": "false",
  "aria-haspopup": "true",
  "aria-expanded": "true",
  "aria-controls": "cb_listbox",
  "aria-autocomplete": "both",
  "aria-readonly": "false",
  "aria-disabled": "false",
  open: false,
};

export const StyledComboboxListBox = styled.ul.attrs((props) => ({
  className: props.className,
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
  "aria-labelledby": "cb_input",
};

const focusStyles = {
  true: `
      background-color: transparent;
      border: 1px #47525d solid;
      color: #333;
    `,
  false: "",
};

const selectStyles = {
  true: `
    background-color: #eee;
    border-color: #eee;
    color: #fff;
  `,
};

export const StyledComboboxOption = styled.li.attrs((props) => ({
  className: props.className,
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
  ${(props) => {
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
  selected: PropTypes.bool,
};

StyledComboboxOption.defaultProps = {
  role: "option",
  tabindex: "-1",
  "aria-selected": "false",
  selected: false,
  focused: false,
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
