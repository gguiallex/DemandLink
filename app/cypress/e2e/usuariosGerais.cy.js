describe('Fazendo o login do usuário', () => {
  it('Usuário deveria ser capaz de logar', () => {
    cy.visit('/')
    // fill in the form
    cy.get('input[type="email"]').type('marialuizabm@gmail.com')
    cy.get('input[type="password"]').type('batata45')

    // submit the form
    cy.get('button').contains('Entrar').click()

    // Verify successful navigation
    cy.url().should('include', '/Dashboard')
    //cy.contains('button', 'Logout').should('be.visible')
  })
})

describe('Testando as funcionalidades da tela do DashBoard', () => {

  it('Usuário deveria ser capaz de criar nova demanda', () => {
     // Assumindo que existe um comando customizado para login

    //cy.visit('/Dashboard')
    cy.get('button').contains('Solicitar Demanda').click()

    // fill in the form
    cy.get('select[class="selectSetor "]').select('AP - Administração de Pessoal')
    cy.get('button').contains('Continuar').click()

    cy.get('.selectEnvolvidos').click().type('Maria Luiza{enter}')
    cy.get('button').contains('Continuar').click()

    cy.get('input[placeholder="Projeto ao qual a demanda está relacionada"]').type('Digital')
    cy.get('input[placeholder="Nome ao qual a demanda será chamada"]').type('Carnaval')
    cy.get('textarea').type('Poster sobre o carnaval da Anitta que vai ser apresentado no centro de Lavras')
    cy.get('select[class="selectField "]').select('Alta')
    cy.get('button').contains('Continuar').click()
    cy.get('button').contains('Voltar').click()
    cy.get('button').contains('Continuar').click()

    cy.get('input[type="date"]').type('2025-02-13')

    // submit the form
    cy.get('button').contains('Finalizar').click()
    //cy.contains('Demanda registrada com sucesso!').should('be.visible')
  })

  it('Usuário deverá ser capaz de baixar relatorios semanais', () => {
    cy.get('button').contains('Gerar Relatório').click()
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

  it('Usuário deveria ser capaz de abrir e fechar a descrição da demanda', () => {
    // Garante que a tabela está visível
    cy.get('.custom-table').should('be.visible');

    // Seleciona a primeira descrição da tabela (ajuste se necessário)
    cy.get('.custom-table tbody tr').eq(0).within(() => {
      cy.get('td').eq(4).as('descricaoDemanda');

      // Captura o texto truncado antes do clique
      cy.get('@descricaoDemanda').invoke('text').then((textoTruncado) => {
        // Clica para expandir a descrição
        cy.get('@descricaoDemanda').click();

        // Verifica se o texto completo agora é maior que o texto truncado
        cy.get('@descricaoDemanda').invoke('text').should((textoCompleto) => {
          expect(textoCompleto.length).to.be.greaterThan(textoTruncado.length);
        });

        // Clica novamente para recolher a descrição
        cy.get('@descricaoDemanda').click();

        // Verifica se o texto voltou ao estado truncado
        cy.get('@descricaoDemanda').invoke('text').should('eq', textoTruncado);
      })
    })
  })

  it('Usuário deveria ser capaz de alterar o status da demanda', () => {

    cy.get('.custom-table tbody tr').eq(0).within(() => {
      cy.get('td').eq(8).find('.status-btn').click();

      // Interceptar o confirm e simular a resposta "OK" (confirmando a ação)
      cy.on('window:confirm', (text) => {
        expect(text).to.equal('Você deseja iniciar esta demanda?');
        return true; // Simula o clique em "OK"
      });

      // Verificar o alerta de sucesso após a confirmação
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Demanda iniciada com sucesso!');

      })
    })
  })
})

describe('Testando as funcionalidades da tela das Demandas Criadas pelo Usuário', () => {
  it('Usuário deveria ser capaz navegar para a tela de Solicitações', () => {
    cy.get('button.toggle-button').should('be.visible').click()

    // Aguardar o menu abrir e clicar na opção "Solicitações"
    cy.get('.menu-item').contains('Solicitações').click()

    cy.get('button.toggle-button').should('be.visible').click()

    // Verify successful navigation
    cy.url().should('include', '/Solicitacoes')
  })

  it('Usuário deveria ser capaz de editar uma das demandas solicitadas', () => {
    // Garante que a tabela está visível
    cy.get('.custom-table').should('be.visible');

    // Seleciona a primeira tag da tabela
    cy.get('.custom-table tbody tr').first().within(() => {
      cy.get('td').eq(0).as('tagDemanda').click();
    })

    cy.get('.swal2-popup').should('be.visible');

    // Clica no botão "Editar" dentro do modal
    cy.get('.swal2-confirm').should('contain', 'Editar').click();

    cy.get('button').contains('Salvar Alterações').click();

    cy.get('.swal2-confirm').should('contain', 'OK').click();
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

  it('Usuário deveria ser capaz de editar suas informações', () => {
    cy.get('button').contains('Editar Informações').click();

    cy.get('input[name="passwordAtual"]').type('batata46');
    cy.get('input[name="novaSenha"]').type('batata45');

    // Clicar no botão "Salvar"
    cy.get('button').contains('Salvar').click();

    cy.get('input[name="passwordAtual"]').type('batata45');
    cy.get('input[name="novaSenha"]').type('batata45');

    // Clicar no botão "Salvar"
    cy.get('button').contains('Salvar').click();
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