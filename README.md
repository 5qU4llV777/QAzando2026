# Testes Automatizados — Blog Pessoal (Cypress)

Suíte de testes end-to-end em Cypress para a aplicação [Blog Pessoal](https://react-blogpessoal-three.vercel.app/), cobrindo os fluxos de **login** e **cadastro** de usuário.

## 🎯 Aplicação sob teste

- **Front-end:** https://react-blogpessoal-three.vercel.app/
- **API:** https://blogpessoa-n2dk.onrender.com

## 🎥 Vídeo de referência

[![Assista ao vídeo](https://img.youtube.com/vi/wYJfPFMq4Z0/0.jpg)](https://www.youtube.com/watch?v=wYJfPFMq4Z0)

## 📁 Estrutura do projeto

```
cypress/
├── e2e/
│   ├── login.cy.js       # Cenários de login
│   └── cadastro.cy.js    # Cenários de cadastro de usuário
├── fixtures/
├── screenshots/          # Gerado automaticamente em falhas
└── support/
    ├── commands.js
    └── e2e.js
cypress.config.js
package.json
```

## 🚀 Como rodar

Instale as dependências (se ainda não tiver feito):

```bash
npm install
```

Abra o Cypress no modo interativo:

```bash
npx cypress open
```

Ou rode tudo direto no terminal (headless):

```bash
npx cypress run
```

Para rodar só um arquivo específico:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## ✅ Cenários cobertos

### `login.cy.js`
| Cenário | Descrição |
|---|---|
| Login com sucesso | Autentica com credenciais válidas, valida o toast de sucesso e o redirecionamento para `/home` |
| Login com senha inválida | Valida o toast de erro exibido |
| Login com e-mail inválido | Valida o toast de erro exibido |
| Login com campos vazios | Garante que o usuário não é autenticado |

### `cadastro.cy.js`
| Cenário | Descrição |
|---|---|
| Cadastro com sucesso | Preenche o formulário com e-mail único (gerado dinamicamente) e valida o retorno à tela de login |
| Cadastro com e-mail inválido (sem `@`) | Valida o toast de erro exibido |
| Cadastro com senhas diferentes | Valida o toast de erro exibido |

## ⚠️ Pontos de atenção / decisões técnicas

- **Rotas diretas dão 404:** o deploy na Vercel não tem *rewrite* configurado para o roteamento client-side do React Router. Por isso, os testes **nunca** usam `cy.visit()` em rotas internas (`/login`, `/cadastro`) — sempre visitam a raiz `/` e navegam clicando nos links da própria aplicação (`cy.contains('Cadastre-se').click()`).
- **Mensagens de erro/sucesso:** a aplicação usa a biblioteca [react-toastify](https://fkhadra.github.io/react-toastify/). Os toasts têm `id` dinâmico (muda a cada exibição), então os testes usam o atributo estável `[role="alert"]` para localizá-los, nunca o `id`.
- **E-mail único no cadastro:** como o campo "usuário" é único no banco, o teste de cadastro com sucesso gera um e-mail diferente a cada execução (`` `teste${Date.now()}@teste.com` ``) para evitar falha por usuário já existente.
- **Seletores principais usados:**
  - `#usuario` — campo de e-mail (login e cadastro)
  - `#senha` — campo de senha
  - `#confirmarSenha` — campo de confirmação de senha (cadastro)
  - `input[placeholder="Nome"], input#nome, input[name="nome"]` — campo de nome (cadastro); seletor combinado pois o atributo exato não foi confirmado
  - `button[type="submit"]` — botões de ação (sem `id`)
  - `[role="alert"]` — mensagens de toast (erro/sucesso)

## 📌 Melhorias futuras

- Confirmar o seletor exato do campo "Nome" (id/name real) para simplificar o seletor combinado.
- Adicionar teste de cadastro com campos vazios.
- Criar comando customizado `cy.login()` em `support/commands.js` para reutilizar o fluxo de autenticação em outros testes (ex: criação de postagem, exclusão de usuário).
- Adicionar testes de API (`cy.request()`) diretamente contra `https://blogpessoa-n2dk.onrender.com`, cobrindo os mesmos cenários sem depender da UI.
