FROM node:18

WORKDIR /app

COPY ./ ./

RUN npm install -ci

CMD ["node", "src"]