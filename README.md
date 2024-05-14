# Projeto de Desenvolvimento WEB: Aprendizado em Testes de Software

Este é um projeto WEB que utiliza as seguintes tecnologias:
- HTML: 💻
- CSS: 🎨
- JavaScript: 🟡
- Node.js:🟢
- Express: 🟢


 Este projeto visa oferecer um ambiente virtual projetado especificamente para facilitar o cadastro de conteúdos e atividades relacionadas aos testes de software.
 Através do sistema de cadastro de conteúdos, você pode criar e compartilhar informações sobre uma variedade de tópicos relacionados aos testes de software.

## Índice

1. [Configuração](#configuração)
2. [Utilização](#utilização)
3. [Contribuição](#contribuição)
4. [Licença](#licença)

## Configuração

1. Clone o repositório:

    `git clone git@github.com:taynaraluanacaetano/crud_clientes_node.git `

2. Instale as dependências:

    `No diretório do backend execute o seguinte comando: npm install`

## Utilização

1. Para que você acesse a aplicação do frontEnd, basta acessar a seguinte URL:

    `https://crud-clientes-node.vercel.app/`

2. Para que você consiga utilizar o backend e os cadastros, você vai precisar executar o servidor local, para isso siga os seguintes passos:

- Navegue até a pasta do backend;
- Execute o seguinte comando:

         `node app.js`

- Pronto, você irá notar que uma mensagem foi apresentada no seu terminal do vsCode, apresentando a porta em que sua aplicação está rodando, com isso agora você poderá utilizar uma base de dados local, a base do projeto. 
- Abra o postman e execute uma consulta GET por exemplo, utilizando o seguinte CURL:

        `curl --location 'http://localhost:3000/users/'`
- A resposta esperada deverá ser 200 para a sua listagem. Como será a sua primeira execução, é comum que nenhum registro seja listado.