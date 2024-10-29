FROM node:16

WORKDIR /app

COPY ./ ./

RUN npm install -ci

CMD ["node", "src"]