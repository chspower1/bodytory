FROM node:16-alpine

WORKDIR /usr/src/next
COPY . /usr/src/next/
RUN npm install
RUN npx prisma generate
RUN npm run build
EXPOSE 3000

CMD ["npm","run","start"]