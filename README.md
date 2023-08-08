# REST API with NodeJS, Express and MongoDB
> I just practiced creating a rest api using node.js


# Getting Started
Creating the project
```
npm init
```
Installing the project dependencies
```
npm i express mongoose
```
Installing development dependencies
```
npm i --save-dev dotenv nodemon
```
- dotenv - will allow us to pull an environment variables in the dotenv file
- nodemon - will automatically refresh the server when we made some changes

In the `package.json` under `scripts`, remove the tests and add
```json
"devStart" : "nodemon server.js"
```
Create the server.js, .env and .gitingore files in the root directory