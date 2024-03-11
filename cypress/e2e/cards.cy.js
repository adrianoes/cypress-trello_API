describe('/cards', () => {
    const token = `${Cypress.env('trelloToken')}`
    const key = `${Cypress.env('trelloKey')}`

    it('Create a new Card', () => {
        cy.createBoard().then(response => {
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
                    url: '/1/cards?idList=' + list_id + '&key='  + key + '&token=' + token,
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

    it('Get a Card', () => {
        cy.createBoard().then(response => {
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
                    url: '/1/cards?idList=' + list_id + '&key='  + key + '&token=' + token,
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
        cy.createBoard().then(response => {
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
                    url: '/1/cards?idList=' + list_id + '&key='  + key + '&token=' + token,
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
        cy.createBoard().then(response => {
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
                    url: '/1/cards?idList=' + list_id + '&key='  + key + '&token=' + token,
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



