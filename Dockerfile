FROM node:17

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# deploy prisma migrate/generate
RUN yarn prisma:deploy
# build and start
RUN yarn build
# start
CMD npm run start
