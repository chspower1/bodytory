FROM node:lts
WORKDIR /usr/src/next
COPY . /usr/src/next/
RUN npm install
RUN npm install @prisma/client
RUN npx prisma generate
RUN npm run build
EXPOSE 3000

CMD ["npm","run","start"]