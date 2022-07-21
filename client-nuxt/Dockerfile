FROM node:16.15.1-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

ENV HOST 0.0.0.0
ENV NUXT_PORT=3000
CMD ["npm", "run", "dev"]
