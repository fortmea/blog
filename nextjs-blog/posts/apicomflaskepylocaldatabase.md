---
title: "Api com Flask e a Biblioteca pylocaldatabase para armazenamento de dados"
date: "2022-06-06"
anterior: "pylocaldatabase"
proximo: "ipfs"
catimage: "https://www.python.org/static/community_logos/python-logo-generic.svg"
upd: ""
---

Seguindo o tópico da minha [publicação anterior](../pylocaldatabase), estou desenvolvendo uma API, e utilizando-a nesse website para gerenciar os comentários das publicações. 

---------

O código da api pode ser encontrado [aqui](https://github.com/fortmea/flaskpylocaldb) e tem scripts prontos para compatibilidade com Heroku e Replit.   

Inicialmente, o projeto contém apenas requisições simples de adição e listagem de comentários, pois ainda é necessário progresso em formas de criptografar e ocultar os dados no arquivo de banco de dados através da biblioteca que estou desenvolvendo.

----

Plano futuro para a biblioteca:

- Adicionar criptografia AES-256 ao salvar e ler arquivos, utilizando chave privada;
- Melhorar sintaxe;
- Adicionar testes unitários para reduzir a quantidade de patches necessários;
- Criar um ambiente virtual de desenvolvimento para facilitar a publicação de novas versões.


Até a próxima!