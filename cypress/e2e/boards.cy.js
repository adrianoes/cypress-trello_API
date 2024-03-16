describe('/boards', () => {
    const token = `${Cypress.env('trelloToken')}`
    const key = `${Cypress.env('trelloKey')}`

    it('Create a Board', () => {
        cy.createBoard()
        cy.deleteBoard()        
    })

    it('Get a Board', () => {
        cy.createBoard()
        cy.readFile('cypress/fixtures/testdata.json').then(response => {
            const board_id = response.board_id;
            cy.log(board_id);
            cy.api({
                method: 'GET',
                url: '/1/boards/' + board_id + '?key=' + key + '&token=' + token,
            }).then(response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body.name))
                cy.log(board_id)
            })        
        })
        cy.deleteBoard()
    })

    it('Update a Board - name', () => {
        cy.createBoard()
        cy.readFile('cypress/fixtures/testdata.json').then(response => {
            const board_id = response.board_id;
            cy.log(board_id);
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
        })
        cy.deleteBoard()        
    })

    it('Delete a Board', () => {
        cy.createBoard()
        cy.deleteBoard()
    })
})