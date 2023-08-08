require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

console.log("Starting...")
mongoose.connect(process.env.DATABASE_URL_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json()); // lets the server accepts JSON

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server Started');
})

