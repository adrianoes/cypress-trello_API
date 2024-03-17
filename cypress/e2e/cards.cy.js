describe('/cards', () => {
    const token = `${Cypress.env('trelloToken')}`
    const key = `${Cypress.env('trelloKey')}`

    it.only('Create a new Card', () => {
        cy.createBoard()
        cy.createList()
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
                    "card_id": response.body.id,
                    "board_id": board_id,
                    "list_id": list_id
                })               
            })
            cy.deleteCard()
        })
        cy.deleteBoard()
    })


it('Get a Card', () => {
    const board_name = 'myBoard123'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    }).then(response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body.name))
        const board_id = response.body.id
        cy.log(board_id)
        const list_name = 'myList666'
        cy.api({
            method: 'POST',
            url: '/1/boards/' + board_id + '/lists?name=' + list_name + '&key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const list_id = response.body.id
            cy.log(list_id)
            cy.api({
                method: 'POST',
                url: '/1/cards?idList=' + list_id + '&key=' + key + '&token=' + token,
                body: {
                    name: "myCard1"
                }
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
                const card_id = response.body.id
                cy.log(card_id)
                cy.api({
                    method: 'GET',
                    url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
                }).then(response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.name))
                    cy.log(card_id)
                })
                cy.api({
                    method: 'DELETE',
                    url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
                }).then(response => {
                    expect(response.status).to.eq(200)
                })
            })
        })
        cy.api({
            method: 'DELETE',
            url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})

it('Update a Card - name', () => {
    const board_name = 'myBoard123'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    }).then(response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body.name))
        const board_id = response.body.id
        cy.log(board_id)
        const list_name = 'myList666'
        cy.api({
            method: 'POST',
            url: '/1/boards/' + board_id + '/lists?name=' + list_name + '&key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const list_id = response.body.id
            cy.log(list_id)
            cy.api({
                method: 'POST',
                url: '/1/cards?idList=' + list_id + '&key=' + key + '&token=' + token,
                body: {
                    name: "myCard1"
                }
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
                const card_id = response.body.id
                cy.log(card_id)
                cy.api({
                    method: 'PUT',
                    url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
                    body: {
                        name: "myCard2"
                    }
                }).then(response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.name))
                    cy.log(card_id)
                })
                cy.api({
                    method: 'DELETE',
                    url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
                }).then(response => {
                    expect(response.status).to.eq(200)
                })
            })
        })
        cy.api({
            method: 'DELETE',
            url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})

it('Delete a Card', () => {
    const board_name = 'myBoard123'
    cy.api({
        method: 'POST',
        url: '/1/boards/?name=' + board_name + '&key=' + key + '&token=' + token,
    }).then(response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body.name))
        const board_id = response.body.id
        cy.log(board_id)
        const list_name = 'myList666'
        cy.api({
            method: 'POST',
            url: '/1/boards/' + board_id + '/lists?name=' + list_name + '&key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const list_id = response.body.id
            cy.log(list_id)
            cy.api({
                method: 'POST',
                url: '/1/cards?idList=' + list_id + '&key=' + key + '&token=' + token,
                body: {
                    name: "myCard1"
                }
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
                const card_id = response.body.id
                cy.log(card_id)
                cy.api({
                    method: 'DELETE',
                    url: '/1/cards/' + card_id + '?key=' + key + '&token=' + token,
                }).then(response => {
                    expect(response.status).to.eq(200)
                })
            })
        })
        cy.api({
            method: 'DELETE',
            url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    })
})
})



