# GraphToy-Plus
> A fork of iq's GraphToy with dynamic variables and other helpful additions for graphics programming

## Extras
* Dynamic Variables
* Extra Sharing Features
  * Adds more features to the sharing aspect to help educate
* Mask Visualizer
  * Visualize a value as a mask instead of a graph
* Written in Typescript (Much easier to extend now thanks to strong types)
* Uses NextJs/React (Could be a good or bad thing)
* Runs in Docker with Traefik for easy deployment

## Development
### NextJS
This app uses NextJS

### Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn lint`

Lint the project

### `yarn build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

Starts the project in production mode

### `yarn build-start`

Builds and starts the project in production mode

### `yarn prettier`

Runs prettier on the project

### `yarn prisma:generate`

Generate the prisma schema and writes the data to node_modules

### `yarn prism-pull-db`

Pulls the database and generates the .schema
