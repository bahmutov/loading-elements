/// <reference types="cypress" />

Cypress.Commands.add('invisible', (selector) => {
  cy.window().then((win) => {
    const { innerWidth, innerHeight } = win

    cy.get(selector).should(($el) => {
      $el.each((k, el) => {
        if (!Cypress.dom.isVisible(el)) {
          return
        }

        const rect = el.getBoundingClientRect()
        const { top, left, bottom, right } = rect
        if (bottom < 0) {
          return
        }
        if (top > innerHeight) {
          return
        }

        throw new Error(`Still visible: ${selector}`)
      })
    })
  })
})

it('waits for the loading elements to go away', () => {
  cy.visit('public/index.html')
  cy.invisible('.loading')
  cy.scrollTo('bottom', { duration: 1000 })
  cy.invisible('.loading')
})
