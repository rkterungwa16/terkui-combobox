import * as React from "react";
import PropTypes from "prop-types";
import { StyledComboboxInput } from "./style";

const ComboBoxInput = (props) => {
  const [last, setLast] = React.useState(null);
  const comboBoxInputRef = React.useRef(null);
  const { onChange, onKeyDown, onKeyUp, value, open } = props;

  const handleChange = React.useCallback(
    (e) => {
      const latestInputedValue = e.currentTarget.value;
      setLast(latestInputedValue.split("")[latestInputedValue.length - 1]);
      onChange(e, latestInputedValue);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (
      value &&
      last &&
      value.toLowerCase().includes(last.toLowerCase())
    ) {
      const start = value.toLowerCase().indexOf(last.toLowerCase());
      const end = value.length - start;
      if (start >= 0 && end !== 0) {
        comboBoxInputRef.current.focus();
        comboBoxInputRef.current.setSelectionRange(start + 1, start + end);
      }
    }
  }, [value, last]);

  console.log('value, last', value, last);
  return (
    <StyledComboboxInput
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onChange={handleChange}
      ref={comboBoxInputRef}
      value={value ? value : ""}
      open={open}
    />
  );
};

ComboBoxInput.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  value: PropTypes.string,
  suggest: PropTypes.bool,
};

export default ComboBoxInput;
