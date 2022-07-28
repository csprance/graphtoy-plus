FROM node:lts

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000

# prisma generate
RUN yarn prisma:generate
# build and start
RUN yarn build
# start
CMD npm run start
