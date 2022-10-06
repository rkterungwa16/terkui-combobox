import React from "react";
import { Combobox } from "..";

let suggestList = [
  { id: 1, fullName: "Jimmy" },
  { id: 2, fullName: "jim" },
  { id: 3, fullName: "James" },
  { id: 4, fullName: "Jamie" },
  { id: 5, fullName: "Jamal" },
  { id: 6, fullName: "Jason" },
  { id: 7, fullName: "John" },
];

export default {
  title: "Example/Combobox",
  component: Combobox,
};

const Template = (args) => <Combobox {...args} />;

export const ComboBox = Template.bind({});
ComboBox.args = {
  filter: "contains",
  data: suggestList,
  valueField: "id",
  textField: "fullName",
  suggest: true,
};

