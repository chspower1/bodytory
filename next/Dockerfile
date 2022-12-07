FROM node:16-alpine

WORKDIR /usr/src/next
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build
EXPOSE 3000

CMD ["npm","run","start"]