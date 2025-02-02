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

describe('Testando as funcionalidades da tela de gerenciar usuários', () => {

  it('Através de Configurações, Administrador deveria ser capaz de navegar para a tela de gerenciar Usuários', () => {
    cy.get('button').contains('Gerenciar Usuários').click()
  })

  it('Administrador deveria ser capaz de adicionar novo usuário', () => {
    cy.get('button').contains('Cadastrar Novo Usuário').click()

    // Preencher o setor
    cy.get('select').first().select('AP');

    // Escolher o tipo de usuário
    cy.get('select').eq(1).select('Comum'); // Ou "Administrador", "Líder", "Estagiario"

    // Preencher o nome do usuário
    cy.get('input[name="NovoUsuario"]').type('Novo Usuário');

    // Preencher o e-mail
    cy.get('input[type="email"]').type('novo.usuario@email.com');

    // Preencher a senha
    cy.get('input[type="password"]').type('SenhaSegura123');

    // Submeter o formulário
    cy.get('button[name="cadastrarUsuarioLogo"]').contains('Cadastrar').click();

    cy.get('.swal2-confirm').should('contain', 'OK').click();
  })

  it('Usuário deveria ser capaz de atualizar a tela de usuários', () => {
    cy.get('.custom-table thead tr').find('th').eq(6).find('svg').should('be.visible').click();
  })

    it('Usuário deveria ser capaz de apagar um usuário', () => {
      // Seleciona o ultimo usuario da tabela
      cy.get('.custom-table tbody tr').last().within(() => {
          cy.get('td').eq(6).find('svg').should('be.visible').click();
      })

       cy.on('window:confirm', (text) => {
         return true; // Simula o clique em "OK"
       });
  })
})

describe('Testando as funcionalidades da tela de gerenciar setores', () => {

  it('Usuário deveria ser capaz de voltar para a tela de configurações', () => {

    cy.get('button.toggle-button').should('be.visible').click()

    // Aguardar o menu abrir e clicar na opção "Configurações"
    cy.get('.menu-item').contains('Configurações').click()

    cy.get('button.toggle-button').should('be.visible').click()

    // Verify successful navigation
    cy.url().should('include', '/Configuracoes')
  })

  it('Através de Configurações, Administrador deveria ser capaz de navegar para a tela de gerenciar Setores', () => {
    cy.get('button').contains('Gerenciar Setores').click()
  })

  it('Administrador deveria ser capaz de adicionar novo setor errado', () => {
    cy.get('button').contains('Cadastrar Novo Setor').click()

    // Preencher o nome do setor
    cy.get('input[placeholder="Nome no qual o setor irá ser chamado"]').type('Setor Teste');

    // Submeter o formulário
    cy.get('button[name="cadastrarSetorLogo"]').contains('Cadastrar').click();

    cy.get('.custom-table thead tr').find('th').eq(4).find('svg').should('be.visible').click();
  })

  it('Administrador deveria ser capaz de adicionar novo setor certo', () => {
        // Preencher a tag do setor
      cy.get('input[placeholder="Tag que será o identificador do setor"]').type('TAG');

      cy.get('button[name="cadastrarSetorLogo"]').contains('Cadastrar').click();
  })

  it('Usuário deveria ser capaz de atualizar a tela de setores', () => {
    cy.get('.custom-table thead tr').find('th').eq(4).find('svg').should('be.visible').click();
  })

     it('Usuário deveria ser capaz de apagar um setor', () => {
       // Seleciona o ultimo setor da tabela
       cy.get('.custom-table tbody tr').last().within(() => {
           cy.get('td').eq(4).find('svg').should('be.visible').click();
       })

        cy.on('window:confirm', (text) => {
          return true; // Simula o clique em "OK"
        });

        cy.on('window:confirm', (text) => {
          return true; // Simula o clique em "OK"
        });
  })
})

describe('Testando a função de deslogar', () => {
  it('Usuário deveria ser capaz de deslogar', () => {
    cy.get('button.toggle-button').should('be.visible').click()

    cy.get('.menu-item').contains('Sair').click()

    cy.url().should('include', '/')
  })
})