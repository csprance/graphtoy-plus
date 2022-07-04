FROM node:17

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# build and start
RUN npm run build
CMD npm run serve
