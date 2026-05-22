// Testes de API simples para produtos usando Cypress
// Exemplo de API pública de produtos: https://fakestoreapi.com/

describe('API de Produtos - Testes simples com Cypress', () => {
  const baseUrl = 'https://fakestoreapi.com/products';
  const sampleProductId = 1;
  const newProduct = {
    title: 'Caneca de café',
    price: 29.9,
    description: 'Caneca para café quente',
    image: 'https://example.com/caneca.jpg',
    category: 'home',
  };

  it('Deve buscar a lista de produtos usando o método GET', () => {
    // Faz uma requisição GET para obter todos os produtos
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Deve validar que a resposta da lista de produtos retorna status 200', () => {
    // Valida explicitamente que o status da resposta é 200
    cy.request('GET', baseUrl).its('status').should('equal', 200);
  });

  it('Deve validar que a lista de produtos retorna um array', () => {
    // Verifica se o body da resposta é um array
    cy.request('GET', baseUrl).then((response) => {
      expect(response.body).to.be.an('array');
    });
  });

  it('Deve buscar um produto específico pelo ID usando o método GET', () => {
    // Faz uma requisição GET para um produto específico
    cy.request('GET', `${baseUrl}/${sampleProductId}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('Deve validar que o produto específico retorna status 200', () => {
    // Valida o status da resposta para o produto específico
    cy.request('GET', `${baseUrl}/${sampleProductId}`).its('status').should('equal', 200);
  });

  it('Deve validar que o produto específico possui campos como id, nome e preço', () => {
    // Verifica se o produto retornado possui os campos esperados
    cy.request('GET', `${baseUrl}/${sampleProductId}`).then((response) => {
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('price');
    });
  });

  it('Deve cadastrar um novo produto usando o método POST', () => {
    // Envia um novo produto via POST
    cy.request('POST', baseUrl, newProduct).then((response) => {
      expect(response.status).to.be.oneOf([201, 200]);
    });
  });

  it('Deve validar que o cadastro retorna status 201 ou status de sucesso', () => {
    // Valida que o cadastro do produto retorna status 201 ou outro status de sucesso
    cy.request('POST', baseUrl, newProduct).then((response) => {
      expect([200, 201]).to.include(response.status);
    });
  });

  it('Deve validar que o produto cadastrado retorna os dados enviados no body', () => {
    // Valida que os dados retornados no body correspondem ao produto enviado
    cy.request('POST', baseUrl, newProduct).then((response) => {
      expect(response.body).to.have.property('title', newProduct.title);
      expect(response.body).to.have.property('price', newProduct.price);
    });
  });
});
