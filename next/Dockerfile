FROM node:16-alpine

WORKDIR /next
COPY package.json ./
RUN npm install

COPY . .
COPY prisma prisma
RUN npx prisma db pull
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]