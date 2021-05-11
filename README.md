# Bexs Travel Route #


É uma api com finalidade de consulta e cadastro de rotas de viagem buscando a melhor rota custo beneficio.

# Aplicação #


Para inicializar a aplicação é necessário informar o arquivo onde as rotas serão armazenadas, o conteúdo do arquivo deve seguir o padrão: `ROTA,ROTA,VALOR`.

### exemplo de conteúdo do arquivo: ###

```csv

GRU,BRC,10

BRC,SCL,5

GRU,CDG,75

GRU,SCL,20

GRU,ORL,56

```

## Exemplo da lógica: ##
Caso desejemos viajar de GRU para CDG existem as seguintes rotas:

1. GRU - BRC - SCL - ORL - CDG ao custo de $40
2. GRU - ORL - CGD ao custo de $64
3. GRU - CDG ao custo de $75
4. GRU - SCL - ORL - CDG ao custo de $45

O melhor preço é da rota 1 logo, o output da consulta deve ser GRU - BRC - SCL - ORL - CDG.

# Execução #

## Requerimentos ##
1. [NodeJs](https://nodejs.org/en/)
2. [Yarn](https://classic.yarnpkg.com/lang/en/)


## Aplicação: command-line: ##

Primeiro `instale` as dependencias, faça o `build` da aplicação e  `execute` o comando.

1. Instalando a apicação e fazendo o build.
```shell

    $ yarn && yarn build
```
2. Executando a aplicação command-line e interagindo para pegar a melhor rota entre dois pontos.
```shell

    $ yarn best-travel-route input-file.txt

    ? Por favor informe a rota desejada: GRU-ORL
    A melhore rota encontrada: GRU-BRC-SCL-ORL > 15
```

## Aplicação: Rest ##

Além da interface em command-line a aplicação possui uma API Rest, que disponibiliza dois endpoints:

### Cadastro de uma rota de viagem ###


```POST http://localhost:3000/travel-route```.


```shell
curl --request POST \
  --url http://localhost:3000/travel-route \
  --header 'Content-Type: application/json' \
  --data '{
  "route": [
    "PAT",
    "ORL",
    "CGD"
  ],
  "price": 30
}'
```

### Consulta da melhor rota custo beneficio ###


```GET http://localhost:3000/travel-route/best-route/{partida}/{destino}```.

```shell
curl --request GET \
  --url http://localhost:3000/travel-route/best-route/GRU/ORL
```

## Documentação Swagger

A api Rest conta com uma documentação no formato Swagger na rota: `http://localhost:3000/docs` com mais detalhes e caso esteja rodando a aplicação em `http://localhost:3000` é possivel testar as rotas por lá.

# Testes

O Projeto possui testes unitarios e de integração:

Testes unitarios
```shell
$ yarn test:unit
```

Testes de integração
```shell
$ yarn test:int
```

Rodando as 2 suites junto
```shell
$ yarn test
```

----

----
## Estrutura do projeto e tecnologias ##

- Foi utilizado: `nodeJs`, `typescript`, `jest`.

- Foi aplicado conceitos de `clean-architecture`, `domain-driven-design`, `solid`.
