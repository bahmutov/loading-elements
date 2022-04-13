/// <reference types="cypress" />

Cypress.Commands.add('invisibleInViewport', (selector) => {
  cy.window({ log: false }).then((win) => {
    // get the current viewport of the application
    const { innerHeight, innerWidth } = win
    cy.log(JSON.stringify({ innerHeight, innerWidth }))

    cy.get(selector).should(($el) => {
      $el.each((k, el) => {
        // skip stray and hidden elements
        if (!Cypress.dom.isAttached(el)) {
          return
        }
        if (!Cypress.dom.isVisible(el)) {
          return
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const rect = el.getBoundingClientRect()

        if (rect.top < 0 || rect.bottom > innerHeight) {
          // the element is outside the viewport vertically
          return
        }
        if (rect.left < 0 || rect.right > innerWidth) {
          // the element is outside the viewport horizontally
          return
        }

        throw new Error(`loader ${k + 1} is visible`)
      })
    })
  })

  cy.log(`${selector} is invisible in viewport`)
})
