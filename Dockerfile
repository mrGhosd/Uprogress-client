FROM node:5.12.0

RUN npm install webpack -g
RUN npm install eslint -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

ENV NODE_ENV=production
ENV PORT=9000

CMD [ "npm", "run", "dev" ]
