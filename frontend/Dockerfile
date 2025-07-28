FROM node:18

WORKDIR /app

# Copie les fichiers nécessaires
COPY package.json ./
# Installe les dépendances dans l’image
RUN npm install

# Copie tout le reste (src, vite.config.js, etc.)
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
