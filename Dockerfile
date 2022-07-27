FROM node:lts

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# build and start
RUN yarn build
# prisma generate
RUN yarn prisma:generate
# start
CMD npm run start
