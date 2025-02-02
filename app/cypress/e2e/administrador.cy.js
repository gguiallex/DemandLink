describe('Fazendo o login do Administrador', () => {
  it('Usuário deveria ser capaz de logar', () => {
    cy.visit('/')
    // fill in the form
    cy.get('input[type="email"]').type('anaclara.esg@gmail.com')
    cy.get('input[type="password"]').type('limaoVerde99')

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