describe('Login', () => {

  beforeEach(() => {
    // A rota /login dá 404 se acessada direto (SPA sem rewrite configurado na Vercel).
    // A raiz do site já carrega a tela de login por padrão.
    cy.visit('https://react-blogpessoal-three.vercel.app/')
  })

  // Cenario 1
  it('Login com sucesso', () => {
    cy.get('#usuario').type('testador@teste.com')
    cy.get('#senha').type('12345678')

    cy.get('button[type="submit"]').contains('Entrar').click()

    // Valida o toast de sucesso
    cy.contains('Usuário foi autenticado com sucesso!').should('be.visible')

    // Valida o redirecionamento
    cy.url().should('include', '/home')
  })

  // Cenario 2
  it('Login com senha invalida', () => {
    cy.get('#usuario').type('testador@teste.com')
    cy.get('#senha').type('senhaerrada')

    cy.get('button[type="submit"]').contains('Entrar').click()

    // Valida o toast de erro (react-toastify)
    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Os dados do Usuário estão inconsistentes!')

    // Confirma que não saiu da tela de login
    cy.url().should('not.include', '/home')
  })

  // Cenario 3
  it('Login com email invalido', () => {
    cy.get('#usuario').type('emailquenaoexiste@teste.com')
    cy.get('#senha').type('12345678')

    cy.get('button[type="submit"]').contains('Entrar').click()

    cy.get('[role="alert"]')
      .should('be.visible')
      .and('contain.text', 'Os dados do Usuário estão inconsistentes!')

    cy.url().should('not.include', '/home')
  })

  // Cenario 4
  it('Login com campos vazios', () => {
    cy.get('button[type="submit"]').contains('Entrar').click()

    // Ajuste este assert conforme o comportamento real
    // (o form pode bloquear via validação HTML5 do campo required)
    cy.url().should('not.include', '/home')
  })
})
