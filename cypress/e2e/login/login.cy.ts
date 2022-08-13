// [SPL-1282,SPL-1439]

describe('Login process', () => {
    it('Can load the login page.', () => {
        cy.visit('http://localhost:3000/login')
    })

    it('Should contain the text \'Login\'', () => {
        cy.contains('Login')
    })
})

describe('Logging in', () => {
    describe('Input fields', () => {
        it('Has an input field for password', () => {
            cy.get('#password')
        })
    })
})
