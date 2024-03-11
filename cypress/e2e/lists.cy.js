describe('/lists', () => {
    const token = `${Cypress.env('trelloToken')}`
    const key = `${Cypress.env('trelloKey')}`

    it('Create a List on a Board', () => {
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
            })
            cy.api({
                method: 'DELETE',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,                
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('Get a List', () => {
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
                    method: 'GET',
                    url: '/1/lists/' + list_id + '?key=' + key + '&token=' + token,
                }).then(response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.name))
                    cy.log(list_id)
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

    it('Update a List - name', () => {
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
                    method: 'PUT',
                    url: '/1/lists/' + list_id + '?key=' + key + '&token=' + token,
                    body: {
                        "name": "myList2"
                    }
                }).then(response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body.name))
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



