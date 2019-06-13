require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
});

app.use(require('./routes'));

app.listen(3333);