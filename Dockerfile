# Usamos una imagen base de Node.js para la compilación
FROM node:16.13.0 as build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos los archivos de la aplicación al directorio de trabajo
COPY . .

# Compilamos la aplicación para producción
RUN npm run build --prod

# Usamos una imagen base de nginx para el despliegue
FROM nginx:1.21.0

# Copiamos el archivo de configuración de Nginx al contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos de la compilación de la aplicación al directorio de despliegue de Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exponemos el puerto 80 para el acceso a la aplicación
EXPOSE 80

# Comando para iniciar el servidor de Nginx
CMD ["nginx", "-g", "daemon off;"]
