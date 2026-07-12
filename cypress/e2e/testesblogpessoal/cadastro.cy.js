describe('Cadastro', () => {

  beforeEach(() => {
    // A rota /login também dá 404 se acessada direto (mesmo problema de rewrite).
    // A raiz do site já carrega a tela de login por padrão.
    cy.visit('https://react-blogpessoal-three.vercel.app/')
    cy.contains('Cadastre-se').click()
    cy.url().should('include', '/cadastro')
  })

  // Cenario 1
  it('Cadastro com sucesso', () => {
    // e-mail dinâmico pra não dar conflito de "usuário já existe" ao rodar o teste várias vezes
    const emailUnico = `teste${Date.now()}@teste.com`

    cy.get('input[placeholder="Nome"], input#nome, input[name="nome"]').type('Testador da Silva')
    cy.get('#usuario').type(emailUnico)
    cy.get('#senha').type('12345678')
    cy.get('#confirmarSenha').type('12345678')

    cy.contains('button', 'Cadastrar').click()

    // O cadastro dá certo (POST 201) e redireciona de volta pra tela de login, na raiz do site
    cy.url().should('eq', 'https://react-blogpessoal-three.vercel.app/')
    cy.get('#usuario').should('be.visible')
  })

  // Cenario 2
  it('Cadastro com email invalido (sem @)', () => {
    cy.get('input[placeholder="Nome"], input#nome, input[name="nome"]').type('Testador')
    cy.get('#usuario').type('testadorSemArroba')
    cy.get('#senha').type('12345678')
    cy.get('#confirmarSenha').type('12345678')

    cy.contains('button', 'Cadastrar').click()

    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Erro ao cadastrar o usuário!')
  })

  // Cenario 3
  it('Cadastro com senhas diferentes', () => {
    cy.get('input[placeholder="Nome"], input#nome, input[name="nome"]').type('Testador')
    cy.get('#usuario').type(`teste${Date.now()}@teste.com`)
    cy.get('#senha').type('12345678')
    cy.get('#confirmarSenha').type('87654321')

    cy.contains('button', 'Cadastrar').click()

    cy.get('[role="alert"]')
      .should('be.visible')
  })
})