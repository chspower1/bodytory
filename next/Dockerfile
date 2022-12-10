FROM node:16.16.0-alpine AS BASE
WORKDIR /next
COPY package*.json ./
RUN npm install

FROM node:16.16.0-alpine AS BUILDER
WORKDIR /next
COPY . .
COPY --from=BASE /next/node_modules ./node_modules
ENV DISABLE_ERD true
RUN npx prisma generate
RUN npm run build

FROM node:16.16.0-alpine
WORKDIR /next
ENV NODE_ENV=production
COPY --from=BUILDER /next/.next ./.next
COPY --from=BUILDER /next/public ./public
COPY --from=BUILDER /next/package.json ./
COPY --from=BUILDER /next/node_modules ./node_modules
COPY --from=BUILDER /next/next.config.js ./

EXPOSE 3000
CMD ["npm","run","start"]
