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
        })
    })
})

Cypress.Commands.add('createList', () => {
    cy.readFile('cypress/fixtures/testdata.json').then(response => {
        const board_id = response.board_id;
        cy.log(board_id);
        const list_name = 'myList666'
        cy.api({
            method: 'POST',
            url: '/1/boards/' + board_id + '/lists?name=' + list_name + '&key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            cy.writeFile('cypress/fixtures/testdata.json', {
                // Wwrite again board_id since the command above will not add the list_id into the file, but rewrite it, so board id will be lost. Can do this or write other file.
                "board_id": board_id,
                "list_id": response.body.id
            })
        })
    })
})

Cypress.Commands.add('createCard', () => {
    cy.readFile('cypress/fixtures/testdata.json').then(response => {
        const list_id = response.list_id;
        const board_id = response.board_id;
        cy.log(list_id);
        cy.api({
            method: 'POST',
            url: '/1/cards?idList=' + list_id + '&key=' + key + '&token=' + token,
            body: {
                name: "myCard1"
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            cy.writeFile('cypress/fixtures/testdata.json', {
                // Wwrite again board_id since the command above will not add the list_id into the file, but rewrite it, so board id will be lost. Can do this or write other file.
                "card_id": response.id,
                "board_id": board_id,
                "list_id": list_id
            })
        })
    })
})

Cypress.Commands.add('deleteCard', () => {
    cy.readFile('cypress/fixtures/testdata.json').then(response => {
        const card_id = response.card_id;
        cy.log(card_id);
        cy.api({
            method: 'DELETE',
            url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})
