describe('Login process', () => {
    // [SPL-1282,SPL-1439]
    it('Can load the login page. Nest level 1', () => {
        cy.visit('http://localhost:3000/login')
    })

    it('Should contain the text "Login". Nest level 1', () => {
        cy.contains('Login')
    })
})

describe('Logging in', () => {
    // [SPL-1902,SPL-1911]
    describe('Outputs', () => {
        describe('All about outputs', () => {
            it('Can also do some outputs and stuff lol. Nest level 3', () => {
                cy.get('#password')
            })
        })

        it('Some test thing. Nest level 2', () => {
            cy.get('#password')
        })
    })

    describe('Input fields', () => {
        it('Has an input field for password. Nest level 2', () => {
            cy.get('#password')
        })
    })

    it('Is a test that sits outside the nested describe block.')
})
