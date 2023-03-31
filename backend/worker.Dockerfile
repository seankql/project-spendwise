FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

CMD ["node", "worker.js"]