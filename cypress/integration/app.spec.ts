/// <reference types="cypress" />
describe('App', function() {
  it('Search for a place and get direction should work', function() {
    cy.visit('http://localhost:3000')
    cy.get('input')
      .type('Kamppi')
    cy.get('.dropdown-item')
      .first()
      .click()
      .wait(1000)
    cy.get('button')
      .click()
      .wait(1000)
      .get('.btn')
      .last()
      .click()
  })
})