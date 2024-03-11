const token = `${Cypress.env('trelloToken')}`
const key = `${Cypress.env('trelloKey')}`

Cypress.Commands.add('createBoard', () => {
    const board_name = 'myBoard666'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    })
})

// Cypress.Commands.add('deleteBoard', () => {
//     const board_id = response.body.id
//     cy.log(board_id)
//             // Create a Board API test ends here, however I'll keep the delete request so my board will no be mess up
//     cy.api({
//         method: 'DELETE',
//         url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,                
//     })            
// })




