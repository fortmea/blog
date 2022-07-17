---
title: "Configurando seu próprio motor de busca privado com o SearxNG"
date: "2022-07-17"
anterior: "redditsaver"
proximo: ""
catimage: "https://docs.searxng.org/_static/searxng-wordmark.svg"
upd: ""
---

### O que é o SearxNG?
SearxNG é um Fork do motor de meta-busca Searx, com melhorias na experiência do usuário.
Essa ferramenta permite buscar em diversos outros motores de busca como Google, DuckDuckGo, Bing, qwant, Brave, entre outros, sem sacrificar a privacidade ou qualidade dos resultados. Ele permite que cada usuário personalize suas preferências de busca, armazenando todos esses dados localmente.

Além das instâncias públicas, também é possível hospedar a sua própria instância do SearxNG, garantindo privacidade máxima. E é esse o tópico a ser abordado nesse artigo.


### Instalação via Docker, com Docker-compose
Utilizando o Docker, a instalação dessa ferramenta não passa de uns poucos comandos no terminal, pois a configuração será minima.

Fazendo o download dos arquivos necessários:
```bash
cd /usr/local
git clone https://github.com/searxng/searxng-docker.git
cd searxng-docker
```
Gerando chave secreta para o searxng:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng/settings.yml
```

Finalmente, iniciando a instância do searxNG:

```bash
docker-compose up -d
```

Ou para parar a execução:

```bash
docker-compose down
```


### Configuração de proxy reverso

Por padrão o SearxNG utiliza a porta 443 para conexão HTTPS, podendo causar conflito com outros servidores web na máquina. Podemos resolver isso utilizando proxy reverso, apontando uma rota no servidor (nesse caso apache) para o SearxNG em uma porta alternativa:

#### Primeiro editamos o arquivo de configuração do searxNG, para alterarmos a porta de acesso. (Opcional caso a porta padrão 8080 não esteja sendo utilizada)
1. Execute o comando ```docker-compose down``` no caminho em que está o repositório do searxNG.
2. Na pasta searxNG, abra o arquivo ```settings.yml``` no seu editor de texto.
3. Na área ```server``` adicione a tag ```port``` seguindo o padrão do resto do arquivo e defina a porta que deseja utilizar.
4. Salve e inicie o serviço novamente.

#### Exemplo de arquivo de configuração de rota para o Apache:
```ini
<VirtualHost *:80>
        ServerName endereco.com #Endereço de acesso do serviço

        ServerAdmin webmaster@localhost
        ProxyPreserveHost On
        ProxyPass / http://0.0.0.0:8080/   #Endereço local do searxNG
        ProxyPassReverse / http://0.0.0.0:8080/ #Endereço local do searxNG
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```
Ative o arquivo com o comando ```a2ensite nomedoarquivo.conf``` e recarregue o serviço.

### Resultado

![A ferramenta tem uma aparência muito agradável, e outros temas podem ser instalados, além de muitas outras configurações que estão disponíveis](https://fortmea.tech/images/searx.png "A ferramenta tem uma aparência muito agradável, e outros temas podem ser instalados, além de muitas outras configurações que estão disponíveis")

Até a próxima!