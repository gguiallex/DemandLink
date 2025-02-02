describe('Fazendo o login do Líder', () => {
    it('Usuário deveria ser capaz de logar', () => {
        cy.visit('/')
        // fill in the form
        cy.get('input[type="email"]').type('guilherme@gmail.comm')
        cy.get('input[type="password"]').type('cebolaRoxa366')

        // submit the form
        cy.get('button').contains('Entrar').click()

        // Verify successful navigation
        cy.url().should('include', '/Dashboard')
        //cy.contains('button', 'Logout').should('be.visible')
    })

    it('Usuário deveria ser capaz de recuperar senha', () => {
        cy.visit('/')

        // submit the form
        cy.get('button').contains('Esqueci minha Senha').click()

        // Verify successful navigation
        cy.url().should('include', '/EsqueciMinhaSenha')
        //cy.contains('button', 'Logout').should('be.visible')
    })

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

describe('Testando as funcionalidades da tela das Demandas Atribuídas ao Usuário', () => {
    it('Usuário deveria ser capaz navegar para a tela de Minhas Demandas', () => {
  
      cy.get('button.toggle-button').should('be.visible').click()
  
      // Aguardar o menu abrir e clicar na opção "Minhas Demandas"
      cy.get('.menu-item').contains('Minhas Demandas').click()
  
      cy.get('button.toggle-button').should('be.visible').click()
  
      // Verify successful navigation
      cy.url().should('include', '/Demandas')
    })
  
    it('Usuário deveria ser capaz de atualizar a demanda em atraso', () => {
        cy.get('.custom-table tbody tr').eq(0).within(() => {          
          // Clica no botão para atualizar a demanda
          cy.get('td').eq(8).find('.status-btn').click();
      
          // Aguarda a atualização do status na tabela
          cy.wait(1000); // Apenas para garantir o tempo de atualização (melhor usar interceptação de API)
      
          // Verifica se o status mudou
          cy.get('td').eq(8).find('.status-btn').invoke('text').should('not.contain', 'Em Atraso');
        });
      });
      
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

        cy.get('button').contains('Salvar Alterações').click()

        cy.get('select[name="selectedLiderUsuario"]').should('be.visible').select('Guilherme Alexandre');

        cy.get('button').contains('Salvar Alterações').click()

        cy.get('.swal2-confirm').should('contain', 'OK').click();
    })

    it('Usuário deveria ser capaz de editar demanda do estagiário', () => {

        cy.get('button').contains('Demanda dos Estagiarios').click()

    })

    it('Usuário deveria ser capaz de bloquear acesso do estagiário', () => {

        cy.get('button').contains('Bloquear Acesso').click()

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