/// <reference types="cypress" />

it('checks if the loading element is visible within the current viewport', () => {
  cy.visit('public/index.html')

  // at first, both loading elements are visible
  cy.get('.loading').should('have.length', 2).and('be.visible')
  cy.invisibleInViewport('.loading')

  cy.scrollTo('bottom', { duration: 500 })
  // there is one more loading element visible here
  cy.get('.loading:visible').should('have.length', 1)
  // then the last loading element goes away
  cy.invisibleInViewport('.loading')
})
