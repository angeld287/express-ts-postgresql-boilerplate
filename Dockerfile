FROM node

WORKDIR /usr/src/app

RUN npm install -g typescript

RUN npm install -g nodemon

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN chown -R node:node /usr/src/app
USER node

EXPOSE 3000

#Build to project
RUN npm run build

# Run node server
CMD npm run start
