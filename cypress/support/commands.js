const token = `${Cypress.env('trelloToken')}`
const key = `${Cypress.env('trelloKey')}`

Cypress.Commands.add('createBoard', () => {
    const board_name = 'myBoard123'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    }).then(response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body.name))
        // const board_id = response.body.id            
        cy.writeFile('cypress/fixtures/testdata.json', {
            "board_id": response.body.id
        })
    })
})

Cypress.Commands.add('deleteBoard', () => {
    cy.readFile('cypress/fixtures/testdata.json').then(response => {
        const board_id = response.board_id;
        cy.log(board_id);
        cy.api({
            method: 'DELETE',
            url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });
});
