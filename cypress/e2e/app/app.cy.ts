describe('Visit the app', () => {
    // [SPL-1572,SPL-1126,SPL-1426]
    it('Successfully loads the app.', () => {
        cy.visit('http://localhost:3000')
    })
})
