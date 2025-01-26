FROM node:20.11-alpine

WORKDIR /usr/src/app

ENV TZ=America/Sao_Paulo

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

CMD ["node", "dist/server.js"]