# Projeto Front-end com Ionic

O Projeto Front-end é uma aplicação desenvolvida em Ionic que consome as APIs do Projeto BFF. Ele oferece uma interface de usuário interativa para acessar os recursos das APIs API_BASE e API_IA, proporcionando uma experiência fluida para os usuários.

## Funcionalidades

- **Visualização de Dados da API_BASE:** A aplicação permite aos usuários visualizar e se inscrever em eventos.

- **Inteligência Artificial da API_IA:** Através do Projeto BFF, a aplicação oferece funcionalidades relacionadas a reconhecimento facial, utilizados para identificar os usuários .

## Pré-requisitos

- [Git](https://git-scm.com/): Para clonar o repositório do projeto.

- NVM (Node Version Manager):
    Instale o curl
    ```bash
    sudo apt install curl
    ```
    Instale o NVM
    ```bash
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    ```
    Atualize as confiugrações do NVM
    ```bash
    source ~/.bashrc
    ```

## Instalação e Execução

1. Clone este repositório em sua máquina local:

   ```bash
   git clone git@github.com:S204-Inatel-2023-2/binaryhorizon_eventhis_front.git
   ```

2. Navegue até o diretório:
    ```bash
    cd binaryhorizon_eventhis_front/eventhis_front
    ```

3. Instale a versão 18 do Node.js usando o NVM:
    ```bash
    nvm install 18
    nvm use 18
    ```

4. Se você não tem o Ionic CLI instalado, rode o comando a seguir:
    ```bash
    npm install -g @ionic/cli
    ```
    
5. Instale as dependências usando o npm:
    ```bash
    npm install
    ```

6. Inicie o servidor de desenvolvimento:
    ```bash
    ionic serve
    ```

7. Abra o navegador e navegue para a URL do servidor de desenvolvimento.
    ```
    http://localhost:8100
    ```