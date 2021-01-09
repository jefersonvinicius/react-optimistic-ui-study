# :books: Repositório de Estudo :books:

## O que foi realizado?
Uma aplicação em React para estudar como implementar uma Optimistic UI e além de praticar um pouco de TDD no lado do frontend. Uma simples API em Golang foi feita para auxiliar o frontend

## Bibliotecas utilizadas
### frontend:
    - https://github.com/axios/axios
    - https://date-fns.org/

### backend:
    - https://github.com/gorilla/mux
    - https://gorm.io/index.html

## Como executar o projeto?
### frontend
```
cd web/app
npm install
npm start
```

### backend
```
cd .docker
docker-composer up
cd ../server
go run main.go
```
