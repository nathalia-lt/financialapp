describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173')
    cy.contains("Money Tracker").should('be.visible')

    cy.get('#daily-expenses details').should('not.have.attr', 'open')
    cy.get('#daily-expenses summary').should('be.visible').click()
    cy.get('#daily-expenses details').should('have.attr', 'open')

    cy.contains('SIMcard').should('be.visible')

  })
  // it('loads the title', () => {

  // })

})