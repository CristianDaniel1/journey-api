# Journey API

A **Journey API** é uma REST API para gerenciar o cardápio do restaurante Journey. Esta API foi desenvolvida utilizando **Node.js**, **Express**, **TypeScript**, **Zod** e **MySQL**. Ela permite realizar operações CRUD (Create, Read, Update, Delete) para gerenciar menus.

---

## Instalação e Execução

1. Clone este repositório:

```bash
git clone https://github.com/CristianDaniel1/journey-api.git
```

2. Navegue para o diretório do projeto:

```bash
cd journey-api
```

3. Instale as dependências:

```bash
npm install
```

4. Crie e configure o arquivo `.env` com os seguintes parâmetros:

```env
MYSQL_PASSWORD= # Coloque a sua senha do banco de dados MySQL
MYSQL_DATABASE= # Coloque o nome do banco de dados MySQL
```

Além disso, é possível editar mais variáveis de ambiente se desejar, porém garanta que as de cima estejam corretamente definidas.

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

6. Acesse a API em `http://localhost:3000` (ou na porta configurada no `.env`).

---

## Endpoints

### 1. **GET /api/menu**

Recupera todos os itens do menu.

**Requisição:**

```bash
GET http://localhost:3000/api/menu
```

**Resposta:**

```json
[
  {
    "id": "5b456199-bb35-11ef-ac31-00e04f18bc29",
    "name": "Biryani Rice",
    "price": 35.99,
    "alt": "Biryani é um prato de arroz típico da Índia, com batatas, cebola, alho e gengibre esmagados, com carne de frango.",
    "image": "https://i.imgur.com/ux0OPup.jpg",
    "category": "dish",
    "rating": 4.8
  },

  {
    "id": "5b456625-bb35-11ef-ac31-00e04f18bc29",
    "name": "Suco de Laranja",
    "price": 7.99,
    "alt": "Suco de laranja",
    "image": "https://i.imgur.com/a6U22y7.jpg",
    "category": "drink",
    "rating": 4.3
  }
  // ...
]
```

---

### 2. **GET /api/menu/:id**

Recupera um item específico do menu baseado no `id`.

**Requisição:**

```bash
GET http://localhost:3000/api/menu/5b456199-bb35-11ef-ac31-00e04f18bc29
```

**Resposta:**

```json
{
  "id": "5b456199-bb35-11ef-ac31-00e04f18bc29",
  "name": "Biryani Rice",
  "price": 35.99,
  "alt": "Biryani é um prato de arroz típico da Índia, com batatas, cebola, alho e gengibre esmagados, com carne de frango.",
  "image": "https://i.imgur.com/ux0OPup.jpg",
  "category": "dish",
  "rating": 4.8
}
```

---

### 3. **POST /api/menu**

Cria um novo item no menu.

**Requisição:**

```bash
POST http://localhost:3000/api/menu
Content-Type: application/json

{
    "name": "Nova Sobremesa",
    "price": 15.99,
    "alt": "Uma sobremesa deliciosa",
    "image": "https://i.imgur.com/abcdef.jpg",
    "category": "dessert",
    "rating": 4.9
}
```

**Resposta:**

```json
{
  "id": "0ad42e7b-bbc1-11ef-ac31-00e04f18bc29",
  "name": "Nova Sobremesa",
  "price": 15.99,
  "alt": "Uma sobremesa deliciosa",
  "image": "https://i.imgur.com/abcdef.jpg",
  "category": "dessert",
  "rating": 4.9
}
```

---

### 4. **PATCH /api/menu/:id**

Atualiza um item existente no menu.

**Requisição:**

```bash
PATCH http://localhost:3000/api/menu/0ad42e7b-bbc1-11ef-ac31-00e04f18bc29
Content-Type: application/json

{
    "name": "Sobremesa editada",
    "price": 30.99,
    "alt": "Uma sobremesa editada",
    "image": "https://i.imgur.com/abcdef.jpg",
    "category": "dessert",
    "rating": 4.0
}
```

**Resposta:**

```json
{
  "id": "0ad42e7b-bbc1-11ef-ac31-00e04f18bc29",
  "name": "Sobremesa editada",
  "price": 30.99,
  "alt": "Uma sobremesa editada",
  "image": "https://i.imgur.com/abcdef.jpg",
  "category": "dessert",
  "rating": 4.0
}
```

---

### 5. **DELETE /api/menu/:id**

Remove um item do menu baseado no `id`.

**Requisição:**

```bash
DELETE http://localhost:3000/api/menu/0ad42e7b-bbc1-11ef-ac31-00e04f18bc29
```

**Resposta:**

```json
{
  "message": "Menu item deleted"
}
```

---

## Escolha do Modelo de Dados

A API foi desenvolvida seguindo a arquitetura MVC (Model-View-Controller), e oferece duas opções ou Models para gerenciar os dados:

1. **MySQL Model:** Utiliza o banco de dados MySQL para armazenar e manipular os dados do menu.
2. **JSON Model:** Utiliza um arquivo JSON local como modelo de armazenamento de dados. Ideal para testes ou quando o banco de dados não está disponível.

A escolha do modelo pode ser configurada diretamente no código.
