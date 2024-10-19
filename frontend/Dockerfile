# frontend/Dockerfile

# Usar la imagen oficial de Node.js
FROM node:20 as build

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
