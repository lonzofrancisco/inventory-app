# Dockerfile del backend (en ./backend/Dockerfile)
FROM node:20

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de tu aplicación
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]  # Asegúrate de que esta línea esté aquí
