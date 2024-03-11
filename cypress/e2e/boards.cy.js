describe('/boards', () => {
    const token = `${Cypress.env('trelloToken')}`
    const key = `${Cypress.env('trelloKey')}`

    it('Create a Board', () => {
        // uso cy.api ao invés de cy.request porque já instalei o plugin de api
        cy.createBoard().then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const board_id = response.body.id
            cy.log(board_id)
            // Create a Board API test ends here, however I'll keep the delete request so my board will no be messed up
            cy.api({
                method: 'DELETE',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('Get a Board', () => {
        cy.createBoard().then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const board_id = response.body.id
            cy.log(board_id)
            cy.api({
                method: 'GET',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
                cy.log(board_id)
            })
            cy.api({
                method: 'DELETE',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('Update a Board - name', () => {
        cy.createBoard().then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const board_id = response.body.id
            cy.log(board_id)
            cy.api({
                method: 'PUT',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
                body: {
                    "name": "myBoard2"
                }
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
            })
            cy.api({
                method: 'DELETE',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('Delete a Board', () => {
        cy.createBoard().then(response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body.name))
            const board_id = response.body.id
            cy.log(board_id)
            cy.api({
                method: 'DELETE',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })
    })
})

