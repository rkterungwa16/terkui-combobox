
const typeOptions = { delay: 35 }

describe("Combobox Integration Test", function() {
  beforeEach(function () {
    cy.visitStory('example-combobox--combo-box')
  })
  it('Should display default item value in input when clicked', () => {
    cy.get('#cb_input').click()
    cy.get('#cb_input')
    .should('have.value', 'Jimmy')
  })

  it('Should make input box the focus', () => {
    cy.get('#cb_input').click()
    cy.get('#cb_input')
    .should('have.focus')
  })

  it('Should display list of items', () => {
    cy.get('#cb_input').click()
    cy.get("#cb_listbox")
    .should('have.attr', 'role');
  })

  // it('Should display the first matching item in input', () => {
  //   cy.get('#cb_input')
  //   .click()
  //   .type('Jim', typeOptions)

  //   cy.get('#cb_input')
  //   .should('have.value', 'Jimmy')
  // })
})
