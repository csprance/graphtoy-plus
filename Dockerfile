FROM node:17

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# build and start
RUN yarn build
# deploy prisma migrate/generate
RUN yarn prisma:deploy
# start
CMD npm run start
