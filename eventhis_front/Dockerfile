# Define a imagem base
FROM node:16-alpine as builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install -g ionic
RUN npm install

# Copia o código-fonte para o diretório de trabalho
COPY . .

# Compila a aplicação
RUN ionic build --prod --engine=browser

# Define a imagem base para o ambiente de produção
FROM nginx:alpine

# Copia os arquivos compilados do diretório do builder para o diretório padrão do Nginx
COPY --from=builder /app/www /usr/share/nginx/html

# Expõe a porta 80 para acesso externo
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
