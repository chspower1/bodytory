FROM node:16-alpine

WORKDIR /next

COPY package*.json /next

RUN npm install

COPY . /next

ENV DISABLE_ERD true
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]