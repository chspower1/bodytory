FROM node:16-alpine

WORKDIR /usr/src/next
COPY . /usr/src/next/
RUN npm install
RUN npm run erd
RUN npm run build
EXPOSE 3000

CMD ["npm","run","start"]