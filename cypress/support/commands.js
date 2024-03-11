const token = `${Cypress.env('trelloToken')}`
const key = `${Cypress.env('trelloKey')}`

Cypress.Commands.add('createBoard', () => {
    const board_name = 'myBoard123'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    })
})






