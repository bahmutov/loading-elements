/// <reference types="cypress" />

// SKIP: shows the failing assertion
it.skip('the second loading element never goes away', () => {
  cy.visit('public/index.html')
  // at first, both loading elements are visible
  cy.get('.loading').should('have.length', 3).and('be.visible')
  // the loaders on the first page disappear
  // but the loader on the second page is still visible
  // so the next assertion fails
  cy.get('.loading').should('not.be.visible')
})

it('using :visible jQuery selector', () => {
  cy.visit('public/index.html')
  // at first, both loading elements are visible
  cy.get('.loading').should('have.length', 3).and('be.visible')
  // then one of them goes away, but the other one stays
  // so the number of visible loading elements becomes 1
  cy.get('.loading:visible').should('have.length', 1)
})
