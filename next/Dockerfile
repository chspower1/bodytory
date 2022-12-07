FROM node:16-alpine

WORKDIR /src/next
COPY package*.json ./
RUN npm install

WORKDIR /src/next
COPY --from=dependencies /src/next/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]