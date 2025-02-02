describe('Fazendo o login do Líder', () => {
    it('Usuário deveria ser capaz de logar', () => {
        cy.visit('/')
        // fill in the form
        cy.get('input[type="email"]').type('guilherme@gmail.com')
        cy.get('input[type="password"]').type('cebolaRoxa36')

        // submit the form
        cy.get('button').contains('Entrar').click()

        // Verify successful navigation
        cy.url().should('include', '/Dashboard')
        //cy.contains('button', 'Logout').should('be.visible')
    })
})

describe('Testando as funcionalidades da tela de configurações', () => {
    it('Usuário deveria ser capaz navegar para a tela de configurações', () => {

        cy.get('button.toggle-button').should('be.visible').click()

        // Aguardar o menu abrir e clicar na opção "Configurações"
        cy.get('.menu-item').contains('Configurações').click()

        cy.get('button.toggle-button').should('be.visible').click()

        // Verify successful navigation
        cy.url().should('include', '/Configuracoes')
    })

    it('Através de Configurações, usuário deveria ser capaz de navegar para a tela de gerenciar liderados', () => {
        cy.get('button').contains('Visualizar Pessoas Lideradas').click()
    })

    it('Usuário deveria ser capaz de editar um estagiário', () => {
        // Seleciona a primeira descrição da tabela (ajuste se necessário)
        cy.get('.custom-table tbody tr').first().within(() => {
            cy.get('td').eq(4).find('svg').should('be.visible').click();
        })

        cy.wait(1000);
        cy.get('select[name="selectedLiderUsuario"]').should('exist');

        cy.get('select[name="selectedLiderUsuario"]').should('be.visible').select('Guilherme Alexandre');

        cy.get('button').contains('Salvar Alterações').click()

        cy.get('.swal2-confirm').should('contain', 'OK').click();
    })
})

describe('Testando a função de deslogar', () => {
    it('Usuário deveria ser capaz de deslogar', () => {
        cy.get('button.toggle-button').should('be.visible').click()

        // Aguardar o menu abrir e clicar na opção "Sair"
        cy.get('.menu-item').contains('Sair').click()

        // Verify successful navigation
        cy.url().should('include', '/')
    })
})