describe('Login', () => {


  //Cenario 1
  it('Login com sucesso', () => {
    // rodar o teste navegador npx cypress open

    // visitar a pagina
    cy.visit('https://automationpratice.com.br/login')

    // preencher o formulario com usuario
    cy.get('#user').type('test@test.com')

    // preencher o formulario com senha
    cy.get('#password').type('12345678')

    //clicar no botao de login
    cy.get('#btnLogin').click()

    // validar o resultado
    cy.get('#swal2-title').should('have.text', 'Login realizado')
  })

  it('Login com senha invalida', () => {
    // implementar depois

   // visitar a pagina
    cy.visit('https://automationpratice.com.br/login')

    // preencher o formulario com usuario
    cy.get('#user').type('test@test.com')

    // preencher o formulario com senha
    cy.get('#password').type('123')

    //clicar no botao de login
    cy.get('#btnLogin').click()

    // validar o resultado
    cy.get('#swal2-title').should('have.text', 'Login realizado')
  

  })
})
