# 📚 BookRegistry API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blue.svg)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-orange.svg)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black.svg)](https://jwt.io/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Uma API RESTful completa e robusta para o cadastro e gerenciamento de livros. O sistema possui controle de acesso via autenticação por tokens JWT, persistência em banco de dados relacional com controle de versões estruturais (migrations) e suporte a upload de arquivos para capas de livros.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias do ecossistema Node.js:

* **Core:** [Express](https://expressjs.com/) — Framework web rápido, flexível e minimalista.
* **Banco de Dados & ORM:** [MySQL](https://www.mysql.com/) com [Sequelize](https://sequelize.org/) (incluindo o uso de **Migrations** para versionamento do banco).
* **Autenticação & Segurança:**
  * [JSON Web Tokens (JWT)](https://jwt.io/) para proteção de rotas e controle de sessão.
  * [BcryptJS](https://github.com/dcodeIO/bcrypt.js) para criptografia e hashing seguro de senhas.
* **Upload de Arquivos:** [Multer](https://github.com/expressjs/multer) para o recebimento e armazenamento de imagens (capas dos livros).
* **Utilitários:**
  * [Lodash](https://lodash.com/) para manipulação otimizada de estruturas de dados.
  * [Dotenv](https://github.com/motdotla/dotenv) para gerenciamento seguro de variáveis de ambiente.
* **Qualidade de Código & Padronização:**
  * [ESLint](https://eslint.org/) para análise estática e prevenção de bugs.
  * [Prettier](https://prettier.io/) para formatação automática e consistente do código.
  * `.editorconfig` para manter a uniformidade de espaçamento entre diferentes editores/IDEs.

---

## 🛠️ Arquitetura e Estrutura do Projeto

A estrutura de pastas segue uma divisão clara baseada no padrão MVC (Model-View-Controller) para APIs:

```text
├── src/
│   ├── config/             # Configurações de banco de dados (Sequelize), JWT e Multer
│   ├── controllers/        # Controladores que lidam com as requisições e lógica de negócio
│   ├── database/           # Conexão com o banco, Migrations e Seeders
│   │   └── migrations/     # Arquivos de versionamento das tabelas
│   ├── middlewares/        # Interceptadores (Autenticação JWT, Validações, Upload)
│   ├── models/             # Modelos do Sequelize representando as tabelas do MySQL
│   ├── routes/             # Definição dos endpoints RESTful da aplicação
│   └── app.js              # Configuração centralizada do servidor Express
├── .editorconfig           # Configuração de indentação do editor
├── .env.example            # Exemplo de variáveis de ambiente necessárias
├── .eslintrc.json          # Regras de validação do ESLint
├── .prettierrc             # Configurações de estilo do Prettier
└── server.js               # Ponto de entrada (Bootstrap) da aplicação
