# Define a imagem base
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm ci

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Compila o aplicativo Next.js para produção
RUN npm run build

# Expõe a porta em que o aplicativo Next.js está escutando (geralmente 3000)
EXPOSE 3000

# Define o comando para iniciar o aplicativo Next.js
CMD ["npm", "start"]
