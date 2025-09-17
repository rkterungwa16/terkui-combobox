// Options for typing in input fields
const typeOptions = { delay: 1000, force: true };

describe("Combobox Integration Test", () => {
  beforeEach(() => {
    cy.visitStory("example-combobox--combo-box");
  });
  it("Should display default item value in input when clicked", () => {
    cy.get("#cb_input").click();
    cy.get("#cb_input").should("have.value", "Jimmy");
  });

  it("Should make input box the focus", () => {
    cy.get("#cb_input").click();
    cy.get("#cb_input").should("have.focus");
  });

  it("Should display list of items", () => {
    cy.get("#cb_input").click();
    cy.get("#cb_listbox").should("have.attr", "role");
  });

  it("Should display the first matching item in input", () => {
    cy.get("#cb_input").should("have.value", "Jimmy");
  });

  it("Should display the second item after pressing the down arrow", () => {
    cy.get("#cb_input").click().type("{downarrow}").should("have.value", "jim");
  });

  it("Should display the last item after pressing the up arrow", () => {
    cy.get("#cb_input").click().type("{uparrow}").should("have.value", "John");
  });

  it("Should delete all default input values after pressing backspace", () => {
    cy.get("#cb_input")
      .click()
      .type("{backspace}{backspace}{backspace}{backspace}{backspace}")
      .should("have.value", "");
  });

  it("Should enter input values with suggestion", () => {
    cy.get("#cb_input")
      .click()
      .type("{backspace}{backspace}{backspace}{backspace}{backspace}ji")
      .should("have.value", "Jimmy");
  });
});
