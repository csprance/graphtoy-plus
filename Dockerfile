FROM node:17

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# generate prisma db
RUN yarn prisma:generate
# build and start
RUN yarn build
# start
CMD npm run start
