---
title: "Ferramenta para fazer o download de vídeos do Reddit"
date: "2022-06-24"
anterior: "ipfs"
proximo: ""
catimage: ""
---

### Como funciona? 
O Reddit disponibiliza todos os dados da postagem em formato json. Basta adicionar ".json" ao final do link de um post([exemplo](https://www.reddit.com/r/PhoenixSC/comments/vjhcun/how_to_torture_your_warden_3_me_and_my_warden.json)). 

Através dos dados encontrados no json, podemos acessar um link direto ao arquvo do vídeo (caso haja algum). No entanto, esse link não obriga o usuário a fazer o download, o que seria ruim por adicionar uma etapa extra ao processo. A solução então, foi utilizar a biblioteca de requisições axios que já é usada no projeto para copiar o conteúdo do arquivo definindo o tipo de dados retornado como [Blob](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob), para ser então salva. Usar a biblioteca axios também permitiu o uso de uma barra de progresso na ferramenta.

Os dados são todos processados localmente, fazendo com que a velocidade de download seja apenas limitada pela sua conexão com os servidores do Reddit.

![Ferramenta reddit saver. Um campo de texto, um botão para fazer o download, barra de progresso em 100%](../public/images/redditsaver.png "A ferramenta é muito simples, precisando de apenas um click para ser utilizada. Além disso, todos os dados são processados localmente, sem lentidão causada pelo servidor da minha ferramenta.")

### Como acessar?

Nesse link: [https://fortmea.tech/redditsaver](https://fortmea.tech/redditsaver).

### Código Fonte

O código fonte dessa ferramenta pode ser encontrado [aqui](https://github.com/fortmea/blog/blob/main/nextjs-blog/pages/redditsaver.js).

