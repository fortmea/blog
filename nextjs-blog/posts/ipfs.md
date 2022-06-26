---
title: "A viabilidade do uso de protocolos peer-to-peer para hosting de websites"
date: "2022-06-20"
anterior: "apicomflaskepylocaldatabase"
proximo: "redditsaver"
catimage: "https://raw.githubusercontent.com/ipfs-inactive/logo/26a8332e2b1dc7e711561bc03f2e39e0c99e76f6/vector/ipfs-logo-vector-ice-text.svg"
upd: ""
---
### Introdução
É possível utilizar uma rede p2p para hospedar websites? Essa pergunta pode ser estranha, mas isso é sim possível. 

Por natureza, os servidores de protocolo HTTP servem arquivos e lidam com requisições e tratamento de parâmetros das mesmas, assim como controle de acesso e outras atividades comuns a esse tipo de serviço. Teoricamente, um serviço p2p que permita carregar arquivos separadamente e de forma suficientemente rápida pode ser utilizada para hospedar websites, e muitas soluções implementam esse tipo de serviço.

### IPFS
A rede IPFS (InterPlanetary File System) é um protocolo peer-to-peer para armazenamento e compartilhamento de dados, que usa endereçamento de conteúdo para identificar cada arquivo globalmente, conectando todos os dispositivos na rede. Essa rede é composta por vários gateways que permitem acesso pela web, assim como um cliente dedicado disponível em todas as plataformas e de código aberto, que permite o acesso a esses arquivos. 

### InterPlanetary Name System
O InterPlanetary Name System (IPNS) permite criar um único endereço para arquivos diferentes, servindo como um diretório único, onde pode existir apenas uma única versão de um arquivo, removendo a necessidade de se compartilhar um código novo sempre que alterar os arquivos que você armazenou na rede.

### Onde tudo isso se encontra
Utilizando o IPNS podemos acessar um único endereço através de um gateway público, que estaria conectado a seu domínio através do DNS. Assim, podemos hospedar arquivos responsáveis por um website e alterá-los sempre que necessário, como esperado de uma hospedagem normal (apesar de pecar um pouco na velocidade). 

---

### Esse website é desenvolvido utilizando NextJS e armazenado gratuitamente no IPFS.

---