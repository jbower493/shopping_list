// [SPL-1572,SPL-1126,SPL-1426]

describe('Visit the app', () => {
    it('Can load the login page.', () => {
        cy.visit('http://localhost:3000')
    })
})
