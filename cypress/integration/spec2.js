/// <reference types="cypress" />

Cypress.Commands.add('invisibleInViewport', (selector) => {
  cy.window({ log: false }).then((win) => {
    // get the current viewport of the application
    const { innerHeight, innerWidth } = win
    cy.log(JSON.stringify({ innerHeight, innerWidth }))

    cy.get(selector).should(($el) => {
      $el.each((k, el) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const rect = el.getBoundingClientRect()

        if (!rect.top && !rect.bottom && !rect.left && !rect.right) {
          // the element is not visible
          return
        }
        if (rect.top < 0 || rect.bottom > innerHeight) {
          // the element is outside the viewport vertically
          return
        }
        if (rect.left < 0 || rect.right > innerWidth) {
          // the element is outside the viewport horizontally
          return
        }
        expect(el, `loader ${k + 1}`).to.not.be.visible
      })
    })
  })
})

it('checks if the loading element is visible within the current viewport', () => {
  cy.visit('public/index.html')

  // at first, both loading elements are visible
  cy.get('.loading').should('have.length', 2).and('be.visible')
  cy.invisibleInViewport('.loading')

  cy.scrollTo('bottom', { duration: 500 })
  cy.invisibleInViewport('.loading')
})
