# API de Usuários - Endpoints

## Base URL
```
http://localhost:3000/users
```

---

## 1. Criar Usuário (Registro)
**POST** `/users`

### Request Body
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

### Response (201 Created)
```json
{
  "id": 1,
  "email": "joao@example.com",
  "name": "João Silva",
  "externalId": null,
  "createdAt": "2025-11-13T19:34:55.000Z",
  "updatedAt": "2025-11-13T19:34:55.000Z",
  "deletedAt": null
}
```

### Validações
- `name`: obrigatório
- `email`: obrigatório, deve ser um email válido
- `password`: obrigatório, mínimo 6 caracteres

---

## 2. Login de Usuário
**POST** `/users/login`

### Request Body
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

### Response (200 OK)
```json
{
  "id": 1,
  "email": "joao@example.com",
  "name": "João Silva",
  "externalId": null,
  "createdAt": "2025-11-13T19:34:55.000Z",
  "updatedAt": "2025-11-13T19:34:55.000Z",
  "deletedAt": null
}
```

### Erros
- **401 Unauthorized**: Email ou senha inválidos

---

## 3. Buscar Usuário por ID
**GET** `/users/:id`

### URL Example
```
GET /users/1
```

### Response (200 OK)
```json
{
  "id": 1,
  "email": "joao@example.com",
  "name": "João Silva",
  "externalId": null,
  "createdAt": "2025-11-13T19:34:55.000Z",
  "updatedAt": "2025-11-13T19:34:55.000Z",
  "deletedAt": null
}
```

### Erros
- **404 Not Found**: Usuário não encontrado

---

## 4. Deletar Usuário
**DELETE** `/users/:id`

### URL Example
```
DELETE /users/1
```

### Response (200 OK)
```json
{
  "message": "User deleted successfully"
}
```

### Erros
- **404 Not Found**: Usuário não encontrado

---

## Exemplos com cURL

### Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Buscar usuário
```bash
curl -X GET http://localhost:3000/users/1
```

### Deletar usuário
```bash
curl -X DELETE http://localhost:3000/users/1
```

---

## Tratamento de Erros

### Conflito (Email já registrado)
```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "error": "Conflict"
}
```

### Não Autorizado
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

### Não Encontrado
```json
{
  "statusCode": 404,
  "message": "User with ID X not found",
  "error": "Not Found"
}
```

### Erro Interno
```json
{
  "statusCode": 500,
  "message": "Failed to create user",
  "error": "Internal Server Error"
}
```

---

## Notas de Segurança

✅ Senhas são criptografadas com bcrypt (10 rounds)
✅ Senhas nunca são retornadas nas respostas
✅ Validação de email com class-validator
✅ Tratamento de exceções personalizado
