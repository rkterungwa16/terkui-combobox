# TerkUI-Combobox

- [Getting Started](#getting&nbsp;started)
- [Stories](#stories)
- [Tests](#tests)
- [Usage](#usage)
- [APIs](#apis)

## Getting Started

Clone the repo:

```bash
git clone https://github.com/rkterungwa16/terkui-combobox.git
cd terkui-combobox
```

Install dependencies:
```bash
npm i or yarn
```

## Stories

```bash
npm run storybook
```

## Tests

First run storybook
```bash
npm run storybook
```

Then run test
```bash
npm test
```

## Usage

```js
import React from "react";
import Combobox from "../ComboBox/ComboBox";

let data = [
    { id: 1, fullName: 'Jimmy' },
    { id: 2, fullName: 'jim' },
    { id: 3, fullName: 'James' },
    { id: 4, fullName: 'Jamie' },
    { id: 5, fullName: 'Jamal' },
    { id: 6, fullName: 'Jason' },
    { id: 7, fullName: 'John' },
]

const ComboboxExample = () => (
  <Combobox
    open
    filter="contains"
    data={data}
    valueField="id"
    textField="fullName"
    suggest
  />
);

export default ComboboxExample;
```

## APIs
- **data**: Accept an array of objects
  - The object should have a textField that holds the item id and valueField that the item value.

- **valueField**: is used to identify the data item.

- **textField**: contains the actual data to be displayed in the combobox dropdown.

- **caseSensitive**: Determines if the suggestion or filters of item values is case sensitive. If it is case sensitive, any item that does not meet the exact filter criteria will not be displayed.

- **suggest**: This feature completes the input value with the text from the first input that has similar characters.
  - If the character filter is case sensitive then similar characters may not match if they are not both not the exact case (both upper case or both lower case).

- **filter**:
  - Types:
    - **startsWith**: name of built in method that checks for data items that start with certain text
    - **contains**: name of built in method that checks for data item that contains inputed text.
    - A function that returns true or false for each passed in item.
    - disable filter by entering false.

 - Description
   - Enter input values. Data items that correspond to those values based on the filter type will be returned.
   - If types is "startsWith", the filtered data items returned will be those that have values that starts with similar characters.

- **minLength**:
    - the number of input values that filter comparisons start being made.
    - If the minLength is 3. When the user starts entering values, there is no filtering or suggestions until the third input.
