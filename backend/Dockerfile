# Dockerfile del backend (en ./backend/Dockerfile)
FROM node:20

# Instalar el cliente de MySQL y herramientas de red
RUN apt-get update && apt-get install -y default-mysql-client iputils-ping

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de tu aplicación
COPY package*.json ./
RUN npm install
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
