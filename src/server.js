const express = require('express');
const compression = require('compression')
const app = express();

const mongoose = require('mongoose');

console.log("Starting...")
mongoose.connect(process.env.DATABASE_URL_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
let port = process.env.PORT??80;

db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json()); // lets the server accepts JSON
app.use(compression()); // compress all routes

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const mainRouter = require('./routes/main')
app.use('/', mainRouter);

const server = app.listen(port, () => {
    console.log(`Server Started, running on port: ${port}`);
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout   = 120 * 1000;