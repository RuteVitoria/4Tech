

## Estrutura do Projeto

# OS Planos App — Frontend Angular + JSON Server

Aplicação desenvolvida em **Angular** para gerenciamento de **Planos de Saúde** e **Beneficiários**, utilizando um backend mockado com **JSON Server**.  
Este projeto foi entregue como parte de um processo seletivo técnico.

---

## Tecnologias Utilizadas

### **Frontend**

- Angular 17+
- TypeScript
- Angular Material
- Reactive Forms
- RxJS
- Karma + Jasmine (Testes Unitários)

### **Backend Mockado**

- JSON Server
- Arquivo `db.json` fornecido pela empresa

---

## Estrutura do Projeto

/src
├── app
│ ├── core
│ ├── shared
│ └── features
├── assets
├── db.json ← Mock do backend

---

# Como executar o projeto

## 1. Instalar dependências

```bash
npm install
```

---

# Rodar o backend mockado (JSON Server)

## 1. O projeto utiliza o arquivo src/db.json como banco de dados fake

```bash
json-server --watch src/db.json --port 3000

```

# Endpoints disponibilizados

## 1. GET

/planos
Lista planos de saúde

## 2. POST

/planos
Cadastra plano

## 3. GET

/beneficiarios
Lista beneficiários

## 4. POST

/beneficiarios
Cadastra beneficiário

## 4. PUT

/beneficiarios/:id
Edita beneficiário

---

# Rodar o frontend Angular

## A aplicação estará disponível em:

http://localhost:4200

<!-- ```bash -->

npm start

---

## Executando Testes Unitários

- O projeto utiliza Karma + Jasmine.
- ng test
- Os testes incluem:

  Services (mockados com HttpTestingController)

  Components (com spies de Router, MatDialog, ActivatedRoute)

  Reactive Forms (validações + submit)

  Fluxos de criação e edição

Funcionalidades Implementadas:

✔ Planos

    Listagem de planos

    Criação

    Atualização

    Formulário com validação

    Integração com JSON Server

✔ Beneficiários

    Listagem

    Cadastro

    Edição

    Validações de formulário (ReactiveForms)

    Diálogo de sucesso/erro com Angular Material

---

Requisitos para rodar a aplicação

    Node.js 16+

    Angular CLI instalado globalmente:

    npm install -g @angular/cli

    JSON Server instalado globalmente:

    npm install -g json-server
